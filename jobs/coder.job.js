const coderService = require('./../services/coder.service');
const ranklistService = require('./../services/ranklist.service');
const logger = require('./../logger');

module.exports = async (job) => {
    const coder = await coderService.GetCoderInfo(job.data.Id);
    if (!!coder.Codeforces) {
        coder.CodeforcesRating = await coderService.GetUserPoints(coder.Codeforces, 'codeforces');
    }
    if (!!coder.CodeChef) {
        coder.CodeChefRating = await coderService.GetUserPoints(coder.CodeChef, 'codechef');
    }
    
    logger.info(coder);
    
    logger.info('Inserting in mongo');
    await coderService.Upsert(job.data.Id, coder);
    logger.info('Inserted in mongo');
    
    logger.info('Inserting in redis');
    await ranklistService.UpdateRanklist(job.data.Id, coder);
    logger.info('Inserted in redis');
    
    return Promise.resolve(coder);
}