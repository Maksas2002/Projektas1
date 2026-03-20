FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install
# RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]