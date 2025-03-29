//Define las rutas necesarias para cada operación del controlador.

import express from 'express';

    //Express-Validator
import { validationHandler } from '../validators/errorHandler.mjs';
import {
    //Validators for Param
    lowLevelParamStringValidations,
    midLevelParamStringValidations,
    lowLevelParamNumberValidations,
    lowLevelParamArrayValidations,
    mongoIdParamValidator,
    byAttributeParamValidations,
    //Sanitizers for Param
    attributeParamSanitizer,
    lowLevelParamStringSanitizer,
    midLevelParamStringSanitizer,
    highLevelParamStringSanitizer,
    lowLevelParamArraySanitizer,
    midLevelParamArraySanitizer,
    highLevelParamArraySanitizer,

} from '../validators/superheroesParamRules.mjs';

import {
    //Validators for Body
    lowLevelBodyStringValidations,
    midLevelBodyStringValidations,
    lowLevelBodyNumberValidations,
    lowLevelBodyArrayValidations,
    mongoIdBodyValidator,
    //Sanitizers for Body
    lowLevelBodyStringSanitizer,
    midLevelBodyStringSanitizer,
    highLevelBodyStringSanitizer,
    lowLevelBodyArraySanitizer,
    midLevelBodyArraySanitizer,
    highLevelBodyArraySanitizer,

} from '../validators/superheroesBodyRules.mjs';

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
    agregarNuevoSuperheroeController,
    
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
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    validationHandler,
    obtenerSuperheroesMasPoderososPlanetaController);

router.get('/heroes/menos-poderosos/:valor', //Valor debe ser un planeta
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    validationHandler,
    obtenerSuperheroesMenosPoderososPlanetaController);

router.get('/heroes/sin-poderes/:valor', //Valor debe ser un planeta
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    validationHandler,
    obtenerSuperheroesSinPoderesPlanetaController);

router.get('/heroes', obtenerTodosLosSuperheroesController); //Listar todos los heroes

router.get('/heroes/id', obtenerTodosLosSuperheroesPorIdController); //Listar todos con Id

router.get('/heroes/id/:id', //Buscar héroe por Id
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    validationHandler,
    obtenerSuperheroePorIdController);

router.get('/heroes/:atributo/:valor', //Búscar por atributo valor,funcionamiento sub-optimo
    attributeParamSanitizer(),
    byAttributeParamValidations(),
    validationHandler,
    buscarSuperheroesPorAtributoController);

router.get('/heroes/id/:atributo/:valor', //Búscar Id por atributo valor, funcionamiento sub-optimo
    attributeParamSanitizer(),
    byAttributeParamValidations(),
    validationHandler,
    buscarIdSuperheroesPorAtributoController)

//POST

router.post('/heroes/nuevo/',
    highLevelBodyStringSanitizer(),
    highLevelBodyArraySanitizer(),
    lowLevelBodyStringValidations(),
    lowLevelBodyArrayValidations(),
    lowLevelBodyNumberValidations(),
    validationHandler,
    agregarNuevoSuperheroeController)


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
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarNombreSuperheroePorIdController);

router.put('/heroes/:id/nombreReal/:valor', //Valor: nuevo nombre real
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarNombreRealSuperheroePorIdController);

router.put('/heroes/:id/edad/:valor', //Valor: nueva edad
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    lowLevelParamNumberValidations(),
    lowLevelBodyNumberValidations(),
    validationHandler,
    editarEdadSuperheroePorIdController);

router.put('/heroes/:id/planetaOrigen/:valor', //Valor: nuevo planeta
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarPlanetaOrigenSuperheroePorIdController);

router.put('/heroes/:id/debilidad/:valor', //Valor: nueva debilidad
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarDebilidadSuperheroePorIdController);

router.put('/heroes/:id/poderes/:valor', //Valor: nuevo Array de poderes (separar con ,)
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamArraySanitizer(),
    lowLevelParamArrayValidations(),
    highLevelBodyArraySanitizer(),
    lowLevelBodyArrayValidations(),
    validationHandler,
    editarPoderesSuperheroePorIdController);

router.put('/heroes/:id/aliados/:valor', //Valor: nuevo Array de aliados (separar con ,)
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamArraySanitizer(),
    lowLevelParamArrayValidations(),
    highLevelBodyArraySanitizer(),
    lowLevelBodyArrayValidations(),
    validationHandler,
    editarAliadosSuperheroePorIdController);

router.put('/heroes/:id/enemigos/:valor', //Valor: nuevo Array de enemigos (separar con ,)
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamArraySanitizer(),
    lowLevelParamArrayValidations(),
    highLevelBodyArraySanitizer(),
    lowLevelBodyArrayValidations(),
    validationHandler,
    editarEnemigosSuperheroePorIdController);

router.put('/heroes/:id/agregar/poder/:valor', //Valor: nuevo Poder
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarPoderController);

router.put('/heroes/:id/quitar/poder/:valor', //Valor: quitar un poder
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarPoderController)


router.put('/heroes/:id/agregar/aliado/:valor', //Valor: nuevo aliado
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarAliadoController)


router.put('/heroes/:id/quitar/aliado/:valor', //Valor: quitar un aliado
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarAliadoController)


router.put('/heroes/:id/agregar/enemigo/:valor', //Valor: nuevo enemigo
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    highLevelParamStringSanitizer(),
    midLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdAgregarEnemigoController)


router.put('/heroes/:id/quitar/enemigo/:valor', //Valor: quitar un enemigo
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    lowLevelParamStringSanitizer(),
    lowLevelParamStringValidations(),
    highLevelBodyStringSanitizer(),
    midLevelBodyStringValidations(),
    validationHandler,
    editarSuperheroePorIdQuitarEnemigoController)

    /*
router.post('/heroes/:id/editar', //Subóptimo. Nuevas funcionalidades arriba.
    mongoIdBodyValidator(),
    highLevelBodyStringSanitizer(),
    highLevelBodyArraySanitizer(),
    lowLevelBodyStringValidations(),
    lowLevelBodyArrayValidations(),
    lowLevelBodyNumberValidations(),
    validationHandler,
    agregarNuevoSuperheroeController)
*/

//router.put('/heroes/editar/:id'
// ], editarSuperheroePorIdController) //..Pasa un id para editar. Deprecated.

//DELETE

router.delete('/heroes/id/:id', //Borrar por Id
    mongoIdParamValidator(),
    mongoIdBodyValidator(),
    borrarSuperheroePorIdController)

router.delete('/heroes/nombre/:valor', //Valor: Nombre de héroe a borrar
    lowLevelParamStringValidations(),
    lowLevelBodyStringValidations(),
    borrarSuperheroePorNombreController)

export default router;