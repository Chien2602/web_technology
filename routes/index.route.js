const auth = require("./auth.route");
const user = require("./user.route");
const product = require("./product.route");
const role = require("./role.route");
const cart = require("./cart.route");
const order = require("./order.route");

module.exports.index = (app) => {
  app.use("/auth", auth);
  app.use("/users", user);
  app.use("/products", product);
  app.use("/roles", role);
  app.use("/carts", cart);
  app.use("/orders", order);
};