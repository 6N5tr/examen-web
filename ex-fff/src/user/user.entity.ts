import { Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from '../rol/rol.entity';
import { TiendaEntity } from '../tienda/tienda.entity';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  correo: string;
  @Column()
  password: string;
  @Column()
  fecha_nacimiento: string;

  @OneToMany(
    type => TiendaEntity,
    // @ts-ignore
    entrenador => entrenador.usuario,
  )
  tiendas: TiendaEntity[];


  @ManyToMany(type => RolEntity)
  @JoinTable()
  roles: RolEntity[];
}

