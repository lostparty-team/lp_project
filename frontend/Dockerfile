# Express를 실행하기 위한 Node.js 이미지
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

CMD ["npm", "run", "dev"]
