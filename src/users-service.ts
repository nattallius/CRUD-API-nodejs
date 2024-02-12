interface User {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export type UserInput = Omit<User, "id">

const userDb: User[] = [];

export function getAllUsers() {
    return userDb;
}

export function getUserById(id: string): User | undefined {
    return userDb.find((user) => user.id === id);
}

export function addUser(user: User) {
    userDb.push(user);
}

export function updateUser(user: Partial<User> & { id: string }): boolean {
    const oldUser = getUserById(user.id)
    if (!oldUser) return false;

    Object.assign(oldUser, user);
    return true;
}

export function removeUserById(id: string) {
    const userIndex = userDb.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    userDb.splice(userIndex);
    return true;
}
