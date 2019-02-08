import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';


@Entity('evento')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  fecha: string;
  @Column()
  latitud: number;
  @Column()
  longitud: number;
  @ManyToMany(type => ProductoEntity)
  @JoinTable({
    name: 'evento_productos', // table name for the junction table of this relation
    joinColumn: {
      name: 'evento',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'producto',
      referencedColumnName: 'id',
    },
  })
  productos: ProductoEntity[];
}
