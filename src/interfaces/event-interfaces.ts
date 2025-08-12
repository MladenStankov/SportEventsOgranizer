export interface IParticipant {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IEvent<TParticipant extends IParticipant = IParticipant> {
  date: Date;
  durationInMinutes: number;

  participants: TParticipant[];
  maxParticipants: number;

  addParticipant(person: TParticipant): void;
  removeParticipant(id: number): void;
}

export interface IEventOrganizer<TEvent extends IEvent = IEvent> {
  events: TEvent[];
  createSportEvent(Event: TEvent): void;

  printSportEventsHistory(): void;

  saveDataToJSON(): void;
}
