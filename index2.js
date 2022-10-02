let allStates = [];
let globalRows = 0;
let dataMachine = [];
let jointMachine = [];
let headersForTable = [];


function generateTable(){
  //Get Data from the amount and name of both the states and the input alphabet of the machine as a single string
  var tableRows = document.getElementById("states").value;
  var tableColumns = document.getElementById("alphabet").value;
  //Split the String into multiple data
  var rowsHeaders = tableRows.split(",")
  var columnsHeaders = tableColumns.split(",")
  headersForTable = columnsHeaders;
  allStates =  rowsHeaders;


  //Get headers for table columns
  let headItems = [];
  headItems.push(`<th scope=\"col\">Estados/Entradas</th>`);
  columnsHeaders.forEach(key => {
    headItems.push(`<th scope=\"col\">${key}</th>`);
  });

//Fill headers for table columns
  const tableM = document.querySelector(".table");
  const tr = document.getElementById("tr");

  if(tableM){
    tr.innerHTML = headItems.join(" ");
  }
  createDynamicForm();
}

function createDynamicForm(){
  //Get alphabet
  var tableColumns = document.getElementById("alphabet").value;
  var columnsHeaders = tableColumns.split(",")
    
  //Get row identifier
  const rowIdentifier = globalRows;

  //Get container for form
  const container = document.getElementById("dynamic_form");
  
  //Create form
  const formRows = document.createElement("form");

  //Create label and input 
  const labelCell = document.createElement("label");
  const inputCell = document.createElement("input");

  //Add text to label
  labelCell.appendChild(document.createTextNode("Ingresa el nombre del estado actual:"));

  //Add an id to input element
  inputCell.setAttribute("id", "SN"); 
  
  //Insert lable and input (for state) into form
  formRows.appendChild(labelCell);
  formRows.appendChild(inputCell);
  container.appendChild(formRows);

  //Add br for better spacing
  const br = document.createElement("br");
  formRows.appendChild(br);


  //Cretae labels and inputs for output state and response for each input in the alphabet
  for (let i = 0; i < columnsHeaders.length; i++) {
    const e = columnsHeaders[i];
    //Create label and input for output state
    const labelCellX = document.createElement("label");
    const inputCellX = document.createElement("input");
    const br = document.createElement("br");

    //Add text to label
    labelCellX.appendChild(document.createTextNode("Estado de salida con entrada "+ e +":"));

    //Add an id to input element
    inputCellX.setAttribute("id", "NS"+e);
    
    //Insert lable and input (for state) into form
    formRows.appendChild(labelCellX);
    formRows.appendChild(inputCellX);
    formRows.appendChild(br);
    container.appendChild(formRows);
    formRows.appendChild(br);

    const labelCellY = document.createElement("label");
    const inputCellY = document.createElement("input");

    //Add text to label
    labelCellY.appendChild(document.createTextNode("Respuesta con entrada "+ e +":"));

    //Add an id to input element
    inputCellY.setAttribute("id", "R"+e);
    
    //Insert lable and input (for state) into form
    formRows.appendChild(labelCellY);
    formRows.appendChild(inputCellY);
    formRows.appendChild(br);
    container.appendChild(formRows);
    formRows.appendChild(br);
  }
  //Create Add row button
  const addBtn = document.createElement("input");
  addBtn.setAttribute("type", "button");
  addBtn.setAttribute("value", "Añadir estado");
  addBtn.setAttribute("onClick", "addState()");

  formRows.appendChild(addBtn);

  globalRows++;
}

function addState(){
  //Get data from inputs
  const formParent = document.getElementById("dynamic_form").childNodes[0].childNodes;

  const currentStateName = formParent[1].value;

  //Calculate iterations
  const iterations = ((formParent.length)-4)/5;

  //
  let currentIteration = 4;
  let index = 0;
  let dataState = [];
  //global variable
  singleStateData = [];
  const thisData = new StateData(formParent[1].value, "stateName");
  singleStateData.push(thisData);
  //
  while (index < iterations) {
    //Saving data on global variable
    const thisDataA = new StateData(formParent[currentIteration].value, "state");
    singleStateData.push(thisDataA);
    const thisDataB = new StateData(formParent[currentIteration+2].value, "response");
    singleStateData.push(thisDataB);
    //
    dataState.push(formParent[currentIteration].value+" | "+ formParent[currentIteration+2].value);
    currentIteration+=5;
    index++;
  }
  let dataS = "";
  
  dataS+=`<td>${formParent[1].value}</td>`
  dataState.forEach(e => {
    dataS+=`<td>${e}</td>`
  });

  let template = `<tr>${dataS}</tr>`;
  let table = document.querySelector('table');

  table.innerHTML += template;
  dataMachine.push(singleStateData);

  if(dataMachine.length==1){
    const btnRM = document.getElementById("btnM");
    btnRM.removeAttribute("hidden");
  }
}

function reduceMachine(){
  verifyJoint();
}






function verifyJoint(){
  //get all states
  const allItems = this.allStates;
  //initialize accessible states
  let acc = [];

  //First iteration
  let firstState = [];
  for (let index = 0; index < dataMachine[0].length; index++) {
    const e = dataMachine[0][index];
    firstState.push(e);
  }
  //Get accesible from first state
  acc = getAccesibleS(acc,firstState);
  let isDone = IsInList(allStates, acc);
  

  if(isDone){
    reduceM();
  }else{
    //Iterate for connectivity
    let toCheck= [];
    let checked =[];
    checked.push(acc[0]);
    for (let index = 1; index < acc.length; index++) {
      const element = acc[index];
      toCheck.push(element);
    }

    //Iterate
    let iterationsJoint = 0;
    while(!isDone && toCheck.length>0){
      //find the next starting point
      let newSearch = searchState(toCheck[iterationsJoint].name, dataMachine);
      //get the new accesible states
      acc = getAccesibleS(acc,newSearch);
      //cleanAcc(acc,newAcc);
      //add new checked state checked
      checked.push(newSearch);
      //remove current searched from toCheck
      toCheck.shift();
      //verify if it is joint again
      isDone = IsInList(allStates, acc);
      //Add new acc to toCheck
    }
    if(!isDone){
      let newJointMachine = [];
      /*for (let index = 0; index < acc.length; index++) {
        const element = acc[index];
        console.log(element);
        
      }*/

      for (let i = 0; i < acc.length; i++) {
        let machineState = searchState(acc[i].name,dataMachine);
        console.log(machineState);

        let newMachineState = []
        for (let j = 0; j < machineState.length; j++) {
          const element = machineState[j];
          let newStateData;
          if(j==0){
            newStateData = new StateData(element.name, "stateName");
          }else{
            newStateData = new StateData(element.name, element.type);
          }
          newMachineState.push(newStateData);
        }

        newJointMachine.push(newMachineState);
      }
      
      console.log("NEW JOINT MACHINE");
      for (let a = 0; a < newJointMachine.length; a++) {
        const element = newJointMachine[a];
        console.log(element);
      }

      for (let i = 0; i < newJointMachine.length; i++) {
        const element = newJointMachine[i];
        jointMachine.push(element);
      }
    }
    createJointTable();
  }

}

function createJointTable(){
  //Get headers for table columns
  let headItems = [];
  headItems.push(`<th scope=\"col\">Estados/Entradas</th>`);
  headersForTable.forEach(key => {
    headItems.push(`<th scope=\"col\">${key}</th>`);
  });

  //Fill headers for table columns
  let tableM = document.querySelector(".table2");
  const tr = document.getElementById("tr2");

  if(tableM){
    tr.innerHTML = headItems.join(" ");
  }

  //Fill rows
  let dataS = "";
  for (let i = 0; i < jointMachine.length; i++) {  
    let j = 0;
    while(j<jointMachine[i].length){
      const elementj = jointMachine[i][j].name;
      if(j==0){
        dataS+=`<td>${elementj}</td>`;
        j++;
      }else{
        let textS = jointMachine[i][j].name+" | "+jointMachine[i][j+1].name;
        dataS+=`<td>${textS}</td>`;
        j+=2;
      }
    }
    let template = `<tr>${dataS}</tr>`;
    let tableX = document.querySelector('.table2');

    tableX.innerHTML += template;
    dataS = "";
  }
  console.log(dataS);

  /*dataS+=`<td>${formParent[1].value}</td>`
  

  let template = `<tr>${dataS}</tr>`;
  let table = document.querySelector('table');

  table.innerHTML += template;
  dataMachine.push(singleStateData);*/
}




function searchState(stateName, arrayOfStates){
  for (let index = 0; index < arrayOfStates.length; index++) {
    const element = arrayOfStates[index][0];
    if(element.type="stateName" && element.name == stateName){
      return arrayOfStates[index];
    }
    
  }
}






function getAccesibleS(startingAcc,initialState){
  let acc = startingAcc;

  initialState.forEach(e => {
    if(e.type!="response"){
      let isIn = false;
      for (let index = 0; index < acc.length && !isIn; index++) {
        const element = acc[index];
        if(element.name==e.name){
          isIn = true;
        }
      }
      if(!isIn){
        acc.push(new StateData(e.name, "e.type"));
      }
    }
  });

  return acc;
}






function IsInList(allItems, someItems){
  let isIn = 0;

  for (let i = 0; i < allItems.length; i++) {
    const ea = allItems[i];
    for (let j = 0; j < someItems.length; j++) {
      const es = someItems[j].name;
      if(ea==es){
        isIn++;
      }
    }
    
  }
  console.log("coincidencias: "+isIn)
  if (isIn==allItems.length) {
    return true;
  }else{
    return false;
  }
}


































function reduceM(){

}

class StateData{
  constructor(name, type){
    this.name = name,
    this.type = type
  }
}

class State{
  constructor(headerStateData, infoState){
    this.headerState = headerStateData;
    this.info = infoState;
  }
}