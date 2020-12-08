# Run this Dockerfile from the project's root folder using this command 
# docker build -t bookstore-mono-web -f services/web/Dockerfile .
# And then run it using this command
# docker run --name bookstore-mono-web --rm -d -p 8081:8081 bookstore-mono-web
FROM node:12-alpine
RUN mkdir -p /code/web
WORKDIR /code/web/
COPY ["package.json", "yarn.lock", "./"]
COPY ./services/web/package.json ./services/web/package.json
COPY ./services/shared/package.json ./services/shared/package.json
COPY ./scripts ./scripts
RUN yarn install
COPY ./services/web ./services/web
COPY ./services/shared ./services/shared
RUN yarn build:web
EXPOSE 8081
CMD ["yarn", "start:web:container"]