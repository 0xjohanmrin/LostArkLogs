import { Exception } from '@/exceptions/Exception';
import { RequestWithUser, RequestWithUserAndLog } from '@/interfaces/auth.interface';
import { Character, Build } from '@/interfaces/character/character';
import CharacterService from '@/services/character.service';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

class CharacterController {
  public characterService = new CharacterService();

  public createCharacter = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const acc = ['necklace', 'earring1', 'earring2', 'ring1', 'ring2'];
      const defaultPiece = {
        honing: 1,
        quality: 100,
        rarity: 2,
        targetHoning: 1,
      };
      const gearset = {
        currentIlvl: 0,
        targetIlvl: 0,

        headgear: defaultPiece,
        shoulders: defaultPiece,
        chestpiece: defaultPiece,
        legwear: defaultPiece,
        gloves: defaultPiece,
        weapon: defaultPiece,
      };
      const user = req.user;
      if (!user) throw new Exception(400, 'User not found');

      const charData: Character = { authorId: user._id, ...req.body.character };
      charData.gearset = gearset;

      const build0: Build = {
        engravings: [
          { engravingId: 0, nodes: 0 },
          { engravingId: 0, nodes: 0 },
        ],
        stone: {
          rarity: 2,
          engravings: [
            { engravingId: 0, nodes: 0 },
            { engravingId: 0, nodes: 0 },
            { engravingId: 0, nodes: 0 },
          ],
        },
      };

      acc.forEach(item => {
        build0[item] = {
          quality: 100,
          rarity: 2,
          stats: [],
          engraving: [
            { engravingId: 0, nodes: 0 },
            { engravingId: 0, nodes: 0 },
            { engravingId: 0, nodes: 0 },
          ],
        };
      });

      charData.gearset.builds = [build0];
      //console.log(characterData);
      this.characterService.createCharacter(charData);
    } catch (error) {
      console;
      next(error);
    }
  };
  public getCharacterByAuthorId = async (req: RequestWithUserAndLog, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) throw new Exception(400, 'User not found');
      const character = await this.characterService.getCharacterByAuthorId(user._id);
      res.status(200).json({ data: character, message: 'ok' });
    } catch (error) {
      next(error);
    }
  };
}

export default CharacterController;
