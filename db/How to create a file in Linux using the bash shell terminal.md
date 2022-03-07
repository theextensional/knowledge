---
tags: [linux, терминал, bash, shell, terminal]
aliases: [Как создать файл в терминале Linux]
---
# How to create a file in Linux using the bash shell terminal

## How to create a file in Linux from terminal window?

1. Create an empty text file named foo.txt:  
    **`touch foo.bar`**  
    OR  
    **`> foo.bar`**
2. Make a text file on Linux:  
    **`cat > filename.txt`**
3. Add data and press `CTRL`+`D` to save the filename.txt when using cat on Linux
4. Run shell command:  
    **`echo 'This is a test' > data.txt`**
5. Append text to existing file in Linux:  
    **`echo 'yet another line' >> data.txt`**

Let us see some examples for creating a text files on Linux operating systems.

## How to create a text file using the [cat command](https://www.cyberciti.biz/faq/linux-unix-appleosx-bsd-cat-command-examples/ "See Linux/Unix cat command examples for more info")

To create a text file named sales.txt, type the following command and then press `Enter` key:

```shell
cat > sales.txt
```  

Now type your lines of text. For example:

```shell
Month, Profit
01/Apr/2004, $1500
01/May/2004, $1600
01/Jun/2004, $1450
01/Jul/2004, $1950
01/Aug/2004, $3950
01/Sep/2004, $2950
01/Oct/2004, $1750
01/Nov/2004, $1950
01/Dec/2004, $3250
```

When done and you need to save and exit, press `Ctrl`+`D` to return to the bash shell prompt. To view file use cat or [more command](https://bash.cyberciti.biz/guide/More_command "See Linux/Unix more command examples for more info")/[less command](https://bash.cyberciti.biz/guide/Less_command "See Linux/Unix less command examples for more info"):

```shell
cat sales.txt  
more sales.txt
```  

![How to create a file in Linux from terminal window](../assets/Pasted%20image%2020220301183639.png)

## How to create an empty text file using the touch command

Simply type any one of the following command:

```shell
> data.txt
```  

OR

```shell
touch test.txt
```

Verify that empty files are created with the help of ls command:  

```shell
ls -l data.txt test.txt
```

![Verify that empty files are created with the help of ls command](../assets/Pasted%20image%2020220301183828.png)

## Creating a file in Linux using the echo or printf

Let us create a file called quote1.txt using [echo command](https://bash.cyberciti.biz/guide/Echo_Command "See Linux/Unix echo command examples for more info"), enter:

```shell
echo "While I thought that I was learning how to live, I have been learning how to die." > quote1.txt
```

OR use the [printf command](https://bash.cyberciti.biz/guide/Printf_command "See Linux/Unix printf command examples for more info")

```shell
printf 'Study nature, love nature, stay close to nature. It will never fail you.\n' > quote2.txt
```

## Appending data

Use the the `>>` instead of `>` to append data to existing file and to avoid overwriting files. The syntax is:

```shell
echo "There is no path to happiness. Happiness is the path." >> quote1.txt
printf 'It is ridiculous to think that somebody else can make you happy or unhappy.\n'  >> quote2.txt
printf 'Happiness does not depend on what you have or who you are. -- Buddha\n' >> quote2.txt
```

## How to create a file in Linux using joe text editor

JOE is text editor. To create a file called delta.txt, type:  

```shell
joe -help delta.txt
```

You will see help menu on screen. Next type something. To save the file and leave joe, by typing ^KX (press CTRL+K+X).

## How to create a text file in Linux using vi / vim text editor

The vi / vim is another text editor. To create a file called purchase.txt, type:  

```shell
vi purchase.txt
```

OR  

```shell
vim purchase.txt
```

Press `i` to insert new text. To [save the file and leave vi](https://www.cyberciti.biz/faq/save-file-in-vi-vim-linux-apple-macos-unix-bsd/), type `ESC`+`:`+`x` (press ESC key, type : followed by x and [enter] key).

## More examples

```shell
#!/bin/bash
file=""
read -p "May I know your file name please? " filename
file="${filename}_file.txt"
echo "Creating $file ..."
echo "$(date)" >"$file"
# append ##
echo "Friday" >> "${file}"

cat > "${filename}.log" <<EOF
Something went wrong at $(date) on $(hostname)
blah
blha
EOF
```

## Ссылки

* [Source](https://www.cyberciti.biz/faq/create-a-file-in-linux-using-the-bash-shell-terminal/)
