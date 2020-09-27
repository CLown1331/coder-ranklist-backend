const redis = require('redis');
const logger = require('./../logger');

const client = redis.createClient({
    url: process.env.REDIS_URL,
});

client.on('error', function(error) {
    logger.error(error);
});

module.exports = client
    