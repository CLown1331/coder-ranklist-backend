const Queue = require('bull');
const redisUrl = process.env.REDIS_URL;

module.exports = new Queue('coder-jobs', redisUrl);