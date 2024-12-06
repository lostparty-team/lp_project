CREATE DATABASE IF NOT EXISTS lp_project;

USE lp_project;

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
);

-- 테스트 유저 생성
INSERT INTO User (userId, password, clientId, apikey) VALUES
('test', 'test99', '1000000000057155', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNTcxNTUifQ.I1pGqN--4PJ_WTIzJa02FhWr3oDgcp0zgCoQ3lLlmgF1wRFAE7lcj1X7A-WowS5qQDiHR1m_05qdhB8MM1wjgHHYzwyXjrFAmclypz73pjswfHHcLB7O5JWtaW7um22c3vVUtvq1AHJ38XCeT4K32qXsdIpQohbP_nCe2hEfazM7lf0zESfQnwjNyGp5oeGT9-E06h1GV4NAa_7Pc64ThhPUJUXi-gPqm6tuPfxpV75tWT8BERo5-8QuOswe-jvFgylLYSrbpJHqXRQn75rjJeZWQjcZdP0GZIRme9GFZ4WrsvVbpWapzM7ET5jpi4GTgUQp5VkZMvQWv3OaICiuzQ');

-- Blacklist 테이블
CREATE TABLE IF NOT EXISTS Blacklist (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 블랙리스트 ID
  title VARCHAR(255) NOT NULL,       -- 글 제목
  author VARCHAR(100) NOT NULL,      -- 작성자 (User 테이블의 user_id와 연결)
  nickname VARCHAR(100) NOT NULL,    -- 닉네임
  reason VARCHAR(255) NOT NULL,      -- 사유
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
  FOREIGN KEY (author) REFERENCES User(userId) ON DELETE CASCADE -- User와 관계 설정
);

-- Cart 테이블
CREATE TABLE IF NOT EXISTS Cart (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 장바구니 ID
  userId VARCHAR(100) NOT NULL,     -- 유저 아이디 (User 테이블과 연결)
  blacklistId INT NOT NULL,         -- 담은 글 번호 (Blacklist 테이블의 id와 연결)
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
  FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE, -- User와 관계 설정
  FOREIGN KEY (blacklistId) REFERENCES Blacklist(id) ON DELETE CASCADE -- Blacklist와 관계 설정
);
