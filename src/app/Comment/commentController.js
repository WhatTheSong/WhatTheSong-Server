const commentProvider = require("./CommentProvider");
const CommentServide = require("./CommentService");

// 댓글 목록 조회
readAllComments = async function (req,res) {
    // const commentProvider = new CommentProvider(req.query);
    const postIdx = parseInt(req.params.postIdx);
    const response = await commentProvider.getComments(postIdx);
    console.log(req.params)
    return res.send(response);
}

// 댓글 등록
addComment = async function (req,res) {
    const commentService = new CommentService(req.body);
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
    addComment
};