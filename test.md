# Test New Features

This markdown file demonstrates the new functionality:
1. File creation with `@fileName` syntax
2. Multiple code blocks contributing to the same file
3. Execution happening in the `/out` directory

## Creating a Python script in multiple parts

First, let's create the imports and main function:

```python @hello.py
#!/usr/bin/env python3

def greet(name):
    return f"Hello, {name}!"

def main():
```

Now let's add the main logic:

```python @hello.py
    print(greet("World"))
    print("This script was created from multiple markdown code blocks!")
    
    # Let's also create a file to prove we're in /out directory
    with open("created_by_python.txt", "w") as f:
        f.write("This file was created by the Python script in /out directory")

if __name__ == "__main__":
    main()
```

## Creating a simple HTML file

```html @index.html
<!DOCTYPE html>
<html>
<head>
    <title>Generated from Markdown</title>
</head>
<body>
    <h1>Hello from Generated HTML!</h1>
    <p>This HTML file was created from a markdown code block.</p>
</body>
</html>
```

## Creating a shell script

```bash @setup.sh
#!/bin/bash
echo "Setting up the environment..."
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la
```

## Now let's execute some commands

First, let's make the scripts executable and run them:

```shell
chmod +x hello.py setup.sh
```

```shell
echo "Running the setup script:"
./setup.sh
```

```shell
echo "Running the Python script:"
python3 hello.py
```

```shell
echo "Final directory contents:"
ls -la
``` 