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
        for (let index = 0; index < this.accesibles.length; index++) {
            this.connected.push(this.getState(this.accesibles[index]))
        }
    }

    getPartition(){
        var automata = this.connected;
        var groups = this.getGroups();
        var partition = []
        console.log(automata)
        for (let i = 0; i < groups.length; i++) {
            var group = []
            for (let j = 0; j < automata.length; j++) {
                if(automata[j].grupo===groups[i]){
                    group.push(automata[j])
                }
                
            }
            partition.push(group)
        }
        return partition;
    }

    setGroups(){
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

