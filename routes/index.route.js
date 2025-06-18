const auth = require("./auth.route");
const user = require("./user.route");
const product = require("./product.route");

module.exports.index = (app) => {
  app.use("/auth", auth);
  app.use("/users", user);
  app.use("/products", product);
}