import fakeData from '../json/fakedata.json'
import ubigeo from '../json/ubigeo.json'
/*import '../style/index.sass';

let testing = (()=>console.log('its working'))
let arreglo = [1,2,3,4]

for(let i in arreglo){
    console.log(arreglo[i])
}
testing(); 

console.log(fakeData)*/


/*



import queryString from 'query-string'

let parsed = queryString.parse(window.location.search)
let accessToken = parsed.access_token;

var artist = document.getElementById('artist');
var button = document.getElementById('button')
button.addEventListener('click', getArtist)

function getArtist(){
    fetch(`https://api.spotify.com/v1/search?type=artist&limit=50&q=${artist.value}`,{
        headers:{
            'Authorization': 'Bearer ' + accessToken
        }
    }).then( response => response.json() )
    .then(data => {
        var result = data;
        var firstId = result.artists.items[0].id;
        return firstId;
    }).then(id => {
        let idArtist = id;
        console.log('artista')
        console.log(idArtist)
        fetch(`https://api.spotify.com/v1/artists/${idArtist}/albums`,{
            headers:{
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(albumData => {
            let albumID = albumData.items[0].id;
            console.log('album')
            console.log(albumID)
            fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`,{
                headers:{
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(response => response.json())
            .then(canciones => {
                console.log(canciones)
                let cancionList = []
                let Acanciones = canciones.items;
                for (var cancion in Acanciones){
                    cancionList.push(Acanciones[cancion].name)
                }
                console.log(cancionList)
            })
        })
    })
}*/


/*  PROMISE RACE COMPARA Y SOLO EJECUTA LA PROMESA QUE SE RESUELVA MAS RAPIDO*/

/*
var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "uno");
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 600, "dos");
});

Promise.race([p1, p2]).then(value => {
    console.log('*****************************************')
    console.log(value); // "dos"
    // Ambas se resuelven, pero la p2 antes.
});




var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "one");
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "two");
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "three");
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "four");
});
var p5 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "five");
});

Promise.all([p1, p2, p3, p4, p5]).then(values => {
    console.log('*****************************************')
    console.log('valores')
    console.log(values);
}, reason => {
    console.log('reason')
    console.log(reason)
});



var promiseTest = new Promise((resolve, reject) => {
    const persona = {
        name: 'TH',
        test: 'test'
    }
    resolve(persona)
}).then(saludo => {
    console.log('*****************************************')
    console.log(`hola ${saludo.name}`)
    const body = document.body;
    //body.innerHTML = 'hola'
})


var promiseTest2 = new Promise((resolve, reject) => {
    resolve(fakeData)
}).then(data => {
    console.log('*****************************************')
    console.log('envio animales');
    return data.animal;
})
    .then(animales => {
        console.log('animales')
        console.log(animales)
    })

*/
/*
FUNCION QUE RETORNA LA TABLA DE UBIGUEO DE LOS SERVICIOS DEL INEI

fetch('http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarDepartamentosPorVersion.htm?llaveProyectoPK=5-1')
    .then(response => response.json())
    .then(data => {
        const body = document.body;
        body.innerHTML = JSON.stringify(data);
        //console.log(syntaxHighlight(data))
        //console.log(data.length)

        const promises = [];

        for (let id in data) {
            id = parseInt(id) + 1;

            if (id < 10) {
                id = "0" + id
            }
            promises.push(fetch(`http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarProvinciasPorVersion.htm?llaveProyectoPK=5-1&departamentoId=${id}`).then(response => response.json()))
        }
        //console.log(promises)

        Promise.all(promises).then(values => values)
            .then(promises => {
                //console.log(promises.length)
                let distritosxdepartamento = [];
                for (let promise in promises) {
                    let id = parseInt(promise) + 1;
                    //console.log(promises[promise].length)
                    //console.log(JSON.stringify(promises[promise]))
                    const body = document.body;
                    var node = document.createElement("pre");
                    var textnode = document.createTextNode(JSON.stringify(promises[promise]));
                    node.appendChild(textnode);
                    body.appendChild(node);
                    distritosxdepartamento.push(promises[promise].length)
                }
                return distritosxdepartamento;
            }).then(distritos => {
                let Adistritos = [];
                for (let distrito in distritos) {
                    let id = parseInt(distrito) + 1;

                    if (id < 10) {
                        id = "0" + id
                    }
                    let totalDistritos = distritos[distrito]
                    //console.log('*******DISTRITO*********')
                    //console.log(distrito)
                    //console.log(totalDistritos)
                    for (let i = 0; i < totalDistritos; i++) {
                        let iddistrito = i + 1;

                        if (iddistrito < 10) {
                            iddistrito = "0" + iddistrito
                        }
                        //console.log('soy i')
                        //console.log(iddistrito)
                        Adistritos.push(fetch(`http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarDistritosPorVersion.htm?llaveProyectoPK=5-1&departamentoId=${id}&provinciaId=${iddistrito}`)
                        .then(response => response.json()))
                    }
                }
                return Adistritos
            }).then(distritos =>{
                Promise.all(distritos).then(values => values)
                .then(distritos => {
                    console.log(distritos);
                    for(let distrito in distritos){
                        console.log(distritos[distrito])
                        const body = document.body;
                        var node = document.createElement("pre");
                        var textnode = document.createTextNode(JSON.stringify(distritos[distrito]));
                        node.appendChild(textnode);
                        body.appendChild(node);
                    }
                })
            })
    })

*/

const ubigeoData = new Promise((resolve, reject) => {
    resolve(ubigeo)
}).then(data => {
    const departamento = document.getElementById('departamento');
    let departoption = document.createElement('option')
    let departContent = document.createTextNode('Seleccione')
    departoption.appendChild(departContent)
    departamento.appendChild(departoption)
    for (let index in data) {
        departoption = document.createElement('option')
        departoption.setAttribute('value', data[index].idDepart)
        departContent = document.createTextNode(data[index].nomDepart)
        departoption.appendChild(departContent)
        departamento.appendChild(departoption)
    }

    const depart = document.getElementById('departamento')
    const provin = document.getElementById('provincia')
    depart.addEventListener('change', (e) => {
        provin.remove('option')
        let provincias = data[parseInt(e.currentTarget.value)-1].provincias
        for(let index in provincias){
            provin.insertAdjacentHTML('beforeend', `<option value="${provincias[index].idProvincia}">${provincias[index].nomProvincia}</option>`)
            console.log(provincias[index])
        }
    })
})

