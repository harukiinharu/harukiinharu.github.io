#!/bin/zsh

localPath=$(dirname $(realpath $0))

folder_list=("../public/images" "../lyric")
extensions=("png" "jpg" "jpeg" "webp")


for folder in "${folder_list[@]}"; do
    for ext in "${extensions[@]}"; do
        # ls *.$ext | bunx avif --input *.$ext --output .
        find $localPath/$folder -name "*.$ext" | parallel bunx avif --input {} --output $localPath/$folder
        rm -f $localPath/$folder/*.$ext
    done
done
