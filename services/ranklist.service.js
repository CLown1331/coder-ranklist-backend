const redis = require('./../db/redis');
const logger = require('./../logger');
const coderCollection = require('./../models/coder');

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

const UpdateRanklistWithCoders = (coders) => {
    return new Promise(function(resolve, reject) {
        redis.hmset(['ranklist', ...coders.flatMap(c => [c.Id, JSON.stringify(c)])], function (err, res) {
            if (err) {
                logger.error(err);
                reject(err);
            }
            logger.info(res);
            resolve(coders);
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
            if (!!res) {
                const ranklist = Object.values(res).map(u => JSON.parse(u));
                logger.info(ranklist);
                resolve(ranklist);
            } else {
                coderCollection.find()
                    .then(r => UpdateRanklistWithCoders(r))
                    .then(r => resolve(r));
            }
        })
    });
};

module.exports = {
    UpdateRanklist,
    GetRanklist,
    UpdateRanklistWithCoders
}