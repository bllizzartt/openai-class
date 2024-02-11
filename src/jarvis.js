// import { gptPrompt } from "./shared/openai.js";
// import { ask, say } from "./shared/cli.js";

// // function that pulls the time and inserts it into the intro greeting.
// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 18) return "Good afternoon";
//   return "Good evening";
// }

// main();

// async function main() {
//   say(`${getGreeting()}, my name is Jarvis.`);
//   const context = [];
// //   let playing = true;
// //   const name = "Cat Galaxy";
//   const user = {};
//   const appt = "Doctor appointment for physical therapy @ 2pm on 2/20/24 with Dr. Fen"
//   const thesis = "Thesis 2 class @ 4pm on 2/13/24 with Ayo"

//   user.name = await ask("Who am I speaking with?");
//   user.question = await ask("What can I help you with today?");

//   say("");

//     const prompt = `
//   This is question asked by a human and you must respond as a personal assistant called Jarvis.
//   The users question is a ${user.question} named ${user.name}.
 
//   Recently: ${context.slice(-3).join(" ")}

//   Respond as a professional for the subject depending on what they are asking.
//   Be thorough but keep your responses short and help guide your human.
//   At the end make sure to remind chase about ${appt} and ${thesis}.
  

//   `
 

//   ;

//     const response = await gptPrompt(prompt, {
//       max_tokens: 128,
//       temperature: 0.1,
//     });
//     context.push(response);
//     say(`\n${response}\n`);


//     user.finalize = await ask("Is there anything else I can help you with today?");
  

//     const prompt2 = `
//     This is question asked by a human and you must respond as a personal assistant called Jarvis.
//     The users question is a ending question.
   
//     Recently: ${context.slice(-3).join(" ")}
  
//     Respond as a professional for the subject depending on what they are asking.
//     Be thorough but keep your responses short and help guide your human.
//     At the end make sure to remind chase about ${appt} and ${thesis}.
    
  
//     `

//     const response2 = await gptPrompt(prompt2, {
//       max_tokens: 128,
//       temperature: 0.1,
//     });
//     context.push(response);
//     say(`\n${response}\n`);

//     say(`Have a ${getGreeting()}.`);

//   }


// after initial code above ^^^^^^ I then had chat gpt optimize it and added some personal touches to finalize it

import { gptPrompt } from "./shared/openai.js";
import { ask, say } from "./shared/cli.js";

// Function that pulls the time and inserts it into the intro greeting.
function getGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good day";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";
  return greeting;
}

async function main() {
  const greeting = getGreeting();
  say(`${greeting}, my name is Jarvis.`);
  const user = {};
  const appt = "Doctor appointment for physical therapy @ 2pm on February 20th with Dr. Fen";
  const thesis = "Thesis 2 class @ 4pm on February 13th with Ayo";

  user.name = await ask("Who am I speaking with?");
  say(`Hello ${user.name}, it's a pleasure to assist you today. How can I help?`);

  user.question = await ask("");
  const context = [];

  const prompt = `
  Respond as Jarvis, a personal assistant.
  User's question: ${user.question}
  User's name: ${user.name}
  Recent interactions: ${context.slice(-3).join(" ")}

  Provide a professional, yet personal and engaging response. Tailor your guidance specifically to the user's needs.
  `;

  const response = await gptPrompt(prompt, { max_tokens: 128, temperature: 0.5 });
  context.push(response);
  say(`\n${response}\n`);

  say(`Just a friendly reminder, ${user.name}, you have a ${appt}. Also, don't forget your ${thesis}.`);
  say(`----------------------------------------------------------------------------`);
  user.finalize = await ask("Is there anything else I can assist you with today?");

  const prompt2 = `
    This is question asked by a human and you must respond as a personal assistant called Jarvis.
    The users question is a ending question.
   
    Recently: ${context.slice(-3).join(" ")}
  
    Respond as a professional for the subject depending on what they are asking.
    Be thorough but keep your responses short and help guide your human.
    `
    const response2 = await gptPrompt(prompt2, {
      max_tokens: 128,
      temperature: 0.1,
    });
    context.push(response2);
    say(`\n${response}\n`);


  say(`----------------------------------------------------------------------------`);
  // Adjust the response based on the final question or request for assistance.
  const finalResponse = `It's been great helping you today, ${user.name}. Remember, I'm here whenever you need assistance. Have a ${greeting.toLowerCase()}.`;
  say(`----------------------------------------------------------------------------`);
  say(finalResponse);
}

main();
