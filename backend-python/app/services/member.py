import requests
from app.config import EXPRESS_API
from app.models.member import Member

def get_member_info(nickname: str, api_key: str) -> Member:
    headers = {"Authorization": api_key, "Content-Type": "application/json"}
    payload = {"nickname": nickname}
    response = requests.post(f"{EXPRESS_API}/party", json=payload, headers=headers)
    response_data = response.json()
    return Member(name=nickname, data=response_data if "error" not in response_data else None)
