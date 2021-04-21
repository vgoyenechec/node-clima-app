require('dotenv').config()

const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
console.clear();


const main = async () =>{
    
    let opt;
    const busqueda = new Busquedas();
    do{
        
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
               
                //buscar lugares
                const lugares = await busqueda.ciudad(lugar);
                
                //seleccionar lugar
                const id = await listarLugares(lugares);
                if(id===0) continue;
                const seleccionado = lugares.find(l =>l.id ===id);
                busqueda.agregarHistorial(seleccionado.name);
                const clima =  await busqueda.clima(seleccionado.lat, seleccionado.lng);
                
                //mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.cyan)
                console.log('Ciudad: ', seleccionado.name);
                console.log('Lat: ', seleccionado.lat);
                console.log('Lng: ', seleccionado.lng );
                console.log('Temperatura: ',clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima hoy: ', clima.desc);
                break;
            case 2:
                //mostrar historial
                busqueda.historial.forEach((l,i)=>{
                    console.log(`${i+1} - ${l}`);
                })
                break;
        
            
          

        }
        
        if(opt!==0)  await pausa();
    }while(opt!==0);
}
main();