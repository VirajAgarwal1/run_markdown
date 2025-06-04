import { execSync } from 'child_process';
import { checkRuntime } from '../utils/runtime-checker.js';

// Execute Python code
export function runPython(code: string): void {
    if (checkRuntime("python")) {
        console.log( execSync(`python`, { encoding: 'utf8' }) );
    }
    throw new Error("python runtime environment not installed") 
}