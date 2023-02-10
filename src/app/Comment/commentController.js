const commentProvider = require("./CommentProvider");
const commentService = require("./CommentService");
const userProvider = require('../User/userProvider');

/*
 * API name: 댓글 목록 조회 API
 * [GET] /app/posts/:postIdx/comments
 * 
 * Query String: postIdx
 * Response: comment, userIdx, updatedAt, nickname
 */
exports.readAllComments = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const response = await commentProvider.getComments(postIdx);
    return res.send(response);
}

/*
 * API name: 댓글 등록 API
 * [POST] /app/posts/:postIdx/comments
 * 
 * Query String: postIdx
 * Body: content, verifiedToken
 */
exports.createComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentContent = req.body.content;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = await userProvider.getNickname(loggedInUserIdx);
    const createCommentResponse = await commentService.createComment(postIdx, commentContent, nickname, loggedInUserIdx);
    return res.send(createCommentResponse);
}

/*
 * API name: 댓글 수정 API
 * [PATCH] /app/posts/:postIdx/comments/:idx
 * 
 * Query String: postIdx, idx
 * Body: content
 */
exports.updateComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.idx);
    const commentContent = req.body.content;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const updateCommentResponse = await commentService.updateComment(postIdx, commentIdx, commentContent,loggedInUserIdx);
    return res.send(updateCommentResponse);
}

/*
 * API name: 댓글 삭제 API
 * [DELETE] /app/posts/:postIdx/comments/:idx
 * 
 * Query String: postIdx, idx
 */
exports.deleteComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.idx);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const deleteCommentResponse = await commentService.deleteComment(postIdx, commentIdx,loggedInUserIdx);
    return res.send(deleteCommentResponse);
}

/*
 * API name: 답글 목록 조회 API
 * [GET] /app/posts/:postIdx/comments/:parentIdx/replies
 * 
 * Query String: postIdx, parentIdx
 * Response: comment, userIdx, updatedAt, nickname
 */
exports.readAllReplies = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const response = await commentProvider.getReplies(postIdx, parentIdx);
    return res.send(response);
}

/*
 * API name: 답글 등록 API
 * [POST] /app/posts/:postIdx/comments/:parentIdx/replies
 * 
 * Query String: postIdx, parentIdx
 * Body: content, verifiedToken
 */
exports.createReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyContent = req.body.content;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = await  userProvider.getNickname(loggedInUserIdx);
    const createReplyResponse = await commentService.createReply(postIdx, parentIdx, replyContent, nickname, loggedInUserIdx);
    return res.send(createReplyResponse);
}

/*
 * API name: 답글 수정 API
 * [PATCH] /app/posts/:postIdx/comments/:parentIdx/replies/:idx
 * 
 * Query String: postIdx, parentIdx, idx
 * Body: content
 */
exports.updateReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyIdx = parseInt(req.params.idx);
    const replyContent = req.body.content;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const updateReplyResponse = await commentService.updateReply(postIdx, parentIdx, replyIdx, replyContent,loggedInUserIdx);
    return res.send(updateReplyResponse);
}

/*
 * API name: 답글 삭제 API
 * [DELETE] /app/posts/:postIdx/comments/:parentIdx/replies/:idx
 * 
 * Query String: postIdx, parentIdx, idx
 */
exports.deleteReply = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const parentIdx = parseInt(req.params.parentIdx);
    const replyIdx = parseInt(req.params.idx);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const deleteReplyResponse = await commentService.deleteReply(postIdx, parentIdx, replyIdx, loggedInUserIdx);
    return res.send(deleteReplyResponse);
}
