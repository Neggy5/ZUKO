const { makeid } = require('./gen-id');
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();

    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                
                if (qr) await res.end(await QRCode.toBuffer(qr));
                
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    
                    const randomText = generateRandomText();
                    
                    try {
                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let md = "ZUKO-MD~" + string_session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let desc = `Q𝚛 𝙲𝚘𝚍𝚎 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢
𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝐙𝐔𝐊𝐎-𝐌𝐃
______________________________________
╔════◇
║ 『 𝚆𝙾𝚆 𝚈𝙾𝚄'𝚅𝙴 𝙲𝙷𝙾𝚂𝙴𝙽 𝐙𝐔𝐊𝐎-𝐌𝐃』
║ �𝚘𝚞 𝙷𝚊𝚟𝚎 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍 𝚝𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝚂𝚝𝚎𝚙 �𝚘 𝙳𝚎𝚙𝚕𝚘𝚢 𝚊 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝙱𝚘𝚝.
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ 𝚈𝚝𝚞𝚋𝚎: https://youtube.com/@zukotech
║❒ 𝙾𝚠𝚗𝚎𝚛: https://wa.me/27810971476
║❒ 𝚁𝚎𝚙𝚘: https://github.com/Neggy5/ZUKO-MD.git
║❒ 𝚆𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p
║❒ 𝚃𝙷𝙰𝙽𝙺𝚂 𝚃𝙾: ZUKO👻
╚════════════════════════╝
_____________________________________

_𝙳𝚘𝚗'𝚝 𝙵𝚘𝚛𝚐𝚎𝚝 𝚃𝚘 𝙶𝚒𝚟𝚎 𝚂𝚝𝚊𝚛 𝚃𝚘 𝙼𝚢 𝚁𝚎𝚙𝚘"

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ZUKO ©️*`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: " 𝖇𝖔𝖙 𝖈𝖔𝖓𝖓𝖊𝖈𝖙𝖊𝖉",
                                    thumbnailUrl: "https://files.catbox.moe/zmhz85.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VbAfF6f1dAw7hJidqS0i",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: code });
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                        let errorDesc = `*An error occurred while processing your request:*
                        
Error: ${e.toString()}

Please try again or contact support.`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: errorDesc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "Error Occurred",
                                    thumbnailUrl: "https://files.catbox.moe/wpt5p6.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: ddd });
                    }
                    
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable", error: err.toString() });
            }
        }
    }
   
    return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;                	
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect,
                    qr
                } = s;
              if (qr) await res.end(await QRCode.toBuffer(qr));
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    const randomText = generateRandomText();
                    try {
                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let md = "ZUKO-MD~" + string_session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        let desc = `Q𝚛 𝙲𝚘𝚍𝚎 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢
𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝐙𝐔𝐊𝐎-𝐌𝐃
______________________________________
╔════◇
║ 『 𝚆𝙾𝚆 𝚈𝙾𝚄'𝚅𝙴 𝙲𝙷𝙾𝚂𝙴𝙽 𝐙𝐔𝐊𝐎-𝐌𝐃』
║ 𝚈𝚘𝚞 𝙷𝚊𝚟𝚎 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍 𝚝𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝚂𝚝𝚎𝚙 𝚝𝚘 𝙳𝚎𝚙𝚕𝚘𝚢 𝚊 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝙱𝚘𝚝.
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ 𝚈𝚝𝚞𝚋𝚎: https://youtube.com/@zukotech
║❒ 𝙾𝚠𝚗𝚎𝚛: https://wa.me/27810971476
║❒ 𝚁𝚎𝚙𝚘: https://github.com/Neggy5/ZUKO-MD.git
║❒ 𝚆𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p
║❒ 𝚃𝙷𝙰𝙽𝙺𝚂 𝚃𝙾: ZUKO👻
╚════════════════════════╝
_____________________________________

_𝙳𝚘𝚗'𝚝 𝙵𝚘𝚛𝚐𝚎𝚝 𝚃𝚘 𝙶𝚒𝚟𝚎 𝚂𝚝𝚊𝚛 𝚃𝚘 𝙼𝚢 𝚁𝚎𝚙𝚘"

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ZUKO ©️*`;
                        await sock.sendMessage(sock.user.id, {
text: desc,
contextInfo: {
externalAdReply: {
title: " 𝖇𝖔𝖙 𝖈𝖔𝖓𝖓𝖊𝖈𝖙𝖊𝖉",
thumbnailUrl: "https://files.catbox.moe/zmhz85.jpg",
sourceUrl: "https://whatsapp.com/channel/0029VbAfF6f1dAw7hJidqS0i",
mediaType: 1,
renderLargerThumbnail: true
}  
}
},
{quoted:code })
                    } catch (e) {
                            let ddd = sock.sendMessage(sock.user.id, { text: e });
                            let desc = `Q𝚛 𝙲𝚘𝚍𝚎 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢
𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝐙𝐔𝐊𝐎-𝐌𝐃
______________________________________
╔════◇
║ 『 𝚆𝙾𝚆 𝚈𝙾𝚄'𝚅𝙴 𝙲𝙷𝙾𝚂𝙴𝙽 𝐙𝐔𝐊𝐎-𝐌𝐃』
║ 𝚈𝚘𝚞 𝙷𝚊𝚟𝚎 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍 𝚝𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝚂𝚝𝚎𝚙 𝚝𝚘 𝙳𝚎𝚙𝚕𝚘𝚢 𝚊 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝙱𝚘𝚝.
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ 𝚈𝚝𝚞𝚋𝚎: https://youtube.com/@zukotech
║❒ 𝙾𝚠𝚗𝚎𝚛: https://wa.me/27810971476
║❒ 𝚁𝚎𝚙𝚘: https://github.com/Neggy5/ZUKO-MD.git
║❒ 𝚆𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p
║❒ 𝚃𝙷𝙰𝙽𝙺𝚂 𝚃𝙾: ZUKO👻
╚════════════════════════╝
_____________________________________

_𝙳𝚘𝚗'𝚝 𝙵𝚘𝚛𝚐𝚎𝚝 𝚃𝚘 𝙶𝚒𝚟𝚎 𝚂𝚝𝚊𝚛 𝚃𝚘 𝙼𝚢 𝚁𝚎𝚙𝚘"

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ZUKO ©️*`;
                            await sock.sendMessage(sock.user.id, {
text: desc,
contextInfo: {
externalAdReply: {
title: "𝐙𝐔𝐊𝐎-𝐌𝐃",
thumbnailUrl: "https://files.catbox.moe/wpt5p6.jpg",
sourceUrl: "https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p",
mediaType: 1,
renderLargerThumbnail: true
}  
}
},
{quoted:code })
                    } catch (e) {
                            let ddd = sock.sendMessage(sock.user.id, { text: e });
                            let desc = `*Don't Share with anyone this code use for deploying 𝐙𝐔𝐊𝐎-𝐌𝐃 1.0.0*\n\n ◦ *Github:* https://github.com/Neggy5/ZUKO-MD.git`;
                            await sock.sendMessage(sock.user.id, {
text: desc,
contextInfo: {
externalAdReply: {
title: "spirity-xmd",
thumbnailUrl: "https://files.catbox.moe/wpt5p6.jpg",
sourceUrl: "https://whatsapp.com/channel/0029Vb5iurcFsn0g8SxxBs0p",
mediaType: 2,
renderLargerThumbnail: true,
showAdAttribution: true
}  
}
},
{quoted:ddd })
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
   return await GIFTED_MD_PAIR_CODE();
});/*
setInterval(() => {
    console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
    process.exit();
}, 180000); //30min*/
module.exports = router;
