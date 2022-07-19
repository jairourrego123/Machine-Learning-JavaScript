

const express = require("express");
const app = express();
const puerto = 5000;
const tf = require('@tensorflow/tfjs')
const multer = require('multer')

const { urlencoded } = require("express");
app.use(urlencoded({extended:false}))
// motor de plantillas 
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+"/public"))

const XLSX =   require('xlsx');
const { Console } = require("console");
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
 
    
    return (x,y,fila)
}

async function tensor(valor) {
 

    var valX = x
    var valY = y
    
    var model = tf.sequential();
    //Agregamos una capa densa porque todos los nodos estan conectado entre si
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // Compilamos el modelo con un sistema de perdida de cuadratico y optimizamos con sdg
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    // Creamos los tensores para x y para y
    


    
    var xs = tf.tensor1d(valX);
    var ys = tf.tensor1d(valY);
  const resp= await model.fit(xs, ys, {epochs: 500}).then( () => {
         const resultado =  model.predict(tf.tensor1d([valor]))
        // resultado.print()
        
        return resultado
    });
   
    return resp
    
    
   }
const storage = multer.diskStorage({
    
    destination:__dirname+ '/views/imagenes',
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})




app.use(multer({
    storage:storage,
    dest: __dirname+'/views/imagenes'
}).single('archivo'))



// atencion de la solicitud
app.get('/',(req,res)=>{
    
    
    res.render("template/home")
    
});

app.get('/prediccion',async (req,res)=>{
   
  
    contador = 0
    for await (const iterator of fila) {
       
        await tensor(iterator[0]).then((result) => {
        const resultado=result.dataSync()[0]
        
           fila[contador].push(resultado.toFixed(5))
           let error=(((fila[contador][1])-(fila[contador][2]))/(fila[contador][1]))*100
           error=error.toFixed(5)
           fila[contador].push(Math.abs(error) + "%")
          
           
        })
        
        contador = contador + 1
    }
        
        
        
        
    
    
    
    res.render("template/prediccion")
    
       
   

   
    
 
    
});
app.post('/',async(req,res)=>{
    
    await LeerExcel(req.file.path)

    res.render("template/base_de_datos")
    //const [valX,valY]=await entrenamiento(x,y)
    
    
    
   

   
    
  
    
   
    
})


// Oyente
app.listen(puerto,()=>{
    console.log("Ejecutando el servidor local")
})