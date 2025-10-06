import { ClassicPreset } from "rete";

// Socket specific for targets
export abstract class Socket extends ClassicPreset.Socket {
    constructor(name: string) {
        super(name);
    }

    abstract isCompatibleWith(socket : Socket) : boolean;
    isConnected = false;
    isOptional = false;
}

export class TargetSocket extends Socket {
    constructor() {
        super("Proof"); // Is this ok? Maybe...
    }

    isCompatibleWith(socket : Socket){
        return socket instanceof TargetSocket;
    }

    isConnected = false

    goalId?: number
}

export class ProofSocket extends Socket {
    constructor(isOptional = false) {
        super("Proof");
        this.isOptional = isOptional;
    }

    isCompatibleWith(socket : Socket){
        return socket instanceof TargetSocket || socket instanceof ProofSocket;
    }

    isConnected = false;
    isOptional : boolean;
}

export class PropSocket extends Socket {
    constructor(isOptional = false) {
        super("Prop");
        this.isOptional = isOptional;
    }

    isCompatibleWith(socket : Socket){
        return socket instanceof PropSocket;
    }

    isConnected = false;
    isOptional : boolean;
}