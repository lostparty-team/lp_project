class Member:
    def __init__(self, name: str, data: dict = None) -> None:
        self.data = None
        self.name = name
        self.item_level = '0'
        self.engravings = []
        self.accessories = {
            'upperGeneralCount': 0,
            'upperSpecialCount': 0,
            'middleGeneralCount': 0,
            'middleSpecialCount': 0,
            'lowerGeneralCount': 0,
            'lowerSpecialCount': 0,
        }
        self.transcendence = {
            'shoulder': 0,
            'weapon': 0,
            'top': 0,
            'gloves': 0,
            'helmet': 0,
            'pants': 0,
            'total': 0,
        }
        self.elixir = {
                'shoulder': {
                    'elixir1': '없음',
                    'elixir1Level': 0,
                    'elixir2': '없음',
                    'elixir2Level': 0,
                },
                'top': {
                    'elixir1': '없음',
                    'elixir1Level': 0,
                    'elixir2': '없음',
                    'elixir2Level': 0,
                },
                'gloves': {
                    'elixir1': '없음',
                    'elixir1Level': 0,
                    'elixir2': '없음',
                    'elixir2Level': 0,
                },
                'helmet': {
                    'elixir1': '없음',
                    'elixir1Level': 0,
                    'elixir2': '없음',
                    'elixir2Level': 0,
                },
                'pants': {
                    'elixir1': '없음',
                    'elixir1Level': 0,
                    'elixir2': '없음',
                    'elixir2Level': 0,
                },
                'total': 0,
            }
        self.weapon = {
            'level': '0',
            'refinement': '0',
            'advancedReforging': '0',
        }
        self.ancient_accessory_count = 0
        self.gems = {}
        self.relic_accessory_count = 0
        self.bracelet = []
        self.points = []
        self.is_blacklisted = False
        self.enlightenment_style = '없음'

        if data:
            self._parse_data(data)

    def _parse_data(self, data: dict) -> None:
        try:
            self.data = data
            self.item_level = data.get('아이템레벨', '0')
            # 무기 정보 파싱
            self.weapon = {
                'level': data.get('무기레벨', '0'),
                'refinement': data.get('무기강화', '+0'),
                'advancedReforging': data.get('무기상재', '0단계'),
            }

            # 각인 정보 파싱
            self.engravings = [
                {
                    'name': engraving['각인이름'],
                    'grade': engraving['등급'],
                    'gradeLevel': engraving['등급레벨'],
                    'abilityStoneLevel': engraving['어빌리티스톤레벨'],
                }
                for engraving in data.get('각인', [])
            ]

            # 직업 각인 파싱
            self.enlightenment_style = data.get('직업각인', '')

            # 악세사리 정보 파싱
            accessories = data.get('악세목록', {})
            self.accessories = {
                'upperGeneralCount': accessories.get('상공용개수', 0),
                'upperSpecialCount': accessories.get('상특옵개수', 0),
                'middleGeneralCount': accessories.get('중공용개수', 0),
                'middleSpecialCount': accessories.get('중특옵개수', 0),
                'lowerGeneralCount': accessories.get('하공용개수', 0),
                'lowerSpecialCount': accessories.get('하특옵개수', 0),
            }

            # 초월 정보 파싱
            transcendence = data.get('초월', {})
            self.transcendence = {
                'shoulder': transcendence.get('견장', 0),
                'weapon': transcendence.get('무기', 0),
                'top': transcendence.get('상의', 0),
                'gloves': transcendence.get('장갑', 0),
                'helmet': transcendence.get('투구', 0),
                'pants': transcendence.get('하의', 0),
                'total': sum(int(transcendence.get(key, '0')) for key in ['견장', '무기', '상의', '하의', '장갑', '투구']),
            }

            # 엘릭서 정보 파싱
            elixir_data = data.get('엘릭서', {})
            self.elixir = {
                'shoulder': {
                    'elixir1': self._extract_elixir_name(elixir_data.get('견장', {}).get('엘릭서1', ' 없음 Lv.0')),
                    'elixir1Level': int(elixir_data.get('견장', {}).get('엘릭서1', ' 없음 Lv.0').split('Lv.')[1]),
                    'elixir2': self._extract_elixir_name(elixir_data.get('견장', {}).get('엘릭서2', ' 없음 Lv.0')),
                    'elixir2Level': int(elixir_data.get('견장', {}).get('엘릭서2', ' 없음 Lv.0').split('Lv.')[1]),
                },
                'top': {
                    'elixir1': self._extract_elixir_name(elixir_data.get('상의', {}).get('엘릭서1', ' 없음 Lv.0')),
                    'elixir1Level': int(elixir_data.get('상의', {}).get('엘릭서1', ' 없음 Lv.0').split('Lv.')[1]),
                    'elixir2': self._extract_elixir_name(elixir_data.get('상의', {}).get('엘릭서2', ' 없음 Lv.0')),
                    'elixir2Level': int(elixir_data.get('상의', {}).get('엘릭서2', ' 없음 Lv.0').split('Lv.')[1]),
                },
                'gloves': {
                    'elixir1': self._extract_elixir_name(elixir_data.get('장갑', {}).get('엘릭서1', ' 없음 Lv.0')),
                    'elixir1Level': int(elixir_data.get('장갑', {}).get('엘릭서1', ' 없음 Lv.0').split('Lv.')[1]),
                    'elixir2': self._extract_elixir_name(elixir_data.get('장갑', {}).get('엘릭서2', ' 없음 Lv.0')),
                    'elixir2Level': int(elixir_data.get('장갑', {}).get('엘릭서2', ' 없음 Lv.0').split('Lv.')[1]),
                },
                'helmet': {
                    'elixir1': self._extract_elixir_name(elixir_data.get('투구', {}).get('엘릭서1', ' 없음 Lv.0')),
                    'elixir1Level': int(elixir_data.get('투구', {}).get('엘릭서1', ' 없음 Lv.0').split('Lv.')[1]),
                    'elixir2': self._extract_elixir_name(elixir_data.get('투구', {}).get('엘릭서2', ' 없음 Lv.0')),
                    'elixir2Level': int(elixir_data.get('투구', {}).get('엘릭서2', ' 없음 Lv.0').split('Lv.')[1]),
                },
                'pants': {
                    'elixir1': self._extract_elixir_name(elixir_data.get('하의', {}).get('엘릭서1', ' 없음 Lv.0')),
                    'elixir1Level': int(elixir_data.get('하의', {}).get('엘릭서1', ' 없음 Lv.0').split('Lv.')[1]),
                    'elixir2': self._extract_elixir_name(elixir_data.get('하의', {}).get('엘릭서2', ' 없음 Lv.0')),
                    'elixir2Level': int(elixir_data.get('하의', {}).get('엘릭서2', ' 없음 Lv.0').split('Lv.')[1]),
                },
            }
            self.elixir['total'] = sum(
                self.elixir[part]['elixir1Level'] + self.elixir[part]['elixir2Level']
                for part in ['shoulder', 'top', 'gloves', 'helmet', 'pants']
            )

            # 기타 정보 파싱
            self.ancient_accessory_count = data.get('고대악세개수', 0)
            self.gems = data.get('보석', {})
            self.relic_accessory_count = data.get('유물악세개수', 0)
            self.bracelet = data.get('팔찌', [])
            self.points = data.get('포인트', [])
            self.is_blacklisted = data.get('블랙리스트포함여부', False)

        except KeyError as e:
            print(f'Missing key in data: {e}')
        except Exception as e:
            print(f'Error parsing data: {e}')

    def _extract_elixir_name(self, elixir_str: str) -> str:
        parts = elixir_str.split('Lv.')
        if len(parts) < 1:
            return "없음"
        
        option_part = parts[0].strip()
        if option_part.startswith('['):
            option_part = option_part.split(']', 1)[-1].strip()
        
        return option_part

    def to_dict(self) -> dict:
        if self.item_level != '0':
            return {
                'name': self.name,
                'data': {
                    'itemLevel': self.item_level,
                    'weapon': self.weapon,
                    'engravings': self.engravings,
                    'enlightenmentStyle': self.enlightenment_style,
                    'accessories': self.accessories,
                    'transcendence': self.transcendence,
                    'elixir': self.elixir,
                    'ancientAccessoryCount': self.ancient_accessory_count,
                    'gems': self.gems,
                    'relicAccessoryCount': self.relic_accessory_count,
                    'bracelet': self.bracelet,
                    'arkPassivePoints': self.points,  
                },
                'isBlacklisted': self.is_blacklisted,
                'raw': self.data,
            }
        else:
            return {
                'name': self.name,
                'data': None,
                'isBlacklisted': False,
            }