import { Event, Participant } from "../classes/event-classes";
import { Player, SportEvent } from "../classes/sport-classes";
import { IEvent, IEventOrganizer, IParticipant } from "./event-interfaces";
import readline from "readline";

export interface IConsoleProgram {
  rl: readline.Interface;
  JSONFilePath: string;

  askQuestion(question: string): Promise<string>;
}

export type ParticipantForEvent<P> = P extends SportEvent
  ? Player
  : IParticipant;

export interface IEventConsoleProgram<
  TEvent extends IEvent,
  TParticipant extends IParticipant = ParticipantForEvent<TEvent>,
  TEventOrganizer extends IEventOrganizer<
    TEvent,
    TParticipant
  > = IEventOrganizer<TEvent, TParticipant>,
> extends IConsoleProgram {
  eventOrganizer: TEventOrganizer;

  loadData(): Promise<void>;
  saveData(): Promise<void>;

  createParticipant(): Promise<Participant | void>;
  deleteParticipant(): Promise<void>;

  addParticipantToEvent(): Promise<{
    event: TEvent;
    participant: TParticipant;
  } | void>;
  removeParticipantFromEvent(): Promise<void>;

  createEvent(): Promise<Event | void>;

  /**
   * Starts the main console menu loop
   */
  startMenuLoop(): Promise<void>;
}

export interface ISportEventConsoleProgram
  extends IEventConsoleProgram<SportEvent> {}
