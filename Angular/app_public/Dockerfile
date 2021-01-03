FROM node:15

WORKDIR /app

EXPOSE 4200

RUN npm install -g @angular/cli

COPY . .

RUN npm install

CMD ["ng","serve","--host", "0.0.0.0"]






