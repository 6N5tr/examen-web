import {Module} from "@nestjs/common"
import {TiendaEntity} from "./tienda.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TiendaService} from "./tienda.service";
import {TiendaController} from "./tienda.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([TiendaEntity])
        ],
        controllers:[TiendaController],
        providers:[TiendaService],
        exports:[TiendaService]

    }
)
export class TiendaModule {

}
