FROM node:lts-alpine3.15

WORKDIR /home/app

COPY package.json .

RUN yarn --prod

COPY dist/ .

COPY templates/ templates/

COPY .env .

CMD ["node", "main"]
