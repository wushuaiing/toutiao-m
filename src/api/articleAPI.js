import request from '@/utils/request'

export const getArticleDetailAPI = id => {
  return request.get(`/v1_0/articles/${id}`)
}
export const followUserAPI = userId => {
  return request.post('/v1_0/user/followings', {
    target: userId
  })
}
export const deleteFollowAPI = userId => {
  return request.delete(`/v1_0/user/followings/${userId}`)
}
export const addLikeAPI = artId => {
  return request.post('/v1_0/article/likings', {
    target: artId
  })
}
export const dislikeAPI = artId => {
  return request.delete(`/v1_0/article/likings/${artId}`)
}
export const getCmtListAPI = (artId, offset) => {
  return request.get('/v1_0/comments', {
    params: {
      type: 'a',
      source: artId,
      offset
    }
  })
}
// 评论点赞api
export const addLikeCmtAPI = cmtId => {
  return request.post('/v1_0/comment/likings', {
    target: cmtId
  })
}
// 取消点赞api
export const disLikeCmtAPI = cmtId => {
  return request.delete(`/v1_0/comment/likings/${cmtId}`)
}
// 发表评论的 API（形参中的 artId 是文章的 id；content 是评论的内容）
export const pubCommentAPI = (artId, content) => {
  return request.post('/v1_0/comments', {
    target: artId,
    content
  })
}
