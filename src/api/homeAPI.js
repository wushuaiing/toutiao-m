import request from '@/utils/request'

export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}
// 请求所有频道列表
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}
// 更新用户频道
export const updateUserChannelAPI = channels => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}
export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id,
      timestamp: time
    }
  })
}
export const dislikeArticleAPI = id => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}
export const reportArticleAPI = (id, type) => {
  return request.post('/v1_0/article/reports', {
    target: id,
    type
  }
  )
}
