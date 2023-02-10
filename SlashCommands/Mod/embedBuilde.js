const dc = require('discord.js');
const { Modal, TextInputComponent, ShowModal } = require("discord-modals");
module.exports = {
    name: "embed-create",
    description: "Command membuat embed.",
    type: 1,


    run: async (client, interaction) => {
        const modal = new dc.ModalBuilder()
            .setCustomId("embed-modals")
            .setTitle(`Membuat Embed`);

        const Modalstitle = new dc.TextInputBuilder()
            .setCustomId("InputTitle")
            .setLabel(`Title Embed`)
            .setPlaceholder("Masukan Title Embed.")
            .setRequired(true)
            .setStyle(dc.TextInputStyle.Short);
        const ModalsDescription = new dc.TextInputBuilder()
            .setCustomId("InputDesc")
            .setLabel(`Description Embed`)
            .setPlaceholder("Masukan Desc Embed")
            .setRequired(true)
            .setStyle(dc.TextInputStyle.Paragraph);
        const ModalsColor = new dc.TextInputBuilder()
            .setCustomId("InputColor")
            .setLabel(`Color Embed`)
            .setPlaceholder("Masukan Color Embed")
            .setRequired(false)
            .setStyle(dc.TextInputStyle.Short);
        const ModalsImage = new dc.TextInputBuilder()
            .setCustomId("InputImage")
            .setLabel(`Image Link`)
            .setPlaceholder("Masukan Link Image / Default Kosong")
            .setRequired(false)
            .setStyle(dc.TextInputStyle.Short);
        const ModalsThumnail = new dc.TextInputBuilder()
            .setCustomId("InputThumnail")
            .setLabel(`Thumnail Link`)
            .setPlaceholder("Masukan Link Thumnail / guild / Default Kosong")
            .setRequired(false)
            .setStyle(dc.TextInputStyle.Short);

        const ValueTitle = new dc.ActionRowBuilder().addComponents(Modalstitle);
        const ValueDesc = new dc.ActionRowBuilder().addComponents(ModalsDescription);
        const ValueColor = new dc.ActionRowBuilder().addComponents(ModalsColor);
        const ValueImage = new dc.ActionRowBuilder().addComponents(ModalsImage);
        const ValueThumnail = new dc.ActionRowBuilder().addComponents(ModalsThumnail);
        modal.addComponents(ValueTitle, ValueDesc, ValueColor, ValueImage, ValueThumnail);

        await interaction.showModal(modal);
    }
};