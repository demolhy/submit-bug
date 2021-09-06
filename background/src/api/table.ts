import axios from './index'

export const getList = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/getTable',
    method: 'post',
    data
  })
}

export const getContent = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/qeuryTable',
    method: 'post',
    data
  })
}

export const saveStatusTrue = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/saveStatusTrue',
    method: 'post',
    data
  })
}

export const saveStatusFalse = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/saveStatusFalse',
    method: 'post',
    data
  })
}

export const saveRemarks = (data: { [key: string]: unknown }) => {
  return axios({
    url: '/saveRemarks',
    method: 'post',
    data
  })
}

// export default getContent
