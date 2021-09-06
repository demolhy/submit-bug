import axios from './index'

export const login = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
