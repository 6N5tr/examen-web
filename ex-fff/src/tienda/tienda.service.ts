import {Injectable} from "@nestjs/common";
import {TiendaEntity} from "./tienda.entity";
import {FindManyOptions, Repository} from "typeorm";

import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../user/user.entity";
import {ProductoEntity} from "../producto/producto.entity";

@Injectable()
export class TiendaService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly _entrenadorRepository: Repository<TiendaEntity>,
    ) {
    }


    async crear(nuevoEntrenador: Entrenador): Promise<TiendaEntity> {

        // Instanciar una entidad -> .create()
        const entrenadorEntity = this._entrenadorRepository
            .create(nuevoEntrenador);

        // Guardar una entidad en la BDD -> .save()
        const entrenadorCreado = await this._entrenadorRepository
            .save(entrenadorEntity);

        return entrenadorCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<TiendaEntity[]>{
        return this._entrenadorRepository.find(parametros)
    }


}

export interface Entrenador {
    id?:number;
    nombreEntrenador:string;
    apellidoEntrenador
    fecha_nacimiento:string;
    numeroMedallas:number;
    campeon:boolean;
    usuario?:UsuarioEntity,
    pokemones?:ProductoEntity[]
}
