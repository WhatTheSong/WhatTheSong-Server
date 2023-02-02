const commentProvider = require("./CommentProvider");
const commentService = require("./CommentService");
const userProvider = require('../User/userProvider');

// 댓글 목록 조회
readAllComments = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    //console.log(req.params);
    const response = await commentProvider.getComments(postIdx);
    return res.send(response);
}


// 댓글 등록
createComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentContent = parseInt(req.body.content);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = userProvider.getNickname(loggedInUserIdx);
    const createCommentResponse = await commentService.createComment(postIdx, commentContent, nickname);
    // console.log(req.verifiedToken.userId);
    return res.send(createCommentResponse);
}

// 댓글 수정
updateComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.idx);
    console.log(commentIdx)
    const commentContent = parseInt(req.body.content);
    console.log(postIdx, commentIdx, commentContent)
    const updateCommentResponse = await commentService.updateComment(postIdx, commentIdx, commentContent);
    return res.send(updateCommentResponse);
}

// 댓글 삭제
deleteComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.idx);
    const deleteCommentResponse = await commentService.deleteComment(postIdx, commentIdx);
    return res.send(deleteCommentResponse);
}

// 답글 목록 조회
readAllReplies = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    //console.log(req.params);
    const response = await commentProvider.getReplies(postIdx, parentIdx);
    return res.send(response);
}

// 답글 등록
createReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyContent = parseInt(req.body.content);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = userProvider.getNickname(loggedInUserIdx);
    const createReplyResponse = await commentService.createReply(postIdx, parentIdx, replyContent, nickname);
    // console.log(req.verifiedToken.userId);
    return res.send(createReplyResponse);
}

// 답글 수정
updateReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyIdx = parseInt(req.params.idx);
    const replyContent = parseInt(req.body.content);
    const updateReplyResponse = await commentService.updateReply(postIdx, parentIdx, replyIdx, replyContent);
    return res.send(updateReplyResponse);
}

// 답글 삭제
deleteReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyIdx = parseInt(req.params.idx);
    const deleteReplyResponse = await commentService.deleteComment(postIdx, parentIdx, replyIdx);
    return res.send(deleteReplyResponse);
}

module.exports = {
    readAllComments,
    createComment,
    updateComment,
    deleteComment,
    readAllReplies,
    createReply,
    updateReply,
    deleteReply,
};