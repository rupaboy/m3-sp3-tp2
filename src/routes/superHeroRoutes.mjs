//Define las rutas necesarias para cada operación del controlador.

import express from 'express';

    //Validator
import { validationResult } from 'express-validator';
import { validationHandler } from '../validators/errorHandler.mjs';
import {
    atributeParamsSanitizer,
    lowLevelStringValidations,
    midLevelStringValidations,
    highLevelStringValidations,
    //lowLevelNumberValidations,
    //mediumLevelNumberValidations,
    //lowLevelArrayrValidations,
    lowLevelSanitizer,
    midLevelSanitizer,
    highLevelSanitizer,

} from '../validators/superheroesRules.mjs';

    //Controllers
import { 
    obtenerTodosLosSuperheroesPorIdController,
    obtenerTodosLosSuperheroesController,
    obtenerSuperheroePorIdController,
    obtenerSuperheroesMasPoderososController,
    obtenerSuperheroesMenosPoderososController,
    obtenerSuperheroesSinPoderesController,
    obtenerSuperheroesMasPoderososPlanetaController,
    obtenerSuperheroesMenosPoderososPlanetaController,
    obtenerSuperheroesSinPoderesPlanetaController,
    buscarSuperheroesPorAtributoController,
    buscarIdSuperheroesPorAtributoController,
    //agregarNuevoSuperheroeController,
    agregarNuevoTemplateSuperheroeController,
    agregarNuevoArraySuperheroesController,
    editarSuperheroePorIdAtributoValorController,
    editarSuperheroePorIdAgregarPoderController,
    editarSuperheroePorIdQuitarPoderController,
    editarSuperheroePorIdAgregarAliadoController,
    editarSuperheroePorIdQuitarAliadoController,
    editarSuperheroePorIdAgregarEnemigoController,
    editarSuperheroePorIdQuitarEnemigoController,
    //editarSuperheroePorIdController,
    borrarSuperheroePorIdController,
    borrarSuperheroePorNombreController,
    
} from '../controllers/superheroesController.mjs';


// Router
const router = express.Router();

//GET
//Collection

router.get('/heroes',[
//Validar parámetros ''
//param('')    
], obtenerTodosLosSuperheroesController);




router.get('/heroes/id',[
//Validar parámetros ''
//param('')    
], obtenerTodosLosSuperheroesPorIdController);


router.get('/heroes/id/:atributo/:valor',
    atributeParamsSanitizer(),
    lowLevelSanitizer(),
    lowLevelStringValidations(),
    buscarIdSuperheroesPorAtributoController)


router.get('/heroes/mas-poderosos/',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesMasPoderososController);




router.get('/heroes/mas-poderosos/:planeta',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesMasPoderososPlanetaController);




router.get('/heroes/menos-poderosos/',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesMenosPoderososController);




router.get('/heroes/menos-poderosos/:planeta',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesMenosPoderososPlanetaController);




router.get('/heroes/sin-poderes/',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesSinPoderesController);




router.get('/heroes/sin-poderes/:planeta',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroesSinPoderesPlanetaController);




router.get('/heroes/:atributo/:valor',
atributeParamsSanitizer(),
lowLevelSanitizer(),
lowLevelStringValidations(),
buscarSuperheroesPorAtributoController);



router.get('/heroes/:id',[
//Validar parámetros ''
//param('')    
], obtenerSuperheroePorIdController);

//POST




router.post('/heroes/nuevo/template',[
//Validar parámetros ''
//param('')    
], agregarNuevoTemplateSuperheroeController) //Template ../helper/templateHeroeNuevo.mjs




router.post('/heroes/nuevo/array',[
//Validar parámetros ''
//param('')    
], agregarNuevoArraySuperheroesController) //Array ../helper/templateHeroeNuevo.mjs




//router.post('/heroes/nuevo',[
//Validar parámetros ''
//// param('')// ], agregarNuevoSuperheroeController)

//PUT




//router.put('/heroes/:id/:atributo/:valor', (req, res) => {
////Validar parámetros ''
//const { id , valorr } = req.params 
////param('')    
//    //putAtributoValor
//, editarSuperheroePorIdAtributoValorController}) //.../_id/edad/numero de años...
////Arrays
//

router.put('heroes/:id/:atributo/:valor', (req, res) => {
    const { id, atributo, valor } = req.params
//        putValorValidation(id, atributo, valor),
        editarSuperheroePorIdAtributoValorController})



router.put('/heroes/:id/agregar/poder/:poder', (req, res) => {
    const { id , poder } = req.params 
    //Validar parámetros ''
        lowLevelStringValidations(id, poder),
        editarSuperheroePorIdAgregarPoderController})



router.put('/heroes/:id/quitar/poder/:poder',[
//Validar parámetros ''
//param('')    
], editarSuperheroePorIdQuitarPoderController)




router.put('/heroes/:id/agregar/aliado/:aliado',[
//Validar parámetros ''
//param('')    
], editarSuperheroePorIdAgregarAliadoController)




router.put('/heroes/:id/quitar/aliado/:aliado',[
//Validar parámetros ''
//param('')    
], editarSuperheroePorIdQuitarAliadoController)




router.put('/heroes/:id/agregar/enemigo/:enemigo',[
//Validar parámetros ''
//param('')    
], editarSuperheroePorIdAgregarEnemigoController)




router.put('/heroes/:id/quitar/enemigo/:enemigo',[
//Validar parámetros ''
//param('')    
], editarSuperheroePorIdQuitarEnemigoController)




//router.put('/heroes/editar/:id',[
//Validar parámetros ''
//// param('')// ], editarSuperheroePorIdController) //..Pasa un id para editar. Deprecated.

//DELETE




router.delete('/heroes/borrar/id/:id',[
//Validar parámetros ''
//param('')    
], borrarSuperheroePorIdController)




router.delete('/heroes/borrar/nombre/:nombre',[
//Validar parámetros ''
//param('')    
], borrarSuperheroePorNombreController)

export default router;