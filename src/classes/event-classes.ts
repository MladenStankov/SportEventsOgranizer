import {
  IEvent,
  IEventOrganizer,
  IParticipant,
} from "../interfaces/event-interfaces.js";

export class Participant implements IParticipant {
  protected static nextId = 1;
  public id: number;

  constructor(
    public firstName: string,
    public lastName: string,
    incrementId: boolean = false
  ) {
    if (incrementId) {
      this.id = Participant.nextId++;
    } else this.id = Participant.nextId;
  }

  printInfo(): void {
    console.log(`Participant ID ${this.id}`);
    console.log(`Name: ${this.firstName} ${this.lastName}`);
  }
}

export class Event<TParticipant extends IParticipant = IParticipant>
  implements IEvent<TParticipant>
{
  private static nextId = 1;
  public eventParticipants: TParticipant[] = [];
  public id: number;

  constructor(
    public date: Date,
    public durationInMinutes: number,
    public maxEventParticipants: number,
    incrementId: boolean = false
  ) {
    if (incrementId) {
      this.id = Event.nextId++;
    } else this.id = Event.nextId;
  }

  addParticipant(participant: TParticipant): void {
    if (this.eventParticipants.length > this.maxEventParticipants) {
      console.log("Cannot add participant, event is full.");
      return;
    }
    if (this.eventParticipants.find((p) => p.id === participant.id)) {
      console.log("Cannot add participant, already in event");
      return;
    }
    this.eventParticipants.push(participant);
  }

  removeParticipant(id: number): void {
    this.eventParticipants = this.eventParticipants.filter((p) => p.id !== id);
  }

  printInfo(): void {
    console.log(`Event ID: ${this.id}`);
    console.log(`Event on ${this.date}`);
    console.log(`Duration: ${this.durationInMinutes} minutes`);
    console.log(
      `Participants: ${this.eventParticipants.length}/${this.maxEventParticipants}`
    );
    if (this.eventParticipants.length > 0) {
      console.log("(");
      this.eventParticipants.forEach((p) =>
        console.log(`ID: ${p.id}, ${p.firstName} ${p.lastName}`)
      );
      console.log(")");
    }
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
  deleteParticipant(id: number): void {
    this.events.forEach(
      (e) =>
        (e.eventParticipants = e.eventParticipants.filter((p) => p.id !== id))
    );
    this.participants = this.participants.filter((p) => p.id !== id);
  }
  addParticipantToEvent(event: TEvent, participant: TParticipant): void {
    if (event && participant) {
      event.addParticipant(participant);
    }
  }
  removeParticipantFromEvent(eventId: number, participantId: number): void {
    const event = this.events.find((e) => e.id === eventId);
    if (event) {
      event.removeParticipant(participantId);
    }
  }
  createEvent(event: TEvent): void {
    this.events.push(event);
  }
  createParticipant(participant: TParticipant): void {
    this.participants.push(participant);
  }
  printEventsHistory(): void {
    if (this.events.length < 0) {
      console.log("No events yet");
      return;
    }

    console.log("Events History:");
    this.events.forEach((event) => {
      event.printInfo();
      console.log("<--------------------->");
    });
  }
  printParticipantsList(): void {
    if (this.participants.length < 0) {
      console.log("No participants yet");
      return;
    }

    console.log("Participants List:");
    this.participants.forEach((participant) => {
      participant.printInfo();
      console.log("<--------------------->");
    });
  }
}
