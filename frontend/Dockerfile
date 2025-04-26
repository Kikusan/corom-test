# Use the official Node.js image
FROM node:22.14.0

# Set the working directory inside the container
WORKDIR /app

COPY . .

RUN npm install

# Command to run the app
CMD ["npm", "run", "dev"]
