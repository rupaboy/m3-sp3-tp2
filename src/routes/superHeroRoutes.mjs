//Define las rutas necesarias para cada operación del controlador.

import express from 'express';

    //Express-Validator
import { validationResult } from 'express-validator';
import { validationHandler } from '../validators/errorHandler.mjs';
import {
    //Validators
    lowLevelStringValidations,
    midLevelStringValidations,
    highLevelStringValidations,
    lowLevelNumberValidations,
    lowLevelArrayValidations,
    byAttributeValidations,
    //Sanitizers
    attributeParamsSanitizer,
    lowLevelStringSanitizer,
    midLevelStringSanitizer,
    highLevelStringSanitizer,
    lowLevelArraySanitizer,
    midLevelArraySanitizer,
    highLevelArraySanitizer,

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
    //editarSuperheroePorIdAtributoValorController,
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

router.get('/heroes/mas-poderosos',
    obtenerSuperheroesMasPoderososController);

router.get('/heroes/menos-poderosos',
    obtenerSuperheroesMenosPoderososController);

router.get('/heroes/sin-poderes',
    obtenerSuperheroesSinPoderesController);
        
router.get('/heroes/mas-poderosos/:valor', //Valor debe ser un planeta
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesMasPoderososPlanetaController);

router.get('/heroes/menos-poderosos/:valor', //Valor debe ser un planeta
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesMenosPoderososPlanetaController);

router.get('/heroes/sin-poderes/:valor', //Valor debe ser un planeta
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroesSinPoderesPlanetaController);

router.get('/heroes', obtenerTodosLosSuperheroesController); //Listar todos los heroes

router.get('/heroes/id', obtenerTodosLosSuperheroesPorIdController); //Listar todos con ID

router.get('/heroes/:id', //Buscar héroe por ID
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    obtenerSuperheroePorIdController);

router.get('/heroes/:atributo/:valor', //Búscar por atributo valor,funcionamiento sub-optimo
    attributeParamsSanitizer(),
    byAttributeValidations(),
    validationHandler,
    buscarSuperheroesPorAtributoController);


router.get('/heroes/id/:atributo/:valor', //Búscar ID por atributo valor, funcionamiento sub-optimo
    attributeParamsSanitizer(),
    byAttributeValidations(),
    validationHandler,
    buscarIdSuperheroesPorAtributoController)

//POST

router.post('/heroes/nuevo/template',
    agregarNuevoTemplateSuperheroeController) //Template ../helper/templateHeroeNuevo.mjs

router.post('/heroes/nuevo/array', 
    agregarNuevoArraySuperheroesController) //Array ../helper/templateHeroeNuevo.mjs


//PUT
/*
router.put('heroes/:id/:atributo/:valor', (req, res) => {   // Funcionamiento suboptimo.
    const { id, atributo, valor } = req.params              // Deprecated.
        putValorValidation(id, atributo, valor),
        editarSuperheroePorIdAtributoValorController})      // Abajo nuevas funcionalidades.
*/

router.put('/heroes/:id/nombreSuperHeroe/:valor', //Valor: nuevo nombre
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarNombreSuperheroePorIdController);

router.put('/heroes/:id/nombreReal/:valor', //Valor: nuevo nombre real
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarNombreRealSuperheroePorIdController);

router.put('/heroes/:id/edad/:valor', //Valor: nueva edad
    lowLevelNumberValidations(),
    validationHandler,
    editarEdadSuperheroePorIdController);

router.put('/heroes/:id/planetaOrigen/:valor', //Valor: nuevo planeta
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarPlanetaOrigenSuperheroePorIdController);

router.put('/heroes/:id/debilidad/:valor', //Valor: nueva debilidad
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarDebilidadSuperheroePorIdController);

router.put('/heroes/:id/poderes/:valor', //Valor: nuevo Array de poderes (separar con ,)
    highLevelArraySanitizer(),
    lowLevelArrayValidations(),
    validationHandler,
    editarPoderesSuperheroePorIdController);

router.put('/heroes/:id/aliados/:valor', //Valor: nuevo Array de aliados (separar con ,)
    highLevelArraySanitizer(),
    lowLevelArrayValidations(),
    validationHandler,
    editarAliadosSuperheroePorIdController);

router.put('/heroes/:id/enemigos/:valor', //Valor: nuevo Array de enemigos (separar con ,)
    highLevelArraySanitizer(),
    lowLevelArrayValidations(),
    validationHandler,
    editarEnemigosSuperheroePorIdController);

router.put('/heroes/:id/agregar/poder/:valor', //Valor: nuevo Poder
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarPoderController);

router.put('/heroes/:id/quitar/poder/:valor', //Valor: quitar un poder
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarPoderController)


router.put('/heroes/:id/agregar/aliado/:valor', //Valor: nuevo aliado
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarAliadoController)


router.put('/heroes/:id/quitar/aliado/:valor', //Valor: quitar un aliado
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarAliadoController)


router.put('/heroes/:id/agregar/enemigo/:valor', //Valor: nuevo enemigo
    highLevelStringSanitizer(),
    midLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarEnemigoController)


router.put('/heroes/:id/quitar/enemigo/:valor', //Valor: quitar un enemigo
    lowLevelStringSanitizer(),
    lowLevelStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarEnemigoController)


//router.put('/heroes/editar/:id'
// ], editarSuperheroePorIdController) //..Pasa un id para editar. Deprecated.


//DELETE

router.delete('/heroes/borrar/id/:id', //Borrar por Id
borrarSuperheroePorIdController)


router.delete('/heroes/borrar/nombre/:valor', //Valor: Nombre de héroe a borrar
borrarSuperheroePorNombreController)

export default router;