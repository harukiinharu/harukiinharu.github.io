#!/bin/sh

folder_list=("./public/images" "./lyric")

for folder in "${folder_list[@]}"; do
    for file in $folder/*.png; do
        cwebp $file -q 50 -o ${file%.png}.webp -quiet
        rm $file
    done
done
