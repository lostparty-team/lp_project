import cv2
import numpy as np
from paddleocr import PaddleOCR
from datetime import datetime

ocr = PaddleOCR(use_angle_cls=False, lang="korean", use_gpu=True)

def extract_text_from_image(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 검은 계열 색상을 완전히 검정색으로 변환
    threshold_value = 50  # 이 값보다 어두운 색상을 검정으로 처리
    img_black = np.where(img_gray < threshold_value, 0, img_gray)
    
    img_pad = np.pad(img_black, ((10, 10), (10, 10)), "constant", constant_values=0)
    img_upscaled = cv2.resize(img_pad, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
   
    # 타임스탬프로 고유한 파일 이름 생성
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"upscaled_image_{timestamp}.png"
    cv2.imwrite(filename, img_upscaled)
    print(f"이미지가 '{filename}'로 저장되었습니다.")

    result = ocr.ocr(img_upscaled)
    print(result)
    if result and len(result) > 0 and len(result[0]) > 0:
        # 첫 번째 블록의 텍스트 추출
        text = result[0][0][1][0]
        return text
    return None  # 텍스트가 없으면 None 반환
