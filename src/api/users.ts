import request from '@/utils/request'

export async function queryUser(): Promise<any> {
  return request('/users')
}

export async function api_login(data): Promise<any> {
    return request.post('/noLogin/login', data)
  }
