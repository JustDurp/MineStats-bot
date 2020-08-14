const discord = require("discord.js")
const fs = require("fs")

const fetch = require(`node-fetch`)

module.exports.run = async (bot, message, args, owner) => {


    if(!message.author.id == "281348487340359681") return;

        message.delete();    

    const clean = text => {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;

      }

      if(message.author.id == "281348487340359681") {

      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(clean(evaled));

        console.log(clean(evaled), {code:"x1"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }

    }


}

module.exports.help = {
	name: "eval",
	aliases: ["string"],
	description: "Evals a command",
	usage: "+eval <string>",
	category: "developer",
};

