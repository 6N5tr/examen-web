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
        private readonly _tiendaRepository: Repository<TiendaEntity>,
    ) {
    }


    async crear(nuevoTienda: Tienda): Promise<TiendaEntity> {

        // Instanciar una entidad -> .create()
        const tiendaEntity = this._tiendaRepository
            .create(nuevoTienda);

        // Guardar una entidad en la BDD -> .save()
        const tiendaCreado = await this._tiendaRepository
            .save(tiendaEntity);

        return tiendaCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<TiendaEntity[]>{
        return this._tiendaRepository.find(parametros)
    }


}

export interface Tienda {
    id?:number;
    nombre:string;
    direccion:string
    fechaApertura:string;
    RUC:number;
    matriz:boolean;
    usuario?:UsuarioEntity,
    pokemones?:ProductoEntity[]
}
