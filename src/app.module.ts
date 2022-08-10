import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenreModule } from './modules/genre/genre.module';
import { MusicModule } from './modules/music/music.module';
import { LikeModule } from './modules/like/like.module';
import { MyLibraryModule } from './modules/my-library/my-library.module';
import { AppGateWay } from '@src/gateway/gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    GenreModule,
    MusicModule,
    LikeModule,
    MyLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateWay],
})
export class AppModule {}
