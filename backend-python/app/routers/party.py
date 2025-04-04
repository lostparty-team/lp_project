from fastapi import APIRouter, HTTPException, Header, Request
from app.services.image_processor import process_image
from app.services.ocr import extract_text_from_image
from app.services.member import get_member_info

router = APIRouter()

@router.post("/py/party/screen")
async def get_party_screen_info(request: Request, authorization: str = Header(None)):
    members = []
    data = await request.json()
    image_data = data.get("image")

    if not image_data:
        raise HTTPException(status_code=400, detail="이미지 파라미터가 제공되지 않았습니다.")
    if not authorization:
        raise HTTPException(status_code=401, detail="API KEY가 제공되지 않았습니다.")

    try:
        cropped_images = process_image(image_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"이미지 전처리 과정에서 오류가 발생했습니다: {str(e)}")
    try:
        nicknames = []
        for img in cropped_images:
            nickname = extract_text_from_image(img)
            if nickname:
                nicknames.append(nickname)
                member = get_member_info(nickname, authorization)
                members.append(member.to_dict())
        return {
            "status": "success", 
            "message": "화면으로부터 공대원 정보를 성공적으로 받아왔습니다.", 
            "nicknames": nicknames, 
            "members": members
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR 과정에서 오류가 발생했습니다: {str(e)}")

@router.get("/py/party/member")
async def get_party_member_info(nickname: str, authorization: str = Header(None)):
    if not nickname:
        raise HTTPException(status_code=400, detail="닉네임 파라미터가 제공되지 않았습니다.")
    if not authorization:
        raise HTTPException(status_code=401, detail="API KEY가 제공되지 않았습니다.")
    
    member = get_member_info(nickname=nickname, api_key=authorization)

    return {
        "status": "success", 
        "message": "해당 공대원의 정보를 성공적으로 받아왔습니다.", 
        "data": member.to_dict()
    }