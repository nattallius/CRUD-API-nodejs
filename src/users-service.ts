export interface User {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export type UserInput = Omit<User, "id">

const userDb: User[] = [{"id":"876c2611-aa48-4ab4-9199-e8fc83e492b8","username":"Artur","age":23,"hobbies":["footbal"]}];

export function getAllUsers() {
    return userDb;
}

export function getUserById(id: string): User | undefined {
    return userDb.find((user) => user.id === id);
}

export function addUser(user: User) {
    userDb.push(user);
}

export function updateUser(user: Partial<User> & { id: string }) {
    const oldUser = getUserById(user.id)
    if (!oldUser) return null;

    const newUser = Object.assign(oldUser, user);
    return newUser;
}

export function removeUserById(id: string) {
    const userIndex = userDb.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    userDb.splice(userIndex);
    return true;
}
