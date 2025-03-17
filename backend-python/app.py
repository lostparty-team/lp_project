# import libraries
import os
from dotenv import load_dotenv
# import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
# import for image processing
import cv2
import base64
import numpy as np
# import YOLO model
from ultralytics import YOLO
# import OCR model
from paddleocr import PaddleOCR
# import for HTTP request
import requests
# import data class
from data_class.member import Member

# load dotenv
load_dotenv()
EXPRESS_API = os.environ.get("EXPRESS_API")

# initialize flask
app = Flask(__name__)
CORS(app)

# load models
with app.app_context():
    model = YOLO("model/best.pt")

def _get_member_info(nickname: str, api_key: str) -> Member:
    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json",
    }
    payload = {"nickname": nickname}
    response = requests.post(f"{EXPRESS_API}/party", json=payload, headers=headers)
    response_data = response.json()
    if "error" in response_data:
        member = Member(name=nickname, data=None)
    else:
        member = Member(name=nickname, data=response_data)
    return member

@app.route("/party/screen", methods=["POST"])
def get_party_screen_info():
    global model, ocr
    members = []
    api_key = request.headers.get("Authorization")
    image_data = request.json.get("image")
    if not image_data:
        return jsonify({
            "status": "error",
            "message": "이미지 파라미터가 제공되지 않았습니다.",
        }), 400
    if not api_key:
        return jsonify({
            "status": "error",
            "message": "API KEY가 제공되지 않았습니다.",
        }), 401

    try:
        header, encoded = image_data.split(',', 1)
        decoded_image_data = base64.b64decode(encoded)
        image_np_array = np.frombuffer(decoded_image_data, np.uint8)
        original_image = cv2.imdecode(image_np_array, cv2.IMREAD_COLOR)
        result_image = original_image
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"이미지를 변환하는 과정에서 오류가 발생했습니다.: {image_data}",
        }), 400

    # image processing (find bbox)
    try:
        original_height, original_width = original_image.shape[:2]
        resized_image = cv2.resize(original_image, (640, 640))
        results = model(resized_image)
        cropped_images = []
        for result in results:
            idx = 0
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                conf = box.conf[0]
                cls = int(box.cls[0])

                x1 = int(x1 * original_width / 640)
                y1 = int(y1 * original_height / 640)
                x2 = int(x2 * original_width / 640)
                y2 = int(y2 * original_height / 640)

                if cls == 0:
                    cropped_image = original_image[y1:y2, x1:x2]
                    cropped_images.append(cropped_image)
                    idx += 1
                # === TEST CODE ===
                cv2.rectangle(result_image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(result_image, f"Class {cls}: {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        cv2.imwrite("debug/result.jpg", result_image)
        # =================
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"이미지를 처리하는 과정에서 오류가 발생했습니다: {str(e)}",
        }), 500
    
    # ocr
    try:
        ocr = PaddleOCR(lang="korean")
        nicknames = []
        idx = 0
        for img in cropped_images:
            idx += 1
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            img_pad = np.pad(img_gray, ((10, 10), (10, 10)), "constant", constant_values=0)
            scale_factor = 2
            img_upscaled = cv2.resize(img_pad, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)
            cv2.imwrite(f"debug/{idx}.jpg", img_upscaled)
            result = ocr.ocr(img_upscaled)[0]
            if result:
                nicknames.append(result[0][1][0])
                member = _get_member_info(nickname=result[0][1][0], api_key=api_key)
                members.append(member.to_dict())
        return jsonify({
            "status": "success",
            "message": "화면으로부터 공대원 정보를 성공적으로 받아왔습니다.",
            "nicknames": nicknames,
            "members": members,
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"OCR 과정에서 오류가 발생했습니다: {str(e)}",
        }), 500

@app.route('/party/member', methods=['GET'])
def get_party_member_info():
    api_key = request.headers.get("Authorization")
    nickname = request.args.get("nickname")
    if not nickname:
        return jsonify({
            "status": "error",
            "message": "닉네임 파라미터가 제공되지 않았습니다.",
        }), 400
    if not api_key:
        return jsonify({
            "status": "error",
            "message": "API KEY가 제공되지 않았습니다.",
        }), 401
    
    member = _get_member_info(nickname=nickname, api_key=api_key)

    return jsonify({
        "status": "success",
        "message": "해당 공대원의 정보를 성공적으로 받아왔습니다.",
        "data": member.to_dict(),
    }), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
