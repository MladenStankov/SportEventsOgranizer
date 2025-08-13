import { ConsoleProgram } from "./classes/console.classes.js";
import { SportEvent } from "./classes/sport.classes.js";

async function main() {
  const program = new ConsoleProgram<SportEvent>("organizer.json");
}

main();
