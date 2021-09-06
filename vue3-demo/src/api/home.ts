import axios from './index'

export const getList = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/submitData',
    method: 'post',
    data
  })
}

export const getContent = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/string',
    method: 'get',
    data
  })
}

export const login = (data: { [key: string]: unknown }) => {
  return axios({
    url: '',
    method: 'post',
    data
  })
}

// export default getContent
