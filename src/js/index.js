import '../style/index.sass';
import fakeData from '../json/fakedata.json'

let testing = (()=>console.log('its working'))
let arreglo = [1,2,3,4]

for(let i in arreglo){
    console.log(arreglo[i])
}
testing(); 

console.log(fakeData)