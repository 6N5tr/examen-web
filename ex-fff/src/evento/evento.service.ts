import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectRepository} from '@nestjs/typeorm';
import {ProductoEntity} from "../producto/producto.entity";
import {UsuarioEntity} from "../user/user.entity";
import {Usuario} from "../user/user.service";

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository:Repository<EventoEntity>
    ){}

    buscar(parametros?:FindManyOptions<EventoEntity>):Promise<EventoEntity[]>{
        return this._eventoRepository.find(parametros)
    }

    async crear(nuevoEvento:Evento):Promise<EventoEntity>{
        const eventoEntity = this._eventoRepository.create(nuevoEvento);
        const eventoCreado = this._eventoRepository.save(eventoEntity);
        return eventoCreado
    }



    actualizar(id: number,
               nuevoUsuario: Evento): Promise<EventoEntity> {

        nuevoUsuario.id = id;

        const eventoEntity = this._eventoRepository.create(nuevoUsuario);
        return this._eventoRepository.save(eventoEntity);
    }

    buscarPorId(id: number): Promise<EventoEntity> {
        return this._eventoRepository.findOne(id, {relations: ["pokemones"]} );
    }

}

export interface Evento {
    id?:number;
    nombre:string;
    fecha:string;
    latitud:number;
    longitud:number;
    pokemones:ProductoEntity[];
}
