import { Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { UsuarioEntity } from '../user/user.entity';


@Entity('tienda')
export class TiendaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 50,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  direccion: string;

  @Column({
    type: 'date',
  })
  fechaApertura: string;

  @Column({
    type: 'int',
  })
  RUC: number;
  @Column({
    type: 'boolean',
  })
  matriz: boolean;


  @ManyToOne(
    type => UsuarioEntity, // Tipo relacion de muchos
    // a uno
    usuario => usuario.tiendas, // Campo donde nos guarda
  )
  usuario: UsuarioEntity;
  // tienda.entity.ts
  @OneToMany(
    type => ProductoEntity,
    producto => producto.tiendaId,
  )
  productos: ProductoEntity[];
}
