-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS lp_project
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE lp_project;

-- 문자셋 설정
SET NAMES utf8mb4;

-- User 테이블
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    userId VARCHAR(100) UNIQUE,  -- 유저 아이디
    password VARCHAR(255) NOT NULL,   -- 유저 비밀번호
    clientId VARCHAR(255) NOT NULL UNIQUE,
    apiKey VARCHAR(1000) NOT NULL, -- 유저 API Key
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Posts 테이블 (Dislike와 Blacklist의 참조 테이블)
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 글번호
    title VARCHAR(255) NOT NULL,         -- 글제목
    author VARCHAR(100) NOT NULL,        -- 작성자 (User 테이블의 userId와 연결)
    views INT DEFAULT 0,                 -- 조회수 (기본값 0)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
    FOREIGN KEY (author) REFERENCES User(userId) ON DELETE CASCADE -- User와 관계 설정
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Dislike 테이블 (Posts를 참조)
CREATE TABLE IF NOT EXISTS Dislike (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    clientId VARCHAR(255) NOT NULL,
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

-- 테스트 유저 생성
INSERT INTO User (userId, password, clientId, apiKey) VALUES
('test', 'test99', '1000000000057155', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNTcxNTUifQ.I1pGqN--4PJ_WTIzJa02FhWr3oDgcp0zgCoQ3lLlmgF1wRFAE7lcj1X7A-WowS5qQDiHR1m_05qdhB8MM1wjgHHYzwyXjrFAmclypz73pjswfHHcLB7O5JWtaW7um22c3vVUtvq1AHJ38XCeT4K32qXsdIpQohbP_nCe2hEfazM7lf0zESfQnwjNyGp5oeGT9-E06h1GV4NAa_7Pc64ThhPUJUXi-gPqm6tuPfxpV75tWT8BERo5-8QuOswe-jvFgylLYSrbpJHqXRQn75rjJeZWQjcZdP0GZIRme9GFZ4WrsvVbpWapzM7ET5jpi4GTgUQp5VkZMvQWv3OaICiuzQ');

-- Posts 테이블 더미 데이터 생성
INSERT INTO Posts (title, author) VALUES
('사기꾼 리스트', 'test'),
('사기꾼 리스트2', 'test'),
('사기꾼 리스트5', 'test');

-- Blacklist 테이블 더미 데이터 생성
INSERT INTO Blacklist (postId, nickname, reason) VALUES
(1, '사기꾼123', '거래 후 잠수'),
(1, '사기꾼456', '아이템 미전달'),
(2, '사기꾼789', '사전 약속 위반'),
(2, '사기꾼999', '욕설 및 비매너'),
(3, '사기꾼222', '거래 중 돌연 삭제');
