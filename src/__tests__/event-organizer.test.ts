import {
  EventOrganizer,
  Event,
  Participant,
} from "../classes/event-classes.js";

describe("EventOrganizer", () => {
  let organizer: EventOrganizer;
  let event: Event;
  let participant: Participant;

  beforeEach(() => {
    (Event as any).nextId = 1;
    (Participant as any).nextId = 1;

    event = new Event(new Date("2025-08-14"), 60, 2, true);
    participant = new Participant("John", "Doe", true);
    organizer = new EventOrganizer([], []);
  });

  test("creates event organizer with empty lists", () => {
    expect(organizer.events).toHaveLength(0);
    expect(organizer.participants).toHaveLength(0);
  });

  test("creates event successfully", () => {
    organizer.createEvent(event);
    expect(organizer.events).toHaveLength(1);
    expect(organizer.events[0]).toBe(event);
  });

  test("creates participant successfully", () => {
    organizer.createParticipant(participant);
    expect(organizer.participants).toHaveLength(1);
    expect(organizer.participants[0]).toBe(participant);
  });

  test("adds participant to event successfully", () => {
    organizer.createEvent(event);
    organizer.createParticipant(participant);
    organizer.addParticipantToEvent(event, participant);
    expect(event.eventParticipants).toHaveLength(1);
    expect(event.eventParticipants[0]).toBe(participant);
  });

  test("removes participant from event successfully", () => {
    organizer.createEvent(event);
    organizer.createParticipant(participant);
    organizer.addParticipantToEvent(event, participant);
    organizer.removeParticipantFromEvent(event.id, participant.id);
    expect(event.eventParticipants).toHaveLength(0);
  });

  test("deletes participant from all events and participant list", () => {
    organizer.createEvent(event);
    organizer.createParticipant(participant);
    organizer.addParticipantToEvent(event, participant);
    organizer.deleteParticipant(participant.id);
    expect(event.eventParticipants).toHaveLength(0);
    expect(organizer.participants).toHaveLength(0);
  });
});
