from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
import pytesseract
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)  # 모든 출처에서의 요청 허용

# 템플릿 이미지 로드
template_path = "초록박스.png"
template_image = cv2.imread(template_path, cv2.IMREAD_COLOR)

# 템플릿 유효성 검사
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

    try:
        # 템플릿 매칭 수행
        result = cv2.matchTemplate(original_image, template_image, cv2.TM_CCOEFF_NORMED)

        # 임계값 설정 및 매칭 위치 찾기
        threshold = 0.7
        locations = np.where(result >= threshold)

        # 템플릿 크기 가져오기
        h, w = template_image.shape[:2]

        # 사용자 지정 offset과 크기 설정
        left_offset = 430
        new_width = 200
        additional_height_down = 5
        vertical_shift = 5  # 아래로 이동할 거리

        # 빈 마스크 생성 (원본 이미지와 동일한 크기)
        mask = np.zeros_like(original_image, dtype=np.uint8)

        # 매칭된 위치에 대해 마스크 처리
        for pt in zip(*locations[::-1]):
            # 새로운 영역 계산
            new_top_left = (max(pt[0] - left_offset, 0), pt[1] + vertical_shift)
            new_bottom_right = (
                min(new_top_left[0] + new_width, original_image.shape[1]),
                min(new_top_left[1] + h + additional_height_down, original_image.shape[0])
            )

            # 마스크 처리 (영역 외를 검은색으로 설정)
            mask[new_top_left[1]:new_bottom_right[1], new_top_left[0]:new_bottom_right[0]] = \
                original_image[new_top_left[1]:new_bottom_right[1], new_top_left[0]:new_bottom_right[0]]

        # OCR 수행 (PIL을 사용한 텍스트 추출)
        pil_image = Image.fromarray(cv2.cvtColor(mask, cv2.COLOR_BGR2RGB))
        extracted_text = pytesseract.image_to_string(pil_image, lang="kor+eng", config="--oem 3 --psm 4")
        lines = [line.strip() for line in extracted_text.splitlines() if line.strip()]

        # 텍스트 배열 반환
        return jsonify({
            'status': 'success',
            'message': '템플릿 매칭됨, 마스크 처리됨, 텍스트 추출함함',
            '닉네임': lines
        }), 200

    except Exception as e:
        return jsonify({'error': f'Error during template matching or text extraction: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
