from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import party
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

# 환경변수에서 허용할 origin 목록 불러오기 (쉼표 구분 가능)
allowed_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in allowed_origins.split(",") if origin]

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 파티 라우터 등록
app.include_router(party.router)

@app.get("/")
async def root():
    return {"message": "FastAPI 서버가 실행중입니다."}
