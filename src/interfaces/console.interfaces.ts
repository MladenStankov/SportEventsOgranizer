import { Player, SportEvent } from "../classes/sport.classes";
import { IEvent, IEventOrganizer, IParticipant } from "./event.interfaces";

export type ParticipantForEvent<P> = P extends SportEvent
  ? Player
  : IParticipant;

export interface IConsoleProgram<
  TEvent extends IEvent,
  TParticipant extends IParticipant = ParticipantForEvent<TEvent>,
  TEventOrganizer extends IEventOrganizer<
    TEvent,
    TParticipant
  > = IEventOrganizer<TEvent, TParticipant>,
> {
  eventOrganizer: TEventOrganizer;
  JSONFilePath: string;

  loadData(): Promise<void>;
  saveData(): Promise<void>;
}
