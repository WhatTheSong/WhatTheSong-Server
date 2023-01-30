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
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const postIdx = parseInt(req.params.postIdx);
    const commentIdx = parseInt(req.params.commentIdx);
    const commentContent = parseInt(req.params.content);
    const nickname = userProvider.getNickname(loggedInUserIdx);

    const response = await commentService.insertComment(postIdx, commentIdx, commentContent, nickname);

    console.log(req.verifiedToken.userId);
    return res.send(loggedInUserIdx);
}

// const comment = {
//     // // 댓글 목록 조회
//     // readAllComments: async (req,res) => {
//     //     const commentProvider = new CommentProvider(req.query);
//     //     const {postIdx} = req.query;
//     //     const response = await commentProvider.getComments(postIdx);
//     //     return response;
//     // }

// //     // 댓글 등록
// //     addComment: (req,res) => {
// //         const commentService = new CommentService(req.body);
        
// //     }
// // }

// const reply = {

// }

module.exports = {
    readAllComments,
    createComment,
};