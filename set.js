const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VMazBFaFlmYzN1WWVLTlBXSVpNc3dvVURUYWlhK1dSK3lQU1lCUERIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGdSdmV3dmlidXh2UURjL0Y4STI0QWNLcWlIQWl3aEg0dTk1MldCaWlVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSXJuUWlWWnFQckhxR2xVZzNTdk5wQldKQTBYVXRwaytOKzVJVTkrRkZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSdXh4YVFjN3h2RVh4enN1bVV5VG5heUJ5aGd0SUxjenFGSkpPNXJtK3hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNERWhsZ1prYzE0Q0FuVWdtSXY3ekVDOGNWZXY2NWdRWkF4aHZQdVRpVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc5R3dIRGlQaHpMQmJSOFRxalR4N0tNa2NsbzVoNjJvZ0lBZGRwRVcxbGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNExHZWh1NGg3b2tzeTZSY0pBWHFETGl5Ukdmd0N1YWl0ZUlKUzlYSmRtbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0ZLaVFJVmV0c3RhS2d4d3pVVXBkNHlSYVFHalhaaDJERVVWeUsvL3dtTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFObkJMOVU3SW9mUk5DVHpnTkJmVFI0VWl0NUJNMDhxMlN0alhGYUI0VVFVKzZNY3JXNGhKU29uYUk0V2d6a2hWbWR2QWlqcXR1TG5SNjErUmNwdWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJmdkZXNmpIU0VpbEppNkxzcmpyc3NvSGdQSzRCUjRoVlUvM0o1SWZNVldvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnSlFlQ2ZjVFFDcUJiNEdvV1dPajlnIiwicGhvbmVJZCI6ImNmZGQyNDdjLTZjYTMtNGMxMy1iZTMzLWI3YjdiY2E1MTNhNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzc2s4UjRiMlBsMEpiMnRUZFZWdnNMN01HVjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVFSSDdEZGVQd1lkWGZHTmlRTU9qeUk4MTlvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZETFdBNTgxIiwibWUiOnsiaWQiOiIyMzQ4MTY4MDAwOTM5OjgyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKRzFoNnNCRU4rM29MUUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJGNEhyMDRIVjhkZFM4NWNmM3RZWWhSZEM0SW55UU52UGdEWldNd2RodzNFPSIsImFjY291bnRTaWduYXR1cmUiOiJhQ0pNakRkdTdLc0J2RWVJM3o3WXBVbGkrNnE3RjJSRVdLWWJwU3YyOFNsUSs3NnFxaUtLTHJtWEdZSjRuUkNNbWtIV05ZQVdzM2E1SWdlYTI2aW5Ddz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOXlROUZjdEQrTVgwTUFSeEdHY3JzVlhmUjZjcnluTDUwd2ZOL250VlQxVmVvbUkxYjIyNGxvd280T2RlTXFqejhWZVNycERYQTZiY29pZnlqUkJsaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTY4MDAwOTM5OjgyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJlQjY5T0IxZkhYVXZPWEg5N1dHSVVYUXVDSjhrRGJ6NEEyVmpNSFljTngifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAxOTYwNzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTytOIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "¥Alex™",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348168000939",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

