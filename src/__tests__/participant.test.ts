import { Participant } from "../classes/event-classes.js";

describe("Participant", () => {
  beforeEach(() => {
    (Participant as any).nextId = 1;
  });

  test("creates participant with correct properties", () => {
    const participant = new Participant("John", "Doe", true);
    expect(participant.firstName).toBe("John");
    expect(participant.lastName).toBe("Doe");
    expect(participant.id).toBe(1);
  });

  test("increments ID when incrementId is true", () => {
    const participant1 = new Participant("John", "Doe", true);
    const participant2 = new Participant("Jane", "Smith", true);
    expect(participant1.id).toBe(1);
    expect(participant2.id).toBe(2);
  });

  test("keeps same ID when incrementId is false", () => {
    const participant1 = new Participant("John", "Doe", false);
    const participant2 = new Participant("Jane", "Smith", false);
    expect(participant1.id).toBe(1);
    expect(participant2.id).toBe(1);
  });
});
