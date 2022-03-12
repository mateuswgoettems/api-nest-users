FROM node:lts-alpine3.15

WORKDIR /home/app

COPY package.json .

RUN yarn --prod

COPY dist/ .

# COPY .env .
# 
CMD ["node", "src/main"]
