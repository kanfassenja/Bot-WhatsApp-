const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const nodemailer = require('nodemailer');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log("Scan QR Code ini untuk login:");
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot WhatsApp siap!');
    
    let group_id = process.env.WA_GROUP_ID; // ID Grup dari ENV
    let message = "📩 Email Baru! \nSubject: Contoh Email\n\nIni adalah isi email.";

    client.getChats().then(chats => {
        let group = chats.find(chat => chat.id._serialized === group_id);
        if (group) {
            client.sendMessage(group.id._serialized, message);
        }
    });
});

client.initialize();
