# 🚀 로스트파티 (LostParty)

![Badge](https://img.shields.io/badge/Project-LostParty-darkgoldenrod?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-green?style=flat-square)

## 🗓️ 개발 기간

- 2024.12 ~ 2025.03

## 🎮 프로젝트 소개

**로스트파티**는 게임 로스트아크에서 파티원의 닉네임을 화면 공유 및 OCR 기술을 활용해 감지하고, 이를 블랙리스트 데이터베이스와 비교하여 악성 유저 여부를 검증하고, 파티원의 아이템 정보를 가공하여 제공해주는 웹 서비스입니다.

## 🖼️ 데모 화면

![home](https://github.com/user-attachments/assets/307a77ae-ad19-4447-979f-af92fa8383df)

## ✨ 주요 기능

### 🔎 1. 닉네임 감지 (OCR)

- 화면 공유를 통해 **파티원의 닉네임을 자동으로 감지**합니다.
- **PaddleOCR**를 활용한 **OCR 기술**로 파티원 닉네임을 추출합니다.

### 📋 2. 파티원 정보 추출 (API)

- 추출된 닉네임을 통해 LOSTARK API 를 이용하여 제공받은 파티원의 캐릭터 정보를 가공하여 사용자에게 제공합니다.
- **LOSTARK**에서 제공한 **OPENAPI**를 사용합니다.

### ⚠️ 3. 블랙리스트 조회

- 추출된 닉네임이 **블랙리스트에 등록된 유저인지 실시간으로 확인**합니다.
- **등록된 데이터베이스 기반으로 조회**가 가능합니다.

### 📋 4. 블랙리스트 등록 및 관리

- 사용자가 직접 **악성 유저를 블랙리스트에 등록**할 수 있습니다.
- 등록된 사용자 목록 **검색 및 추가**를 할 수 있습니다.

## 🧮 로스트파티 사용 방법

|.   페이지   .| 이미지 |.  설명  .|
|:---:|:------------------:|:---|
| **메인화면** | <img src="https://github.com/user-attachments/assets/1d1249f0-9d00-4216-ab34-1e6c2d4b2bde" style="width: 100%; max-width: 500px;"> | 서비스의 메인화면으로, 전체적인 UI와 주요 기능을 확인할 수 있습니다. |
| **API키 입력** | <img src="https://github.com/user-attachments/assets/21356c24-3641-4dfa-a527-9c58141a5d00" style="width: 100%; max-width: 500px;"> | API 키를 입력하여 인증을 완료하는 페이지입니다. |
| **블랙리스트 페이지** | <img src="https://github.com/user-attachments/assets/7bc8abee-b4d8-4ffb-81e5-1919dde68381" style="width: 100%; max-width: 500px;"> | 블랙리스트 목록을 확인하고 관리할 수 있습니다. |
| **블랙리스트 작성 및 적용** | <img src="https://github.com/user-attachments/assets/53392234-1562-4c90-8e76-a950a6ad4366" style="width: 100%; max-width: 500px;"> | 새로운 블랙리스트를 작성하고 적용하는 기능을 제공합니다. |
| **인게임 파티 구인창** | <img src="https://github.com/user-attachments/assets/53bf64f0-5133-4e96-a9a9-3d714fcc75ca" style="width: 100%; max-width: 500px;"> | 게임 내에서 파티원을 모집하고 신청할 수 있는 인터페이스입니다. |
| **파티원 정보** | <img src="https://github.com/user-attachments/assets/e6016932-11cb-4fe5-b5c0-20bd7e984f71" style="width: 100%; max-width: 500px;"> | 파티원의 스펙 및 정보를 확인하고 평가할 수 있습니다. |






## 🏗️ 기술 스택

| 분야         | 기술 스택             |
| ------------ | --------------------- |
| **Frontend** | Next.js, TypeScript   |
| **Backend**  | Express.js, Nest.js   |
| **Database** | MySQL                 |
| **OCR**      | PaddleOCR             |
| **DevOps**   | Docker, AWS           |
| **Communication** | Notion, KakaoTalk |

---

## 📦 설치 및 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/HaeSung99/lp_project.git
cd lp_project

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

## 🚀 배포 링크

| FE (dev) |     https://localhost:3000/      |
| :-: | :------------------------------: |
| BE (dev) | https://localhost:5000/api-docs/ |

| FE (prod) |     https://localhost:3000/      |
| :-: | :------------------------------: |
| BE (prod) | https://localhost:5000/api-docs/ |

## 👋🏻 팀원 소개

<div align="center">

|  팀원  |   담당   |                                              프로필                                              |                                            주요 기여 및 핵심 역할                                           |
| :----: | :------: | :----------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------: |
| 김도환 | FrontEnd | [<img src="https://github.com/ehghks021203.png" width="100px">](https://github.com/ehghks021203) |
| 최종현 | FrontEnd |    [<img src="https://github.com/elbyss.png" width="100px">](https://github.com/elbyss)    |
| 김재찬 | BackEnd  |      [<img src="https://github.com/kjc6735.png" width="100px">](https://github.com/kjc6735)      | • 사용자 인증 및 보안 강화를 위한 로그인·로그아웃 기능 구현 (실효성 검토 후 미적용)
| 성인석 | BackEnd  | [<img src="https://github.com/HaeSung99.png" width="100px">](https://github.com/HaeSung99) | • Dockerfile 작성 및 개발환경 구축 <br> • DB 구조 설계 및 API 연동 <br> • API 및 기능 명세서 작성 <br> • 페이지 구성 설계 및 OpenAPI를 활용한 데이터 재가공 <br> • 팀원 모집 및 프로젝트 관리 (노션 정리 포함)

</div>
