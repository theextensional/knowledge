# How to Convert WebP to PNG in Linux

202102260339
Теги: #convert #webp #png #cli #linux #linuxtricks 
___


## Convert WebP to PNG

```bash
dwebp file.webp -o file.png
```

If you want to convert image to jpg then use below command.

```bash
dwebp 1.webp -o – | convert – 1.jpg
```

For all files with extension webp in directory:
```bash
for i in ./*.webp; do dwebp "$i" -o "${i[@]/%webp/png}"; done
```

### Install libwebp

Arch:
```bash
pacman -S libwebp
```

Deb:

```bash
sudo apt install webp
```

The package provides the following tools:

- cwebp - a WebP encoder tool.
- dwebp - a WebP decoder tool.
- vwebp - a WebP viewer app.
- wepmux - a WebP muxing tool.
- gif2webp - a tool for converting GIF images to WebP.

## Convert WebP to PNG with ffmpeg

```bash
ffmpeg -i file.webp file.png
```

## Convert PNG files to WebP

The opposite conversion might also be useful. In a number of situations, WebP provides a better compression ratio than PNG. To convert a PNG file to WebP, execute the following command:

```bash
cwebp file.png -o file.webp
```

The default quality for WebP is set to 75. You can increase or reduce it by specifying the -q argument for the encoder, as follows.

```bash
cwebp -q 80 file.png -o file.webp
```

That's it.

## Категории
* 

## Ссылки
* 