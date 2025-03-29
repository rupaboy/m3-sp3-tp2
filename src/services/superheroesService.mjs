//Implementa la lógica de negocio, con los métodos de repositorio
//Para búsqueda, recuperción y filtrado de datos.

import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerTodosLosSuperheroes() { 
    return await SuperHeroRepository.obtenerTodos();
} 

export async function obtenerSuperheroePorId(id){
    return await SuperHeroRepository.obtenerPorId(id)
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor)
}

export async function obtenerSuperheroesMasPoderosos() {
    return await SuperHeroRepository.obtenerMasPoderosos();
}

export async function obtenerSuperheroesMasPoderososPlaneta(valor) {
    return await SuperHeroRepository.obtenerMasPoderososPlaneta(valor);
}

export async function obtenerSuperheroesMenosPoderosos() {
    return await SuperHeroRepository.obtenerMenosPoderosos();
}

export async function obtenerSuperheroesMenosPoderososPlaneta(valor) {
    return await SuperHeroRepository.obtenerMenosPoderososPlaneta(valor);
}

export async function obtenerSuperheroesSinPoderes() {
    return await SuperHeroRepository.obtenerSinPoderes();
}

export async function obtenerSuperheroesSinPoderesPlaneta(valor) {
    return await SuperHeroRepository.obtenerSinPoderesPlaneta(valor);
}

export async function agregarNuevoSuperheroe(nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador) {
    return await SuperHeroRepository.agregarNuevo(nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador)
}

export async function agregarNuevoTemplateSuperheroe() {
    return await SuperHeroRepository.agregarNuevoTemplate();
}

export async function agregarNuevoArraySuperheroes() {
    return await SuperHeroRepository.agregarNuevoArray();
}

// PUT

export async function editarSuperheroePorId(id) {
    return await SuperHeroRepository.editar(id);
}

export async function editarSuperheroePorIdAtributoValor(id, valor) {
    return await SuperHeroRepository.editarPorIdAtributoValor(id, valor)
}

export async function editarNombreSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarNombrePorId(id, valor)
}

export async function editarNombreRealSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarNombreRealPorId(id, valor)
}

export async function editarEdadSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarEdadPorId(id, valor)
}

export async function editarPlanetaOrigenSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarPlanetaOrigenPorId(id, valor)
}

export async function editarDebilidadSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarDebilidadPorId(id, valor)
}

export async function editarPoderesSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarPoderesPorId(id, valor)
}

export async function editarAliadosSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarAliadosPorId(id, valor)
}

export async function editarEnemigosSuperheroePorId(id, valor) {
    return await SuperHeroRepository.editarEnemigosPorId(id, valor)
}

export async function editarSuperheroePorIdAgregarPoder(id, valor) {
    return await SuperHeroRepository.editarPorIdAgregarPoder(id, valor)
}

export async function editarSuperheroePorIdQuitarPoder(id, valor) {
    return await SuperHeroRepository.editarPorIdQuitarPoder(id, valor)
}

export async function editarSuperheroePorIdAgregarAliado(id, valor) {
    return await SuperHeroRepository.editarPorIdAgregarAliado(id, valor)
}

export async function editarSuperheroePorIdQuitarAliado(id, valor) {
    return await SuperHeroRepository.editarPorIdQuitarAliado(id, valor)
}

export async function editarSuperheroePorIdAgregarEnemigo(id, valor) {
    return await SuperHeroRepository.editarPorIdAgregarEnemigo(id, valor)
}

export async function editarSuperheroePorIdQuitarEnemigo(id, valor) {
    return await SuperHeroRepository.editarPorIdQuitarEnemigo(id, valor)
}

export async function borrarSuperheroePorId(id) {
    return await SuperHeroRepository.borrarPorId(id); 
}


export async function borrarSuperheroePorNombre(valor) {
    return await SuperHeroRepository.borrarPorNombre(valor); 
}