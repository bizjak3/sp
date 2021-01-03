FROM node:15

WORKDIR /app

RUN npm install -g @angular/cli

COPY . .

RUN npm install

EXPOSE 4000

CMD ng serve






