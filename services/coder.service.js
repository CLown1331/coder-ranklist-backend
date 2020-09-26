const { update } = require('./../models/coder');
const coderCollection = require('./../models/coder');
const cfUrl = 'http://codeforces.com/api/user.rating?handle=';
const ccUrl = 'https://codechef-apijs.herokuapp.com/rating/';
const fetch = require('node-fetch');

const Upsert = async (id, payload) => {
    return coderCollection.findOneAndUpdate({_id: id}, payload, {
        new: true,
        upsert: true,
    });
};

const GetCoderInfo = async (id) => {
    return coderCollection.findById(id);
}

const GetUserInfo = async (handle, judge) => {
    let url = '';
    if (judge === 'codeforces') {
        url = `${cfUrl}${handle}`;
    } else if (judge == 'codechef') {
        url = `${ccUrl}${handle}`;
    }
    const response = await fetch(url);
    if ((await response.status) !== 200) {
		return false;
    }
    const data = await response.json();
    return data;
};

const GetUserPoints = async (handle, judge) => {
    const info = await GetUserInfo(handle, judge);
    if (!info) {
        return 0;
    }
    let rating = 0;
    let lastContestDate = 0;
    if (judge === 'codeforces') {
        const latest = info.result.pop();
        rating = latest.newRating;
        lastContestDate = new Date(latest.ratingUpdateTimeSeconds * 1000)
    } else if (judge == 'codechef') {
        rating = info.rating;
        lastContestDate = new Date(info.lastParticipationTimeStamp * 1000)
    }
    const timeStampNow = new Date();
    const lastDisallowedDate = new Date();
    lastDisallowedDate.setMonth(timeStampNow.getMonth() - 1);
	if (lastDisallowedDate > lastContestDate) {
        rating = 0;
    }
    return rating;
};

module.exports = {
    Upsert,
    GetUserPoints,
    GetCoderInfo,
}