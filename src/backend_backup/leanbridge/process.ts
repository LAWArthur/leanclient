import { parentPort, workerData } from 'node:worker_threads';
import { Goal, Serializer, UnknownType } from '../ast/types';
import { parseGoal } from '../ast/ast';

function processGoal(rawGoal: string): Goal {
    try {
        const result = parseGoal(rawGoal);
        return result;
    }
    catch(e) {
        return { target: new UnknownType, vars: [], tag: undefined };
    }
}

const rawGoal: string = workerData;

const parsedGoal: Goal = processGoal(rawGoal);

const serializedGoal = Serializer.serialize(parsedGoal);

parentPort?.postMessage(serializedGoal);