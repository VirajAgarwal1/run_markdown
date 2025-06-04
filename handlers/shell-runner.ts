import { execSync } from 'child_process';

// Using execSync (synchronous)
export function runShellCommandSync(command: string): void {
  console.log(execSync(command, { encoding: 'utf8' }) );
}

// // Using spawn for streaming output
// function runShellCommandWithStreaming(command: string, args: string[] = []): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const process = spawn(command, args);

//     process.stdout.on('data', (data) => {
//       console.log(`Output: ${data}`);
//     });

//     process.stderr.on('data', (data) => {
//       console.error(`Error: ${data}`);
//     });

//     process.on('close', (code) => {
//       if (code === 0) {
//         resolve();
//       } else {
//         reject(new Error(`Process exited with code ${code}`));
//       }
//     });
//   });
// }