const commentProvider = require("./CommentProvider");
const commentService = require("./CommentService");
const userProvider = require('../User/userProvider');

// 댓글 목록 조회
readAllComments = async function (req,res) {
    // const commentProvider = new CommentProvider(req.query);
    const postIdx = parseInt(req.params.postIdx);
    console.log(req.params);
    const response = await commentProvider.getComments(postIdx);
    return res.send(response);
}

// 댓글 등록
createComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.body.idx);
    const commentContent = parseInt(req.body.content);
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = userProvider.getNickname(loggedInUserIdx);
    const createCommentResponse = await commentService.createComment(postIdx, commentIdx, commentContent, nickname);
    // console.log(req.verifiedToken.userId);
    return res.send(createCommentResponse);
}

// 댓글 수정
updateComment = async function (req,res) {
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.idx);
    const commentContent = parseInt(req.body.content);
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


module.exports = {
    readAllComments,
    createComment,
    updateComment,
    deleteComment
};