import base64
import cv2
import numpy as np
from ultralytics import YOLO

model = YOLO("yolo/best.pt")

def process_image(image_data: str):
    header, encoded = image_data.split(',', 1)
    decoded_image = np.frombuffer(base64.b64decode(encoded), np.uint8)
    original_image = cv2.imdecode(decoded_image, cv2.IMREAD_COLOR)
    original_height, original_width = original_image.shape[:2]

    resized_image = cv2.resize(original_image, (640, 640))
    results = model(resized_image)
    cropped_images = []

    for result in results:
        boxes = result.boxes
        if len(boxes) == 0:  # 박스가 없다면 넘어가도록 처리
            continue
            
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1 = int(x1 * original_width / 640)
            y1 = int(y1 * original_height / 640)
            x2 = int(x2 * original_width / 640)
            y2 = int(y2 * original_height / 640)

            if int(box.cls[0]) == 0:  # 특정 클래스 필터링
                cropped_image = original_image[y1:y2, x1:x2]
                cropped_images.append(cropped_image)

    return cropped_images
