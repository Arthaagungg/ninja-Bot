const { model, Schema } = require("mongoose");

const schema = new Schema({
    GuildId: String,
    Prefix: String
})

module.exports = model("prefix-guild", schema);