const users = [{age: 15}, {age: 14}, {age: 28}, {age: 18}, {age: 45}, {age: 68}, {age: 38}, {age: 22}, {age: 14}];
const testObj = {
    equal(result) {
        if (this.input === result) console.log('Successful equality!');
        else console.error(`${this.input} not equals to ${result}` );
    },
    defined() {
        if (this.input !== undefined && this.input !== false) console.log('Successful definition!');
        else console.error(`${this.input} is not defined` );
    },
    equalArray(result) {
        if (this.input.every(elem => elem.age > result)) console.log('Successful equality!');
        else console.error(`${this.input} not equals to ${result}` );
    },
    default() {
        if (Array.isArray(this.input) && this.input.length == 0) console.log('Successful default definition!');
        else console.error(`${this.input} is not defined` );
    },
    equalRandom() {
        const length = users.length;
        const middleUser = Math.round(length / 2);
        const result = users.slice(0, middleUser);

        if (this.input.length === result.length && JSON.stringify(this.input) === JSON.stringify(result)) console.log('Successful equality!');
        else console.error(`${this.input} not equals to ${result}` );
    }
};

const testFunc = (input) => {
    testObj.input = input;
    return testObj;
};

const getDay = () => new Date().getDay();

testFunc(getDay()).defined();
testFunc(getDay()).equal(new Date().getDay());

const getAdultUsers = (users = []) => users.filter(user => user.age > 18);

testFunc(getAdultUsers()).default();
testFunc(getAdultUsers(users)).equalArray(18);

const getRandomUsers = (users) => {
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

const originRandom = Math.random;

Math.random = () => 0.6;
testFunc(getRandomUsers(users)).defined();
testFunc(getRandomUsers(users)).equalRandom();
Math.random = originRandom;