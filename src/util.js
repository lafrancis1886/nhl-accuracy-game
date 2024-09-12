
export function isValidUser(userData) {
    const user = {...userData}
    return user.firstName?.length >= 2 && user.lastName?.length >= 2 && user.email?.length > 0
        && user.password?.length >= 10
}

export function generateId(len) {
    return Math.random()
        .toString(32).substring(2, len+2)
}