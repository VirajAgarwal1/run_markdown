import { execSync } from 'child_process';

// Check if runtime exists
export function checkRuntime(command: string): boolean {
    try {
        execSync(`which ${command}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}