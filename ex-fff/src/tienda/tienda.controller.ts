import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Tienda, TiendaService} from "./tienda.service";

@Controller('tienda')
export class TiendaController {
    constructor(
        private readonly _tiendaService:TiendaService,
    )
    {}

    @Get('registrar')
    registrarTienda(
        @Res() response,
        @Session() session
    )
    {   let admin = undefined
        let usuario = undefined
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
            'tienda_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Tienda"
            }
        )
    }

    @Post('registrar')
    async registrarTiendaPost(
        @Res() response,
        @Session() session,
        @Body() tienda: Tienda,
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        tienda.usuario = session.usuario.id;
        const tienda_nuevo = await this._tiendaService.crear(tienda);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._tiendaService.buscar();
    }


}
