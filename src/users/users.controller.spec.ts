import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userSlug } from './slug/user.slug';
import { UsersController } from './users.controller';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { getConnection } from 'typeorm';
import { User } from './user.entity';

describe('UsersController', () => {
  let app: INestApplication;  
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '0.0.0.0',
          port: 5432,
          username: 'root',
          password: 'root',
          database: 'finchatbot_factory_test',
          entities: ['src/**/*{.ts, .js}'],
          synchronize: true,
          keepConnectionAlive: true
        }),
        UsersService,
        UsersModule
      ],
    })
    .overrideProvider(UsersController)
    .useValue(controller)
    .compile();

    controller = module.get<UsersController>(UsersController);
    app = module.createNestApplication();
    await app.init();
  });

  describe(`Users`, () => {
    it('should be defined', async () => {
      expect(controller).toBeDefined();
    });

    it ('should create a user', async  () => {
      let testUser = userSlug();
      let newUser = await controller.create(testUser);
      expect(newUser).not.toEqual(null);
    });
  });

  afterAll(async () => {
    // Cleanup Users table
    await getConnection().createQueryBuilder().delete().from(User).execute();        
    await app.close();
  });
});
