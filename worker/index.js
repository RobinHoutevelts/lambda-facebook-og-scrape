'use strict';

const AWS = require("aws-sdk");
const axios = require('axios');
const qs = require('querystring');

const TASK_QUEUE_URL = process.env.TASK_QUEUE_URL;
const AWS_REGION = process.env.AWS_REGION;
const FACEBOOK_ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const sqs = new AWS.SQS({region: AWS_REGION});

function deleteMessage(receiptHandle, cb) {
    sqs.deleteMessage({
        ReceiptHandle: receiptHandle,
        QueueUrl: TASK_QUEUE_URL
    }, cb);
}

function work(url, cb) {
    console.log('Scraping ' + url);

    const data = {
        access_token: FACEBOOK_ACCESS_TOKEN,
        id: url,
        scrape: true,
    };

    axios.post('https://graph.facebook.com/v3.0?' + qs.stringify(data))
        .then(function (res) {
            console.log(res.data);
            cb();
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log('Facebook ignored us!');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            cb('Ai ai ai');
        });
}

exports.handler = function (event, context, callback) {
    work(event.Body, function (err) {
        if (err) {
            callback(err);
        } else {
            deleteMessage(event.ReceiptHandle, callback);
        }
    });
};
