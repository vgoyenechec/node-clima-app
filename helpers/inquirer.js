const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value:1,
                name: `${'1.'.cyan} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.cyan} Historial`
            },
            {
                value: 0,
                name: `${'0.'.cyan} Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('================================='.cyan);
    console.log('      Seleccione una opción')
    console.log('=================================\n'.cyan);
    
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausaEnter = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]
const pausa = async () =>{
    console.log('\n');
   await inquirer. prompt(pausaEnter);

}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'alias',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingresa un valor';
                }
                return true;
            }
        }    
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listarLugares = async(lugares=[]) =>{
    const choices = lugares.map((lugar, i) =>{
        const ind = `${i+1}.`.cyan;
        return {
            value:lugar.id,
            name: `${ind} ${lugar.name}`
        }
    })

    choices.unshift({
        value: 0,
        name: '0. '.cyan + 'Cancelar'
    })
    const preguntas =[
        {
            type:'list',
            name: 'id',
            message:'Seleccione lugar: ',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const completarTareas = async(tareas =[])=>{
    const choices = tareas.map((tarea, i) =>{
        const ind = `${i+1}.`.cyan;
        return {
            value:tarea.id,
            name: `${ind} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true:false
        }
    })

    const preguntas =[
        {
            type:'checkbox',
            name: 'ids',
            message:'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

const confirmar = async (message) =>{
    const question =[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = { 
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    completarTareas
};
