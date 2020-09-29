const ratingFormulaCollection = require('./../models/ratingFormula');

const GetRatingFormula = async () => {
    const ratingFormula = await ratingFormulaCollection.findOne()
    return ratingFormula && ratingFormula.Formula || '';
};

module.exports = {
    GetRatingFormula
};