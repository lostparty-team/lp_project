from flask import Flask, request, jsonify
import requests
import base64
import cv2
import numpy as np
from ultralytics import YOLO
import easyocr
from flask_cors import CORS
from data_class.member import Member

app = Flask(__name__)
CORS(app)



@app.route('/process', methods=['POST'])
def process_image():
    members = []
    # 이미지 데이터 처리
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

    # try:
    if True:
        # 모델 로드
        model = YOLO("model/best.pt")
        original_height, original_width = original_image.shape[:2]

        # 이미지 리사이즈 (640x640)
        resized_image = cv2.resize(original_image, (640, 640))

        # 추론 수행
        results = model(resized_image)

        # 닉네임 이미지 배열 생성
        cropped_images = []
        for result in results:
            idx = 0
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                cls = int(box.cls[0])

                # 바운딩 박스 좌표를 원본 크기로 변환
                x1 = int(x1 * original_width / 640)
                y1 = int(y1 * original_height / 640)
                x2 = int(x2 * original_width / 640)
                y2 = int(y2 * original_height / 640)

                if cls == 1:  # 특정 클래스만 처리
                    cropped_image = original_image[y1:y2, x1:x2]
                    cropped_images.append(cropped_image)
                    idx += 1

        # OCR 텍스트 읽기
        reader = easyocr.Reader(['ko', 'en'])
        nicknames = []
        for img in cropped_images:
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, img_binary = cv2.threshold(img_gray, 150, 255, cv2.THRESH_BINARY)
            result = reader.readtext(img_binary)
            members.append(Member(result[0][1] if result else "No Text").to_dict())
            print(members)
            nicknames.append(result[0][1] if result else "No Text")

        return jsonify({
            'status': 'success',
            'message': 'Image processed successfully',
            'nicknames': nicknames,
            'members': members,
        }), 200
    # except Exception as e:
    #     return jsonify({'error': f'Error during processing: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
