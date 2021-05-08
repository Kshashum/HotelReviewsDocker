# Start the Node app
You can start this project using  
### `npm start`
To deploy this using docker use
### `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
To build the docker image again use
### `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d`
To use the terminal in the container use
### `docker exec -it ${docker name} bash`

