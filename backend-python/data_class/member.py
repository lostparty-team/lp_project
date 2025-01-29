class Member:
    def __init__(self, name: str, data: dict = None) -> None:
        try:
            self.name = name
            if data:
                self.level = 70
                self.item_level = 1700.00
                self.engravings = [
                    {
                        "name": engraving["각인이름"],
                        "grade": engraving["등급"],
                        "gradeLevel": engraving["등급레벨"],
                        "abilityStoneLevel": engraving["어빌리티스톤레벨"],
                    }
                    for engraving in data.get("각인", [])
                ]
                accessories = data.get("악세목록", {})
                self.accessories = {
                    "upperGeneralCount": accessories.get("상공용개수", 0),
                    "upperSpecialCount": accessories.get("상특옵개수", 0),
                    "middleGeneralCount": accessories.get("중공용개수", 0),
                    "middleSpecialCount": accessories.get("중특옵개수", 0),
                    "lowerGeneralCount": accessories.get("하공용개수", 0),
                    "lowerSpecialCount": accessories.get("하특옵개수", 0),
                }
                transcendence = data.get("초월", {})
                self.transcendence = {
                    "shoulder": transcendence.get("견장", ""),
                    "weapon": transcendence.get("무기", ""),
                    "top": transcendence.get("상의", ""),
                    "gloves": transcendence.get("장갑", ""),
                    "helmet": transcendence.get("투구", ""),
                    "pants": transcendence.get("하의", ""),
                    "total": sum(
                        int(transcendence.get(key, "0"))
                        for key in ["견장", "무기", "상의", "하의", "장갑", "투구"]
                    ),
                }
                self.ancient_accessory_count = data.get("고대악세개수", 0)
                self.weapon_level = data.get("무기레벨", "")
                self.gems = data.get("보석", {})
                self.relic_accessory_count = data.get("유물악세개수", 0)
                self.bracelet = data.get("팔찌", [])
                self.points = data.get("포인트", [])
                self.is_blacklisted = data.get("블랙리스트포함여부", False)
            else:
                self.level = None
                self.item_level = None
                self.engravings = None
                self.accessories = {
                    "upperGeneralCount": None,
                    "upperSpecialCount": None,
                    "middleGeneralCount": None,
                    "middleSpecialCount": None,
                    "lowerGeneralCount": None,
                    "lowerSpecialCount": None,
                }
                self.transcendence = {
                    "shoulder": None,
                    "weapon": None,
                    "top": None,
                    "gloves": None,
                    "helmet": None,
                    "pants": None,
                    "total": None,
                }
                self.ancient_accessory_count = None
                self.weapon_level = None
                self.gems = None
                self.relic_accessory_count = None
                self.bracelet = None
                self.points = None
                self.is_blacklisted = None
        except KeyError as e:
            print(f"Missing key: {e}")
        except Exception as e:
            print(f"Member를 초기화하는 과정에서 오류가 발생했습니다: {e}")

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "level": self.level,
            "itemLevel": self.item_level,
            "engravings": self.engravings,
            "ancientAccessoryCount": self.ancient_accessory_count,
            "weaponLevel": self.weapon_level,
            "gems": self.gems,
            "accessories": self.accessories,
            "relicAccessoryCount": self.relic_accessory_count,
            "transcendence": self.transcendence,
            "bracelet": self.bracelet,
            "arkPassivePoints": self.points,
            "isBlacklisted": self.is_blacklisted,
        }
