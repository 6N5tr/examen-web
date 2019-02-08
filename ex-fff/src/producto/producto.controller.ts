import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Producto, ProductoService} from "./producto.service";

@Controller('producto')
export class ProductoController {
    constructor(
        private readonly _productoService:ProductoService,
    )
    {}

    @Get('registrar')
    registrarProducto(
        @Res() response,
        @Session() session
    )
    {
        let admin = undefined;
        let usuario = undefined;

        if(!session.usuario){
            response.redirect("/")
        }

        if (session.usuario.esUsuario){
            usuario = true
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        if (session.usuario.esAdministrador){
            admin = true
        }

        response.render(
            'producto_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar producto"
            }
        )
    }

    @Post('registrar')
    async registrarProductoPost(
        @Res() response,
        @Session() session,
        @Body() producto: Producto,
    ){

        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }
        console.log(producto);
        const producto_nuevo = await this._productoService.crear(producto);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._productoService.buscar();
    }


}
