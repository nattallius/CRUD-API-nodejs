import http from "http";
import {v4 as uuidv4} from 'uuid';

import {API_URL, ERRORS_MESSAGES, ID_REGEXP, METHOD, STATUS_CODES} from "./constants";
import {addUser, getAllUsers, getUserById, removeUserById, updateUser, User, UserInput} from "./users-service";
import {sendNotFoundResponse, sendBadRequestError, sendServerErrorResponse} from "./errors-hadlers";

export function requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    const {method, url} = req;
    let body = '';
    console.log(method, url);
    res.setHeader('Content-Type', 'application/json')

    if (!url || !url.includes(API_URL)) {
        sendNotFoundResponse(res);
        return;
    }

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            switch (method) {
                case METHOD.GET:
                    handleGetRequest(url!, res);
                    break;
                case METHOD.POST:
                    handlePostRequest(url!, body, res);
                    break;
                case METHOD.PUT:
                    handlePutRequest(url, body, res);
                    break;
                case METHOD.DELETE:
                    handleDeleteRequest(url, res);
                    break;
                default:
                    sendNotFoundResponse(res);
            }
        } catch (e) {
            sendServerErrorResponse(res);
        }
    });
    req.on('error', () => {
        sendServerErrorResponse(res);
    })
}

function handleGetRequest(url: string, res: http.ServerResponse) {
    if (url === API_URL) {
        const users = getAllUsers();
        res.write(JSON.stringify(users));
        res.statusCode = STATUS_CODES.Success;
        res.end();
        return;
    }

    if (url.startsWith(`${API_URL}/`)) {
        const idMatch = url.match(ID_REGEXP);
        if (!idMatch || !idMatch[1]) {
            sendBadRequestError(res);
            return;
        }

        const id = idMatch[1];

        const user = getUserById(id);
        if (!user) {
            sendNotFoundResponse(res);
            return;
        }

        res.write(JSON.stringify(user));
        res.statusCode = STATUS_CODES.Success;
        res.end();
        return;
    }

    sendNotFoundResponse(res);
}

function handlePostRequest(url: string, bodyChunk: any, res: http.ServerResponse) {
    const body = JSON.parse(bodyChunk);
    console.log('body', body);
    if (url !== API_URL) {
        sendNotFoundResponse(res);
        return;
    }

    if (!validatePostUser(body)) {
        sendBadRequestError(res);
        return;
    }

    const user: User = {
        id: uuidv4(),
        username: body.username,
        age: body.age,
        hobbies: body.hobbies
    }

    addUser(user);
    res.write(JSON.stringify(user));
    res.statusCode = STATUS_CODES.Created;
    res.end();
}

function handlePutRequest(url: string, bodyChunk: any, res: http.ServerResponse) {
    const body = JSON.parse(bodyChunk);
    console.log('body', body);
    if (url.startsWith(`${API_URL}/`)) {
        const idMatch = url.match(ID_REGEXP);
        if (!idMatch || !idMatch[1]) {
            sendBadRequestError(res);
            return;
        }

        const id = idMatch[1];
        const newUser = getUpdatedUser(body);
        if (!newUser) {
            sendBadRequestError(res);
            return;
        }

        const updatedUser = updateUser({...newUser, id: id});
        if (!updatedUser) {
            sendNotFoundResponse(res);
            return;
        }

        res.write(JSON.stringify(updatedUser));
        res.statusCode = STATUS_CODES.Created;
        res.end();
        return;
    }

    sendNotFoundResponse(res);
}

function handleDeleteRequest(url: string, res: http.ServerResponse) {
    if (url.startsWith(`${API_URL}/`)) {
        const idMatch = url.match(ID_REGEXP);
        if (!idMatch || !idMatch[1]) {
            sendBadRequestError(res);
            return;
        }

        const id = idMatch[1];

        const isRemoved = removeUserById(id);
        if (!isRemoved) {
            sendNotFoundResponse(res);
            return;
        }

        res.statusCode = STATUS_CODES.No_Content;
        res.end();
        return;
    }
    sendNotFoundResponse(res);
}

function validatePostUser(body: any): body is UserInput {
    if (!body.username || typeof body.username !== 'string') return false;
    if (!body.age || typeof body.age !== 'number') return false;
    if (!body.hobbies || !isArrayOfStrings(body.hobbies)) return false;
    return true;
}

function getUpdatedUser(body) {
    const newUser = {};
    if ('username' in body && typeof body.username === 'string') Object.assign(newUser, {username: body.username});
    if ('age' in body && typeof body.age === 'number') Object.assign(newUser, {age: body.age});
    if ('hobbies' in body && isArrayOfStrings(body.hobbies)) Object.assign(newUser, {hobbies: body.hobbies});

    if (Object.keys(newUser).length === 0) return null;
    return newUser;
}

function isArrayOfStrings(array: any): boolean {
    return Array.isArray(array) &&  array.every((hobby) => typeof hobby === 'string');
}