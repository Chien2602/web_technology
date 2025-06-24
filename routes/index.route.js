const auth = require("./auth.route");
const user = require("./user.route");
const product = require("./product.route");
const role = require("./role.route");
const cart = require("./cart.route");
const order = require("./order.route");
const category = require("./category.route");
const cloudinary = require("./cloudinary.route");

const index = (app) => {
    app.use("/auth", auth);
    app.use("/users", user);
    app.use("/products", product);
    app.use("/categories", category);
    app.use("/roles", role);
    app.use("/carts", cart);
    app.use("/orders", order);
    app.use("/cloudinary", cloudinary);
};

module.exports = {index};