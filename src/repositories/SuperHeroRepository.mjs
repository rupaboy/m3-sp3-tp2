//Repositorio centralizado que implementa los métodos definidos en la interfáz,
//realizando operaciones de datos uniformes y controladas con MongoDB

import SuperHero from '../models/SuperHero.mjs';
import IRepository from '../repositories/IRepository.mjs';
import { templateHeroeNuevo, arraySuperheroesBackup } from '../helper/templateHeroeNuevo.mjs';

class SuperHeroRepository extends IRepository {
    
    
    async obtenerPorId(id) {;  //OK
        return await SuperHero.findById(id)
    }

    
    async obtenerTodos() {  //OK
        return await SuperHero.find().sort({ nombreSuperHeroe: 1 }) //Orden alfabético!
    }


    async buscarPorAtributo(atributo, valor) { //Testing
        const valorLowCase = valor.toLowerCase();
        const valorRegEx = new RegExp(valorLowCase, 'i');
        
        switch(atributo) {
            case 'edad':
                {
                    return await SuperHero.find({[atributo]: valor});
                }
            default:
                {
                    const consultaRegEx = {
                        [atributo]: { $regex: valorRegEx }}   
                        return await SuperHero.find(consultaRegEx);
                }
        }         
    }

    
    async obtenerMasPoderosos() { //OK Old MAYORES-30
        return await SuperHero.find({
            $expr: { $gte: [{ $size: "$poderes" }, 5 ]}
        });
    }

    
    async obtenerMasPoderososPlaneta( valor ) { 
        
        const planetaLowCase = valor.toLowerCase();
        const planetaRegEx = new RegExp(planetaLowCase, 'i');
        const consultaRegEx = {
            edad: { $gt: 20 },
            planetaOrigen: { $regex: planetaRegEx },
            $expr: { $gte: [{ $size: "$poderes" }, 2 ]}}
        
        return await SuperHero.find(consultaRegEx);
    }

     
    async obtenerMenosPoderosos() { //TESTING
        
        return await SuperHero.find(
            {
                edad: { $lt: 110 },
                $or: [
                { poderes: { $size: 1 } },
                { poderes: { $size: 0 } }
                ]
        })
    }
    
    
    async obtenerMenosPoderososPlaneta( valor ) { 
        
        const planetaLowCase = valor.toLowerCase();
        const planetaRegEx = new RegExp(planetaLowCase, 'i');
        const consultaRegEx = {
            edad: { $lt: 110 }, //Si son más longevos no apareceran aquí.
            planetaOrigen: { $regex: planetaRegEx },
            $or: [
                { poderes: { $size: 1 } },  
                { poderes: { $size: 0 } }
            ]
        };
        return await SuperHero.find(consultaRegEx);
    }
   
    
    async obtenerSinPoderes() { 
        return await SuperHero.find(
            {
                poderes: { $size: 0 }
            }
        )
    }

    
    
    async obtenerSinPoderesPlaneta( valor ) { 

        const planetaLowCase = valor.toLowerCase();
        const planetaRegEx = new RegExp(planetaLowCase, 'i');
        const consultaRegEx = {
            planetaOrigen: { $regex: planetaRegEx },
             poderes: { $size: 0 }
            };

        return await SuperHero.find(consultaRegEx)
    }

    
    
    async agregarNuevo(nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador) {
        const hero = new SuperHero(
            {
                nombreSuperHeroe: nombreSuperHeroe,
                nombreReal: nombreReal,
                edad: edad,
                planetaOrigen: planetaOrigen,
                debilidad: debilidad,
                poderes: poderes,
                aliados: aliados,
                enemigos: enemigos,
                creador: creador
            }
        );
        //console.log(hero)
        return await hero.save();
    }

    
    async agregarNuevoTemplate() { 
        
        const hero = new SuperHero(templateHeroeNuevo);
        //console.log(hero)
        return await hero.save();
    }
    
       
    async agregarNuevoArray() { 

        const superheroesCreados = []; //Crea un array
        for (const heroe of arraySuperheroesBackup) { //Itera importación
            const hero = new SuperHero(heroe); //Al constructor
            const heroeNuevo = await hero.save(); //Guarda cada héroe
            superheroesCreados.push(heroeNuevo); //Agrega al array original
            }
            //console.log('Todos los heroes han sido añadidos')
            return superheroesCreados
        }
       
    //PUT
    
    async editarPorId(id) { //
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { edad: 50 } },
            { returnDocument: 'after' }
        );
    }   
    
    async editarPorIdAtributoValor(id, atributo, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { [atributo]: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarNombrePorId(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { nombreSuperHeroe: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarNombreRealPorId(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { nombreReal: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarEdadPorId(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { edad: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarPlanetaOrigenPorId(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { planetaOrigen: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarDebilidadPorId(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $set: { debilidad: valor } },
            { returnDocument: 'after' }
        );
    }

    async editarPoderesPorId(id, valor) { 
        
        return await SuperHero.findOneAndUpdate(
            { _id: id},
            { $set: { poderes: valor } }, // Reemplaza el array completo
            { returnDocument: 'after' }
        );
    }

    async editarAliadosPorId(id, valor) { 
       
        return await SuperHero.findOneAndUpdate(
            { _id: id},
            { $set: { aliados: valor } }, // Reemplaza el array completo
            { returnDocument: 'after' }
        );
    }

    async editarEnemigosPorId(id, valor) { 
        
        return await SuperHero.findOneAndUpdate(
            { _id: id},
            { $set: { enemigos: valor } }, // Reemplaza el array completo
            { returnDocument: 'after' }
        );
    }    
    
    async editarPorIdAgregarPoder(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $push: { poderes: valor } },
            { returnDocument: 'after' }
        );
    }

    
    
    async editarPorIdAgregarAliado(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $push: { aliados: valor } },
            { returnDocument: 'after' }
        );
    }
    
    
    
    async editarPorIdAgregarEnemigo(id, valor) { 
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $push: { enemigos: valor } },
            { returnDocument: 'after' }
        );
    }

    
    async editarPorIdQuitarPoder(id, valor) {         

        const poderLowCase = valor.toLowerCase();
        const poderRegExp = new RegExp(poderLowCase, 'i');
        
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $pull: { poderes: poderRegExp } },
            { returnDocument: 'after' }
        );
    }

    
    async editarPorIdQuitarAliado(id, valor) { 
    
        const aliadoLowCase = valor.toLowerCase();
        const aliadoRegExp = new RegExp(aliadoLowCase, 'i');
        
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $pull: { aliados: aliadoRegExp } },
            { returnDocument: 'after' }
        );
    }

    
    async editarPorIdQuitarEnemigo(id, valor) {
       
        const enemigoLowCase = valor.toLowerCase();
        const enemigoRegExp = new RegExp(enemigoLowCase, 'i');
        
        return await SuperHero.findOneAndUpdate(
            { _id: id },
            { $pull: { enemigos: enemigoRegExp } },
            { returnDocument: 'after' }
        );
    }

    
    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id)
    }

    
    async borrarPorNombre(valor) { 
        
        const nombreLowCase = valor.toLowerCase();
        const nombreRegExp = new RegExp(nombreLowCase, 'i');

        return await SuperHero.findOneAndDelete(
            { nombreSuperHeroe: nombreRegExp }
        )
    }

};

export default new SuperHeroRepository();