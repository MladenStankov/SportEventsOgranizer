import { Event, Participant } from "../classes/event-classes.js";

describe("Event", () => {
  let event: Event;
  let participant1: Participant;
  let participant2: Participant;

  beforeEach(() => {
    (Event as any).nextId = 1;
    (Participant as any).nextId = 1;

    event = new Event(new Date("2025-08-14"), 60, 2, true);
    participant1 = new Participant("John", "Doe", true);
    participant2 = new Participant("Jane", "Smith", true);
  });

  test("creates event with correct properties", () => {
    expect(event.id).toBe(1);
    expect(event.durationInMinutes).toBe(60);
    expect(event.maxEventParticipants).toBe(2);
    expect(event.eventParticipants).toHaveLength(0);
  });

  test("adds participant successfully", () => {
    event.addParticipant(participant1);
    expect(event.eventParticipants).toHaveLength(1);
    expect(event.eventParticipants[0]).toBe(participant1);
  });

  test("prevents adding same participant twice", () => {
    event.addParticipant(participant1);
    event.addParticipant(participant1);
    expect(event.eventParticipants).toHaveLength(1);
  });

  test("prevents adding participants when event is full", () => {
    event.addParticipant(participant1);
    event.addParticipant(participant2);
    const participant3 = new Participant("Bob", "Wilson", true);
    event.addParticipant(participant3);
    expect(event.eventParticipants).toHaveLength(2);
  });

  test("removes participant successfully", () => {
    event.addParticipant(participant1);
    event.addParticipant(participant2);
    event.removeParticipant(participant1.id);
    expect(event.eventParticipants).toHaveLength(1);
    expect(event.eventParticipants[0]).toBe(participant2);
  });
});
