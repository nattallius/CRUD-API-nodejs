export const STATUS_CODES = {
    Success: 200,
    Created: 201,
    Bad_Request: 400,
    No_Content: 204,
    Not_Found: 404,
    Server_Error: 500
}

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const ERRORS_MESSAGES = {
    Not_Found: 'Requested resource is not found on server',
    Server_Error: 'Server error occurred',
    Bad_Request: 'Bad request of body input'
}

export const API_URL = '/api/users';

export const ID_REGEXP = `${API_URL}/([[a-zA-Z\\d-]+)\\/*`;