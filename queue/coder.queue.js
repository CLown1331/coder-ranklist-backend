const Queue = require('bull');
const redisUrl = process.env.REDIS_URL;
const logger = require('./../logger');

logger.info('Coder queue');

module.exports = new Queue('coder-jobs', redisUrl);