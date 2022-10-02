class MooreState {
    constructor(nombre) {
        this.nombre = nombre
        this.estados = []
        this.grupo = ""
        this.salida = ""
    }

    getAccesible(){
        return new Set(this.estados)
    }
}

class MooreAutomata{
    constructor(){
        this.estados = [];
        this.estadosSalidas = new Map();
        this.accesibles = []
    }

    calculateAccesibles(){
        
    }

    getState(nombre){
        const found = this.estadosSalidas.find(element => element.nombre == nombre);
        return found;
    }
}

