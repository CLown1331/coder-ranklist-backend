const redis = require('./../db/redis');
const logger = require('./../logger');

const UpdateRanklist = (id, coder) => {
    return new Promise(function(resolve, reject) {
        redis.hmset(['ranklist', id, JSON.stringify(coder)], function (err, res) {
            if (err) {
                logger.error(err);
                reject(err);
            }
            logger.info(res);
            resolve(res);
        })
    });
};

const GetRanklist = () => {
    return new Promise(function(resolve, reject) {
        redis.hgetall('ranklist', function (err, res) {
            if (err) {
                logger.error(err);
                reject(err);
            }
            const ranklist = Object.values(res);
            logger.info(ranklist);
            resolve(ranklist);
        })
    });
};

module.exports = {
    UpdateRanklist,
    GetRanklist,
}