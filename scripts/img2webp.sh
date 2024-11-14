#!/bin/sh

folder_list=("./public/images" "./lyric")
extensions=("png" "jpg" "jpeg")

for ext in "${extensions[@]}"; do
    for folder in "${folder_list[@]}"; do
        for file in $folder/*.$ext; do
            cwebp $file -q 100 -o ${file%.$ext}.webp -quiet
            rm $file
        done
    done
done
