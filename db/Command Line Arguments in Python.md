---
tags: [python, cli]
---
# Command Line Arguments in Python

The arguments that are given after the name of the program in the command line shell of the operating system are known as **Command Line Arguments**. Python provides various ways of dealing with these types of arguments. The three most common are:

- [Using sys.argv](https://www.geeksforgeeks.org/command-line-arguments-in-python/#sys)
- [Using getopt module](https://www.geeksforgeeks.org/command-line-arguments-in-python/#getopt)
- [Using argparse module](https://www.geeksforgeeks.org/command-line-arguments-in-python/#argparse)

## Using sys.argv

The sys module provides functions and variables used to manipulate different parts of the Python runtime environment. This module provides access to some variables used or maintained by the interpreter and to functions that interact strongly with the interpreter.  
One such variable is sys.argv which is a simple list structure. It's main purpose are:

- It is a list of command line arguments.
- `len(sys.argv)` provides the number of command line arguments.
- `sys.argv[0]` is the name of the current Python script.

**Example:** Let's suppose there is a Python script for adding two numbers and the numbers are passed as command-line arguments.

```python
# Python program to demonstrate
# command line arguments


import sys

# total arguments
n = len(sys.argv)
print("Total arguments passed:", n)

# Arguments passed
print("\nName of Python script:", sys.argv[0])

print("\nArguments passed:", end = " ")
for i in range(1, n):
    print(sys.argv[i], end = " ")
 
# Addition of numbers
Sum = 0
# Using argparse module
for i in range(1, n):
    Sum += int(sys.argv[i])
 
print("\n\nResult:", Sum)
```

**Output:**

![Output](../assets/Pasted%20image%2020220216154629.png)

## Using getopt module

Python **getopt module** is similar to the [getopt()](https://www.geeksforgeeks.org/getopt-function-in-c-to-parse-command-line-arguments/) function of C. Unlike sys module getopt module extends the separation of the input string by parameter validation. It allows both short, and long options including a value assignment. However, this module requires the use of the sys module to process input data properly. To use getopt module, it is required to remove the first element from the list of command-line arguments.

>**Syntax:** getopt.getopt(args, options, [long_options])  
**Parameters:**
**args:** List of arguments to be passed.
**options:** String of option letters that the script want to recognize. Options that require an argument should be followed by a colon (:).
**long_options:** List of string with the name of long options. Options that require arguments should be followed by an equal sign (=).  
**Return Type:** Returns value consisting of two elements: the first is a list of (option, value) pairs. The second is the list of program arguments left after the option list was stripped.

**Example:**

```python
# Python program to demonstrate
# command line arguments


import getopt, sys


# Remove 1st argument from the
# list of command line arguments
argumentList = sys.argv[1:]

# Options
options = "hmo:"

# Long options
long_options = ["Help", "My_file", "Output ="]

try:
    # Parsing argument
    arguments, values = getopt.getopt(argumentList, options, long_options)

    # checking each argument
    for currentArgument, currentValue in arguments:

        if currentArgument in ("-h", "--Help"):
            print ("Displaying Help")

        elif currentArgument in ("-m", "--My_file"):
            print ("Displaying file_name:", sys.argv[0])

        elif currentArgument in ("-o", "--Output"):
            print (("Enabling special output mode (% s)") % (currentValue))
   
except getopt.error as err:
    # output error, and return with an error code
    print (str(err))
```

**Output:**

![Output](../assets/Pasted%20image%2020220216154833.png)

## Using argparse module

Using argparse module is a better option than the above two options as it provides a lot of options such as positional arguments, default value for arguments, help message, specifying data type of argument etc.

**Note:** As a default optional argument, it includes -h, along with its long version -help.  

**Example 1:** Basic use of argparse module.

```python
# Python program to demonstrate
# command line arguments


import argparse

# Initialize parser
parser = argparse.ArgumentParser()
parser.parse_args()
```

**Output:**

![Output](../assets/Pasted%20image%2020220216154922.png)

**Example 2:** Adding description to the help message.

```python
# Python program to demonstrate
# command line arguments


import argparse

msg = "Adding description"

# Initialize parser
parser = argparse.ArgumentParser(description = msg)
parser.parse_args()
```

**Output:**

![Output](../assets/Pasted%20image%2020220216155008.png)

**Example 3:** Defining optional value

```python
# Python program to demonstrate
# command line arguments


import argparse


# Initialize parser
parser = argparse.ArgumentParser()

# Adding optional argument
parser.add_argument("-o", "--Output", help = "Show Output")

# Read arguments from command line
args = parser.parse_args()

if args.Output:
    print("Displaying Output as: % s" % args.Output)
```

**Output:**

![Output](../assets/Pasted%20image%2020220216155043.png)

## Ссылки

- [Source](https://www.geeksforgeeks.org/command-line-arguments-in-python/)
- [Python](Python.md)
- [CLI](CLI.md)
