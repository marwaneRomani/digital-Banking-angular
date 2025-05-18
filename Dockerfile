FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

COPY ../nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/your-angular-app-name /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
