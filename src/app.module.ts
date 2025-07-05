import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { adminConfig, getDatabaseConfig, googleCloudConfig, jwtConfig, smtpConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './database/ormconfig';
import { typeOrmConfig } from './config/typeorm.config';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { CollegeModule } from './features/college/college.module';
import { CourseModule } from './features/course/course.module';
import { ShareModule } from './features/share/share.module';


@Module({
  imports: [
        ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, 
      load: [getDatabaseConfig, jwtConfig, adminConfig, googleCloudConfig, smtpConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    //TypeOrmModule.forRoot(ormConfig)
    AuthModule,
    UserModule,
    CommonModule,
    CollegeModule,
    CourseModule,
    ContactModule,
    ShareModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}