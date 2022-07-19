   const tf = require('@tensorflow/tfjs')
   function tensor(valor) {
    var valX = [1  , 2  , 3 , 4 , 5  , 6];
    var valY = [3, 5, 7, 9, 11, 13];




    const model = tf.sequential();
    //Agregamos una capa densa porque todos los nodos estan conectado entre si
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // Compilamos el modelo con un sistema de perdida de cuadratico y optimizamos con sdg
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    // Creamos los tensores para x y para y
    const xs = tf.tensor1d(valX);
    const ys = tf.tensor1d(valY);

    var epocas = 100
    // Obtenemos el valor de x
    var nuevoValX = 7

    model.fit(xs, ys, {epochs: 500}).then(() => {
        model.predict(tf.tensor1d([valor])).print();
        console.log(tf.tensor1d([valor]))
    });
    
    
   }
tensor(2)
const XLSX =   require('xlsx')
function LeerExcel(ruta) {
    x=[]
    y=[]
    fila=[]
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;

    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    //console.log(dataExcel)

    for (const iterator of dataExcel) {
        x.push(iterator.Nombre)
        y.push(iterator.Tabla)
        fila.push([iterator.Nombre,iterator.Tabla])
    }
 

    return(x,y,fila)
}

LeerExcel("data.xlsx")
fila[0].push(1)
console.log(fila)

