const crearInputs = document.getElementById("crearInputs");
const btnSumar = document.getElementById("btnSumar");
let mostrarResultado = document.getElementById('resultado')
btnSumar.style.display = 'none'

crearInputs.addEventListener('click', () => {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;

    if(filas != 0 && columnas != 0){
        mostrarResultado.innerHTML = ""
        let inputs = ''

        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                inputs += `<input type="number" class="matrizInput"" style="width: 50px;">`;
                };
            inputs += '<br>';
            };
        
        inputs += '<br>'

    
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                inputs += `<input type="number" class="matrizInput"" style="width: 50px;">`;
            }
            inputs += '<br>';
        }

        document.getElementById('matrixInputs').innerHTML = inputs;
        btnSumar.style.display = 'block'
    } else {
        return mostrarResultado.innerHTML = '<p class="text-danger rounded p-1">Los campos de las filas y las columnas no deben estar vacios.</p>'
    }
    }
);

async function sumarMatriz(){
    const inputs = document.querySelectorAll('.matrizInput');
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;     

    let matriz1 = []
    let matriz2 = []


    for (let i = 0; i < filas; i++) {
        matriz1[i] = []
        matriz2[i] = []
        
        for (let j = 0; j < columnas; j++) {
            let numero1 = inputs[i * columnas + j].value;
            let numero2 = inputs[filas * columnas + i * columnas + j].value;

            if(numero1 != "" && numero2 != ""){
                 matriz1[i][j] = parseFloat(inputs[i * columnas + j].value);
                 matriz2[i][j] = parseFloat(inputs[filas * columnas + i * columnas + j].value);
            } else {
                return mostrarResultado.innerHTML = ('<p class="text-danger rounded p-1">Ingrese los números en todas las casillas</p>');
            }
        }
        
    }

    const inf = {
       matriz1,matriz2
    }

    const response = await fetch('http://localhost:4000/sumar',{
        method: 'POST',
        body: JSON.stringify(inf),
        headers: {
            'content-type':'application/json'
        }
    })

    const data = await response.json()



    let resultado = ''

    for (let index = 0; index < data.length; index++) {
        resultado +=
        `
        <div>
            ${data[index]}
        </div>
        `
    }

    mostrarResultado.innerHTML = '<p class="text-center me-2 p-1 rounded">Resultado:<p/>' + resultado
}