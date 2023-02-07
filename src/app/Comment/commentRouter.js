module.exports = function(router) {
    const ctrl = require('./commentController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    /* 댓글 관련 API */
    // 1. 댓글 목록 조회
    router.get('/app/posts/:postIdx/comments', ctrl.readAllComments);

    // 2. 댓글 등록
    router.post('/app/posts/:postIdx/comments', jwtMiddleware, ctrl.createComment);

    // 3. 댓글 수정
    router.patch('/app/posts/:postIdx/comments/:idx', ctrl.updateComment);

    // 4. 댓글 삭제
    router.delete('/app/posts/:postIdx/comments/:idx', ctrl.deleteComment);


    /* 답글 관련 API */
    // 5. 답글 목록 조회
    router.get('/app/posts/:postIdx/comments/:parentIdx/replies', ctrl.readAllReplies);

    // 6. 답글 등록
    router.post('/app/posts/:postIdx/comments/:parentIdx/replies', jwtMiddleware, ctrl.createReply);

    // 7. 답글 수정
    router.patch('/app/posts/:postIdx/comments/:parentIdx/replies/:idx', ctrl.updateReply);

    // 8. 답글 삭제
    router.delete('/app/posts/:postIdx/comments/:parentIdx/replies/:idx', ctrl.deleteReply);

}