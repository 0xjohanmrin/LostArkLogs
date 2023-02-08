import { model, Schema, Document } from 'mongoose';
import { Character } from '@interfaces/character/character';

const characterSchema: Schema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gearLevel: {
    type: Number,
    required: true,
  },
  rclass: String,
  lazy: Boolean,
  note: String,
  tickets: {
    t1Cube: Number,
    t2BossRush: Number,
    t2Cube: Number,
    t3BossRush: Number,
    t3Cube: Number,
    platinumFields: Number,
  },
  gearset: {
    currentIlvl: Number,
    targetIlvl: Number,
    headgear: Object,
    shoulders: Object,
    chestpiece: Object,
    legwear: Object,
    gloves: Object,
    weapon: Object,
    builds: [
      {
        engravings: [Object, Object],
        necklace: Object,
        earring1: Object,
        earring2: Object,
        ring1: Object,
        ring2: Object,
        wrist: Object,
        stone: {
          rarity: Number,
          engravings: [Object, Object, Object],
        },
      },
    ],
  },
});

const charModel = model<Character & Document>('Character', characterSchema);
export default charModel;
