import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';

import {PokemonEntity} from "./pokemon.entity";
import {PokemonService} from "./pokemon.service";
import {PokemonController} from "./pokemon.controller";

@Module({
    imports:[TypeOrmModule.forFeature([PokemonEntity])],
    controllers:[PokemonController],
    providers:[PokemonService],
    exports:[PokemonService]
})
export class PokemonModule {

}
