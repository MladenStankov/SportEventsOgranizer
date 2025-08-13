import {
  IConsoleProgram,
  ParticipantForEvent,
} from "../interfaces/console.interfaces";
import {
  IEvent,
  IEventOrganizer,
  IParticipant,
} from "../interfaces/event.interfaces";

export class ConsoleProgram<
  TEvent extends IEvent,
  TParticipant extends IParticipant = ParticipantForEvent<TEvent>,
  TEventOrganizer extends IEventOrganizer<
    TEvent,
    TParticipant
  > = IEventOrganizer<TEvent, TParticipant>,
> implements IConsoleProgram<TEvent, TParticipant, TEventOrganizer>
{
  public eventOrganizer: TEventOrganizer = {} as TEventOrganizer;

  constructor(public JSONFilePath: string) {}

  loadData(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveData(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
