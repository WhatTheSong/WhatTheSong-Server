const likeProvider = require('./likeProvider');
const likeService = require('./likeService');

exports.countLikes = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const countLikesResponse = await likeProvider.countLikes(postIdx);
    console.log(countLikesResponse)
    return res.send(countLikesResponse);
};

exports.addLike = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    console.log(postIdx,loggedInUserIdx)
    const addLikeResponse = await likeService.addLike(postIdx, loggedInUserIdx);
    return res.send(addLikeResponse);
}