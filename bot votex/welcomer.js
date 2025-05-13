// welcomer.js

const { EmbedBuilder } = require('discord.js');

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.get("1267463260660043788"); // جایگزین با آیدی چنل خودت

  if (!channel) {
    console.log("❌ چنل ولکام پیدا نشد");
    return;
  }

  const embed = new EmbedBuilder()
    .setColor('Purple')
    .setTitle('<a:arrow2:1338069769018150964>New Member<a:arrowleft23:1338069727523901480>')
    .setThumbnail(member.user.displayAvatarURL({ size: 1024 }))
    .setDescription(`<a:Crown:1338067243329785931>سلام ${member.user.username}  به سرور ${member.guild.name} خوش امدی

<a:Read_The_Rules74:1338068187337588846>  ازبخش <#1267464722199085223> قوانین را بخون

<:discordboost:1338068062909370430>چنل های زیر را بخون

<#1267463980767514625>
<#1267470088433303663>
<#1336779365593120822>

اگر هم کاری داشتی تیم استف همیشه با حوصله 
و صبر به شما کمک میکند
<a:Verify:1338067617335869511> 
<#1267470915944321190><a:Crown:1338067243329785931>`);

  try {
    await channel.send({
      content: `<@${member.user.id}>`, // فقط تگ کاربر در متن پیام
      embeds: [embed],
    });
    console.log("✅ پیام خوش‌آمد ارسال شد.");
  } catch (error) {
    console.error("❌ خطا در ارسال پیام ولکام:", error);
  }
};

