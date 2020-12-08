# Run this Dockerfile from the project's root folder using this command 
# docker build -t bookstore-mono-api -f services/api/Dockerfile .
# And then run it using this command
# docker run --name bookstore-mono-api --rm -d -p 5000:5000 bookstore-mono-api
FROM node:12-alpine
ENV NODE_ENV=production
RUN mkdir -p /code/api
WORKDIR /code/api/
COPY ["package.json", "yarn.lock", "./"]
COPY ./services/api/package.json ./services/api/package.json
COPY ./services/shared/package.json ./services/shared/package.json
COPY ./scripts ./scripts
RUN yarn install
COPY ./services/api ./services/api
COPY ./services/shared ./services/shared
EXPOSE 5000
CMD ["yarn", "start:api:container"]