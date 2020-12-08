# Run this Dockerfile from the project's root folder using this command 
# docker build -t bookstore-mono-admin -f services/admin/Dockerfile .
# And then run it using this command
# docker run --name bookstore-mono-admin --rm -d -p 8082:8082 bookstore-mono-admin
FROM node:12-alpine
RUN mkdir -p /code/admin
WORKDIR /code/admin/
COPY ["package.json", "yarn.lock", "./"]
COPY ./services/admin/package.json ./services/admin/package.json
COPY ./services/shared/package.json ./services/shared/package.json
COPY ./scripts ./scripts
RUN yarn install
COPY ./services/admin ./services/admin
COPY ./services/shared ./services/shared
RUN yarn build:admin
EXPOSE 8082
CMD ["yarn", "start:admin:container"]