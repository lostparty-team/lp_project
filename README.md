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

## 🗂️ ERD 다이어그램

본 프로젝트에서 사용된 데이터베이스 구조는 아래의 ERD(Entity Relationship Diagram)를 통해 확인할 수 있습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/58f1924e-e0ff-46fc-9385-639320c40b45" style="width: 100%; max-width: 300px;">
</p>

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

|  페이지  | 이미지 | 설명 |
|:---:|:------------------:|:---|
| **메인화면** | <img src="https://github.com/user-attachments/assets/1d1249f0-9d00-4216-ab34-1e6c2d4b2bde" style="width: 100%; max-width: 300px;"> | 서비스의 메인화면으로, 전체적인 UI와 주요 기능을 확인할 수 있습니다. |
| **API키 입력** | <img src="https://github.com/user-attachments/assets/21356c24-3641-4dfa-a527-9c58141a5d00" style="width: 100%; max-width: 300px;"> | API 키를 입력하여 인증을 완료하는 페이지입니다. |
| **블랙리스트 페이지** | <img src="https://github.com/user-attachments/assets/7bc8abee-b4d8-4ffb-81e5-1919dde68381" style="width: 100%; max-width: 300px;"> | 블랙리스트 목록을 확인하고 관리할 수 있습니다. |
| **블랙리스트 작성 및 적용** | <img src="https://github.com/user-attachments/assets/53392234-1562-4c90-8e76-a950a6ad4366" style="width: 100%; max-width: 300px;"> | 새로운 블랙리스트를 작성하고 기능을 제공합니다. |
| **인게임 파티 구인창** | <img src="https://github.com/user-attachments/assets/53bf64f0-5133-4e96-a9a9-3d714fcc75ca" style="width: 100%; max-width: 300px;"> | 게임화면을 인식하여 파티 신청자의 닉네임을 추출합니다. |
| **파티원 정보** | <img src="https://github.com/user-attachments/assets/e6016932-11cb-4fe5-b5c0-20bd7e984f71" style="width: 100%; max-width: 300px;"> | 파티 신청자의 스펙 및 정보를 직관적으로 파악할 수 있습니다. |
| **API 문서** | <img src="https://github.com/user-attachments/assets/d0ed6713-7126-40ce-952e-d51f99ebf22e" style="width: 100%; max-width: 300px;"> | 로스트아크 파티 매칭 웹서비스의 API 문서입니다. 닉네임 기반 캐릭터 정보 조회, 블랙리스트 관리 기능 등을 제공합니다. |


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

## 📦 설치 및 실행 방법 (개발 환경)

```bash
# 1. 프로젝트 클론
git clone https://github.com/HaeSung99/lp_project.git
cd lp_project

# 2. Docker 및 Docker Compose 설치 (설치되어 있지 않은 경우)

# 3. 환경 변수 파일 작성 (.env)
# 예시: .env.dev 또는 .env.prod 파일을 프로젝트 루트에 생성

# 4. Docker Compose로 컨테이너 실행
docker-compose -f docker-compose.dev.yml up --build
```

## 🚀 배포 링크

| FE (dev) |     https://localhost:3000/      |
| :-: | :------------------------------: |
| BE (dev) | https://localhost:5000/api-docs/ |

| FE (prod) |     https://lostparty.com (비용문제로 일시중지)     |
| :-: | :------------------------------: |
| BE (prod) | 비공개 |

## 👋🏻 팀원 소개

<div align="center">

|  팀원  |   담당   |                                              프로필                                              |                                            주요 기여 및 핵심 역할                                           |
| :----: | :------: | :----------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------: |
| 김도환 | Python | [<img src="https://github.com/ehghks021203.png" width="100px">](https://github.com/ehghks021203) | • PaddleOCR를 활용한 텍스트 추출 로직 구현 <br> • 화면 공유 기반 OCR 프로세스 개발 <br> • 프론트엔드 OCR 연동 구현
| 최종현 | FrontEnd |    [<img src="https://github.com/elbyss.png" width="100px">](https://github.com/elbyss)    | • 프론트엔드 전반 개발 <br> • 프론트엔드 UI/UX 구현 및 스타일링
| 김재찬 | BackEnd  |      [<img src="https://github.com/kjc6735.png" width="100px">](https://github.com/kjc6735)      | • 사용자 인증 및 보안 강화를 위한 로그인·로그아웃 기능 구현 (실효성 검토 후 미적용)
| 성인석 | BackEnd  | [<img src="https://github.com/HaeSung99.png" width="100px">](https://github.com/HaeSung99) | • Dockerfile 작성 및 개발환경 구축 <br> • DB 구조 설계 및 API 연동 <br> • API 및 기능 명세서 작성 <br> • 페이지 구성 설계 및 OpenAPI를 활용한 데이터 재가공 <br> • 팀원 모집 및 프로젝트 관리 (노션 정리 포함)

</div>
