import { execSync } from 'child_process';

// Execute TypeScript code
export function runTS(code: string): void {
  console.log( execSync(`npx ts-node`, { encoding: 'utf8' }) );
}