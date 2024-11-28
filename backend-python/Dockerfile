# Python 공식 이미지 사용
FROM python:3.13

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY requirements.txt requirements.txt

# 종속성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 파일 복사
COPY . .

# 애플리케이션 실행
CMD ["python", "app.py"]
