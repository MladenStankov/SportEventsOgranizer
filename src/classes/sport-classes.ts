import { IPlayer, ISportEvent } from "../interfaces/sport-interfaces.js";
import { SportType, SkillLevelType } from "../types/sport-types.js";
import { Event, Participant } from "./event-classes.js";

export class Player extends Participant implements IPlayer {
  constructor(
    firstName: string,
    lastName: string,
    public sportSkills: Map<SportType, SkillLevelType>
  ) {
    super(firstName, lastName, true);
  }

  printInfo(): void {
    super.printInfo();
    console.log("Sport Skills:");
    this.sportSkills.forEach((level, sport) => {
      console.log(` - ${SportType[sport]}: ${SkillLevelType[level]}`);
    });
  }
}

export class SportEvent extends Event<Player> implements ISportEvent {
  constructor(
    date: Date,
    durationInMinutes: number,
    maxEventParticipants: number,
    public fieldName: string,
    public sport: SportType,
    public requiredSkillLevel: SkillLevelType
  ) {
    super(date, durationInMinutes, maxEventParticipants, true);
  }

  printInfo(): void {
    super.printInfo();
    console.log(`Field Name: ${this.fieldName}`);
    console.log(`Sport: ${SportType[this.sport]}`);
    console.log(
      `Required Skill Level: ${SkillLevelType[this.requiredSkillLevel]}`
    );
  }
}
