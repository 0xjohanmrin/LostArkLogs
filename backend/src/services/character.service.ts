import { Character } from '@interfaces/character/character';
import { Exception } from '@/exceptions/Exception';
import charModel from '@/models/character.model';
import { validate, ValidationError } from 'class-validator';
import UserService from '@/services/users.service';
import mongoose from 'mongoose';

class CharacterService {
  public character = charModel;
  public users = new UserService();

  /**
   * create a new character
   * @param characterData
   * @returns
   * */
  public createCharacter = async (characterData: Character) => {
    try {
      const created = await this.character.create(characterData);
      if (!created) throw new Exception(400, 'Character not created');
      return created;
    } catch (err) {
      console.error(err);
      throw new Exception(400, err.message);
    }
  };
  public getCharacterByAuthorId = async (authorId: mongoose.Types.ObjectId) => {
    try {
      const foundCharacter = await this.character.find({ authorId: authorId });
      if (!foundCharacter) throw new Exception(400, 'Character not found');
      return foundCharacter;
    } catch (err) {
      console.error(err);
    }
  };
}

export default CharacterService;
