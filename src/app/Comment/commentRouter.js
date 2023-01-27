module.exports = function(router) {
    const ctrl = require('./commentController');
    // 1. 댓글 목록 조회
    router.get('/app/posts/:postIdx/comments', ctrl.readAllComments);

    // 2. 댓글 등록
    router.post('/app/posts/:postIdx/comments', ctrl.addComment);

    // 3. 댓글 수정
    router.put('/app/posts/:postIdx/comments/:idx');

    // 4. 댓글 삭제
    router.delete('/app/posts/:postIdx/comments/:idx');

    // 5. 답글 목록 조회
    router.get('/app/posts/:postIdx/commnents/:idx/replies');

    // 6. 답글 등록
    router.post('/app/posts/:postIdx/commnents/:idx/replies');

    // 7. 답글 수정
    router.put('/app/posts/:postIdx/commnents/:idx/replies/:replyIdx');

    // 8. 답글 삭제
    router.delete('/app/posts/:postIdx/commnents/:idx/replies/:replyIdx');
}

// const express = require("express");
// const router = express.Router();
// const comment = require('./commentController');

// const ctrl = require("./commentController");

// // 1. 댓글 목록 조회
// router.get('/app/posts/:postIdx/comments', comment.readAllComments);

// // 2. 댓글 등록
// router.post('/app/posts/:postIdx/comments', comment.addComment);

// // 3. 댓글 수정
// router.put('/app/posts/:postIdx/comments/:idx');

// // 4. 댓글 삭제
// router.delete('/app/posts/:postIdx/comments/:idx');

// // 5. 답글 목록 조회
// router.get('/app/posts/:postIdx/commnents/:idx/replies');

// // 6. 답글 등록
// router.post('/app/posts/:postIdx/commnents/:idx/replies');

// // 7. 답글 수정
// router.put('/app/posts/:postIdx/commnents/:idx/replies/:replyIdx');

// // 8. 답글 삭제
// router.delete('/app/posts/:postIdx/commnents/:idx/replies/:replyIdx');