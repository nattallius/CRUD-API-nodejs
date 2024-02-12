import http from 'http';

const server =  http.createServer(function(request, response){
    response.end("Hello world!");
});
server.listen(3000);