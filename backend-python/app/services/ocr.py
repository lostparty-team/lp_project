import cv2
import numpy as np
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang="korean")

def extract_text_from_image(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img_pad = np.pad(img_gray, ((10, 10), (10, 10)), "constant", constant_values=0)
    img_upscaled = cv2.resize(img_pad, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    result = ocr.ocr(img_upscaled)
    if result and len(result) > 0 and len(result[0]) > 0:
        # 첫 번째 블록의 텍스트 추출
        text = result[0][0][1][0]
        return text
    return None  # 텍스트가 없으면 None 반환
