import request from '@/utils/request'

/* 获取博客列表 */
export async function queryPostPage(): Promise<any> {
  return request('/post/getPostPage')
}


