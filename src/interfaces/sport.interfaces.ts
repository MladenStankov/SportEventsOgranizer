import { IEvent, IParticipant } from "./event.interfaces";
import { SkillLevelType, SportType } from "../types/sport.types";

export interface IPlayer extends IParticipant {
  sportSkills: Map<SportType, SkillLevelType>;
}

export interface ISportEvent extends IEvent<IPlayer> {
  fieldName: string;

  sport: SportType;
  requiredSkillLevel: SkillLevelType;
}
