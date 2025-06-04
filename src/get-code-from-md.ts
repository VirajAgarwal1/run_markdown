import markdownit from "markdown-it";
import * as fs from 'fs';
import * as path from 'path';
import * as handlers from "../handlers/index.js";

// Types for better organization
interface ExecutableBlock {
    lang: string;
    content: string;
}

interface FileCreationBlock {
    fileName: string;
    content: string;
}

// Synchronous version
function readFileToString(filename: string): string {
    const content = fs.readFileSync(filename, 'utf8');
    return content;
}

// 1. Function to clear and create the /out directory
function clearAndCreateOutDir(): void {
    const outDir = path.resolve('./out');
    
    // Clear the directory if it exists
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
    }
    
    // Create the directory
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`Created and cleared output directory: ${outDir}`);
}

// 2. Function to create a new file
function createFile(fileName: string, content: string): void {
    const filePath = path.join('./out', fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created file: ${fileName}`);
}

// 3. Function to detect if a code block should be ignored
function isIgnoredBlock(info: string): boolean {
    return info?.includes('#ignore') || false;
}

// 4. Function to detect if the code block is a normal executable and extract language
function isExecutableBlock(info: string): { isExecutable: boolean, lang?: string } {
    if (!info) return { isExecutable: false };
    
    // Look for #<lang> pattern
    const match = info.match(/#(sh|shell|ts|typescript|py|python)\b/i);
    if (match) {
        return { isExecutable: true, lang: match[1].toLowerCase() };
    }
    
    return { isExecutable: false };
}

// 5. Function to detect if the code block is a file creation block
function isFileCreationBlock(info: string): { isFile: boolean, fileName?: string } {
    if (!info) return { isFile: false };
    
    // Look for @<fileName> pattern
    const match = info.match(/@(\S+)/);
    if (match) {
        return { isFile: true, fileName: match[1] };
    }
    
    return { isFile: false };
}

// 6. Function to parse and categorize all code blocks
function parseCodeBlocks(ast: any[]): { executableBlocks: ExecutableBlock[], fileBlocks: Map<string, string[]> } {
    const executableBlocks: ExecutableBlock[] = [];
    const fileBlocks = new Map<string, string[]>();
    
    for (let i = 0; i < ast.length; i++) {
        const block = ast[i];
        if (block.tag === "code") {
            const info = block.info?.trim() || '';
            const content = block.content || '';
            
            // First check if the block should be ignored
            if (isIgnoredBlock(info)) {
                console.log(`Ignoring code block with #ignore tag`);
                continue;
            }
            
            // Check if it's a file creation block
            const fileCheck = isFileCreationBlock(info);
            if (fileCheck.isFile && fileCheck.fileName) {
                // It's a file creation block
                if (!fileBlocks.has(fileCheck.fileName)) {
                    fileBlocks.set(fileCheck.fileName, []);
                }
                fileBlocks.get(fileCheck.fileName)!.push(content);
                console.log(`Found file creation block for: ${fileCheck.fileName}`);
            } else {
                // Check if it's an executable block
                const execCheck = isExecutableBlock(info);
                if (execCheck.isExecutable && execCheck.lang) {
                    executableBlocks.push({ lang: execCheck.lang, content });
                    console.log(`Found executable block: #${execCheck.lang}`);
                } else {
                    console.log(`Skipping unsupported block type: ${info}`);
                }
            }
        }
    }
    
    return { executableBlocks, fileBlocks };
}

// 7. Function to create files from file creation blocks
function createFilesFromBlocks(fileBlocks: Map<string, string[]>): void {
    console.log('\n=== Creating Files ===');
    
    for (const [fileName, contentBlocks] of fileBlocks) {
        const combinedContent = contentBlocks.join('\n');
        createFile(fileName, combinedContent);
    }
    
    if (fileBlocks.size === 0) {
        console.log('No files to create.');
    }
}

// 8. Function to execute the executable blocks
function executeCodeBlocks(executableBlocks: ExecutableBlock[]): void {
    console.log('\n=== Executing Code Blocks ===');
    
    // Change to the /out directory for execution
    const originalCwd = process.cwd();
    const outDir = path.resolve('./out');
    process.chdir(outDir);
    console.log(`Changed working directory to: ${outDir}`);
    
    try {
        for (const block of executableBlocks) {
            const { lang, content } = block;
            
            console.log(`\nExecuting ${lang} code:`);
            console.log('-'.repeat(40));
            
            if (lang === "sh" || lang === "shell") {
                handlers.runShellCommandSync(content);
            }
            else if (lang === "ts" || lang === "typescript") {
                handlers.runTS(content);
            }
            else if (lang === "py" || lang === "python") {
                handlers.runPython(content);
            }
        }
    } finally {
        // Always change back to original directory
        process.chdir(originalCwd);
        console.log(`\nChanged back to original directory: ${originalCwd}`);
    }
    
    if (executableBlocks.length === 0) {
        console.log('No executable code blocks found.');
    }
}

/*
Execute code blocks from markdown file

Usage example:
    `executeMarkdownCodeBlocks("./sample_markdown.md");`

Features:
- All execution happens in ./out directory
- Code blocks with @<fileName> in their info are collected and written to files
- Multiple code blocks with the same @<fileName> are appended together
- Executable blocks must use #<lang> format (e.g., #sh, #python, #typescript)
- Code blocks with #ignore are skipped entirely
- Normal executable blocks are executed after files are created
*/
export function executeMarkdownCodeBlocks(filepath: string): void {
    console.log(`Processing markdown file: ${filepath}`);
    console.log('='.repeat(60));
    
    // Step 1: Clear and create the /out directory
    clearAndCreateOutDir();
    
    // Step 2: Read and parse the markdown file
    const fullSource = readFileToString(filepath);
    const md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
    });
    const ast = md.parse(fullSource, {});
    
    // Step 3: Parse and categorize code blocks
    const { executableBlocks, fileBlocks } = parseCodeBlocks(ast);
    
    // Step 4: Create files from file creation blocks
    createFilesFromBlocks(fileBlocks);
    
    // Step 5: Execute the executable code blocks
    executeCodeBlocks(executableBlocks);
    
    console.log('\n=== Processing Complete ===');
}
