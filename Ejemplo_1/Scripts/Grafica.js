function graficar(type) {

    // leer texto de la ecuacion de entrada
    var exp = document.getElementById("ecuacion").value;
    var xValues = [];
    var yValues = [];

    // Generar valores  de la ecuacion
    for (let x = -10; x <=10 ; x++) {
        xValues.push(x);
        yValues.push(eval(exp));
        
    }

    // mostrando

    var mode = "lines";
    if(type=='scatter'){mode="markers"}
    var data = [{x:xValues,y:yValues,mode:mode,type:"scatter"}]
    var layout={title:"y = " + exp}
    Plotly.newPlot("presentar_gra",data,layout)
}
