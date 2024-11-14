import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ConvocatoriasService } from './convocatorias.service';
import { Convocatorias } from './convocatorias.schema';


@Controller('convocatoria')
export class ConvocatoriasController {
  constructor(private convocatoriasService: ConvocatoriasService) {}

  @Get()
  async get(): Promise<Convocatorias[]> {
    return this.convocatoriasService.get();
  }

  @Get(':id')
  async getConvocatoria(@Param('id') id:string): Promise<Convocatorias>{

    return this.convocatoriasService.getConvocatoria(id)
  } 

  @Post()
  async create(@Body() convocatoria: any) {
    return this.convocatoriasService.create(convocatoria);
  }

  @Put(':id')
  async updateConvocatoria(@Param('id') id:string, @Body() convocatoria:Convocatorias): Promise<any>{
    return this.convocatoriasService.updateConvocatoria(id,convocatoria)
  }


}
