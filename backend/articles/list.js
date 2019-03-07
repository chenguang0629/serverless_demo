'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const listArticle = require('./model.js').listArticle;
const DynamoDAO = require('../util/dynamo-dao.js');
const ArticleController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
  const dynamoDAO = new DynamoDAO(dynamo, 'articleTable');
  const controller = new ArticleController(dynamoDAO);
  controller.listArticle(null, callback);
};
