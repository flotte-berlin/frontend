FROM node:14.14.0-alpine3.10 AS builder
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install && npm install -g @angular/cli && mkdir frontend
RUN mv node_modules ./frontend
WORKDIR /frontend
COPY . .

RUN ng build --prod --crossOrigin=anonymous

FROM golang:1.13.4-alpine as builder2
ENV ARCH=amd64
RUN apk add git
WORKDIR /
COPY --from=builder /frontend/dist /dist 
RUN go get github.com/rakyll/statik
RUN statik --src=/dist/flotte-frontend
COPY *.go *.sum *.mod /
COPY vendor /vendor
RUN CGO_ENABLED=0 GOARCH=$ARCH GOOS=linux go build --mod=vendor -o frontend_server

FROM scratch
WORKDIR /
COPY --from=builder2 frontend_server .
EXPOSE 8080
ENTRYPOINT ["/frontend_server"]
