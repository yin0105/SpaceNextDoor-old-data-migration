var DataTypes = require("sequelize").DataTypes;
var _booking_site_addresses = require("./booking_site_addresses");
var _booking_site_features = require("./booking_site_features");
var _booking_space_features = require("./booking_space_features");
var _bookings = require("./bookings");
var _bookings_history = require("./bookings_history");
var _bookings_promotions = require("./bookings_promotions");
var _bookings_promotions_customer_buys = require("./bookings_promotions_customer_buys");
var _bookings_promotions_customer_gets = require("./bookings_promotions_customer_gets");
var _calendars = require("./calendars");
var _cities = require("./cities");
var _countries = require("./countries");
var _customers = require("./customers");
var _districts = require("./districts");
var _ids_counter = require("./ids_counter");
var _landmarks = require("./landmarks");
var _orders = require("./orders");
var _orders_history = require("./orders_history");
var _orders_pick_up_service = require("./orders_pick_up_service");
var _otps = require("./otps");
var _platform_commissions = require("./platform_commissions");
var _platform_feature_categories = require("./platform_feature_categories");
var _platform_features = require("./platform_features");
var _platform_insurances = require("./platform_insurances");
var _platform_policies = require("./platform_policies");
var _platform_property_types = require("./platform_property_types");
var _platform_rules = require("./platform_rules");
var _platform_services = require("./platform_services");
var _platform_space_categories = require("./platform_space_categories");
var _platform_space_category_items = require("./platform_space_category_items");
var _platform_space_types = require("./platform_space_types");
var _prices = require("./prices");
var _promotions = require("./promotions");
var _promotions_customer_buys = require("./promotions_customer_buys");
var _promotions_customer_gets = require("./promotions_customer_gets");
var _promotions_redeem = require("./promotions_redeem");
var _providers = require("./providers");
var _renewals = require("./renewals");
var _site_addresses = require("./site_addresses");
var _site_features = require("./site_features");
var _site_policies = require("./site_policies");
var _site_rules = require("./site_rules");
var _sites = require("./sites");
var _space_features = require("./space_features");
var _spaces = require("./spaces");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var booking_site_addresses = _booking_site_addresses(sequelize, DataTypes);
  var booking_site_features = _booking_site_features(sequelize, DataTypes);
  var booking_space_features = _booking_space_features(sequelize, DataTypes);
  var bookings = _bookings(sequelize, DataTypes);
  var bookings_history = _bookings_history(sequelize, DataTypes);
  var bookings_promotions = _bookings_promotions(sequelize, DataTypes);
  var bookings_promotions_customer_buys = _bookings_promotions_customer_buys(sequelize, DataTypes);
  var bookings_promotions_customer_gets = _bookings_promotions_customer_gets(sequelize, DataTypes);
  var calendars = _calendars(sequelize, DataTypes);
  var cities = _cities(sequelize, DataTypes);
  var countries = _countries(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var districts = _districts(sequelize, DataTypes);
  var ids_counter = _ids_counter(sequelize, DataTypes);
  var landmarks = _landmarks(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_history = _orders_history(sequelize, DataTypes);
  var orders_pick_up_service = _orders_pick_up_service(sequelize, DataTypes);
  var otps = _otps(sequelize, DataTypes);
  var platform_commissions = _platform_commissions(sequelize, DataTypes);
  var platform_feature_categories = _platform_feature_categories(sequelize, DataTypes);
  var platform_features = _platform_features(sequelize, DataTypes);
  var platform_insurances = _platform_insurances(sequelize, DataTypes);
  var platform_policies = _platform_policies(sequelize, DataTypes);
  var platform_property_types = _platform_property_types(sequelize, DataTypes);
  var platform_rules = _platform_rules(sequelize, DataTypes);
  var platform_services = _platform_services(sequelize, DataTypes);
  var platform_space_categories = _platform_space_categories(sequelize, DataTypes);
  var platform_space_category_items = _platform_space_category_items(sequelize, DataTypes);
  var platform_space_types = _platform_space_types(sequelize, DataTypes);
  var prices = _prices(sequelize, DataTypes);
  var promotions = _promotions(sequelize, DataTypes);
  var promotions_customer_buys = _promotions_customer_buys(sequelize, DataTypes);
  var promotions_customer_gets = _promotions_customer_gets(sequelize, DataTypes);
  var promotions_redeem = _promotions_redeem(sequelize, DataTypes);
  var providers = _providers(sequelize, DataTypes);
  var renewals = _renewals(sequelize, DataTypes);
  var site_addresses = _site_addresses(sequelize, DataTypes);
  var site_features = _site_features(sequelize, DataTypes);
  var site_policies = _site_policies(sequelize, DataTypes);
  var site_rules = _site_rules(sequelize, DataTypes);
  var sites = _sites(sequelize, DataTypes);
  var space_features = _space_features(sequelize, DataTypes);
  var spaces = _spaces(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bookings.belongsTo(booking_site_addresses, { as: "site_address", foreignKey: "site_address_id"});
  booking_site_addresses.hasMany(bookings, { as: "bookings", foreignKey: "site_address_id"});
  booking_site_features.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(booking_site_features, { as: "booking_site_features", foreignKey: "booking_id"});
  booking_space_features.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(booking_space_features, { as: "booking_space_features", foreignKey: "booking_id"});
  bookings_history.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(bookings_history, { as: "bookings_histories", foreignKey: "booking_id"});
  bookings_promotions.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(bookings_promotions, { as: "bookings_promotions", foreignKey: "booking_id"});
  orders.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(orders, { as: "orders", foreignKey: "booking_id"});
  orders_history.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(orders_history, { as: "orders_histories", foreignKey: "booking_id"});
  promotions_redeem.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(promotions_redeem, { as: "promotions_redeems", foreignKey: "booking_id"});
  renewals.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(renewals, { as: "renewals", foreignKey: "booking_id"});
  transactions.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(transactions, { as: "transactions", foreignKey: "booking_id"});
  bookings_promotions_customer_buys.belongsTo(bookings_promotions, { as: "booking_promotion", foreignKey: "booking_promotion_id"});
  bookings_promotions.hasMany(bookings_promotions_customer_buys, { as: "bookings_promotions_customer_buys", foreignKey: "booking_promotion_id"});
  bookings_promotions_customer_gets.belongsTo(bookings_promotions, { as: "booking_promotion", foreignKey: "booking_promotion_id"});
  bookings_promotions.hasMany(bookings_promotions_customer_gets, { as: "bookings_promotions_customer_gets", foreignKey: "booking_promotion_id"});
  promotions_redeem.belongsTo(bookings_promotions, { as: "booking_promotion", foreignKey: "booking_promotion_id"});
  bookings_promotions.hasMany(promotions_redeem, { as: "promotions_redeems", foreignKey: "booking_promotion_id"});
  renewals.belongsTo(bookings_promotions, { as: "booking_promotion", foreignKey: "booking_promotion_id"});
  bookings_promotions.hasMany(renewals, { as: "renewals", foreignKey: "booking_promotion_id"});
  booking_site_addresses.belongsTo(cities, { as: "city", foreignKey: "city_id"});
  cities.hasMany(booking_site_addresses, { as: "booking_site_addresses", foreignKey: "city_id"});
  districts.belongsTo(cities, { as: "city", foreignKey: "city_id"});
  cities.hasMany(districts, { as: "districts", foreignKey: "city_id"});
  site_addresses.belongsTo(cities, { as: "city", foreignKey: "city_id"});
  cities.hasMany(site_addresses, { as: "site_addresses", foreignKey: "city_id"});
  booking_site_addresses.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(booking_site_addresses, { as: "booking_site_addresses", foreignKey: "country_id"});
  cities.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(cities, { as: "cities", foreignKey: "country_id"});
  platform_insurances.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(platform_insurances, { as: "platform_insurances", foreignKey: "country_id"});
  platform_services.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(platform_services, { as: "platform_services", foreignKey: "country_id"});
  platform_space_types.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(platform_space_types, { as: "platform_space_types", foreignKey: "country_id"});
  site_addresses.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(site_addresses, { as: "site_addresses", foreignKey: "country_id"});
  users.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasOne(users, { as: "user", foreignKey: "customer_id"});
  booking_site_addresses.belongsTo(districts, { as: "district", foreignKey: "district_id"});
  districts.hasMany(booking_site_addresses, { as: "booking_site_addresses", foreignKey: "district_id"});
  landmarks.belongsTo(districts, { as: "district", foreignKey: "district_id"});
  districts.hasMany(landmarks, { as: "landmarks", foreignKey: "district_id"});
  site_addresses.belongsTo(districts, { as: "district", foreignKey: "district_id"});
  districts.hasMany(site_addresses, { as: "site_addresses", foreignKey: "district_id"});
  orders_history.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orders_history, { as: "orders_histories", foreignKey: "order_id"});
  transactions.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(transactions, { as: "transactions", foreignKey: "order_id"});
  orders.belongsTo(orders_pick_up_service, { as: "order_pick_up_service", foreignKey: "order_pick_up_service_id"});
  orders_pick_up_service.hasMany(orders, { as: "orders", foreignKey: "order_pick_up_service_id"});
  sites.belongsTo(platform_commissions, { as: "commission", foreignKey: "commission_id"});
  platform_commissions.hasMany(sites, { as: "sites", foreignKey: "commission_id"});
  platform_features.belongsTo(platform_feature_categories, { as: "category", foreignKey: "category_id"});
  platform_feature_categories.hasMany(platform_features, { as: "platform_features", foreignKey: "category_id"});
  booking_site_features.belongsTo(platform_features, { as: "feature", foreignKey: "feature_id"});
  platform_features.hasMany(booking_site_features, { as: "booking_site_features", foreignKey: "feature_id"});
  booking_space_features.belongsTo(platform_features, { as: "feature", foreignKey: "feature_id"});
  platform_features.hasMany(booking_space_features, { as: "booking_space_features", foreignKey: "feature_id"});
  site_features.belongsTo(platform_features, { as: "feature", foreignKey: "feature_id"});
  platform_features.hasMany(site_features, { as: "site_features", foreignKey: "feature_id"});
  space_features.belongsTo(platform_features, { as: "feature", foreignKey: "feature_id"});
  platform_features.hasMany(space_features, { as: "space_features", foreignKey: "feature_id"});
  bookings.belongsTo(platform_insurances, { as: "insurance", foreignKey: "insurance_id"});
  platform_insurances.hasMany(bookings, { as: "bookings", foreignKey: "insurance_id"});
  renewals.belongsTo(platform_insurances, { as: "insurance", foreignKey: "insurance_id"});
  platform_insurances.hasMany(renewals, { as: "renewals", foreignKey: "insurance_id"});
  site_policies.belongsTo(platform_policies, { as: "policy", foreignKey: "policy_id"});
  platform_policies.hasMany(site_policies, { as: "site_policies", foreignKey: "policy_id"});
  sites.belongsTo(platform_property_types, { as: "property_type", foreignKey: "property_type_id"});
  platform_property_types.hasMany(sites, { as: "sites", foreignKey: "property_type_id"});
  site_rules.belongsTo(platform_rules, { as: "rule", foreignKey: "rule_id"});
  platform_rules.hasMany(site_rules, { as: "site_rules", foreignKey: "rule_id"});
  orders_pick_up_service.belongsTo(platform_services, { as: "service", foreignKey: "service_id"});
  platform_services.hasMany(orders_pick_up_service, { as: "orders_pick_up_services", foreignKey: "service_id"});
  platform_space_category_items.belongsTo(platform_space_categories, { as: "category", foreignKey: "category_id"});
  platform_space_categories.hasMany(platform_space_category_items, { as: "platform_space_category_items", foreignKey: "category_id"});
  spaces.belongsTo(platform_space_types, { as: "platform_space_type", foreignKey: "platform_space_type_id"});
  platform_space_types.hasMany(spaces, { as: "spaces", foreignKey: "platform_space_type_id"});
  bookings_promotions.belongsTo(promotions, { as: "promotion", foreignKey: "promotion_id"});
  promotions.hasMany(bookings_promotions, { as: "bookings_promotions", foreignKey: "promotion_id"});
  promotions_customer_buys.belongsTo(promotions, { as: "promotion", foreignKey: "promotion_id"});
  promotions.hasMany(promotions_customer_buys, { as: "promotions_customer_buys", foreignKey: "promotion_id"});
  promotions_customer_gets.belongsTo(promotions, { as: "promotion", foreignKey: "promotion_id"});
  promotions.hasMany(promotions_customer_gets, { as: "promotions_customer_gets", foreignKey: "promotion_id"});
  promotions_redeem.belongsTo(promotions, { as: "promotion", foreignKey: "promotion_id"});
  promotions.hasMany(promotions_redeem, { as: "promotions_redeems", foreignKey: "promotion_id"});
  renewals.belongsTo(promotions, { as: "promotion", foreignKey: "promotion_id"});
  promotions.hasMany(renewals, { as: "renewals", foreignKey: "promotion_id"});
  users.belongsTo(providers, { as: "provider", foreignKey: "provider_id"});
  providers.hasOne(users, { as: "user", foreignKey: "provider_id"});
  promotions_redeem.belongsTo(renewals, { as: "renewal", foreignKey: "renewal_id"});
  renewals.hasMany(promotions_redeem, { as: "promotions_redeems", foreignKey: "renewal_id"});
  sites.belongsTo(site_addresses, { as: "address", foreignKey: "address_id"});
  site_addresses.hasMany(sites, { as: "sites", foreignKey: "address_id"});
  bookings.belongsTo(sites, { as: "site", foreignKey: "site_id"});
  sites.hasMany(bookings, { as: "bookings", foreignKey: "site_id"});
  site_features.belongsTo(sites, { as: "site", foreignKey: "site_id"});
  sites.hasMany(site_features, { as: "site_features", foreignKey: "site_id"});
  site_policies.belongsTo(sites, { as: "site", foreignKey: "site_id"});
  sites.hasMany(site_policies, { as: "site_policies", foreignKey: "site_id"});
  site_rules.belongsTo(sites, { as: "site", foreignKey: "site_id"});
  sites.hasMany(site_rules, { as: "site_rules", foreignKey: "site_id"});
  spaces.belongsTo(sites, { as: "site", foreignKey: "site_id"});
  sites.hasMany(spaces, { as: "spaces", foreignKey: "site_id"});
  bookings.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(bookings, { as: "bookings", foreignKey: "space_id"});
  calendars.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(calendars, { as: "calendars", foreignKey: "space_id"});
  prices.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(prices, { as: "prices", foreignKey: "space_id"});
  space_features.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(space_features, { as: "space_features", foreignKey: "space_id"});
  renewals.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
  transactions.hasMany(renewals, { as: "renewals", foreignKey: "transaction_id"});
  bookings.belongsTo(users, { as: "customer", foreignKey: "customer_id"});
  users.hasMany(bookings, { as: "bookings", foreignKey: "customer_id"});
  bookings.belongsTo(users, { as: "provider", foreignKey: "provider_id"});
  users.hasMany(bookings, { as: "provider_bookings", foreignKey: "provider_id"});
  bookings_history.belongsTo(users, { as: "changed_by_user", foreignKey: "changed_by"});
  users.hasMany(bookings_history, { as: "bookings_histories", foreignKey: "changed_by"});
  orders.belongsTo(users, { as: "customer", foreignKey: "customer_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  orders_history.belongsTo(users, { as: "changed_by_user", foreignKey: "changed_by"});
  users.hasMany(orders_history, { as: "orders_histories", foreignKey: "changed_by"});
  promotions_redeem.belongsTo(users, { as: "customer", foreignKey: "customer_id"});
  users.hasMany(promotions_redeem, { as: "promotions_redeems", foreignKey: "customer_id"});
  sites.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sites, { as: "sites", foreignKey: "user_id"});
  spaces.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(spaces, { as: "spaces", foreignKey: "user_id"});

  return {
    booking_site_addresses,
    booking_site_features,
    booking_space_features,
    bookings,
    bookings_history,
    bookings_promotions,
    bookings_promotions_customer_buys,
    bookings_promotions_customer_gets,
    calendars,
    cities,
    countries,
    customers,
    districts,
    ids_counter,
    landmarks,
    orders,
    orders_history,
    orders_pick_up_service,
    otps,
    platform_commissions,
    platform_feature_categories,
    platform_features,
    platform_insurances,
    platform_policies,
    platform_property_types,
    platform_rules,
    platform_services,
    platform_space_categories,
    platform_space_category_items,
    platform_space_types,
    prices,
    promotions,
    promotions_customer_buys,
    promotions_customer_gets,
    promotions_redeem,
    providers,
    renewals,
    site_addresses,
    site_features,
    site_policies,
    site_rules,
    sites,
    space_features,
    spaces,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
