import chai from 'chai';
import sinon from 'sinon';
const { expect } = chai;

import { showMessage, getDay, getAdultUsers, getRandomUsers, Product, getUsers, postUser } from './18.Testing';
import { days, defaultProduct, money, users } from './constants';

describe('showMessage func testing', () => {
    it('Should check alert was called', () => {
        const alertStub = sinon.stub(window, 'alert');

        showMessage();
        expect(alertStub.called).to.be.true;
        alertStub.restore();
    });

    it('Should call alert with argument', () => {
        const alertStub = sinon.stub(window, 'alert');
        const testString = 'test';

        showMessage(testString);
        expect(alertStub.getCall(0).args[0]).to.equal(testString);
        alertStub.restore();
    });
});

describe('getDay func testing', () => {
    it('Should not equal undefined', () => expect(getDay()).to.not.equal(undefined)); //Question!

    it('Should equal current day', () => expect(getDay()).to.equal(days[new Date().getDay()]));
});

describe('getAdultUsers func testing', () => {
    it('should equal empty array', () => expect(getAdultUsers()).to.be.an('array').that.is.empty);

    it('Should filter by age > 18', () => {
        const arr = users.filter(user => user.age > 18);

        expect(getAdultUsers(users)).to.have.deep.members(arr);
    });
});

describe('getRandomUsers func testing', () => {
    it('should equal false', () => expect(getRandomUsers()).to.be.false);

    it('Should equal last four values', () => {
        const length = users.length;
        const middleUser = Math.round(length / 2);
        const arr = users.slice(middleUser, length);
        const mathStub = sinon.stub(Math, 'random');

        mathStub.returns(0.5);
        expect(getRandomUsers(users)).to.have.deep.members(arr);
        mathStub.restore();
    });

    it('Should equal first five values', () => {
        const middleUser = Math.round(users.length / 2);
        const arr = users.slice(0, middleUser);
        const mathStub = sinon.stub(Math, 'random');

        mathStub.returns(0.6);
        expect(getRandomUsers(users)).to.have.deep.members(arr);
        mathStub.restore();
    });
});

describe('class Product testing', () => {
    let product;

    beforeEach(() => product = new Product());

    it('Should create instance with title', () => {
        const value = 'LG';

        expect(new Product(value).title).to.equal(value);
    });

    it('Should create instance with default title', () => expect(product.title).to.equal(defaultProduct));

    it('Should create instance with price', () => {
        const value = 20;

        expect(new Product(null, value).price).to.equal(value);
    });

    it('Should create instance with default price', () => expect(product.price).to.equal(10));

    it('Should get price', () => expect(product.getPrice()).to.equal(product.price + money));

    it('Should set price', () => {
        const value = 50;

        product.setPrice(value);
        expect(product.price).to.equal(value);
    });

    it('Should throw error', () => expect(product.setPrice).to.throw(Error, 'Process should be defined')); //Question

    it('Should set price above 10', () => {
        const value = 50;

        product.setPrice(value);
        expect(product.price).to.be.above(10);
    });
});

describe('getUsers func testing', () => {
    let stubGet;

    const callStubGet = isError => {
        if (isError) {
            return stubGet.returns(Promise.reject());
        }

        return stubGet.returns(Promise.resolve());
    };

    beforeEach(() => stubGet = sinon.stub(window.$, 'get'));

    afterEach(() => window.$.get.restore());

    it('Should call $.get()', () => {
        callStubGet();
        getUsers();
        expect(stubGet.called).to.be.true;
    });

    it('Should call console.log() on success', (done) => {
        const consoleStub = sinon.stub(console, 'log');

        callStubGet();
        getUsers().then(() => {
            expect(consoleStub.called).to.be.true;
            done();
            consoleStub.restore();
        });
    });

    it('Should call console.error() on fail', (done) => {
        const consoleStub = sinon.stub(console, 'error');

        callStubGet(true);
        getUsers().then(() => {
            expect(consoleStub.called).to.be.true;
            done();
            consoleStub.restore();
        });
    });
});

describe('postUsers func testing', () => {
    let stubPost;

    const callStubPost = isError => {
        if (isError) {
            return stubPost.returns(Promise.reject());
        }

        return stubPost.returns(Promise.resolve());
    };

    beforeEach(() => stubPost = sinon.stub(window.$, 'post'));

    afterEach(() => window.$.post.restore());

    it('Should call $.post()', () => {
        callStubPost();
        postUser();
        expect(stubPost.called).to.be.true;
    });

    it('Should $.post() return id', () => {
        const user = { name: "Taras", id: 42 };

        callStubPost();
        postUser(user).then(data => expect(data.id).to.be.a('number'));
    });

    it('Should call console.log() on success', (done) => {
        const consoleStub = sinon.stub(console, 'log');

        callStubPost();
        postUser().then(() => {
            expect(consoleStub.called).to.be.true;
            done();
            consoleStub.restore();
        });
    });

    it('Should call console.error() on fail', (done) => {
        const consoleStub = sinon.stub(console, 'error');

        callStubPost(true);
        postUser().then(() => {
            expect(consoleStub.called).to.be.true;
            done();
            consoleStub.restore();
        });
    });
});
