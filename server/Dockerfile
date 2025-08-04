ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000 DATABASE=mongodb+srv://dineshkumarbasuri8:kiQyJAG2kIlVykvA@cluster0.jmnecsd.mongodb.net/ToDo_App?retryWrites=true&w=majority&appName=Cluster0

EXPOSE 3000

CMD ["npm", "start"]