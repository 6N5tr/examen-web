import {Module} from "@nestjs/common";
import {EventoService} from "./evento.service";
import {EventoEntity} from "./evento.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoController} from "./evento.controller";
import {ProductoEntity} from "../producto/producto.entity";
import {ProductoController} from "../producto/producto.controller";
import {ProductoService} from "../producto/producto.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([EventoEntity]),
            TypeOrmModule.forFeature([ProductoEntity])
        ],
        controllers:[EventoController,ProductoController],
        providers:[EventoService,ProductoService],
        exports:[EventoService,ProductoService],
    }
)
export class EventoModule {
}
