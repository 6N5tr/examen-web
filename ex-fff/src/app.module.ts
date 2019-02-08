import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./user/user.entity";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {EventoEntity} from "./evento/evento.entity";
import {EntrenadorEntity} from "./entrenador/entrenador.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioModule} from "./user/user.module";
import {EntrenadorModule} from "./entrenador/entrenador.module";
import {EventoModule} from "./evento/evento.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: '192.168.99.100',
                port: 32769,
                database: 'web-examen',
                username: 'root',
                password: 'root',
                synchronize: true,
                dropSchema: true,
                entities:[
                    UsuarioEntity,
                    PokemonEntity,
                    EventoEntity,
                    EntrenadorEntity,
                    RolEntity
                ],
            }),
        UsuarioModule,
        EntrenadorModule,
        EventoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
