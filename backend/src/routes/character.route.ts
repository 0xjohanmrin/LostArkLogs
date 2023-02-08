import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { apiKeyMiddleware, optionalApiKeyMiddleware, optionalHttpAuthMiddleware } from '@middlewares/auth.middleware';
import { limiterUsers, rawLimiter } from '@/middlewares/limiting.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import CharacterController from '@/controllers/character.controller';

class CharacterRoute implements Routes {
  public path = '/character';
  public router = Router();
  public characterController = new CharacterController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/create`, apiKeyMiddleware('body'), this.characterController.createCharacter);
    this.router.get(`${this.path}/get`, apiKeyMiddleware('query'), this.characterController.getCharacterByAuthorId);
  }
}
export default CharacterRoute;
