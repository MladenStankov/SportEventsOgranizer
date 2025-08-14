import { Player, SportEvent } from "../classes/sport-classes.js";
import { SportType, SkillLevelType } from "../types/sport-types.js";

describe("Player", () => {
  beforeEach(() => {
    // Reset the static nextId before each test
    (Player as any).nextId = 1;
  });

  test("creates player with correct properties", () => {
    const sportSkills = new Map([
      [SportType.FOOTBALL, SkillLevelType.ADVANCED],
      [SportType.BASKETBALL, SkillLevelType.AVERAGE],
    ]);
    const player = new Player("John", "Doe", sportSkills);

    expect(player.firstName).toBe("John");
    expect(player.lastName).toBe("Doe");
    expect(player.id).toBe(1);
    expect(player.sportSkills).toBe(sportSkills);
    expect(player.sportSkills.get(SportType.FOOTBALL)).toBe(
      SkillLevelType.ADVANCED
    );
  });
});

describe("SportEvent", () => {
  let sportEvent: SportEvent;
  let player: Player;

  beforeEach(() => {
    // Reset static IDs
    (SportEvent as any).nextId = 1;
    (Player as any).nextId = 1;

    sportEvent = new SportEvent(
      new Date("2025-08-14"),
      90,
      10,
      "Main Field",
      SportType.FOOTBALL,
      SkillLevelType.ADVANCED
    );

    const sportSkills = new Map([
      [SportType.FOOTBALL, SkillLevelType.ADVANCED],
    ]);
    player = new Player("John", "Doe", sportSkills);
  });

  test("creates sport event with correct properties", () => {
    expect(sportEvent.id).toBe(1);
    expect(sportEvent.durationInMinutes).toBe(90);
    expect(sportEvent.maxEventParticipants).toBe(10);
    expect(sportEvent.fieldName).toBe("Main Field");
    expect(sportEvent.sport).toBe(SportType.FOOTBALL);
    expect(sportEvent.requiredSkillLevel).toBe(SkillLevelType.ADVANCED);
    expect(sportEvent.eventParticipants).toHaveLength(0);
  });

  test("inherits participant management from Event class", () => {
    sportEvent.addParticipant(player);
    expect(sportEvent.eventParticipants).toHaveLength(1);
    expect(sportEvent.eventParticipants[0]).toBe(player);

    sportEvent.removeParticipant(player.id);
    expect(sportEvent.eventParticipants).toHaveLength(0);
  });
});
