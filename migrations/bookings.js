const { Op } = require('sequelize');
const { newModels, newDB, oldModels } = require('../sequelize');
const fs = require('fs');
const _ = require('lodash');
const dayjs = require('dayjs');
const csv = require('csv-parse/lib/sync');
const { at } = require('lodash');

const status = { pending: 0, active: 1, cancelled: 2, completed: 3, reviewed: 4, early_ended: 5, full_refunded: 6 };

const createUpdateCounter = async (
  type,
  t,
) => {
  const counter = await newModels.ids_counter.increment('last_id', {
    where: { type },
    transaction: t,
  });

  if (!counter[0][0][0]) {
    const doc = await newModels.ids_counter.create({
      last_id: 1,
      type,
    });

    return doc.toJSON();
  }

  return counter[0][0][0];
}

const getLongId = (lastId, type) => {
  let shortId;

  switch (this.nodeEnv) {
    case 'development':
      shortId = 700000 + lastId;
      break;
    case 'staging':
      shortId = 800000 + lastId;
      break;
    case 'production':
      shortId = 900000 + lastId;
    default:
      shortId = 700000 + lastId;
  }

  switch (type) {
    case 'ORDER':
      return `OR_${shortId}`;
    case 'BOOKING':
      return shortId.toString();
  }
}

const parseBookingsCSV = () => {
  const fd = fs.openSync('./bookings.csv');
  const file = fs.readFileSync(fd, { encoding: 'utf-8'});
  const bookingIdIdx = 0;
  const spaceIdIdx = 1;
  
  const parsedRecords = csv(file).slice(1);

  return parsedRecords.reduce((obj, row) => {
    obj[parseInt(row[bookingIdIdx], 10)] = parseInt(row[spaceIdIdx], 10);
    return obj;
  }, {})
}

const generateBookingId = async (args) => {
  const counter = await createUpdateCounter('BOOKING', args.t);

  return getLongId(counter.last_id, 'BOOKING');
}

const createBookingPromotion = async (bookingId, discountType, t) => {
  const promotionName = discountType === 2 ? '2 Months Free, 6 Months Min' : '1 month free, 3 months min';
  const promotion = await newModels.bookings_promotions.create({
    booking_id: bookingId,
    name_en: promotionName,
    name_th: promotionName, 
    name_jp: promotionName, 
    name_kr: promotionName, 
    format: 'PUBLIC',
    status: 'ACTIVE',
    start_date: dayjs().subtract(1, 'year'),
  }, { transaction: t });
  await newModels.bookings_promotions_customer_buys.create({
    booking_promotion_id: promotion.id,
    type: 'MIN_DAYS',
    value: discountType === 1 ? 90 : 180,
  }, { transaction: t });
  await newModels.bookings_promotions_customer_gets.create({
    booking_promotion_id: promotion.id,
    type: 'TOTAL_AMOUNT',
    value: 0,
    for_type: 'RENEWAL_INDEX',
    for_value: 1,
  }, { transaction: t });

  if (discountType === 2) {
    await newModels.bookings_promotions_customer_gets.create({
      booking_promotion_id: promotion.id,
      type: 'TOTAL_AMOUNT',
      value: 0,
      for_type: 'RENEWAL_INDEX',
      for_value: 6,
    }, { transaction: t });
  }

  return promotion.id;
}

(async () => {
  const bookingSpaceObj = parseBookingsCSV();
  const queryInterface = newDB.getQueryInterface();
  const cols = await queryInterface.describeTable('bookings');
  if (!cols.old_booking_id) {
    console.log('[i] Trying to add [old_booking_id] column in [bookings] table.....');
    await newDB.query('ALTER TABLE bookings ADD COLUMN old_booking_id INT;')
    console.log('[i] Added [old_booking_id] column in [bookings] table successfully!');
  }

  if (!Object.keys(bookingSpaceObj).length) {
    throw new Error('No mapping');
  }

  const insurances = await newModels.platform_insurances.findAll();
  const bookings = await oldModels.orders.findAll({
    where: {
      type: 1,
      status: 1,
    },
    include: [{
      model: oldModels.payments,
      as: 'payments',
    }]
  });

  console.log(`[i] Found old ${bookings.length} bookings....`);

  const getInsuranceIdFromPremium = (premium) => (insurances.filter((insurance) => (insurance.price_per_day * 30) === (premium / 100))[0] || {}).id;
  const toDollar = (cents) => parseFloat((cents / 100).toFixed(2));
  const getAmountsFromPayment = (payment, booking, nextPayment) => {
    // In Legacy, if discount was applied, rent cents becomes 0, thats why
    // using nextPayment's rent cents to keep a record
    const rentCents = payment.rent_cents || nextPayment.rent_cents;
    const fee = payment.guest_service_fee_cents || nextPayment.guest_service_fee_cents;
    const serviceFee = toDollar(fee);
    let totalRent = serviceFee + toDollar(rentCents);
    let depositAmount = toDollar(payment.deposit_cents || 0);
    let discount = 0;
    const insuranceAmount = toDollar(payment.premium_cents || 0)

    let totalAmount = totalRent  + depositAmount + insuranceAmount - discount;

    return {
      discount,
      totalAmount,
      insuranceAmount,
      depositAmount,
      totalRent,
    };
  }
  const getNextRenewal = (nextPayment, endDate) => {
    if (nextPayment) {
      return nextPayment.service_start_at;
    }

    // minus 2d from enddate;
    return dayjs(endDate).subtract(13, 'day').format();
  }

  for (let i = 0; i < bookings.length; i++) {
    if (!bookingSpaceObj[bookings[i].id]) {
      console.log(`=>>>>>>>>>>>> Err: ${bookings[i].id} don't have mapping!`);
      continue;
    }

    const t = await newDB.transaction();
    const oldBooking = bookings[i];

    try {

      console.log(`[i] Finding relevant bookings information in new DB....`);
      const [users, space, bookingId] = await Promise.all([
        newModels.users.findAll({ where: { old_user_id: { [Op.in]: [oldBooking.host_id, oldBooking.guest_id]}}}),
        newModels.spaces.findOne({
          where: {
            id: bookingSpaceObj[oldBooking.id],
          },
          include: [{
            model: newModels.sites,
            as: 'site',
            include: [
              { model: newModels.site_addresses, as: 'address' },
              { model: newModels.site_features, as: 'site_features' },
            ],
          }],
        }),
        generateBookingId({t}),
      ]);
      const newCustomer = users.filter((u) => u.old_user_id === oldBooking.guest_id)[0];
      const newProvider = users.filter((u) => u.old_user_id === oldBooking.host_id)[0];

      if (!newCustomer || !newProvider || !space) {
        console.log(`[e] Skipping..New Customer or Provider or Space not found from Booking(${oldBooking.id}) Payment(${oldBooking.remain_payment_cycle})`);
        continue;
      }

      const payments = _.sortBy(oldBooking.payments, (o) => o.serial);

      if (payments.length < 2) {
        // At this moment, we're unable to migrate bookings which have less than 2 renewal
        console.log(`[e] Booking ${oldBooking.id} has less than 2 renewals, skipping....`);
        continue;
      }

      const lastPaymentWithInsurance = _.last(payments.filter((p) => p.premium_cents)) || {};

      if (!payments.length) {
        console.log(`[e] Skipping.. Payment not found (${oldBooking.id})`);
        continue;
      }

      const firstPayment = payments[0];
      const secondPayment = payments[1];
      const amounts = getAmountsFromPayment(firstPayment, oldBooking, secondPayment);
      const {id, ...address} = space.site.address.toJSON();

      console.log(`[i] Creating booking site addresses....`);

      const bookingSiteAddress = await newModels.booking_site_addresses.create(address, {
        transaction: t
      });

      let promotionId = null;

      const applyPromotion = (renewal, forBooking) => {
        if (!forBooking) {
          renewal.booking_promotion_id = promotionId;
        }

        renewal.total_amount = renewal.total_amount - renewal.base_amount;
        renewal.discount_amount = renewal.base_amount;

        return renewal;
      }

      let bookingObj = {
        short_id: bookingId,
        commitment_months: (oldBooking.discount_code <= 2 && oldBooking.discount_code * 3) || undefined,
        customer_name: `${newCustomer.first_name} ${newCustomer.last_name}`,
        customer_email: newCustomer.email,
        customer_phone_number: newCustomer.phone_number,
        customer_id: newCustomer.id,
        provider_id: newProvider.id,
        move_in_date: oldBooking.start_at,
        move_out_date: oldBooking.end_at,
        old_booking_id: oldBooking.id,
        created_at: oldBooking.created_at,
        updated_at: oldBooking.updated_at,
        auto_renewal: true,
        space_id: space.id,
        space_size: space.size,
        space_height: space.height,
        space_width: space.width,
        space_length: space.length,
        space_size_unit: space.size_unit,
        space_price_per_month: amounts.totalRent,
        currency: 'SGD',
        currency_sign: 'S$',
        site_id: space.site.id,
        site_name: space.site && space.site.name,
        site_description: space.site && space.site.description,
        site_address_id: bookingSiteAddress.id,
        status: 'ACTIVE',
        is_insured: oldBooking.insurance_enable,
        insurance_amount: amounts.insuranceAmount,
        discount_amount: amounts.discount,
        insurance_id: (lastPaymentWithInsurance.premium_cents && getInsuranceIdFromPremium(lastPaymentWithInsurance.premium_cents)) || undefined,
        deposited_amount: amounts.depositAmount,
        base_amount: amounts.totalRent,
        sub_total_amount: amounts.totalRent,
        total_amount: amounts.totalAmount,
      };

      if (oldBooking.discount_code !== null && oldBooking.discount_code <= 2) {
        bookingObj = applyPromotion(bookingObj, true);
      }

      console.log(`[i] Creating booking....`);
      const booking = await newModels.bookings.create(bookingObj, { transaction: t });

      console.log(`[i] Created booking ${booking.id}`);

      if (oldBooking.discount_code <= 2) {
        promotionId = await createBookingPromotion(booking.id, oldBooking.discount_code, t);
      }

      console.log(`[i] Creating booking site features....`);
      await Promise.all(
        space.site.site_features.map((feat) => newModels.booking_site_features.create({
          booking_id: booking.id,
          feature_id: feat.feature_id,
        }, { transaction: t }))
      );
      
      console.log(`[i] Found ${payments.length} old payments for booking(${oldBooking.id})....`);
      // create renewals; sort payments by serial
      for (let j = 0; j < payments.length; j++) {
        const payment = payments[j];
        console.log(` [i] Preparing to create renewal with old payment(${payment.id})....`);
        const nextPayment = payments[j+1];
        const prevPayment = payments[j-1];
        let transaction = null;
        const { depositAmount, totalAmount, totalRent, insuranceAmount, discount } = getAmountsFromPayment(payment, oldBooking, prevPayment || nextPayment);

        let renewal = {
          booking_id: booking.id,
          insurance_id: (insuranceAmount && getInsuranceIdFromPremium(oldBooking.premium_cents)) || undefined,
          next_renewal_date: getNextRenewal(nextPayment, payment.service_end_at),
          renewal_start_date: payment.service_start_at,
          renewal_end_date: payment.service_end_at,
          renewal_paid_date: payment.created_at,
          status: (payment.status === 1 || payment.status === 4) ? 'PAID' : 'FAILED',
          type: payment.deposit_cents ? 'BOOKING' : 'PARTIAL_SUBSCRIPTION',
          base_amount: totalRent,
          deposit_amount: depositAmount,
          discount_amount: discount,
          insurance_amount: insuranceAmount,
          total_amount: totalAmount,
          sub_total_amount: totalRent,
          created_at: payment.service_start_at,
          updated_at: payment.service_start_at,
        };

        if (
          oldBooking.discount_code <= 2 &&
          promotionId &&
          (payment.serial === 1 || (payment.serial === 6 && oldBooking.discount_code === 2))
        ) {
          renewal = applyPromotion(renewal);
        }

        if (payment.transaction_id) {
          const transactionObj = {
            booking_id: booking.id,
            stripe_charge_id: payment.transaction_id,
            stripe_customer_id: newCustomer.stripe_customer_id || '',
            card_last_digits: (payment.identifier || '').replaceAll('*', '').replaceAll(' ', ''),
            amount: renewal.total_amount,
            currency: 'SGD',
            created_at: payment.created_at,
            updated_at: payment.updated_at,
          };
  
          console.log(`  [i] Creating transaction with old payment(${payment.id})....`);
          transaction = await newModels.transactions.create(transactionObj, { transaction: t });
        }

        if (transaction && transaction.id) {
          renewal.transaction_id = transaction && transaction.id || undefined;
        }

        console.log(`  [i] Creating renewal with old payment(${payment.id})....`);
        await newModels.renewals.create(renewal, { transaction: t });
      }

      console.log(`[i] Committing...`);
      await t.commit();
      console.log(`[DONE] ${oldBooking.id} migrated successfully`);
    } catch (e) {
      console.log(e);
      console.log(`[e] Error occurred while migrating booking!`, e.message, e.stack)
      console.log(`[e] Rolling back....`)
      t.rollback();
    }
  }

  console.log(`[i] All done successfully!`);
  process.exit(1);
})();
