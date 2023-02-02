module.exports = function(router) {
    const ctrl = require('./likeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    // 좋아요 개수 조회
    router.get('/app/posts/:postIdx', ctrl.countLikes);

    // 좋아요 누르기/취소
    router.post('/app/posts/:postIdx', jwtMiddleware, ctrl.addLike);
}