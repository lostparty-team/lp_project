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

## 🏗️ 기술 스택

| 분야         | 기술 스택             |
| ------------ | --------------------- |
| **Frontend** | Next.js, TypeScript   |
| **Backend**  | Express.js, Nest.js   |
| **Database** | MYSQL                 |
| **OCR**      | PaddleOCR             |
| **Deploy**   | Vercel, AWS           |

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

| FE  |     https://localhost:3000/      |
| :-: | :------------------------------: |
| BE  | https://localhost:5000/api-docs/ |

## 👋🏻 팀원 소개

<div align="center">

|  팀원  |   담당   |                                              프로필                                              |                                            주요기여도
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

## 🏗️ 기술 스택

| 분야         | 기술 스택             |
| ------------ | --------------------- |
| **Frontend** | Next.js, TypeScript   |
| **Backend**  | Express.js, Nest.js   |
| **Database** | MYSQL                 |
| **OCR**      | PaddleOCR             |
| **Deploy**   | Vercel, AWS           |

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

| FE  |     https://localhost:3000/      |
| :-: | :------------------------------: |
| BE  | https://localhost:5000/api-docs/ |

## 👋🏻 팀원 소개

<div align="center">

|  팀원  |   담당   |                                              프로필                                              |                                            주요 기여 및 핵심 역할                                           |
| :----: | :------: | :----------------------------------------------------------------------------------------------: |  :----------------------------------------------------------------------------------------: |
| 김도환 | FrontEnd | [<img src="https://github.com/ehghks021203.png" width="100px">](https://github.com/ehghks021203) |
| 최종현 | FrontEnd |    [<img src="https://github.com/elbyss.png" width="100px">](https://github.com/elbyss)    |
| 김재찬 | BackEnd  |      [<img src="https://github.com/kjc6735.png" width="100px">](https://github.com/kjc6735)      | 로그인,로그아웃 보안담당
| 성인석 | BackEnd  | [<img src="https://github.com/HaeSung99.png" width="100px">](https://github.com/HaeSung99) | • Dockerfile 작성 및 개발환경 구축
• 데이터베이스 설계 및 구현
• API 및 기능 명세서 작성
• 페이지 구성 설계 및 OpenAPI를 활용한 데이터 재가공
• 팀원 모집 및 프로젝트 관리 (노션 정리 포함)

</div>
