const { model, Schema } = require("mongoose");

const schema = new Schema({
    GuildId: String,
    ChannelId: String,
    OwnerID : String,
})

module.exports = model("info-voice", schema);