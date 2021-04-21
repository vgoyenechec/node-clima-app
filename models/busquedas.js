const axios = require('axios');
const fs = require('fs');
class Busquedas {

    historial = [];
    dbPath = './db/database.json'; 
    constructor(){
        // leerDB si existe
        this.leerDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'cachebuster':1618958702759,
            'autocomplete':true,
            'limit':5,
            'language':'es'
        }
    }

    get paramsOpenWeather(){
        return {
            appid:process.env.OPENWEATHER_KEY,
            lang:'es'
        }
    }

    async ciudad(lugar=''){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            
            return resp.data.features.map(lugar=>({
                id:lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            console.log(error);
        }
    }

    async clima(lat, lon){
        try {

            //console.log(lat, lon);
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {lat, lon, ...this.paramsOpenWeather}
            })
            const res = await instance.get();
            const { weather, main } = res.data;
            return {
                desc: weather[0].description,
                min:  main.temp_min - 273.15, 
                max:  main.temp_max - 273.15, 
                temp: main.temp - 273.15,
            };

        } catch (error) {
            console.log(error);      
            return error;      
        }
    }


    agregarHistorial(lugar =''){
        if(this.historial.includes(lugar)){
            return; 
        }
        this.historial = this.historial.splice(0,4);
        this.historial.unshift(lugar);

        this.guardarDB();
    }
    guardarDB(){
        const payload ={
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
        
    }
    
    leerDB(){
        
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
        
    }
}

module.exports = Busquedas;
