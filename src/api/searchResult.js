import request from '@/utils/request'
export const getSearchResultAPI = (value, page) => {
  return request.get('/v1_0/search', {
    params: {
      q: value,
      page
    }
  })
}
