const likeProvider = require('./likeProvider');
const likeService = require('./likeService');

countLikes = async function (req,res) {
    const postIdx = parseInt(req.param.postIdx);
    const countLikesResponse = await likeProvider.countLikes(postIdx);
    return res.send(countLikesResponse);
};

addLike = async function (req,res) {
    const postIdx = parseInt(req.param.postIdx);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const addLikeResponse = await likeService.addLike(postIdx, loggedInUserIdx);
    return res.send(addLikeResponse);
}

module.exports = {
    countLikes,
    addLike,
}