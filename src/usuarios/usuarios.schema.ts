import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLES } from '../common/constants/roles';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Cv {
  @ApiProperty({ example: 'curriculum.pdf' })
  @Prop()
  nombre: string;

  @ApiProperty({ example: 'curriculum/pdf '})
  @Prop()
  tipo: string;

  @ApiProperty({ description: 'Contenido del archivo en Buffer' })
  @Prop()
  contenido: Buffer
}

const CvSchema = SchemaFactory.createForClass(Cv)

@Schema()
@ApiSchema({ description: 'Schema que define la estructura de los documentos de la coleccion "Usuarios"' })
export class Usuario {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Perez',
    type: String,
    required: true
  })
  nombre: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Email del usuario',
    example: 'ejemplo@gmail.com',
    type: String,
    required: true
  })
  email: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    type: String,
    required: true
  })
  password: string;

  @Prop({ type: [String], default: [ROLES.INVESTIGADOR] })
  @ApiProperty({
    description: 'Roles del usuario',
    example: [ROLES.INVESTIGADOR],
    type: [String],
    default: [ROLES.INVESTIGADOR],
    enum: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INVESTIGADOR],
    enumName: 'ROLES'
  })
  roles: string[];

  @Prop()
  @ApiProperty({
    description: 'Estado del usuario',
    type: Boolean,
    required: false,
    default: false,
  })
  baja: Boolean;

  @Prop({ type: CvSchema })
  @ApiProperty({
    description: 'Currículum del usuario',
    type: Cv,
    required: false,
    default: false
  })
  //cv: { nombre: string; tipo: string; contenido: Buffer };
  cv: Cv
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);