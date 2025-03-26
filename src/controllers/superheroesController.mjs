//Implementa el controlador para gestionar solicitudes HTTP, llamando a services
//Y utilizando las vistas para presentar los datos

import {
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMasPoderosos,
    obtenerSuperheroesMasPoderososPlaneta,
    obtenerSuperheroesMenosPoderosos,
    obtenerSuperheroesMenosPoderososPlaneta,
    obtenerSuperheroesSinPoderes,
    obtenerSuperheroesSinPoderesPlaneta,
    obtenerSuperheroePorId,
    agregarNuevoSuperheroe,
    agregarNuevoTemplateSuperheroe,
    agregarNuevoArraySuperheroes,
    editarSuperheroePorId,
    editarSuperheroePorIdAtributoValor,
    editarSuperheroePorIdAgregarPoder,
    editarSuperheroePorIdQuitarPoder,
    editarSuperheroePorIdAgregarAliado,
    editarSuperheroePorIdQuitarAliado,
    editarSuperheroePorIdAgregarEnemigo,
    editarSuperheroePorIdQuitarEnemigo,
    borrarSuperheroePorId,
    borrarSuperheroePorNombre,


    } from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroesPorId,
    renderizarListaSuperheroes,
    renderizarSuperheroePorId} from '../views/responseView.mjs';


    
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe por _id no encontrado' });
        }
        //console.log(superheroe)
        const superheroeFormateado = renderizarSuperheroePorId(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener Superheroe por _id',
            error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesPorIdController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        if (!superheroes) {
            return res.status(404).send({ mensaje: 'No se encontraron _id de superheroes.' });
        }
        const superheroesFormateadosPorId = renderizarListaSuperheroesPorId(superheroes); //Nueva Vista con atributo ID
        res.status(200).json(superheroesFormateadosPorId);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los _id de los Superheroes',
            error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los Superhéroes',
            error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes por atributo',
            error: error.message });
    }
}

export async function buscarIdSuperheroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron _id de superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroesPorId(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar _id de superhéroes con ese atributo',
            error: error.message });
    }
}

export async function obtenerSuperheroesMasPoderososController(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMasPoderosos();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró a los superhéroes más poderosos.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener los superhéroes más poderosos.',
            error: error.message });
    }
}

export async function obtenerSuperheroesMasPoderososPlanetaController(req, res) {
    try {
        const {planeta} = req.params;
        const superheroes = await obtenerSuperheroesMasPoderososPlaneta(planeta);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró a los superhéroes más poderosos de ese planeta.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener los superhéroes más poderosos de ese planeta.',
            error: error.message });
    }
}

export async function obtenerSuperheroesMenosPoderososController(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMenosPoderosos();
        console.log(superheroes)
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró a los superhéroes menos poderosos' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener los superhéroes menos poderosos',
            error: error.message });
    }
}

export async function obtenerSuperheroesMenosPoderososPlanetaController(req, res) {
    try {
        const {planeta} = req.params;
        const superheroes = await obtenerSuperheroesMenosPoderososPlaneta(planeta);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró a los superhéroes menos poderosos de ese planeta.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener los superhéroes menos poderosos de ese planeta.',
            error: error.message });
    }
}

export async function obtenerSuperheroesSinPoderesController(req, res) {
    try {
        const superheroes = await obtenerSuperheroesSinPoderes();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes sin poderes.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes sin poderes.',
            error: error.message });
    }
}


export async function obtenerSuperheroesSinPoderesPlanetaController(req, res) {
    try {
        const {planeta} = req.params;
        const superheroes = await obtenerSuperheroesSinPoderesPlaneta(planeta);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró a los superhéroes sin poderes de ese planeta.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener los superhéroes sin poderes de ese planeta.',
            error: error.message });
    }
}

export async function agregarNuevoSuperheroeController(req, res) {
    try {
        
        const superheroeCreado = await agregarNuevoSuperheroe()
        if (superheroeCreado.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe creado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send (
            { mensaje: 'Error al crear superhéroe',
            error: error.message });
    }
}

export async function agregarNuevoTemplateSuperheroeController(req, res) {
    try {
        
        const superheroeCreado = await agregarNuevoTemplateSuperheroe()
        if (superheroeCreado.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe creado por template.' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send (
            { mensaje: 'Error al crear superhéroe por template.',
            error: error.message });
    }
}

export async function agregarNuevoArraySuperheroesController(req, res) {
    try {
        
        const superheroesCreados = await agregarNuevoArraySuperheroes()
        console.log(superheroesCreados.length)
        if (superheroesCreados.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes creados por array.' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroesCreados);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send (
            { mensaje: 'Error al crear superhéroes por array.',
            error: error.message });
    }
}

export async function editarSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        const superheroeEditado = await editarSuperheroePorId(id)
        //console.log(superheroeEditado)
        if (superheroeEditado.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró el superhéroe editado'});
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeEditado)
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send (
            { mensaje: 'Error al editar superhéroe',
            error: error.message });
    }
}

export async function editarSuperheroePorIdAtributoValorController(req, res) {
    try {
        const {id, atributo, valor} = req.params;
        const superheroe = await editarSuperheroePorIdAtributoValor(id, atributo, valor);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
            error: error.message });
    }
}

export async function editarSuperheroePorIdAgregarPoderController(req, res) {
    try {
        const {id, poder} = req.params;
        const superheroe = await editarSuperheroePorIdAgregarPoder(id, poder);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para agregarle un poder' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para agregarle un poder',
            error: error.message });
    }
}

export async function editarSuperheroePorIdQuitarPoderController(req, res) {
    try {
        const {id, poder} = req.params;
        const superheroe = await editarSuperheroePorIdQuitarPoder(id, poder);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para quitarle un poder' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para quitarle un poder',
            error: error.message });
    }
}

export async function editarSuperheroePorIdAgregarAliadoController(req, res) {
    try {
        const {id, aliado} = req.params;
        const superheroe = await editarSuperheroePorIdAgregarAliado(id, aliado);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para agregarle un aliado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para agregarle un aliado',
            error: error.message });
    }
}

export async function editarSuperheroePorIdQuitarAliadoController(req, res) {
    try {
        const {id, aliado} = req.params;
        const superheroe = await editarSuperheroePorIdQuitarAliado(id, aliado);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para quitarle un aliado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para quitarle un aliado',
            error: error.message });
    }
}

export async function editarSuperheroePorIdAgregarEnemigoController(req, res) {
    try {
        const {id, enemigo} = req.params;
        const superheroe = await editarSuperheroePorIdAgregarEnemigo(id, enemigo);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para agregarle un enemigo' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para agregarle un enemigo',
            error: error.message });
    }
}

export async function editarSuperheroePorIdQuitarEnemigoController(req, res) {
    try {
        const {id, enemigo} = req.params;
        const superheroe = await editarSuperheroePorIdQuitarEnemigo(id, enemigo);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró un superhéroe para quitarle un enemigo' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar un superhéroe para quitarle un enemigo',
            error: error.message });
    }
}


export async function borrarSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        const superheroeBorradoPorId = await borrarSuperheroePorId(id);
        //console.log(superheroeBorrado)
        if (superheroeBorradoPorId.lenght === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró una _id para borrar superhéroe'});
        }
        const superheroeFormateado = renderizarSuperheroePorId(superheroeBorradoPorId)
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send (
            {mensaje: 'Error al borrar superhéroe por Id',
            error: error.message });
        
    }
}

export async function borrarSuperheroePorNombreController(req, res) {
    try {
        const {nombre} = req.params;
        const superheroeBorradoPorNombre = await borrarSuperheroePorNombre(nombre);
        if (superheroeBorradoPorNombre.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontró el nombre del superhéroe a borrar' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeBorradoPorNombre)
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar superhéroe con ese nombre',
            error: error.message });
    }
}
