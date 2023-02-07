const { model, Schema } = require("mongoose");

const schema = new Schema({
    GuildId: String,
    Parent: String,
    CreateVoice: String,
})

module.exports = model("voice-channel", schema);