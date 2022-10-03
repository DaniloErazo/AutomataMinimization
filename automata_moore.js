class MooreState {
    constructor(nombre) {
        this.nombre = nombre
        this.estados = []
        this.grupo = ""
        this.salida = ""
        this.accesible = false
    }

    getAccesible(){
        return Array.from( new Set(this.estados)); 
    }
}

class MooreAutomata{
    constructor(){
        this.estados = [];
        this.accesibles = []
        this.connected = []
    }

    calculateAccesibles(){
        //get first state
        var first = this.estados[0].nombre;
        var accesibles = [] 
        accesibles.push(first);
        var control = accesibles.length
        for (let i = 0; i < control; i++) {
            var estado = this.getState(accesibles[i]);
            //get accesible states from a state
            var estadoAccesibles = estado.getAccesible();
            for (let index = 0; index < estadoAccesibles.length; index++) {
                if(accesibles.includes(estadoAccesibles[index])){
                }else{
                    //add them to the accesible states if it's not already added 
                    accesibles.push(estadoAccesibles[index]);
                }
                
            }
            control = accesibles.length;
        }
        this.accesibles = Array.from(new Set(accesibles));
        this.setConnected()
        this.setGroups()
        return this.accesibles
    }

    setConnected(){
        //determines  the states for the connected automata
        for (let index = 0; index < this.accesibles.length; index++) {
            this.connected.push(this.getState(this.accesibles[index]))
        }
    }

    getPartition(){
        //builds the first partition
        var automata = this.connected;
        var groups = this.getGroups();
        var partition = []
        for (let i = 0; i < groups.length; i++) {
            //first loop takes the group
            var group = []
            for (let j = 0; j < automata.length; j++) {
                //second loop adds state to its group
                if(automata[j].grupo===groups[i]){
                    group.push(automata[j])
                }
            }
            partition.push(group)
        }
        return partition;
    }

    showPartition(){
        //generates a string with the first partition
        var partition = this.getPartition();
        var partitionString = []
        for (let i = 0; i < partition.length; i++) {
            var grupo = partition[i]
            var grupoString  = []
            for (let j = 0; j < grupo.length; j++) {
                grupoString.push(grupo[j].nombre)
            }
            partitionString.push("[" + grupoString.toString() + "]")
            
        }
        return partitionString
    }

    setGroups(){
        //calculates the group of inputs in order to calculate first partition
        for (let i = 0; i < this.connected.length; i++) {
            var estado = this.connected[i];
            var estadosSalida= estado.estados;
            var grupo = ""
            for (let j = 0; j < estadosSalida.length; j++) {
                grupo += this.getState(estadosSalida[j]).salida;
            }
            estado.grupo = grupo
        }
    }

    getGroups(){
        //calculates how many and which are the groups for making the first partition
        var groups = []
        for (let i = 0; i < this.connected.length; i++) {
            var estado = this.connected[i];
            var group= estado.grupo;
            groups.push(group)
        }

        return Array.from(new Set(groups))
    }

    getState(nombre){
        const found = this.estados.find(element => element.nombre == nombre);
        return found;
    }
}

