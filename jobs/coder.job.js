const coderService = require('./../services/coder.service');

module.exports = async (job) => {
    const coder = await coderService.GetCoderInfo(job.data.Id);
    if (!!coder.Codeforces) {
        coder.CodeforcesRating = await coderService.GetUserPoints(coder.Codeforces, 'codeforces');
    }
    if (!!coder.CodeChef) {
        coder.CodeChefRating = await coderService.GetUserPoints(coder.CodeChef, 'codechef');
    }
    await coderService.Upsert(job.data.Id, coder);
    return Promise.resolve(result);
}