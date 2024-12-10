from flask import Flask, request, jsonify, send_file
import cv2
import numpy as np
from PIL import Image
import pytesseract
import io
import os
import json
import base64

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# 초록박스 템플릿 로드
template_path = "초록박스.png"
template_image = cv2.imread(template_path, cv2.IMREAD_COLOR)

# 결과 이미지 저장 경로
output_image_path = "masked_result.png"


@app.route('/process', methods=['POST'])
def process_image():
    # POST 요청에서 Base64 인코딩된 이미지 읽기
    data = request.json  # JSON 데이터 읽기
    if 'image' not in data:
        return jsonify({'error': 'No image data provided'}), 400

    # Base64 디코딩
    base64_image = data['image']
    try:
        image_data = base64.b64decode(base64_image)
    except base64.binascii.Error:
        return jsonify({'error': 'Invalid base64 encoding'}), 400

    # OpenCV용 이미지 변환
    np_image = np.frombuffer(image_data, np.uint8)
    original_image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
    if original_image is None:
        return jsonify({'error': 'Invalid image data'}), 400

    # 템플릿 매칭 수행
    result = cv2.matchTemplate(original_image, template_image, cv2.TM_CCOEFF_NORMED)

    # 임계값 설정 및 위치 찾기
    threshold = data.get('threshold', 0.8)
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

    # JSON 응답 반환
    response = {
        '닉네임': lines
    }
    return app.response_class(
        response=json.dumps(response, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )


# @app.route('/download_masked_image', methods=['GET'])
# def download_masked_image():
#     # 저장된 마스크 이미지를 반환
#     if os.path.exists(output_image_path):
#         return send_file(output_image_path, mimetype='image/png')
#     else:
#         return jsonify({'error': 'Masked image not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
