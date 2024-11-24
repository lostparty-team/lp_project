# React를 빌드하기 위한 Node.js 이미지
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# React 개발 서버 실행
CMD ["npm", "start"]
