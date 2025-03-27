import { check, validationResult } from 'express-validator';
//import { resultsValidator } from '../helper/validatorResults.mjs'


export const nombresValidator = (atributo, valor) => {
    return [    
    check((atributo, valor))

    .custom(console.log(valor))
        
        .exists().withMessage(
            `El nombre: ${atributo} es obligatorio.`)
    
        .trim().withMessage(
            `No se pueden agregar espacios vacíos antes o después del nombre: ${atributo}.`) //OK
    
        .notEmpty().withMessage(
            `El nombre: ${atributo} no puede expresarse como una cadena vacía de texto.`) //OK
    
        .isLength({min: 3, max: 60}).withMessage(
            `El nombre: ${atributo} debe tener entre 3 y 60 caractéres`) //OK

        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9' -]+$/).withMessage(
                `Sólo se permiten letras, números, espacios, apóstrofes (') y guiones medios (-) en el nombre: ${atributo}.`) //OK

        .customSanitizer(value => {

            const articulos = new Set([ 'de', 'del', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a', 'ante', 'bajo', 'con', 'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sobre', 'tras', 'y', 'o', 'ni', 'que', 'pero', 'aunque', 'porque', 'pues', 'como', 'cuando', 'donde', 'mientras', 'aunque' ]);
            
            const palabras = value //Limpia la repeticion de guiones, apostrofes y espacios
                .toLowerCase()
                .replace(/\s*-\s*/g, '-')
                .replace(/\s+/g, ' ')
                .replace(/-+/g, '-')
                .replace(/'+/g, "'")

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
                .replace(/[-'](.)/g, (match, p1) => match[0] + p1.toUpperCase());  // Pone en mayúscula la letra después del guion
        })

        .matches(/^([^-']).*[^-']$/).withMessage( 
            `El nombre: ${atributo} no puede comenzar ni terminar con apóstrofes (') o guiones medios (-).`) //OK

        .matches(/^(?!.*['-].*['-].*['-].*['-]).*$/).withMessage(
            `El nombre: ${atributo} no puede contener más de dos apóstrofes (') y un guion (-), o viceversa.`) //OK`

        .matches(/^(?=.*[A-Z])|(?=.*\d).*/).withMessage(
            `El nombre: ${atributo} debe contener al menos una letra mayúscula o un número.`), //OK
        ],
        (req, res, next)  => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                //Si hay errores, mostramos cuales
                return res.status(400).json({errors: errors.array()})
            }
            //Si no hay errores, pasamos al siguiente middleWare
            console.log('hola')
            next()
        }
    };
    
    
export const numerosValidator = (atributo) => {
        check(atributo)
        .exists().withMessage(
            `El número: ${atributo} es obligatorio.`)
        .trim().withMessage(
            `No se pueden agregar espacios vacíos antes o después del número: ${atributo}.`)
        .notEmpty().withMessage(
            `El número: ${atributo} no puede expresarse como un valor vacío.`)
    
        .isLength({min: 3, max: 60}).withMessage(
            `El número: ${atributo} debe tener entre 3 y 60 caractéres`)
            
        .isFloat({ min: 0 }).withMessage(
            `El número: ${atributo} debe ser mayor o igual a 0.`
        ),
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                //Si hay errores, mostramos cuales
                return res.status(400).json({errors: errors.array()})
            }
            //Si no hay errores, pasamos al siguiente middleWare
            next()
        }
};


export const nombresArrayValidator = (atributo) => {
        check(atributo)
        .exists().withMessage(
            `El vector: ${atributo} es obligatorio.`)

        .isArray().withMessage(
            `${atributo} debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'string')) {
                throw new Error(`Todos los elementos del vector: ${atributo}, deben ser cadenas de texto.`)
            } return true;
        }),
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                //Si hay errores, mostramos cuales
                return res.status(400).json({errors: errors.array()})
            }
            //Si no hay errores, pasamos al siguiente middleWare
            nombresValidator(atributo)( req, res, next);
    }
}


export const numerosArrayValidator = (atributo) => {
    check(atributo)
        .exists().withMessage(
            `El vector: ${atributo} es obligatorio.`)

        .isArray().withMessage(
            `${atributo} debe ser un vector.`)

        .custom((value) => {
            if (!value.every(i => typeof i === 'number')) {
                throw new Error(`Todos los elementos del vector: ${atributo}, deben ser números.`)
            } return true;
        }),
    (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                //Si hay errores, mostramos cuales
                return res.status(400).json({errors: errors.array()})
            }
            //Si no hay errores, pasamos al siguiente middleWare
            numerosValidator(atributo)( req, res, next);
    }
}


export const dinamicValidation = () => {
    check('atributo')
        .custom((atributo, {req }) => {
            const valor = req.params.valor
            
            switch(atributo) {
                case 'nombreSuperHeroe':
                    console.log('Edita nombresuper', valor)
                    nombresValidator(atributo, valor)
                    
                    break;
                
                case 'nombreReal':
                    console.log('Edita nombreReal', valor)
                    nombresValidator()
                    break;
                
                case 'edad':
                    console.log('Edita edad', valor)
                    numerosValidator()
                    break;
                
                case 'planetaOrigen':
                    console.log('Edita planetaOrigen', valor)
                    nombresValidator()
                    break;
                
                case 'debilidad':
                    console.log('Edita debilidad', valor)
                    nombresValidator()
                    break;
                
                case 'poderes':
                    console.log('Edita poderes', valor)
                    nombresArrayValidator()
                    break;
                
                case 'aliados':
                    console.log('Edita aliados', valor)
                    nombresArrayValidator()
                    break;
                
                case 'enemigos':
                    console.log('Edita enemigos', valor)
                    nombresArrayValidator()
                    break;
                default: {
                    console.log('Default dinamicValidation case')
                }
            }
            
        })
}