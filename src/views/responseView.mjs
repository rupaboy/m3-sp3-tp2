//Define las funciones de presentación de datos.
//Organiza la información de los superhéroes en un formato estructurado.

export function renderizarSuperheroe(superheroe) {
    return {
        "Nombre": superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        "Edad": superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        "Debilidad": superheroe.debilidad,
        "Poderes": superheroe.poderes,
        "Aliados": superheroe.aliados,
        "Enemigos": superheroe.enemigos
    };
}

export function renderizarSuperheroePorId(superheroe) { //Nueva Vista para ver id
    return {
        "_id": superheroe._id,
        "Nombre": superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        "Edad": superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        "Debilidad": superheroe.debilidad,
        "Poderes": superheroe.poderes,
        "Aliados": superheroe.aliados,
        "Enemigos": superheroe.enemigos
    };
}

//Para Renderizar Arrays

export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}

export function renderizarListaSuperheroesPorId(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroePorId(superheroe))};
