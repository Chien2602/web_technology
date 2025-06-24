const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definitions: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "3.0.0",
            description: "API Documentation",
        },
        servers: [{
            url: `http://localhost:${process.env.PORT}/`,
        }]
    },
    api: ["./routes/*"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerSpec };