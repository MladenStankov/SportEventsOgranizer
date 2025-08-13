export interface IParticipant {
  id: number;
  firstName: string;
  lastName: string;

  printInfo(): void;
}

export interface IEvent<TParticipant extends IParticipant = IParticipant> {
  date: Date;
  durationInMinutes: number;

  eventParticipants: TParticipant[];
  maxEventParticipants: number;

  addParticipant(person: TParticipant): void;
  removeParticipant(id: number): void;

  printInfo(): void;
}

export interface IEventOrganizer<
  TEvent extends IEvent = IEvent,
  TParticipant extends IParticipant = IParticipant,
> {
  events: TEvent[];
  participants: TParticipant[];

  createEvent(event: TEvent): void;
  createParticipant(participant: TParticipant): void;

  printEventsHistory(): void;
  printParticipantsList(): void;
}
