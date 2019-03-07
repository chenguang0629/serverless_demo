'use strict';

module.exports = class DynamoDAO {
    constructor(docClient, table) {
        this.dynamo = docClient;
        this.table = table;
    }

    create(model, callback) {
        const params = {
            TableName: this.table,
            Item: model
        };

        this.dynamo.put(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not save item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
            callback(null, response);
        });
    }

    list(model, callback) {
        const params = {
            TableName: this.table
        };

        this.dynamo.scan(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not list items.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Items),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
            callback(null, response);
        });
    }

    read(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            }
        };

        this.dynamo.get(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not read item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
            callback(null, response);
        });
    }

    update(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            },
            UpdateExpression: 'set #name = :value',
            ExpressionAttributeNames: {
                '#name': 'text'
            },
            ExpressionAttributeValues: {
                ':value': model.text
            }
        };

        this.dynamo.update(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not update item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
            callback(null, response);
        });
    }

    delete(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            }
        };

        this.dynamo.delete(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not delete item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify({}),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
            callback(null, response);
        });
    }

}