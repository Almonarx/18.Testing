import { users, getDay, getAdultUsers, getRandomUsers } from './18.Testing';
import chai from 'chai';
const { expect } = chai;

describe('getDay func testing', () => {
    it('should not equal undefined', () => {
        expect(getDay()).to.not.equal('undefined');
    });

    it('should equal current day', () => {
        expect(getDay()).to.equal(new Date().getDay());
    })
});

describe('getAdultUsers func testing', () => {
    it('should equal empty array', () => {
        expect(getAdultUsers()).to.be.an('array').that.is.empty;
    });

    it('should filter by age > 18', () => {
        const arr = users.filter(user => user.age > 18);

        expect(getAdultUsers(users)).to.have.deep.members(arr);
    });
});

describe('getRandomUsers func testing', () => {
    it('should not equal false', () => {
        expect(getRandomUsers()).to.not.equal('false');
    });

    it('should equal last four values', () => {
        const originRandom = Math.random;
        const length = users.length;
        const middleUser = Math.round(length / 2);
        const arr = users.slice(middleUser, length);

        Math.random = () => 0.5;
        expect(getRandomUsers(users)).to.have.deep.members(arr);
        Math.random = originRandom;
    });

    it('should equal first five values', () => {
        const originRandom = Math.random;
        const middleUser = Math.round(users.length / 2);
        const arr = users.slice(0, middleUser);

        Math.random = () => 0.6;
        expect(getRandomUsers(users)).to.have.deep.members(arr);
        Math.random = originRandom;
    });
});
