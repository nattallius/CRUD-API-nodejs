import http from 'http';
import {requestHandler} from "./request-handler";
import 'dotenv/config'

const port = process.env.PORT || 3000;
const server =  http.createServer(requestHandler);
server.listen(+port);
console.log(`Server listening on port ${port}`);