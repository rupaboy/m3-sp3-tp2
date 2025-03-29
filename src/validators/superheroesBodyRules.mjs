import {body} from 'express-validator'
import {
    lowLevelParamStringSanitizer,
    midLevelParamStringSanitizer,
    highLevelParamStringSanitizer,
    lowLevelParamArraySanitizer,

} from './superheroesParamRules.mjs'



// STRING __________________________________________________ SANITIZER
export const lowLevelBodyStringSanitizer = () => [
    
    body('nombreSuperHeroe')
    .optional()
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    }),

    body('nombreReal')
    .optional()
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    }),

    body('planetaOrigen')
    .optional()
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    }),

    body('debilidad')
    .optional()
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    }),

];

export const midLevelBodyStringSanitizer = () => [
    
    body('nombreSuperHeroe')
    .optional()
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
        }),

    body('nombreReal')
    .optional()
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
        }).

    body('planetaOrigen')
    .optional()
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
        }),

    body('debilidad')
    .optional()
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
        }),

];

export const highLevelBodyStringSanitizer = () => [
    
    body('nombreSuperHeroe')
    .optional()
    
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-).`) //OK

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
        }),
    
    
    body('nombreReal')
    .optional()
    
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-).`) //OK

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
        }),

    
    body('planetaOrigen')
    .optional()
    
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-).`) //OK

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
        }),

    
    body('debilidad')
    .optional()
    
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-).`) //OK

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
        }),
];


// STRING __________________________________________________ VALIDATION
export const lowLevelBodyStringValidations = () => [

    // ¡La string debe existir!
    // ¡La string no debe estar vacía!
    // El largo deberá ser >3 && <60
    // Sanitiza espacios alrededor de la string.

    body('nombreSuperHeroe')
    .optional()
    .exists().withMessage(
        `El nombre es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`), //OK


    body('nombreReal')
    .optional()
    .exists().withMessage(
        `El nombre real es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El nombre real no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre real debe tener entre 3 y 60 caractéres`), //OK


    body('planetaOrigen')
    .optional()
    .exists().withMessage(
        `El planeta de orígen es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El planeta de orígen no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El planeta de orígen debe tener entre 3 y 60 caractéres`), //OK


    body('debilidad')
    .optional()
    .exists().withMessage(
        `La debilidad es obligatoria.`)
    .trim()
    .notEmpty().withMessage(
        `La debilidad no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `La debilidad debe tener entre 3 y 60 caractéres`), //OK
]


export const midLevelBodyStringValidations = () => [
    
    // Solo Letras, numeros y ( ) (-) (')
    // Al menos una mayus o num.
    // Sólo letras inicio y final.
    // 2/1 (''-) / (--') MAX

    body('nombreSuperHeroe')
    .optional()
    .exists().withMessage(
        `El nombre es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El nombre no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El nombre no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`), //OK

    body('nombreReal')
    .optional()
    .exists().withMessage(
        `El nombre real es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El nombre real no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre real debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre real.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El nombre real no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El nombre real no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`), //OK

    body('planetaOrigen')
    .optional()
    .exists().withMessage(
        `El planeta de orígen es obligatorio.`)
    .trim()
    .notEmpty().withMessage(
        `El planeta de orígen no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El planeta de orígen debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el planeta de orígen.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El planeta de orígen no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El planeta de orígen no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`), //OK

    body('debilidad')
    .optional()
    .exists().withMessage(
        `La debilidad es obligatoria.`)
    .trim()
    .notEmpty().withMessage(
        `La debilidad no puede expresarse como una cadena vacía.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `La debilidad debe tener entre 3 y 60 caractéres`) //OK
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en la debilidad.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `La debilidad no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `La debilidad no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`), //OK
]


// MONGO ID ________________________________________________ VALIDATION

export const mongoIdBodyValidator = () => [

    body('id')
    .optional()
    .exists().withMessage(
        `El id es obligatorio.`)
    .trim()

    .notEmpty().withMessage(
        `El id no puede expresarse como un valor vacío.`)

    .isMongoId().withMessage(
        `El valor debe expresarse con una _id de MongoDB.`)
];


// NUMBER __________________________________________________ VALIDATION

export const lowLevelBodyNumberValidations = () => [
    body('edad')
    .optional()
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

export const lowLevelBodyArraySanitizer = () => [
    
    body('poderes')
    .optional()
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
    }),
    body('aliados')
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
    }),
    body('enemigos')
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


export const midLevelBodyArraySanitizer = () => [
    
    body('poderes')
    .optional()
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
    }),

    body('aliados')
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
    }),

    body('enemigos')
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


export const highLevelBodyArraySanitizer = () => [
    
    body('poderes')
    .optional()
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
    }),

    body('aliados')
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
    }),

    body('enemigos')
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


export const lowLevelBodyArrayValidations = () => [
        body('poderes')
        .optional()
        .exists().withMessage(
            `El vector es obligatorio.`)

        .isArray().withMessage(
            `Debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'string')) {
                throw new Error(`Todos los elementos del vector. deben ser cadenas de texto.`)
            } return true;
        }),

        body('aliados')
        .optional()
        .exists().withMessage(
            `El vector es obligatorio.`)

        .isArray().withMessage(
            `Debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'string')) {
                throw new Error(`Todos los elementos del vector. deben ser cadenas de texto.`)
            } return true;
        }),

        body('enemigos')
        .optional()
        .exists().withMessage(
            `El vector es obligatorio.`)

        .isArray().withMessage(
            `Debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'string')) {
                throw new Error(`Todos los elementos del vector. deben ser cadenas de texto.`)
            } return true;
        }),
];