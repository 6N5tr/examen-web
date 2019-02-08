import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { EventoEntity } from '../evento/evento.entity';


@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn(
  )
  id: number;

  @Column({
    type: 'varchar',
  })
  nombre: string;

  @Column({
    type: 'varchar',
  })
  numeroProducto: number;

  @Column({
    type: 'varchar',
  })
  descripcion: string;

  @Column({
    type: 'decimal',
  })
  precio: number;

  @Column({
    type: 'date',
  })
  fechaLanzamientoProducto: string;

  @Column({
    type: 'int',
  })
  aniosGarantia: number;

  // producto.entity.ts
  @ManyToOne(
    type => TiendaEntity,
    tienda => tienda.productos,
  )
  tiendaId: TiendaEntity;

  @ManyToMany(type => EventoEntity, evento => evento.productos)
  eventos: EventoEntity[];

}
