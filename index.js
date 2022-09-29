function generateTable() {
    // creates a <table> element and a <tbody> element
    if(document.getElementById("datatable")===null){

    }else {
        document.getElementById("datatable").outerHTML = "";
    }
    var filasI = document.getElementById("states").value;
    var columnasI = document.getElementById("inputs").value;
    var filas2 = filasI.split(", ")
    var columnas2 = columnasI.split(", ")
    let filas = filas2.length + 1 
    let columnas = columnas2.length +2
    console.log(filas2)
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
            
        }else if  (j===(columnas-1) && i===0){
            const cellText = document.createTextNode(`Salidas`)
            cell.appendChild(cellText);
        }else {
            const cellText = document.createElement("input");
            cell.appendChild(cellText);
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