/*import '../style/index.sass';
import fakeData from '../json/fakedata.json'

let testing = (()=>console.log('its working'))
let arreglo = [1,2,3,4]

for(let i in arreglo){
    console.log(arreglo[i])
}
testing(); 

console.log(fakeData)*/

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
}