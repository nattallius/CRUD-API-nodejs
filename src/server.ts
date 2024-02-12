import http from 'http';
import {requestHandler} from "./request-handler";

const server =  http.createServer(requestHandler);
server.listen(3000);