import readline from "readline";
import {
  IConsoleProgram,
  IEventConsoleProgram,
  ISportEventConsoleProgram,
  ParticipantForEvent,
} from "../interfaces/console-interfaces.js";
import {
  IEvent,
  IEventOrganizer,
  IParticipant,
} from "../interfaces/event-interfaces.js";
import { SportEvent, Player } from "./sport-classes.js";
import { Event, EventOrganizer, Participant } from "./event-classes.js";
import { SkillLevelType, SportType } from "../types/sport-types.js";

export class ConsoleProgram implements IConsoleProgram {
  rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor(public JSONFilePath: string) {}

  async askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}

export abstract class EventConsoleProgram<
    TEvent extends IEvent,
    TParticipant extends IParticipant = ParticipantForEvent<TEvent>,
    TEventOrganizer extends IEventOrganizer<
      TEvent,
      TParticipant
    > = IEventOrganizer<TEvent, TParticipant>,
  >
  extends ConsoleProgram
  implements IEventConsoleProgram<TEvent, TParticipant, TEventOrganizer>
{
  eventOrganizer: TEventOrganizer = {} as TEventOrganizer;

  constructor(JSONFilePath: string) {
    super(JSONFilePath);
  }
  loadData(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveData(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createParticipant(): Promise<Participant | void> {
    const firstName = await super.askQuestion(
      "Enter participant's first name: "
    );
    const lastName = await super.askQuestion("Enter participant's last name: ");

    return new Participant(firstName, lastName);
  }
  async deleteParticipant(): Promise<void> {
    const participantId = await super.askQuestion(
      "Enter participant ID to delete: "
    );
    this.eventOrganizer.deleteParticipant(Number(participantId));
  }
  async addParticipantToEvent(): Promise<{
    event: TEvent;
    participant: TParticipant;
  } | void> {
    const participantId = await super.askQuestion(
      "Enter participant ID to add: "
    );
    const eventId = await super.askQuestion("Enter event ID to add to: ");

    const event = this.eventOrganizer.events.find(
      (e) => e.id === Number(eventId)
    );
    if (!event) {
      throw new Error("Event not found");
    }

    const participant = this.eventOrganizer.participants.find(
      (p) => p.id === Number(participantId)
    );
    if (!participant) {
      throw new Error("Participant not found");
    }

    return { event: event, participant: participant };
  }
  async removeParticipantFromEvent(): Promise<void> {
    const participantId = await super.askQuestion(
      "Enter participant ID to remove: "
    );
    const eventId = await super.askQuestion("Enter event ID to remove from: ");
    this.eventOrganizer.removeParticipantFromEvent(
      Number(participantId),
      Number(eventId)
    );
  }
  async createEvent(): Promise<Event | void> {
    const date = await super.askQuestion("Enter event date (YYYY-MM-DD): ");
    const duration = await super.askQuestion(
      "Enter event duration (minutes): "
    );
    const maxParticipants = await super.askQuestion("Enter max participants: ");

    return new Event(new Date(date), Number(duration), Number(maxParticipants));
  }

  async startMenuLoop(): Promise<void> {
    // this.loadData();
    while (true) {
      console.log("\n=== Event Management System ===");
      console.log("1. Create Event");
      console.log("2. Create Participant");
      console.log("3. Delete Participant");
      console.log("4. Add Participant to Event");
      console.log("5. Remove Participant from Event");
      console.log("6. Print Participants Info");
      console.log("7. Print Events History");
      console.log("8. Exit");
      console.log("===========================");

      const choice = await this.askQuestion("Enter your choice (1-8): ");

      try {
        switch (choice) {
          case "1":
            await this.createEvent();
            break;
          case "2":
            await this.createParticipant();
            break;
          case "3":
            await this.deleteParticipant();
            break;
          case "4":
            await this.addParticipantToEvent();
            break;
          case "5":
            await this.removeParticipantFromEvent();
            break;
          case "6":
            this.eventOrganizer.printParticipantsList();
            break;
          case "7":
            this.eventOrganizer.printEventsHistory();
            break;
          case "8":
            console.log("Goodbye!");
            this.rl.close();
            return;
          default:
            console.log("Invalid choice. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : error);
        await this.askQuestion("\nPress Enter to continue...");
      }
      // this.saveData();
    }
  }
}

export class SportEventConsoleProgram
  extends EventConsoleProgram<SportEvent, Player>
  implements ISportEventConsoleProgram
{
  eventOrganizer: IEventOrganizer<SportEvent, Player> = new EventOrganizer<
    SportEvent,
    Player
  >([], []);

  constructor(public JSONFilePath: string) {
    super(JSONFilePath);
  }
  loadData(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveData(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createParticipant(): Promise<Participant | void> {
    const participant = await super.createParticipant();
    if (!participant) {
      throw new Error(
        "Unexpected error with creating participant in SportEventConsoleProgram"
      );
    }

    const sportSkills = new Map<SportType, SkillLevelType>();

    for (const sportType of Object.values(SportType).filter(
      (v) => typeof v === "string"
    )) {
      const skillOptions = Object.values(SkillLevelType).filter(
        (v) => typeof v === "string"
      ) as string[];

      let skillLevel: string;

      while (true) {
        const answer = await super.askQuestion(
          `Enter skill level for ${sportType} (${skillOptions.join(", ")}): `
        );

        if (skillOptions.includes(answer)) {
          skillLevel = answer;
          break;
        }

        console.log(
          `Invalid input. Please choose one of: ${skillOptions.join(", ")}`
        );
      }

      sportSkills.set(
        SportType[sportType as keyof typeof SportType],
        SkillLevelType[skillLevel as keyof typeof SkillLevelType]
      );
    }

    const player = new Player(
      participant.firstName,
      participant.lastName,
      sportSkills
    );
    this.eventOrganizer.createParticipant(player);
  }

  async createEvent(): Promise<Event | void> {
    const event = await super.createEvent();
    if (!event) {
      throw new Error(
        "Unexpected error with creating event in SportEventConsoleProgram"
      );
    }
    const fieldName = await super.askQuestion("Enter field name: ");
    let sport;
    let requiredSkillLevel;

    const sportOptions = Object.values(SportType).filter(
      (v) => typeof v === "string"
    ) as string[];

    const skillOptions = Object.values(SkillLevelType).filter(
      (v) => typeof v === "string"
    ) as string[];

    while (true) {
      const answer = await super.askQuestion(
        `Enter sport type (${sportOptions.join(", ")}): `
      );

      if (sportOptions.includes(answer)) {
        sport = answer;
        break;
      }

      console.log(
        `Invalid input. Please choose one of: ${sportOptions.join(", ")}`
      );
    }

    while (true) {
      const answer = await super.askQuestion(
        `Enter required skill level (${skillOptions.join(", ")}): `
      );

      if (skillOptions.includes(answer)) {
        requiredSkillLevel = answer;
        break;
      }

      console.log(
        `Invalid input. Please choose one of: ${skillOptions.join(", ")}`
      );
    }

    const sportEvent = new SportEvent(
      event.date,
      event.durationInMinutes,
      event.maxEventParticipants,
      fieldName,
      SportType[sport as keyof typeof SportType],
      SkillLevelType[requiredSkillLevel as keyof typeof SkillLevelType]
    );

    this.eventOrganizer.createEvent(sportEvent);
  }

  async addParticipantToEvent(): Promise<{
    event: SportEvent;
    participant: Player;
  } | void> {
    const result = await super.addParticipantToEvent();
    if (!result) {
      throw new Error(
        "Unexpected error with adding participant to event in SportEventConsoleProgram"
      );
    }

    const { event, participant } = result;

    const skillLevel = participant.sportSkills.get(event.sport);
    if (skillLevel == undefined || skillLevel < event.requiredSkillLevel) {
      console.log(
        `Participant ${participant.firstName} ${participant.lastName} does not meet the required skill level for this event.`
      );
      return;
    }

    this.eventOrganizer.addParticipantToEvent(event, participant);
  }
}
