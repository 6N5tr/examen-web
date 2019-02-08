import { Inject, Injectable } from '@nestjs/common';
import { ProductoEntity } from './producto.entity';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { RolEntity } from '../rol/rol.entity';


@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly _productoRepository: Repository<ProductoEntity>,
  ) {
  }

  async crear(nuevoProducto: Producto): Promise<ProductoEntity> {
    const productoEntity = this._productoRepository.create(nuevoProducto);
    const productoCreado = this._productoRepository.save(productoEntity);

    return productoCreado;
  }

  buscar(parametros?: FindManyOptions): Promise<ProductoEntity[]> {
    return this._productoRepository.find(parametros);
  }

  buscarPorId(id: number): Promise<ProductoEntity> {
    return this._productoRepository.findOne(id);
  }


}

export interface Producto {
  id?: number;
  numeroProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  fechaLanzamientoProducto: string;
  aniosGarantia: number;

  tiendaId: TiendaEntity;
}
