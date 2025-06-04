#!/usr/bin/env node

import { executeMarkdownCodeBlocks } from './get-code-from-md.js';
import * as path from 'path';
import * as fs from 'fs';

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('Usage: run_markdown <markdown-file-path>');
        console.error('Example: run_markdown ./sample.md');
        process.exit(1);
    }
    
    const filePath = args[0];
    
    // Resolve the file path to an absolute path
    const resolvedPath = path.resolve(filePath);
    
    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
        console.error(`Error: File not found: ${filePath}`);
        process.exit(1);
    }
    
    // Check if it's a file (not a directory)
    const stats = fs.statSync(resolvedPath);
    if (!stats.isFile()) {
        console.error(`Error: ${filePath} is not a file`);
        process.exit(1);
    }
    
    console.log(`Running markdown code blocks from: ${filePath}`);
    console.log('=' .repeat(50));
    
    try {
        executeMarkdownCodeBlocks(resolvedPath);
    } catch (error) {
        console.error('Error executing markdown code blocks:', error);
        process.exit(1);
    }
}

main(); 