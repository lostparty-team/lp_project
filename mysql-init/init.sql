-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS lp_project
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE lp_project;

-- 문자셋 설정
SET NAMES utf8mb4;


-- Posts 테이블 (Dislike와 Blacklist의 참조 테이블)
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 글번호
    title VARCHAR(255) NOT NULL,         -- 글제목
    author VARCHAR(255) NOT NULL,        -- 작성자 (API Key에서 추출된 clientId)
    views INT DEFAULT 0,                 -- 조회수 (기본값 0)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- 생성 시간
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


-- Dislike 테이블 (Posts를 참조)
CREATE TABLE IF NOT EXISTS Dislike (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    clientId VARCHAR(255) NOT NULL, -- clientId (API Key에서 추출)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (postId, clientId), -- 같은 글에 대해 같은 유저가 비추천 못하도록 설정
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE -- 참조 무결성 보장
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


-- Blacklist 테이블 (Posts를 참조)
CREATE TABLE IF NOT EXISTS Blacklist (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 블랙리스트 ID
    postId INT NOT NULL,               -- 글번호 (Posts 테이블 참조)
    nickname VARCHAR(100) NOT NULL,    -- 닉네임
    reason VARCHAR(255) NOT NULL,      -- 사유
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE -- Posts와 관계 설정
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


-- Cart 테이블
CREATE TABLE IF NOT EXISTS Cart (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 고유 ID
    clientId VARCHAR(255) NOT NULL,   -- 유저 ID (JWT에서 추출)
    postId INT NOT NULL,              -- 블랙리스트 글 번호
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 담은 시간
    UNIQUE KEY (clientId, postId),    -- 유저가 같은 글을 중복으로 담을 수 없도록 설정
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE -- 관련 글 삭제 시 동반 삭제
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Posts 테이블 더미 데이터 생성
INSERT INTO Posts (title, author) VALUES
('사기꾼 리스트', '1000000000057155'),
('사기꾼 리스트2', '1000000000057155'),
('사기꾼 리스트3', '100000000005746678');


-- Blacklist 테이블 더미 데이터 생성
INSERT INTO Blacklist (postId, nickname, reason) VALUES
(1, '사기꾼123', '거래 후 잠수'),
(1, '사기꾼456', '아이템 미전달'),
(2, '사기꾼789', '사전 약속 위반'),
(2, '사기꾼999', '욕설 및 비매너'),
(3, '사기꾼222', '거래 중 돌연 삭제');

CREATE TABLE IF NOT EXISTS Visitors (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    visitorId VARCHAR(255) NOT NULL, -- 고유 방문자 ID (쿠키 또는 세션)
    ipAddress VARCHAR(45),           -- 방문자의 IP 주소
    userAgent TEXT,                  -- 브라우저 및 기기 정보
    visitedAt DATETIME DEFAULT CURRENT_TIMESTAMP -- 방문 시간
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
