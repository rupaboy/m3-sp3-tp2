//Define las rutas necesarias para cada operación del controlador.

import express from 'express';

    //Validators
import { validationResult } from 'express-validator';
import { validationHandler } from '../validators/errorHandler.mjs';
import {
    lowLevelStringValidations,
    midLevelStringValidations,
    highLevelStringValidations,
    lowLevelNumberValidations,
    //mediumLevelNumberValidations,
    lowLevelArrayValidations,
    lowLevelStringSanitizer,
    midLevelStringSanitizer,
    highLevelStringSanitizer,
    //lowLevelArraySanitizer,
    highLevelArraySanitizer,
    attributeParamsSanitizer,
    byAttributeValidations

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
    editarNombreSuperheroePorIdController,
    editarNombreRealSuperheroePorIdController,
    editarEdadSuperheroePorIdController,
    editarPlanetaOrigenSuperheroePorIdController,
    editarDebilidadSuperheroePorIdController,
    editarPoderesSuperheroePorIdController,
    editarAliadosSuperheroePorIdController,
    editarEnemigosSuperheroePorIdController,
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

router.get('/heroes', obtenerTodosLosSuperheroesController);


router.get('/heroes/id', obtenerTodosLosSuperheroesPorIdController);


router.get('/heroes/id/:atributo/:valor',
    lowLevelStringSanitizer(),
    attributeParamsSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    buscarIdSuperheroesPorAtributoController)


router.get('/heroes/mas-poderosos/', obtenerSuperheroesMasPoderososController);


router.get('/heroes/mas-poderosos/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesMasPoderososPlanetaController);


router.get('/heroes/menos-poderosos/',
    obtenerSuperheroesMenosPoderososController);


router.get('/heroes/menos-poderosos/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesMenosPoderososPlanetaController);


router.get('/heroes/sin-poderes/',
    obtenerSuperheroesSinPoderesController);


router.get('/heroes/sin-poderes/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesSinPoderesPlanetaController);


router.get('/heroes/:atributo/:valor',
    attributeParamsSanitizer(),
    byAttributeValidations(),
    validationHandler,
    buscarSuperheroesPorAtributoController);


router.get('/heroes/:id',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroePorIdController);

//POST


router.post('/heroes/nuevo/template',[
//Validar parámetros ''
//param('')    
], agregarNuevoTemplateSuperheroeController) //Template ../helper/templateHeroeNuevo.mjs


router.post('/heroes/nuevo/array',[
//Validar parámetros ''
//param('')    
], agregarNuevoArraySuperheroesController) //Array ../helper/templateHeroeNuevo.mjs


//PUT
//
//router.put('heroes/:id/:atributo/:valor', (req, res) => {
//    const { id, atributo, valor } = req.params
////        putValorValidation(id, atributo, valor),
//        editarSuperheroePorIdAtributoValorController})
//
router.put('/heroes/:id/nombreSuperHeroe/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarNombreSuperheroePorIdController);

router.put('/heroes/:id/nombreReal/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarNombreRealSuperheroePorIdController);

router.put('/heroes/:id/edad/:valor',
    lowLevelNumberValidations(),
    validationHandler,
    editarEdadSuperheroePorIdController);

router.put('/heroes/:id/planetaOrigen/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarPlanetaOrigenSuperheroePorIdController);

router.put('/heroes/:id/debilidad/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarDebilidadSuperheroePorIdController);

router.put('/heroes/:id/poderes/:valor',
    highLevelArraySanitizer(),
    lowLevelArrayValidations(),
    validationHandler,
    editarPoderesSuperheroePorIdController);

router.put('/heroes/:id/aliados/:valor',
    lowLevelArrayValidations(),
    validationHandler,
    editarAliadosSuperheroePorIdController);

router.put('/heroes/:id/enemigos/:valor',
    lowLevelArrayValidations(),
    validationHandler,
    editarEnemigosSuperheroePorIdController);

router.put('/heroes/:id/agregar/poder/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarPoderController);

router.put('/heroes/:id/quitar/poder/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarPoderController)


router.put('/heroes/:id/agregar/aliado/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarAliadoController)


router.put('/heroes/:id/quitar/aliado/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarAliadoController)


router.put('/heroes/:id/agregar/enemigo/:valor',
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarEnemigoController)


router.put('/heroes/:id/quitar/enemigo/:valor',
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarEnemigoController)


//router.put('/heroes/editar/:id'
//Validar parámetros ''
//// param('')// ], editarSuperheroePorIdController) //..Pasa un id para editar. Deprecated.



//DELETE

router.delete('/heroes/borrar/id/:id',
borrarSuperheroePorIdController)


router.delete('/heroes/borrar/nombre/:valor',
borrarSuperheroePorNombreController)

export default router;