

import { gptPrompt } from "./shared/openai.js";
import { ask, say } from "./shared/cli.js";

main();

async function main() {
  say("Hello, GPT!");

  const subject = await ask("Pick your favorite subject (it can be ANYTHING)?");
  say("");

  const prompt =
    `The subject I chose is ${subject} and I want you to make a lightbulb joke about that subject.`;

  const limerick = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${limerick}\n"""`);
}
