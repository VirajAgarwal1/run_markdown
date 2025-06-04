# run_markdown

Execute code blocks from markdown files directly from the command line. All execution happens in a clean `/out` directory.

## Installation & Usage

### Option 1: Run with npx (No Installation Required)

The easiest way to use `run_markdown` without installing anything:

```#shell #ignore
npx run_markdown <markdown-file-path>
```

**Example:**
```#shell #ignore
npx run_markdown README.md
npx run_markdown ./docs/tutorial.md
```

### Option 2: Global Installation via npm

Install globally to use the `run_markdown` command anywhere:

```#shell #ignore
# Install globally
npm install -g run_markdown

# Then use anywhere
run_markdown <markdown-file-path>
```

**Example:**
```#shell #ignore
run_markdown README.md
run_markdown ./docs/tutorial.md
```

### Option 3: Local Development Installation

If you want to contribute or modify the package:

```#shell #ignore
# Clone the repository
git clone https://github.com/VirajAgarwal1/run_markdown.git
cd run_markdown

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# Now you can use it locally
run_markdown <markdown-file-path>
```

**Or run directly without linking:**
```#shell #ignore
# After git clone and npm install + npm run build
node dist/src/cli.js <markdown-file-path>
```

## Quick Reference

| Installation Method | Command to Run |
|-------------------|----------------|
| **npx (no install)** | `npx run_markdown file.md` |
| **Global npm install** | `run_markdown file.md` |
| **Local development** | `run_markdown file.md` (after `npm link`) |
| **Local direct** | `node dist/src/cli.js file.md` |

## Basic Usage

```#shell #ignore
run_markdown ./your-file.md
```

The tool will:
1. Create/clear an `/out` directory in your current location
2. Parse the markdown file
3. Create files from code blocks with `@fileName` syntax
4. Execute code blocks with supported languages in the `/out` directory
5. Skip code blocks marked with `#ignore`

## Supported Languages

Executable code blocks must use the `#<lang>` format:

- `#shell` or `#sh` - Shell commands
- `#python` or `#py` - Python code (requires Python to be installed)
- `#typescript` or `#ts` - TypeScript code (requires ts-node to be installed)

## Special Tags

- `@fileName` - Creates/appends content to a file
- `#ignore` - Skips the code block entirely
- `#<lang>` - Executes the code block with the specified language

## File Creation Feature

You can create files by adding `@fileName` to your code block info. For example:

- A code block with `python @script.py` will write its content to `script.py`
- Multiple code blocks with the same `@fileName` will be combined into a single file
- The content is appended in the order the blocks appear in your markdown

Example: Two blocks with `python @script.py` will be joined together with newlines.

## Live Demo (This README is Executable!)

**Try it yourself:** Run `npx run_markdown README.md` to see this demo in action!

### Step 1: Create a multi-part Python script

```#python @demo_script.py
#!/usr/bin/env python3
"""
Demo script created from multiple markdown code blocks
This demonstrates the @fileName feature of run_markdown
"""

import os
import datetime

def show_environment():
    print("=== Environment Info ===")
    print(f"Current directory: {os.getcwd()}")
    print(f"Current time: {datetime.datetime.now()}")
    print(f"Files in directory: {os.listdir('.')}")
    print()

def create_demo_files():
    print("=== Creating Demo Files ===")
```

```#python @demo_script.py
    # Create a text file
    with open("demo.txt", "w") as f:
        f.write("Hello from the run_markdown demo!\n")
        f.write("This file was created by a Python script\n")
        f.write("that was assembled from multiple markdown code blocks.\n")
    
    # Create a JSON config file
    import json
    config = {
        "tool": "run_markdown",
        "version": "1.0.0",
        "demo": True,
        "created_at": str(datetime.datetime.now())
    }
    with open("config.json", "w") as f:
        json.dump(config, f, indent=2)
    
    print("Created demo.txt and config.json")

def main():
    print("🚀 Welcome to the run_markdown demo!")
    print("This Python script was created from multiple code blocks in README.md")
    print()
    
    show_environment()
    create_demo_files()
    
    print("✅ Demo completed successfully!")

if __name__ == "__main__":
    main()
```

### Step 2: Create an HTML page

```html @demo.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>run_markdown Demo</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .highlight { background-color: #f0f8ff; padding: 10px; border-radius: 5px; }
        code { background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>🎉 run_markdown Demo Page</h1>
    <div class="highlight">
        <p>This HTML file was created by running <code>run_markdown README.md</code>!</p>
        <p>It demonstrates how you can create files from markdown code blocks using the <code>@fileName</code> syntax.</p>
    </div>
    
    <h2>Features Demonstrated:</h2>
    <ul>
        <li>✅ Multi-part file creation (Python script from 2 code blocks)</li>
        <li>✅ HTML file generation</li>
        <li>✅ Shell command execution with #shell syntax</li>
        <li>✅ Execution in clean <code>/out</code> directory</li>
        <li>✅ Ignored code blocks with #ignore</li>
    </ul>
    
    <p><strong>Generated on:</strong> <span id="timestamp">Loading...</span></p>
    
    <script>
        document.getElementById('timestamp').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
```

### Step 3: Execute the demo

Now let's run our created files using the new `#<lang>` syntax:

```#shell
echo "🏃 Running the demo Python script..."
python3 demo_script.py
```

```#shell
echo ""
echo "📁 Final directory contents:"
ls -la
```

```#shell
echo ""
echo "📄 Contents of the demo text file:"
cat demo.txt
```

```#shell
echo ""
echo "⚙️  Contents of the config file:"
cat config.json
```

```#shell
echo ""
echo "🎊 Demo completed! Check out the generated files:"
echo "   • demo_script.py - Multi-part Python script"
echo "   • demo.html - Generated HTML page"
echo "   • demo.txt - Text file created by Python"
echo "   • config.json - JSON config created by Python"
echo ""
echo "Try opening demo.html in your browser to see the generated page!"
```

### Example of ignored block

This code block will be completely ignored during execution:

```#shell #ignore
# This is an example of an ignored block
# Even though it's valid bash, it won't be executed
echo "This will not be executed"
```

## How to Run This Demo

Note: This code block is marked with `#ignore` to prevent infinite recursion when running this README.

```#shell #ignore
# Clone or download this package, then:
npx run_markdown README.md

# Or with npx:
npx run_markdown README.md
```

This will create an `/out` directory with all the demo files and run the demonstration!

## Development

### Building the Project

```#shell #ignore
npm run build
```

### Local Development Workflow

1. **Clone and setup:**
   ```#shell #ignore
   git clone https://github.com/VirajAgarwal1/run_markdown.git
   cd run_markdown
   npm install
   ```

2. **Build and test:**
   ```#shell #ignore
   npm run build
   npm link
   ```

3. **Test your changes:**
   ```#shell #ignore
   run_markdown <test-file.md>
   ```

4. **Or test directly without linking:**
   ```#shell #ignore
   node dist/src/cli.js <test-file.md>
   ```

### Project Structure

```
run_markdown/
├── src/
│   ├── cli.ts              # CLI entry point
│   └── get-code-from-md.ts # Main logic
├── handlers/               # Code execution handlers
├── utils/                  # Utility functions
├── dist/                   # Compiled JavaScript (after build)
└── out/                    # Generated files (when running)
```

## License

MIT 