from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import party

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 파티 라우터 등록
app.include_router(party.router)

@app.get("/")
async def root():
    return {"message": "FastAPI 서버가 실행중입니다."}
