class Member:
    def __init__(self, name):
        self.name = name
        self.server = "아만"
        self.level = 70
        self.item_level = 1700.00

    def to_dict(self) -> dict:
        return {
            "server": self.server,
            "name": self.name,
            "level": self.level,
            "itemLevel": self.item_level
        }