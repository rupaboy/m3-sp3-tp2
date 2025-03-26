import { param, body, check } from 'express-validator'

export const lowLevelStringValidations = () => [

    // ¡La string debe existir!
    // ¡La string no debe estar vacía!
    // El largo deberá ser >3 && <60
    // Sanitiza espacios alrededor de la string.

    check('valor')
    .exists().withMessage(
        `El nombre es obligatorio.`)
    .notEmpty().withMessage(
        `El nombre no puede expresarse como una cadena vacía de texto.`) //OK
    .isLength({min: 3, max: 60}).withMessage(
        `El nombre debe tener entre 3 y 60 caractéres`) //OK
    .trim().withMessage(
        `No se pueden agregar espacios vacíos antes o después del nombre.`), //OK
]


export const midLevelStringValidations = () => [
    
    // Solo Letras, numeros y ( ) (-) (')
    // Al menos una mayus o num.
    // Sólo letras inicio y final.
    // 2/1 (''-) / (--') MAX

    check('valor')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
        `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre.`) //OK
    .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
        `El nombre no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`
    .matches(/^([^-']).*[^-']$/).withMessage( 
        `El nombre no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`) //OK
]

export const highLevelStringValidations = () => [
    
    check('valor')
    
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

export const lowLevelSanitizer = () => [
    
    check('valor')
    .customSanitizer(value => {

        const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/'+/g, "'")

            return palabras
    })
];


export const midLevelSanitizer = () => [
    
    check('valor')
    .customSanitizer(value => {

    const palabras = value 
            .replace(/['\s]*-\s*['\s]*/g, '-')  // Elimina los apóstrofes y espacios alrededor del guion
            .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
            .replace(/^([a-z])/g, (match, p1) => p1.toUpperCase()); // Convierte la primera letra de la frase a mayúscula

            return palabras
        })
] 


export const highLevelSanitizer = () => [
    
    check('valor')
    .customSanitizer(value => {

        const articulos = new Set([ 'de', 'del', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a', 'ante', 'bajo', 'con', 'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sobre', 'tras', 'y', 'o', 'ni', 'que', 'pero', 'aunque', 'porque', 'pues', 'como', 'cuando', 'donde', 'mientras', 'aunque' ]);

        const palabrasSeparadas = palabras.split(/([ ']+)/)

        let nuevaFrase = []

        palabrasSeparadas.forEach((palabra, index) => {
            if (index === 0 || !articulos.has(palabra)) {
                const nuevaPalabra = palabra.charAt(0).toUpperCase() + palabra.slice(1);
                nuevaFrase.push(nuevaPalabra)
            } else {
            nuevaFrase.push(palabra) }

        });

        return nuevaFrase.join('')
            .replace(/['\s]*-\s*['\s]*/g, '-')  // Elimina los apóstrofes y espacios alrededor del guion
            .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase())  // Pone en mayúscula la letra después del guion
            .replace(/^([a-z])/g, (match, p1) => p1.toUpperCase()); // Convierte la primera letra de la frase a mayúscula
        })
] 



export const atributeParamsSanitizer = (atributo) => [
    
    check('atributo')
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

/*
export const validatorParams = (req, res, next) => {
    
    //Si hay errores de validación...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
        
    }

//Si son válidos
const {id, valor} = req. params;
res.json({
    mensaje: 'Parametros válidos',
    id,
    valor
})};
*/