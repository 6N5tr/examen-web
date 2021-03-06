import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./user/user.entity";
import {ProductoEntity} from "./producto/producto.entity";
import {EventoEntity} from "./evento/evento.entity";
import {TiendaEntity} from "./tienda/tienda.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioModule} from "./user/user.module";
import {TiendaModule} from "./tienda/tienda.module";
import {EventoModule} from "./evento/evento.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'mysql',

                host: 'localhost',
                port: 3306,

 
                database: 'tienda',

                username: 'root',
                password: 'root',
                synchronize: true,

                dropSchema: false,

                entities:[
                    UsuarioEntity,
                    ProductoEntity,
                    EventoEntity,
                    TiendaEntity,
                    RolEntity
                ],
            }),
        UsuarioModule,
        TiendaModule,
        EventoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
