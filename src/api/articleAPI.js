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
