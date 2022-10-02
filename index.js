function generateTable() {

    //get type of machine
    var radios = document.getElementsByName('choice');
    var val= "";
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            val = radios[i].value; 
            break;
        }
    }

    //erase table if already exists 
    if(document.getElementById("datatable")===null){

    }else {
        document.getElementById("datatable").outerHTML = "";
    }

    //get and calculate number of rows and columns
    var filasI = document.getElementById("states").value;
    var columnasI = document.getElementById("inputs").value;
    var filas2 = filasI.split(", ")
    var columnas2 = columnasI.split(", ")
    let filas = filas2.length + 1 
    let columnas
    if(val === "Moore"){
        columnas = columnas2.length +2
    }else {
        columnas = columnas2.length + 1
    }

     // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    tbl.setAttribute('id', 'datatable')
    const tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 0; i < filas; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < columnas; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        if(j===(0)){
            if(i === 0){
            const cellText = document.createTextNode(`Estados/ Entradas`)
            cell.appendChild(cellText);
            }else {
            const cellText = document.createTextNode(`${filas2.shift()}`)
            cell.appendChild(cellText);
            }
            
        }else {
            if(i===0){
                if(j===(columnas-1) && val === "Moore"){
                    const cellText = document.createTextNode(`Salidas`)
                    cell.appendChild(cellText);
                }else{
                    const cellText = document.createTextNode(`${columnas2.shift()}`)
                    cell.appendChild(cellText); 
                }
            }else{
                const cellText = document.createElement("input");
                cell.appendChild(cellText);
            }
            
        }
        
        row.appendChild(cell);
    }
      // add the row to the end of the table body
        tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "1")
}

function showTableData() {
    var automataStates = new MooreAutomata();
    var myTab = document.getElementById('datatable');
    //alternative for getting data in cell
    //console.log(myTab.rows[1].cells[1].getElementsByTagName('input')[0].value);
    
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {
        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;
        //state name
        var nombreEstado = objCells.item(0).innerHTML;
        //create state
        var estado = new MooreState(nombreEstado)
        var salida;
        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 1; j < objCells.length; j++) {
            //add states accesible from state
            if(j===objCells.length-1){
                console.log("entró para"+ nombreEstado)
                estado.salida = objCells.item(j).getElementsByTagName('input')[0].value
            }else{
                estado.estados.push(objCells.item(j).getElementsByTagName('input')[0].value) ;
            }
        }

        //add states to automata
        automataStates.estados.push(estado)
        
    }
    console.log(automataStates)

}