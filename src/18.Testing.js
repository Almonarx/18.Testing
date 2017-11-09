export const users = [{age: 15}, {age: 14}, {age: 28}, {age: 18}, {age: 45}, {age: 68}, {age: 38}, {age: 22}, {age: 14}];

export const getDay = () => new Date().getDay();

export const getAdultUsers = (users = []) => users.filter(user => user.age > 18);

export const getRandomUsers = (users) => {
    const numb = Math.random();

    if (!users) {
        return false;
    }

    const length = users.length;
    const middleUser = Math.round(length / 2);

    if (numb > 0.5) {
        return users.slice(0, middleUser);
    }

    return users.slice(middleUser, length);
};
