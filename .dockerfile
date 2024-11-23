FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV VITE_API_URL=https://appointment-production-53f2.up.railway.app
ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "preview"]

EXPOSE 4173
