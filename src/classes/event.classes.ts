import {
  IEvent,
  IEventOrganizer,
  IParticipant,
} from "../interfaces/event.interfaces";

export class Participant implements IParticipant {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string
  ) {}

  printInfo(): void {
    console.log(`Participant ID ${this.id}`);
    console.log(`Name: ${this.firstName} ${this.lastName}`);
  }
}

export class Event<TParticipant extends IParticipant = IParticipant>
  implements IEvent<TParticipant>
{
  public eventParticipants: TParticipant[] = [];

  constructor(
    public date: Date,
    public durationInMinutes: number,
    public maxEventParticipants: number
  ) {}

  addParticipant(participant: TParticipant): void {
    if (this.eventParticipants.length < this.maxEventParticipants) {
      this.eventParticipants.push(participant);
    } else {
      console.log("Cannot add participant, event is full.");
    }
  }

  removeParticipant(id: number): void {
    this.eventParticipants = this.eventParticipants.filter((p) => p.id !== id);
  }

  printInfo(): void {
    console.log(`Event on ${this.date}`);
    console.log(`Duration: ${this.durationInMinutes} minutes`);
    console.log(
      `Participants: ${this.eventParticipants.length}/${this.eventParticipants}`
    );
  }
}

export class EventOrganizer<
  TEvent extends IEvent = IEvent,
  TParticipant extends IParticipant = IParticipant,
> implements IEventOrganizer<TEvent, TParticipant>
{
  public events: TEvent[];
  public participants: TParticipant[];

  constructor(events: TEvent[], participants: TParticipant[]) {
    this.events = events;
    this.participants = participants;
  }
  createEvent(event: TEvent): void {
    this.events.push(event);
  }
  createParticipant(participant: TParticipant): void {
    this.participants.push(participant);
  }
  printEventsHistory(): void {
    console.log("Events History:");
    this.events.forEach((event) => {
      event.printInfo();
    });
  }
  printParticipantsList(): void {
    console.log("Participants List:");
    this.participants.forEach((participant) => {
      participant.printInfo();
    });
  }
}
