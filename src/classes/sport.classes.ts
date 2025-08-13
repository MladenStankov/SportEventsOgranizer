import { IPlayer, ISportEvent } from "../interfaces/sport.interfaces";
import { SportType, SkillLevelType } from "../types/sport.types";
import { Event, Participant } from "./event.classes";

export class Player extends Participant implements IPlayer {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    public sportSkills: Map<SportType, SkillLevelType>
  ) {
    super(id, firstName, lastName);
  }

  printInfo(): void {
    super.printInfo();
    console.log("Sport Skills:");
    this.sportSkills.forEach((level, sport) => {
      console.log(` - ${sport}: ${level}`);
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
    super(date, durationInMinutes, maxEventParticipants);
  }

  printInfo(): void {
    super.printInfo();
    console.log(`Field Name: ${this.fieldName}`);
    console.log(`Sport: ${this.sport}`);
    console.log(`Required Skill Level: ${this.requiredSkillLevel}`);
  }
}
