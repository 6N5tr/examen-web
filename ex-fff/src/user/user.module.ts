import {Module} from "@nestjs/common"
import {UsuarioEntity} from "./user.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioService} from "./user.service";
import {UsuarioController} from "./user.controller";
import {RolEntity} from "../rol/rol.entity";
import {RolService} from "../rol/rol.service";
import {RolController} from "../rol/rol.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([UsuarioEntity]),
            TypeOrmModule.forFeature([RolEntity])
        ],
        controllers:[UsuarioController,RolController],
        providers:[UsuarioService,RolService],
        exports:[UsuarioService,RolService]

    }
)
export class UsuarioModule {

}
