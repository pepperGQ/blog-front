import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/prose')
}

export async function queryNodeProse(): Promise<any> {
  return request('/string')
}
