import { gptPrompt } from "./shared/openai.js";
import { ask, say } from "./shared/cli.js";


main();

async function main() {
  say("Logging in...Welcome, my name is Jarvis.");

  const context = [];
//   let playing = true;
//   const name = "Cat Galaxy";
  const player = {};
  player.name = await ask("Who am I speaking with?");
  player.question = await ask("What can I help you with today?");

  say("");

    const prompt = `
  This is question asked by a human and you must respond as a personal assistant called Jarvis.
  The users question is a ${player.question} named ${player.name}.
 
  Recently: ${context.slice(-3).join(" ")}

  Respond as a professional for the subject depending on what they are asking.
  Be thorough but keep you responses short and help guide your human.
  
  `;

    const response = await gptPrompt(prompt, {
      max_tokens: 128,
      temperature: 0.1,
    });
    context.push(response);
    say(`\n${response}\n`);
  }
