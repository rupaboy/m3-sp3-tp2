import {param, body} from 'express-validator'



// STRING __________________________________________________ SANITIZER
export const lowLevelStringSanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    })
];


export const midLevelStringSanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        const palabras = value
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")
                .replace(/['\s]*-\s*['\s]*/g, '-')  // Elimina los apóstrofes y espacios alrededor del guion
                .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
                .replace(/^([a-z])/g, (match, p1) => p1.toUpperCase()) // Convierte la primera letra de la frase a mayúscula

            return palabras
        })
] 


export const highLevelStringSanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        const articulos = new Set([ 'de', 'del', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a', 'ante', 'bajo', 'con', 'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sobre', 'tras', 'y', 'o', 'ni', 'que', 'pero', 'aunque', 'porque', 'pues', 'como', 'cuando', 'donde', 'mientras', 'aunque' ]);

        const palabras = value.split(/([ ']+)/)

        let nuevaFrase = []  //Reconstruye el String poniendo en mayúsculas la primera letra excepto articulos.

            palabras.forEach((palabra, index) => {
                if (index === 0 || !articulos.has(palabra)) {
                    const nuevaPalabra = palabra.charAt(0).toUpperCase() + palabra.slice(1); //Que sea mayus
                    nuevaFrase.push(nuevaPalabra)
                } else {
                nuevaFrase.push(palabra) //que sea minus
            }
        });

        return nuevaFrase.join('')
            .replace(/\s*-\s*/g, '-') //"Hola - mundo", se transformará en "Hola-mundo"
            .replace(/\s+/g, ' ') //Elimina repeticiones de espacios.
            .replace(/-+/g, '-') //Elimina repeticiones de guiones medios.
            .replace(/'+/g, "'") ////Elimina repeticiones de apóstrofes.
                .replace(/['\s]*-\s*['\s]*/g, '-')  // Elimina los apóstrofes y espacios alrededor del guion
                .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
                .replace(/^([a-z])/g, (match, p1) => p1.toUpperCase()); // Convierte la primera letra de la frase a mayúscula
        })
] 



// STRING __________________________________________________ VALIDATION
export const lowLevelStringValidations = () => [

    // ¡La string debe existir!
    // ¡La string no debe estar vacía!
    // El largo deberá ser >3 && <60
    // Sanitiza espacios alrededor de la string.

    param('valor')
    .exists().withMessage(
        `El nombre es obligatorio.`)
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía de texto.`) //OK
    .trim()
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`) //OK

]


export const midLevelStringValidations = () => [
    
    // Solo Letras, numeros y ( ) (-) (')
    // Al menos una mayus o num.
    // Sólo letras inicio y final.
    // 2/1 (''-) / (--') MAX

    param('valor')
    .exists().withMessage(
        `El nombre es obligatorio.`)
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía de texto.`) //OK
    .trim()
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El nombre no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El nombre no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`) //OK
]

export const highLevelStringValidations = () => [
    
    param('valor')

    .exists().withMessage(
        `El nombre es obligatorio.`)
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía de texto.`) //OK
    .trim()
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El nombre no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El nombre no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`) //OK
    //Sólo admite caractéres alfabéticos
    //Sólo admite minúsculas

    .isAlpha().withMessage(
        `El nombre sólo admite caractéres alfabéticos`) //OK`
    .custom((value) => {
        if (value !== value.toLowerCase()) {
          throw new Error(`El nombre solamente acepta letras minúsculas.`);
        }
        return true;
      })
]


// NUMBER __________________________________________________ VALIDATION

export const lowLevelNumberValidations = () => [
    param('valor')
    .exists().withMessage(
        `El número es obligatorio.`)
    .trim()

    .notEmpty().withMessage(
        `El número no puede expresarse como un valor vacío.`)

    .isNumeric().withMessage(
        `El valor debe expresarse con números.`)
        
    .custom(value => parseFloat(value) >= 0).withMessage(
        'El número debe ser mayor o igual a 0.')
];


// ARRAY __________________________________________________ SANITIZER

export const lowLevelArraySanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        const originalString = value.toLowerCase() //Todo a minúsculas.
        const sanitizedString = originalString
        
            .replace(/\s*-\s*/g, '-') // Elimina espacios alrededor de los guiones medios
            .replace(/\s+/g, ' ') // Elimina repeticion de espacios
            .replace(/-+/g, '-') // Elimina repeticion de guiones medios
            .replace(/'+/g, "'") // Elimina repeticion de apóstrofes
        
            const stringsNuevaFrase = sanitizedString.split(/,\s*/) //Convierte en array separando por comas.

        stringsNuevaFrase.forEach((frase)=>{
            const nuevaFrase = frase.charAt(0).toUpperCase() + frase.slice(1); //Que cada string empiece con mayus
        })

        return stringsNuevaFrase
    })
];



export const midLevelArraySanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        const originalString = value.toLowerCase() //Todo a minúsculas.
        const sanitizedString = originalString
            .replace(/['\s]*-\s*['\s]*/g, '-') // Elimina los apóstrofes y espacios alrededor del guion
            .replace(/\s*-\s*/g, '-') //"Hola - mundo", se transformará en "Hola-mundo"
            .replace(/\s+/g, ' ') //Elimina repeticiones de espacios.
            .replace(/-+/g, '-') //Elimina repeticiones de guiones medios.
            .replace(/'+/g, "'") //Elimina repeticiones de apóstrofes.
            .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
        const stringsNuevaFrase = sanitizedString.split(/,\s*/)

        stringsNuevaFrase.forEach(()=>{
            const nuevaFrase = palabra.charAt(0).toUpperCase() + palabra.slice(1); //Que empiece con mayus
        })

        return stringsNuevaFrase
    })
];


export const highLevelArraySanitizer = () => [
    
    param('valor')
    .customSanitizer(value => {

        //Palabras que estarán en minúsculas
        const articulos = new Set([ 'de', 'del', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a', 'ante', 'bajo', 'con', 'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sobre', 'tras', 'y', 'o', 'ni', 'que', 'pero', 'aunque', 'porque', 'pues', 'como', 'cuando', 'donde', 'mientras', 'aunque' ]);
        
        const originalString = value.toLowerCase() //Todo a minúsculas.
        const sanitizedString = originalString
            .replace(/['\s]*-\s*['\s]*/g, '-') // Elimina los apóstrofes y espacios alrededor del guion
            .replace(/\s*-\s*/g, '-') //"Hola - mundo", se transformará en "Hola-mundo"
            .replace(/\s+/g, ' ') //Elimina repeticiones de espacios.
            .replace(/-+/g, '-') //Elimina repeticiones de guiones medios.
            .replace(/'+/g, "'") //Elimina repeticiones de apóstrofes.
            .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
        const stringsNuevaFrase = sanitizedString.split(/,\s*/)

        let nuevoArray = []  //Reconstruye el String poniendo en mayúsculas la primera letra excepto articulos.

        stringsNuevaFrase.forEach((frase) => { //Por cada frase del array
            const nuevaFrase = []
            const palabras = frase.split(/([ ']+)/) //Separar palabras
            palabras.forEach((palabra, index) => {
                if (index === 0 || !articulos.has(palabra)) {
                    const nuevaPalabra = palabra.charAt(0).toUpperCase() + palabra.slice(1); //Si no es artículo, que sea mayus
                    nuevaFrase.push(nuevaPalabra)
                } else {
                nuevaFrase.push(palabra) //Si es artículo, que siga en minus
                }
            })
            nuevoArray.push(nuevaFrase.join('')) //Volver a armar las frases
        
        })
        
        return nuevoArray //Devuelve Array sanitizado
    })
];


//ARRAY _____________________________________________________ VALIDATION


export const lowLevelArrayValidations = () => [
        param('valor')
        .exists().withMessage(
            `El vector es obligatorio.`)

        .isArray().withMessage(
            `Debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'string')) {
                throw new Error(`Todos los elementos del vector. deben ser cadenas de texto.`)
            } return true;
        })
]


//MISC ______________________________________________________ 'ATRIBUTO'


export const attributeParamsSanitizer = () => [
    
    param('atributo')
    .customSanitizer(atributo => {

        const atributoLowCase = atributo.toLowerCase();
        
        switch (atributoLowCase) {
            case 'nombresuperheroe': return 'nombreSuperHeroe'
            case 'nombrereal': return 'nombreReal' 
            case 'planetaorigen': return 'planetaOrigen' 
            default: return atributo
        };
    })
];

export const byAttributeValidations = () => [

    param('valor')
    .customSanitizer(atributo => {

        const atributoLowCase = atributo.toLowerCase();
        
        switch (atributoLowCase) {

            case 'nombresuperheroe':
            case 'nombrereal':
            case 'planetaorigen':
            case 'debilidad' : {
                highLevelStringSanitizer();
                lowLevelStringValidations();
                midLevelStringValidations();
                break;
            }

            case 'edad': {
                lowLevelNumberValidations();
                break;
            }

            case 'poderes':
            case 'aliados':
            case 'enemigos': { 
                lowLevelArrayValidations()
                break;
            }

            default: return atributo

        };
    })
];    

