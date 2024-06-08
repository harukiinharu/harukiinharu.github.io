from pathlib import Path
import cv2
from os import remove

files = list(Path('lyric').glob('*.png')) + list(
    Path('public/images').glob('*.png')
)
for file in files:
    img = cv2.imread(file.as_posix())
    cv2.imwrite(
        f'{file.parent}/{file.stem}.webp',
        img,
        [cv2.IMWRITE_WEBP_QUALITY, 50],
    )
    remove(file.as_posix())
