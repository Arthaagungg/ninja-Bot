async function mongoose(client, color){
    const mongoose = require("mongoose");

    mongoose.set("strictQuery", false);
    mongoose.connection.on("connecting", async() => {
        console.log(`${color.bold.yellow(`[DATABASE]`)}` + `Mongoose is connecting...`.yellow);
    });

    mongoose.connect(process.env.MONGO_URL,{
        keepAlive: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000

    });

    mongoose.connection.on("connected", async() => {
        console.log(`${color.bold.green(`[DATABASE]`)}` + `Mongoose successully connedted!`.yellow);
    });
    mongoose.connection.on("disconnected", async() => {
        console.log(`${color.bold.green(`[DATABASE]`)}` + `Mongoose connedtion lost!`.yellow);
    });
    mongoose.connection.on("error", async(error) => {
        console.log(`${color.bold.green(`[DATABASE]`)}` + `Mongoose connedtion error!`.yellow + `\n${error.stack}`.bgRed);
    });
};

module.exports = {mongoose};