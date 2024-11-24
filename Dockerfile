FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

RUN npm run build || tail -n 20 /root/.npm/_logs/*.log

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
