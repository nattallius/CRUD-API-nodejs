import http from "http";
import {ERRORS_MESSAGES, STATUS_CODES} from "./constants";

export function sendNotFoundResponse(res: http.ServerResponse) {
    res.statusCode = STATUS_CODES.Not_Found;
    res.statusMessage = ERRORS_MESSAGES.Not_Found;
    res.end();
}

export function sendServerErrorResponse(res: http.ServerResponse) {
    res.statusCode = STATUS_CODES.Server_Error;
    res.statusMessage = ERRORS_MESSAGES.Server_Error;
    res.end();
}

export function sendBadRequestError (res: http.ServerResponse) {
    res.statusCode = STATUS_CODES.Bad_Request;
    res.statusMessage = ERRORS_MESSAGES.Bad_Request;
    res.end();
}
