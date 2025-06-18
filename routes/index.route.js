const auth = require("./auth.route");
const user = require("./user.route");
const product = require("./product.route");
const role = require("./role.route");

module.exports.index = (app) => {
  app.use("/auth", auth);
  app.use("/users", user);
  app.use("/products", product);
  app.use("/roles", role);
};