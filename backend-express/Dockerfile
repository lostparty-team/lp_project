# Express를 실행하기 위한 Node.js 이미지
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Express 서버 실행(nodemon 으로 핫리로드 적용중)
CMD ["npm", "run", "start"]
