'use strict';

const uuid = require('uuid')

class Article {
    constructor(id, text) {
        this.article_id = id;
        this.text = text;
    }
}

const createArticle = (event, callback) => {
    validateAttriutes(event, callback);
    const body = JSON.parse(event.body);
    const id = uuid.v1();
    const text = body.text;
    return new Article(id, text);
}

const readArticle = (event, callback) => {
    validateId(event, callback);
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return new Article(id);
}

const updateArticle = (event, callback) => {
    validateId(event, callback);
    validateAttriutes(event, callback);
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const text = body.text;
    return new Article(id, text);
}

const deleteArticle = (event, callback) => {
    validateId(event, callback);
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return new Article(id);
}

const validateAttriutes = (event, callback) => {
    const body = JSON.parse(event.body);
    if (typeof body.text !== 'string') {
        console.error('Validation Attriutes Failed!');
        callback(new Error('Body did not contain a text property of type string.'));
        process.exit(1);
    }
}

const validateId = (event, callback) => {
    const body = JSON.parse(event.body);
    if (typeof event.pathParameters.id !== 'string') {
        console.error('Validation ID Failed!');
        callback(new Error('Body did not contain a article_id property of type string.'));
        process.exit(1);
    }
}

module.exports = {
    Article: Article,
    createArticle: createArticle,
    readArticle: readArticle,
    // listArticle: listArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
}