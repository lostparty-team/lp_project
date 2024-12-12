from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
from PIL import Image
import pytesseract
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 초록박스 템플릿 로드
template_path = "초록박스.png"
template_image = cv2.imread(template_path, cv2.IMREAD_COLOR)

# 템플릿 이미지 유효성 검사 및 처리
if template_image is None:
    raise FileNotFoundError(f"Template image not found at {template_path}")

@app.route('/process', methods=['POST'])
def process_image():
    data = request.json.get('image')
    if not data:
        return jsonify({'error': 'No image data provided'}), 400

    try:
        # Base64 디코딩
        header, encoded = data.split(',', 1)  # Base64 헤더 분리
        image_data = base64.b64decode(encoded)
        np_array = np.frombuffer(image_data, np.uint8)
        original_image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    except Exception as e:
        return jsonify({'error': f'Failed to decode image: {str(e)}'}), 400

    # 원본 이미지 유효성 검사
    if original_image is None:
        return jsonify({'error': 'Failed to decode the uploaded image'}), 400

    # 템플릿과 원본 이미지를 동일한 색상 채널로 변환
    if template_image.shape[2] != original_image.shape[2]:
        original_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
        template_image_gray = cv2.cvtColor(template_image, cv2.COLOR_BGR2GRAY)
    else:
        template_image_gray = template_image

    # 템플릿 매칭 수행
    result = cv2.matchTemplate(original_image, template_image_gray, cv2.TM_CCOEFF_NORMED)

    # 임계값 설정 및 위치 찾기
    threshold = 0.7
    locations = np.where(result >= threshold)

    # 템플릿 크기 및 사용자 지정 영역 설정
    h, w = template_image.shape[:2]
    left_offset = 440
    new_width = 200
    additional_height_down = 20

    # 빈 마스크 생성
    mask = np.zeros_like(original_image, dtype=np.uint8)

    # 탐지된 모든 위치에 대해 마스크 처리
    for pt in zip(*locations[::-1]):
        new_top_left = (max(pt[0] - left_offset, 0), pt[1])
        new_bottom_right = (
            min(new_top_left[0] + new_width, original_image.shape[1]),
            min(new_top_left[1] + h + additional_height_down, original_image.shape[0])
        )
        mask[new_top_left[1]:new_bottom_right[1], new_top_left[0]:new_bottom_right[0]] = \
            original_image[new_top_left[1]:new_bottom_right[1], new_top_left[0]:new_bottom_right[0]]

    # OCR 처리
    pil_image = Image.fromarray(cv2.cvtColor(mask, cv2.COLOR_BGR2RGB))
    extracted_text = pytesseract.image_to_string(pil_image, lang="kor+eng", config="--oem 1 --psm 4")
    lines = [line.strip() for line in extracted_text.splitlines() if line.strip()]

    # 텍스트로 된 JSON 응답 반환
    response = {
        '닉네임': lines
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)