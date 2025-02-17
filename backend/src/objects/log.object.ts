import { zones, ZoneType } from '@/config/zones';
import {
  EntityType,
  Log,
  LogDamageStatistics,
  LogEntity,
  LogEntitySkill,
  LogEntitySkillStats,
  LogEntityStats,
  RawLog,
} from '@/interfaces/logs.interface';
import { getRandomString } from '@/utils/crypto';
import { logger } from '@/utils/logger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class LogDamageStatisticsObject {
  @IsNumber()
  @Min(0)
  public totalDamageDealt: number;

  @IsNumber()
  @Min(0)
  public topDamageDealt: number;

  @IsNumber()
  @Min(0)
  public totalDamageTaken: number;

  @IsNumber()
  @Min(0)
  public topDamageTaken: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public totalHealingDone: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public topHealingDone: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public totalShieldDone: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public topShieldDone: number;

  @IsNumber()
  @Min(0)
  public dps: number;

  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(200) // TODO: Decide on this properly
  @IsNumber({}, { each: true })
  public dpsIntervals: number[];

  constructor(stat: LogDamageStatistics) {
    this.totalDamageDealt = stat.totalDamageDealt;
    this.topDamageDealt = stat.topDamageDealt;
    this.totalDamageTaken = stat.totalDamageTaken;
    this.topDamageTaken = stat.topDamageTaken;

    this.totalHealingDone = stat.totalHealingDone || 0;
    this.topHealingDone = stat.topHealingDone || 0;
    this.totalShieldDone = stat.totalShieldDone || 0;
    this.topShieldDone = stat.topShieldDone || 0;

    this.dps = stat.dps;
    this.dpsIntervals = stat.dpsIntervals;
  }
}

export class LogEntitySkillStatsObject {
  @IsOptional()
  @IsNumber()
  @Min(0)
  public casts: number;

  @IsNumber()
  @Min(0)
  public hits: number;

  @IsNumber()
  @Min(0)
  public crits: number;

  @IsNumber()
  @Min(0)
  public backHits: number;

  @IsNumber()
  @Min(0)
  public frontHits: number;

  @IsNumber()
  @Min(0)
  public counters: number;

  @IsNumber()
  @Min(0)
  public damageDealt: number;

  @IsNumber()
  @Min(0)
  public topDamage: number;

  constructor(stats: LogEntitySkillStats) {
    this.casts = stats.casts || 0;
    this.hits = stats.hits;
    this.crits = stats.crits;
    this.backHits = stats.backHits;
    this.frontHits = stats.frontHits;
    this.counters = stats.counters;
    this.damageDealt = stats.damageDealt;
    this.topDamage = stats.topDamage;
  }
}

export class LogEntitySkillObject {
  @IsNumber()
  @Min(0)
  public id: number;

  @IsOptional()
  @IsString()
  public name: string;

  @IsObject()
  @Type(() => LogEntitySkillStatsObject)
  public stats: LogEntitySkillStatsObject;

  constructor(skill: LogEntitySkill) {
    this.id = skill.id;
    // this.name = skill.name;
    this.stats = new LogEntitySkillStatsObject(skill.stats);
  }
}

export class LogEntityStatObject {
  @IsOptional()
  @IsNumber()
  @Min(0)
  public casts: number;

  @IsNumber()
  @Min(0)
  public hits: number;

  @IsNumber()
  @Min(0)
  public crits: number;

  @IsNumber()
  @Min(0)
  public backHits: number;

  @IsNumber()
  @Min(0)
  public frontHits: number;

  @IsNumber()
  @Min(0)
  public counters: number;

  @IsNumber()
  @Min(0)
  public damageDealt: number;

  @IsNumber()
  @Min(0)
  public healing: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public shielding: number;

  @IsNumber()
  @Min(0)
  public damageTaken: number;

  @IsNumber()
  @Min(0)
  @Max(12)
  public deaths: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public deathTime: number;

  @IsNumber()
  @Min(0)
  public dps: number;

  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(200) // TODO: Decide on this properly; always same length as dpsIntervals
  @IsNumber({}, { each: true })
  dpsOverTime: number[];

  constructor(stat: LogEntityStats, duration?: number) {
    this.casts = stat.casts || 0;
    this.hits = stat.hits;
    this.crits = stat.crits;
    this.backHits = stat.backHits;
    this.frontHits = stat.frontHits;
    this.counters = stat.counters;
    this.damageDealt = stat.damageDealt;
    this.healing = stat.healing;
    this.shielding = stat.shielding || 0;
    this.damageTaken = stat.damageTaken;
    this.deaths = stat.deaths;
    this.deathTime = stat.deathTime || 0;
    this.dps = stat.dps;
    if (duration && (!this.dps || this.dps <= 0)) {
      this.dps = this.damageDealt / (duration / 1000);
    }

    this.dpsOverTime = stat.dpsOverTime;
  }
}

export class LogEntityObject {
  @IsString()
  @Length(1, 32)
  public id: string;

  @IsOptional()
  @IsNumber()
  public npcId: number | undefined;

  @IsOptional()
  @IsString()
  public name: string | undefined;

  @IsEnum(EntityType)
  public type: EntityType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public lastUpdate: number;

  @IsNumber()
  @Min(0)
  public classId: number;

  @IsNumber()
  @Min(0)
  @Max(1625)
  public gearLevel: number;

  @IsOptional()
  @IsNumber()
  public currentHp: number;

  @IsOptional()
  @IsNumber()
  public maxHp: number;

  @ValidateIf(o => o.type === EntityType.PLAYER)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LogEntitySkillObject)
  public skills: LogEntitySkillObject[];

  @IsObject()
  @Type(() => LogEntityStatObject)
  public stats: LogEntityStatObject;

  constructor(entity: LogEntity, duration?: number) {
    this.id = getRandomString(32);
    this.npcId = entity.npcId;
    this.type = entity.type;
    this.classId = entity.classId;
    this.lastUpdate = entity.lastUpdate || 0;
    this.gearLevel = entity.gearLevel || 0;
    this.currentHp = entity.currentHp;
    this.maxHp = entity.maxHp;
    this.name = entity.name;
    if (entity.skills && entity.type === EntityType.PLAYER) this.skills = Object.values(entity.skills).map(skill => new LogEntitySkillObject(skill));
    else this.skills = [];
    this.stats = new LogEntityStatObject(entity.stats, duration);
  }

  isPlayer() {
    return this.type === EntityType.PLAYER;
  }

  isGuardian() {
    return this.type === EntityType.GUARDIAN;
  }

  isMonster() {
    return this.type === EntityType.MONSTER;
  }

  isBoss() {
    return this.type === EntityType.BOSS;
  }
}

export class LogObject {
  @ValidateIf(o => o.id !== undefined)
  @IsString()
  @MaxLength(0) // Don't let the uploader set ID; DTO validation is only performed when uploading
  public id?: string;

  @ValidateIf(o => o.parent !== undefined)
  @IsString()
  @MaxLength(0)
  public parent?: string;

  @IsString() // Cannot be set by user upload; only generated by server
  public creator: string;

  @IsNumber()
  @Min(1)
  public duration: number;

  @IsOptional()
  @IsString()
  public server?: string;

  @IsOptional()
  @IsString()
  public region?: string;

  @IsNumber()
  @Min(0)
  public createdAt: number;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(20) // 8 Players, up to 12 bosses; mostly relevant in Brelshaza G1
  @ValidateNested({ each: true })
  @Type(() => LogEntityObject)
  public entities: LogEntityObject[];

  @IsObject()
  @Type(() => LogDamageStatisticsObject)
  public damageStatistics: LogDamageStatisticsObject;

  @IsOptional()
  @IsBoolean()
  public unlisted: boolean;

  @IsNumber()
  @Min(0)
  public zoneId: number;

  @IsEnum(ZoneType)
  public zoneType: ZoneType;

  constructor(log: Log, refresh = false) {
    try {
      this.id = log._id ? `${log._id}` : undefined;
      this.unlisted = log.unlisted ?? true;
      this.parent = log.parent ? `${log.parent}` : undefined;
      this.creator = `${log.creator}`;
      this.duration = log.firstPacket && log.lastPacket ? log.lastPacket - log.firstPacket : log.duration;
      this.server = log.server || 'Unknown';
      this.region = log.region || 'Unknown';
      this.createdAt = log.createdAt;
      this.entities = log.entities.map(entity => new LogEntityObject(entity, this.duration));
      this.damageStatistics = new LogDamageStatisticsObject(log.damageStatistics);

      if (refresh || this.damageStatistics.dps <= 0) {
        this.damageStatistics.dps = this.getPartyDps();
      }

      if (refresh || !log.zoneId || !log.zoneType) {
        const zoneInfo = this.getZone();
        this.zoneId = zoneInfo.id;
        this.zoneType = zoneInfo.type;
      } else {
        this.zoneId = log.zoneId;
        this.zoneType = log.zoneType;
      }
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }

  getPartyDps() {
    const players = this.entities.filter(entity => entity.isPlayer());
    const duration = this.duration / 1000;

    const total = players.reduce((p, player) => (p += player.stats.damageDealt / duration), 0);
    return total;
  }

  getBoss() {
    const bosses = this.entities.filter(e => e.type === EntityType.BOSS || e.type === EntityType.GUARDIAN);

    let boss: LogEntityObject | undefined = undefined;
    if (bosses.length > 1) {
      boss = bosses.find(boss => boss.currentHp <= 0);
    } else if (bosses.length === 1) {
      boss = bosses[0];
    }

    return boss;
  }

  getBosses() {
    return this.entities.filter(e => e.type === EntityType.BOSS || e.type === EntityType.GUARDIAN);
  }

  getZone() {
    const bosses = this.getBosses();
    if (bosses.length > 0) {
      const boss = bosses.sort((a, b) => b.lastUpdate - a.lastUpdate)[0];
      const zone = zones.find(zone => zone.bosses.includes(boss.npcId));

      if (zone) return { id: zone.id, type: zone.type };
    }

    return { id: -1, type: ZoneType.Unknown };
  }
}

/**
 * Raw Log DTOs
 */

export class RawLogObject {
  public id?: string;
  public unlisted?: boolean;
  public creator?: string;
  public createdAt: number;
  public hash: string;
  public logLines: string[];

  constructor(log: RawLog) {
    this.id = log._id ? `${log._id}` : undefined;
    this.unlisted = log.unlisted || true;
    this.creator = `${log.creator}`;
    this.createdAt = log.createdAt;
    this.hash = log.hash;
    this.logLines = log.logLines;
  }
}

/**
 * Misc. Helper Objects
 */

export class LogFilterOptions {
  public includeUnlisted?: boolean;

  constructor(options: LogFilterOptions) {
    this.includeUnlisted = options.includeUnlisted || false;
  }
}
