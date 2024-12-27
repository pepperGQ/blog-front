import request from '@/utils/request'

/* 上传图片 */
export async function api_uploadImage(data): Promise<any> {
  return request.post('/currency/upload/images',data,{
    headers: {
        "Content-Type": "multipart/form-data"
    }
})
}


