import { SportEventConsoleProgram } from "./classes/console-classes.js";

async function main() {
  const program = new SportEventConsoleProgram("sport.json");
  await program.startMenuLoop();
}

main();
