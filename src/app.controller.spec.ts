import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let ctrl: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    ctrl = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Nest API"', () => {
      expect(ctrl.hello()).toBe('Nest API');
    });
  });
});
