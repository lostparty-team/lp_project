# Python 공식 이미지 사용
FROM python:3.11.10

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY requirements.txt requirements.txt
COPY . .

# 패키지 업데이트 및 필요한 라이브러리 설치
RUN apt-get update && apt-get install -y libgl1-mesa-glx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python 라이브러리 설치
RUN pip install --no-cache-dir -r requirements.txt

# Flask 앱 실행 포트 설정
EXPOSE 5001

# Flask 애플리케이션 실행
CMD ["python", "app.py"]