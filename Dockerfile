FROM node:18-alpine as builder
WORKDIR /my-space

COPY package.json package-lock.json ./

# Install pnpm
RUN npm install -g pnpm

# Install the app's dependencies
RUN pnpm install

COPY . .

RUN npx prisma generate 

RUN pnpm run build

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]