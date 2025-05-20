import request from '@/utils/request'

const api = {
  getFishManueList: '/api/fish'
}

const getFishManueList = async () => {
  const res = await request.get(api.getFishManueList)
  return res
}

export {
  getFishManueList
}
