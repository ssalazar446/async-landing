/*
📀 𝗖𝗹𝗮𝘀𝗲 #𝟭𝟴: 𝗖𝗼𝗻𝘀𝘂𝗺𝗶𝗲𝗻𝗱𝗼 𝗔𝗣𝗜 𝟭𝟴/𝟮𝟭 📀
.
🔧 Continuando con la lógica de la landing:
.

Entra a https://rapidapi.com/ y creamos una cuenta al dar click en Sign Up y seguir los pasos.
El profesor usará la API de youtube, así que en el buscador puedes colocar la API que quieras usar. La versión de la API de youtube que vamos a usar es YouTube V3.
Una vez seleccionada la API, nos mostrará 3 columnas con los servicios y herramientas que están disponibles para la API, para el ejemplo se selecciona Channel Videos para obtener los últimos vídeos publicados. En la columna central, se debe indicar la id del canal que queremos mostrar en la landing, éste se obtiene en la url de youtube después de channel/, por ejemplo para el canal de youtube del profesor: https://www.youtube.com/channel/UC9k0tTsh_qStx0HPuPftSsg el id del canal es UC9k0tTsh_qStx0HPuPftSsg ese es el que se debe pegar en el parámetro channeld.
Más abajo, se puede configurar el máximo de vídeos que se desea obtener (máximo hasta 50), para el ejemplo se colocó 9.
En la tercera columna, se selecciona en la lista el lenguaje de programación y el método que se quiere usar, en este caso: JavaScript → fetch con ésto aparecerá la plantilla del código.
Para visualizar la salida al testear la plantilla, en la columna del medio al dar click en Test Endpoint, la pestaña Results se activa y podemos conocer cada uno de los elementos de los objetos, esa información nos será útil para nuestro el código.
Copiar la plantilla e ir al editor VSC en la ruta src/assets y pegarlo en main.js
La url que se pasa por argumento a la función fetch, la cambiamos al inicio del código para declarar la constante API:

*/
const API='https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=9';

const content=null||document.getElementById('content');

//La variable options si la dejamos igual, tal cual como lo muestra rapidapi:
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3a52b059cemsh579f29422123952p1f2a38jsn2f5856fbe6ce',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


/* 
Como vamos a usar el asyn/await, borramos el código de fetch 
estructurado con then y catch. En lugar de ello, usamos 
la lógica que hicimos en ejemplos anteriores:
*/
//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //siempre async antes de function
    const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const data = await response.json(); //estructura de los datos transformandolos en json
    return data; //retorna la información de la API que estamos solicitando
    }


    /*
    Ahora vamos usar un nuevo concepto: una función que se 
    invoca a sí misma; con JavaScript podemos tener funciones 
    anónimas que permitan llamarse automáticamente, 
    la estructura cuenta con la palabra reservada 
    **async **y con funciones arrows:

    (async () => {
    //Dentro implementamos la lógica necesaria para hacer el llamado a la 
    API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
    try{
    } catch {
    }
    })();


    Dentro de try{} estará el llamado de la API y el 
    template de html para interpretar los datos a iterar por 
    cada objeto, en este caso, cuando analizamos la salida de la 
    API en rapidapi, hay una jerarquía de los datos, están los 9 
    “items” del 0 al 8 para la posición de cada vídeo, luego el 
    “snippet” de cada item, luego “thumbnails” y éste a su vez los 
    tamaños de la imagen (nos interesa con la más alta resolución “high”), 
    también nos interesa mostrar la descripción “description” y 
    nombre “title” de cada vídeo:

    */

    (async()=>{try{const videos=await fetchData(API);let view=`
    ${videos.items.map(video=>`
    <div class="group relative">
        <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
            </h3>
        </div>
    </div>
    `).slice(0,4).join('')}
    `;
            //innerHTML es igual a la vista que se ha creado e 
            //itera con el metodo map y devuelve un nuevo arreglo 
            //con los elementos que queremos obtener como el título, 
            //la descripción, la imagen miniatura de la API
            content.innerHTML = view; 
        } catch (error) {
            console.log(error);
        }
    })();


    /*
    Si quieres saber más del método map, en el enlace hay ejemplos: https://www.freecodecamp.org/espanol/news/javascript-map-como-utilizar-la-funcion-js-map-metodo-de-arreglo/#:~:text=La%20sintaxis%20del%20método%20map,y%20el%20objeto%20array%20completo.
    Para el método slice: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    Para el método join: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    En index.html buscamos el comentario de 
    <!-- content --> para agregar el id de **++content ++**y pueda mostrar 
    los vídeos en la landing, para ello, borramos el div después del comentario, 
    incluyendo su contenido, queda así:

    <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" id="content">
    <!-- content -->
    </div>

    Y ahora para que pueda leer la lógica de main, dado que el id lo llamamos content, 
    en el archivo main agregamos la referencia content:

    const content = null || document.getElementById('content');
    */