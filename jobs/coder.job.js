const coderService = require('./../services/coder.service');
const ranklistService = require('./../services/ranklist.service');
const logger = require('./../logger');
const ratingFormulaService = require('./../services/ratingFormula.service');
const { parse, eval } = require('expression-eval');

module.exports = async (job) => {
    const coder = await coderService.GetCoderInfo(job.data.Id);
    const ratingFormula = await ratingFormulaService.GetRatingFormula();
    const astFormula = parse(ratingFormula);
    
    if (!!coder.Codeforces) {
        coder.CodeforcesRating = await coderService.GetUserPoints(coder.Codeforces, 'codeforces');
    }
    if (!!coder.CodeChef) {
        coder.CodeChefRating = await coderService.GetUserPoints(coder.CodeChef, 'codechef');
    }
    
    coder.Rating = eval(astFormula, {CFR: coder.CodeforcesRating || 0, CCR: coder.CodeChefRating || 0, CP: coder.Marks || 0});
    
    logger.info(coder);
    
    logger.info('Inserting in mongo');
    await coderService.Upsert(job.data.Id, coder);
    logger.info('Inserted in mongo');
    
    logger.info('Inserting in redis');
    await ranklistService.UpdateRanklist(job.data.Id, coder);
    logger.info('Inserted in redis');
    
    return Promise.resolve(coder);
}