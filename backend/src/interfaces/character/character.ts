import { LostarkClass } from './lostark-class';
import mongoose from 'mongoose';
import { GearsetPiece } from './gearset-piece';
import { Accessory } from './accessory';
import { EngravingEntry } from '../engraving-entry';

export interface Build {
  engravings?: [EngravingEntry, EngravingEntry];
  necklace?: Accessory;
  earring1?: Accessory;
  earring2?: Accessory;
  ring1?: Accessory;
  ring2?: Accessory;
  wrist?: Accessory;
  stone?: {
    rarity: Number;
    engravings: [EngravingEntry, EngravingEntry, EngravingEntry];
  };
}

export interface Character {
  _id?: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  name: string;
  gearLevel: number;
  lazy: boolean;
  class: LostarkClass;
  weeklyGold?: boolean;
  note?: string;
  tickets?: {
    t1Cube: Number;
    t2BossRush: Number;
    t2Cube: Number;
    t3BossRush: Number;
    t3Cube: Number;
    platinumFields: Number;
  };
  gearset?: {
    currentIlvl: Number;
    targetIlvl: Number;

    headgear: GearsetPiece;
    shoulders: GearsetPiece;
    chestpiece: GearsetPiece;
    legwear: GearsetPiece;
    gloves: GearsetPiece;
    weapon: GearsetPiece;
    builds?: [Build];
  };
}
