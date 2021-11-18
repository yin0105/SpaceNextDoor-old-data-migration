var DataTypes = require("sequelize").DataTypes;
var _active_admin_comments = require("./active_admin_comments");
var _addresses = require("./addresses");
var _admin_action_logs = require("./admin_action_logs");
var _admins = require("./admins");
var _ar_internal_metadata = require("./ar_internal_metadata");
var _bank_accounts = require("./bank_accounts");
var _booking_slots = require("./booking_slots");
var _channels = require("./channels");
var _contacts = require("./contacts");
var _double_entry_account_balances = require("./double_entry_account_balances");
var _double_entry_line_aggregates = require("./double_entry_line_aggregates");
var _double_entry_line_checks = require("./double_entry_line_checks");
var _double_entry_line_metadata = require("./double_entry_line_metadata");
var _double_entry_lines = require("./double_entry_lines");
var _find_out_requests = require("./find_out_requests");
var _images = require("./images");
var _messages = require("./messages");
var _notifications = require("./notifications");
var _orders = require("./orders");
var _payments = require("./payments");
var _payouts = require("./payouts");
var _ratings = require("./ratings");
var _schedules = require("./schedules");
var _schema_migrations = require("./schema_migrations");
var _service_fees = require("./service_fees");
var _spaces = require("./spaces");
var _storages = require("./storages");
var _user_avatars = require("./user_avatars");
var _user_favorite_space_relations = require("./user_favorite_space_relations");
var _user_notification_relations = require("./user_notification_relations");
var _user_payment_methods = require("./user_payment_methods");
var _users = require("./users");
var _verification_codes = require("./verification_codes");
var _versions = require("./versions");

function initModels(sequelize) {
  var active_admin_comments = _active_admin_comments(sequelize, DataTypes);
  var addresses = _addresses(sequelize, DataTypes);
  var admin_action_logs = _admin_action_logs(sequelize, DataTypes);
  var admins = _admins(sequelize, DataTypes);
  var ar_internal_metadata = _ar_internal_metadata(sequelize, DataTypes);
  var bank_accounts = _bank_accounts(sequelize, DataTypes);
  var booking_slots = _booking_slots(sequelize, DataTypes);
  var channels = _channels(sequelize, DataTypes);
  var contacts = _contacts(sequelize, DataTypes);
  var double_entry_account_balances = _double_entry_account_balances(sequelize, DataTypes);
  var double_entry_line_aggregates = _double_entry_line_aggregates(sequelize, DataTypes);
  var double_entry_line_checks = _double_entry_line_checks(sequelize, DataTypes);
  var double_entry_line_metadata = _double_entry_line_metadata(sequelize, DataTypes);
  var double_entry_lines = _double_entry_lines(sequelize, DataTypes);
  var find_out_requests = _find_out_requests(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var payouts = _payouts(sequelize, DataTypes);
  var ratings = _ratings(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var service_fees = _service_fees(sequelize, DataTypes);
  var spaces = _spaces(sequelize, DataTypes);
  var storages = _storages(sequelize, DataTypes);
  var user_avatars = _user_avatars(sequelize, DataTypes);
  var user_favorite_space_relations = _user_favorite_space_relations(sequelize, DataTypes);
  var user_notification_relations = _user_notification_relations(sequelize, DataTypes);
  var user_payment_methods = _user_payment_methods(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var verification_codes = _verification_codes(sequelize, DataTypes);
  var versions = _versions(sequelize, DataTypes);

  admin_action_logs.belongsTo(admins, { as: "admin", foreignKey: "admin_id"});
  admins.hasMany(admin_action_logs, { as: "admin_action_logs", foreignKey: "admin_id"});
  notifications.belongsTo(admins, { as: "admin", foreignKey: "admin_id"});
  admins.hasMany(notifications, { as: "notifications", foreignKey: "admin_id"});
  payments.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(payments, { as: "payments", foreignKey: "order_id"});
  ratings.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(ratings, { as: "ratings", foreignKey: "order_id"});
  service_fees.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(service_fees, { as: "service_fees", foreignKey: "order_id"});
  booking_slots.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(booking_slots, { as: "booking_slots", foreignKey: "space_id"});
  orders.belongsTo(spaces, { as: "space", foreignKey: "space_id"});
  spaces.hasMany(orders, { as: "orders", foreignKey: "space_id"});
  bank_accounts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(bank_accounts, { as: "bank_accounts", foreignKey: "user_id"});
  channels.belongsTo(users, { as: "guest", foreignKey: "guest_id"});
  users.hasMany(channels, { as: "channels", foreignKey: "guest_id"});
  channels.belongsTo(users, { as: "host", foreignKey: "host_id"});
  users.hasMany(channels, { as: "host_channels", foreignKey: "host_id"});
  contacts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(contacts, { as: "contacts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "host", foreignKey: "host_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "host_id"});
  orders.belongsTo(users, { as: "guest", foreignKey: "guest_id"});
  users.hasMany(orders, { as: "guest_orders", foreignKey: "guest_id"});
  payments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(payments, { as: "payments", foreignKey: "user_id"});
  ratings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(ratings, { as: "ratings", foreignKey: "user_id"});
  spaces.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(spaces, { as: "spaces", foreignKey: "user_id"});
  user_avatars.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_avatars, { as: "user_avatars", foreignKey: "user_id"});
  user_payment_methods.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_payment_methods, { as: "user_payment_methods", foreignKey: "user_id"});
  spaces.hasMany(images, { as: "images", foreignKey: "imageable_id"});
  spaces.hasOne(storages, { as: "storages", foreignKey: "id", constraints: false});
  spaces.hasOne(addresses, { as: "addresses", foreignKey: "addressable_id", constraints: false});
  verification_codes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(verification_codes, { as: "verification_codes", foreignKey: "user_id"});

  return {
    active_admin_comments,
    addresses,
    admin_action_logs,
    admins,
    ar_internal_metadata,
    bank_accounts,
    booking_slots,
    channels,
    contacts,
    double_entry_account_balances,
    double_entry_line_aggregates,
    double_entry_line_checks,
    double_entry_line_metadata,
    double_entry_lines,
    find_out_requests,
    images,
    messages,
    notifications,
    orders,
    payments,
    payouts,
    ratings,
    schedules,
    schema_migrations,
    service_fees,
    spaces,
    storages,
    user_avatars,
    user_favorite_space_relations,
    user_notification_relations,
    user_payment_methods,
    users,
    verification_codes,
    versions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;