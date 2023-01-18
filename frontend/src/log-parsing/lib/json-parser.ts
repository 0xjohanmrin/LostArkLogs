import mockdata from "./mockdata.json";
import {
  Entity,
  EntityType,
  Session,
  SimpleSession,
  Skill,
  SkillBreakdown,
} from "./objects";

export function getMockData() {
  const encounter = mockdata[1];
  const ent = Object.values(encounter.entities);
  console.log(encounter);
  const session = new Session({
    firstPacket: encounter.fightStartedOn,
    lastPacket: encounter.lastCombatPacket,
  });
  session.entities = ent.map((e) => {
    if (e.class != 0) {
      e.type = EntityType.PLAYER;
    }
    const ent = {
      lastUpdate: e.lastUpdate || +new Date(),
      id: e.id || 0,
      npcId: e.npcId,
      name: e.name || "Unknown Entity",
      class: e.class || "Unknown Class",
      classId: e.classId || 0,
      level: e.level || 0,
      gearLevel: e.gearScore || 0,
      currentHp: e.currentHp || 0,
      maxHp: e.maxHp || 0,
      type: e.type || EntityType.UNKNOWN,
      stats: e.hits || {},
    };
    // this.type = entity.type || EntityType.UNKNOWN;

    //this.skills = e.skills || {};
    // this.stats = new Stats(e.stats);
    const entity = new Entity(ent);
    return entity;
  });
  return session;
}
