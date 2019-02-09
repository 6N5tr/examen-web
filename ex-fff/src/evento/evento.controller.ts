import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {ProductoService} from "../producto/producto.service";
import {ProductoEntity} from "../producto/producto.entity";
import {EventoEntity} from "./evento.entity";
import {In} from "typeorm";

@Controller('evento')
export class EventoController {
    constructor(
        private readonly _eventoService:EventoService,
        private readonly _productoService:ProductoService
    )
    {}

    @Get('registrar')
    async getEventos(
        @Res() response,
        @Session() session,
    ){
        let productos= await this._productoService.buscar()

        console.log(productos)
        let usuario = undefined
        let admin = undefined
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esUsuario){
            usuario = true;
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador){
            admin = true
        }

        response.render(
            'evento_registro',
            {
                productos:productos,
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Evento"
            }
        )
    }

    @Post('registrar')
    async registrarProductoPost(
        @Res() response,
        @Session() session,
        @Body() evento: Evento,
        @Body('productos')productos:[],
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        console.log(evento);
        let parametro ={};
        if(evento.productos.length > 1) {
            parametro = {
                where: [
                    {id: In(evento.productos)},
                ]
            }
        }else {
            parametro = {
                where: [
                    {id: evento.productos},
                ]
            }
        }
        const productos_eventos = await this._productoService.buscar(parametro);
        evento.productos = productos_eventos;
        console.log(productos_eventos);
        const nuevo = await this._eventoService.crear(evento);
        response.redirect("/")
    }

    @Get('ver/:idEvento')
    async verEvento(
        @Param('idEvento')idEvento: string,
        @Res() response,
        @Session() session,
    ) {
        let admin =undefined;
        let usuario = undefined;
        if(session.usuario){

            if (session.usuario.esUsuario){
                usuario = true
            }
            if(session.usuario.esAdministrador){
                admin = true
            }
        }
        const eventoEncontrado = await this._eventoService
            .buscarPorId(+idEvento);
        response.render(
            'evento_ver',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Ver evento",
                evento:eventoEncontrado,
            })
    }

}
