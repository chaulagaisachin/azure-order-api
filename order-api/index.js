require('dotenv').config();

const { ServiceBusClient } = require("@azure/service-bus");

const serviceBusClient = new ServiceBusClient(process.env.accountKey);
const sender = serviceBusClient.createSender("hello");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const number = (req.query.number || (req.body && req.body.number));
    await sender.sendMessages({"body" : number});
    const responseMessage = number
        ? "Hello, " + number + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a number in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
 }
