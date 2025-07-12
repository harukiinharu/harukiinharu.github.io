#!/bin/zsh

folder_list=("./public/images" "./lyric")
extensions=("png" "jpg" "jpeg")

# zsh 的空匹配处理
setopt NULL_GLOB

for ext in "${extensions[@]}"; do
    for folder in "${folder_list[@]}"; do
        # 检查文件夹是否存在
        if [ ! -d "$folder" ]; then
            echo "警告: 文件夹 $folder 不存在"
            continue
        fi

        for file in "$folder"/*."$ext"; do
            # 检查文件是否存在
            if [ -f "$file" ]; then
                if cwebp "$file" -q 60 -o "${file%.$ext}.webp" -quiet; then
                    rm "$file"
                    echo "$file -> ${file%.$ext}.webp"
                else
                    echo "警告: $file 转换失败"
                fi
            fi
        done
    done
done
