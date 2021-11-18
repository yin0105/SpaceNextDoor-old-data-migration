const { newDB, oldModels, newModels } = require('../sequelize.js');

(async () => {

  try {
    const queryInterface = newDB.getQueryInterface();
    const cols = await queryInterface.describeTable('users');
    if (!cols.old_user_id) {
      console.log('[i] Trying to add [old_user_id] column in [users] table.....');
      await newDB.query('ALTER TABLE users ADD COLUMN old_user_id INT;')
      console.log('[i] Added [old_user_id] column in [users] table successfully!');
    }
    const oldUsers = await oldModels.users.findAll({
      include: [{model: oldModels.user_payment_methods, as: 'user_payment_methods'}],
      order: [
        // ORDER user card which were recently updated
        [{model: oldModels.user_payment_methods, as: 'user_payment_methods'}, 'updated_at', 'DESC'],
      ]
    });
    
    for (let i = 0; i < oldUsers.length; i ++) {
      const oldUser = oldUsers[i];
      console.log(`[i] Trying to migrate old user: ${oldUser.id}`);
      const newUser = {};
      
      if (oldUser.provider === 'facebook' && oldUser.uid) {
        newUser.facebook_user_id = oldUser.uid;
      }

      if (oldUser.user_payment_methods.length) {
        newUser.stripe_customer_id = oldUser.user_payment_methods[0].token;
      }

      if (oldUser.phone) {
        newUser.phone_number = oldUser.phone.replaceAll(' ', '');
      }

      if (oldUser.confirmed_at) {
        newUser.is_email_verified = true;
        newUser.is_phone_verified = oldUser.phone ? true : false;
      }

      newUser.first_name = oldUser.first_name;
      newUser.last_name = oldUser.last_name;
      newUser.email = oldUser.email;
      newUser.old_user_id = oldUser.id;
      newUser.roles = ['CUSTOMER', 'PROVIDER'];
      newUser.created_at = oldUser.created_at;
      newUser.updated_at = oldUser.updated_at;
      newUser.old_user_id = oldUser.id

      const t = await newDB.transaction();

      try {
        const [provider, customer] = await Promise.all([
          newModels.providers.create({}, { transaction: t }),
          newModels.customers.create({}, { transaction: t }),
        ]);

        newUser.customer_id = customer.id;
        newUser.provider_id = provider.id;

        console.log(`[i] Migrating old user: ${oldUser.id} to new db...`);

        const user = await newModels.users.create(newUser, { transaction: t });
        
        console.log(`[i] Created new user: ${user.id} from old user: ${oldUser.id}!`);

        await t.commit();
      } catch (e) {
        console.log(`[e] Error occurred while migration old user: ${oldUser.id}`, e.message);
        console.log(`[i] Rolling back other records which were created for: ${oldUser.id}`);
        await t.rollback();
      }
    }
  } catch (e) {
    console.log(e.message);
  }
})()