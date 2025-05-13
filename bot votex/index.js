const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel],
});

// ====== ⚙️ آیدی‌های مورد نیاز (تغییر بده) ======
const GUILD_ID = '1267457929813164083'; // آیدی سرور
const VOICE_CHANNEL_ID = '1371877379542356179'; // آیدی چنل ویس
const TEXT_CHANNEL_ID = '1371877778688839760';  // آیدی چنل متنی برای آمار

let statsMessage; // پیامی که قراره ادیت بشه

client.on('ready', async () => {
    console.log('✅ Bot is online');

    // تنظیم استاتوس
    client.user.setActivity({
        name: 'Vortex shop : 138 🌍',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/discord',
    });

    const guild = await client.guilds.fetch(GUILD_ID);
    const voiceChannel = guild.channels.cache.get(VOICE_CHANNEL_ID);
    const textChannel = guild.channels.cache.get(TEXT_CHANNEL_ID);

    // نشستن توی چنل ویس
    if (voiceChannel && voiceChannel.isVoiceBased()) {
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        console.log('🎧 Joined voice channel.');
    } else {
        console.error('❌ Voice channel not found or invalid.');
    }

    // ارسال پیام اولیه آمار
    if (textChannel && textChannel.isTextBased()) {
        statsMessage = await textChannel.send('📊 در حال بارگذاری آمار...');
        updateStats(guild);
        setInterval(() => updateStats(guild), 60_000); // بروزرسانی هر 60 ثانیه
    } else {
        console.error('❌ Text channel not found or invalid.');
    }
});

// تابع بروزرسانی آمار
function updateStats(guild) {
    const total = guild.memberCount;
    const online = guild.members.cache.filter(m => m.presence?.status === 'online').size;
    const idle = guild.members.cache.filter(m => m.presence?.status === 'idle').size;
    const dnd = guild.members.cache.filter(m => m.presence?.status === 'dnd').size;

    const content = `📊 **آمار سرور:**
👥 کل اعضا: **${total}**
🟢 آنلاین: **${online}**
🌙 آیدل: **${idle}**
⛔ مزاحم نشو: **${dnd}**`;

    if (statsMessage) statsMessage.edit(content).catch(console.error);
}

// ورود عضو جدید → اجرا شدن welcomer
client.on('guildMemberAdd', (member) => {
    require('./welcomer')(client, member);
});

client.login("MTM3MTc4NDc4MDU0NjU3MjI4OQ.GJKeqq.W3vodP1_9w5mS0DGWcS6F-SU3-hK56APanTqFo");
