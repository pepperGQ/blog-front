<script setup lang="ts">
import { api_uploadImage } from '@/api/currency';
import { api_login } from '@/api/users';
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type';
import { localStorage } from '@/utils/local-storage';
import { showNotify } from 'vant';


definePage({
    name: 'createPost',
    meta: {
        level: 2,
        title: '新建文章',
        needLogin: true
        // i18n: 'home.mockGuide',
    },
})

const router = useRouter()

const form = ref({
    title: '',
    content: ''
})
const fileList = ref([])

function onBack() {
    if (window.history.state.back)
        history.back()
    else
        router.replace('/')
}

// 登录
const onSubmit = async (values) => {
    const res = await api_login(values)
    if (res.code === 0) {
        localStorage.set(STORAGE_TOKEN_KEY, res.data)
        router.replace('/')
    } else {
        showNotify({
            type: 'danger',
            message: res.message,
        })
    }

}
const afterReadFile = async(file) => {
    console.log(file,'file')
    // return
    const params = {
        file:file.file
    }
    const formDataInstance = new FormData();
	formDataInstance.append("file", file);
	
    const res = await api_uploadImage(params)
    if (res.code === 0) {
        
    } else {
        showNotify({
            type: 'danger',
            message: res.message,
        })
    }
}
</script>

<template>
    <Container>
        <div text="center gray-300 dark:gray-200 18">
            <div class="mt-10">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field v-model="form.title" name="title" label="标题" placeholder="请输入文章标题"
                            :rules="[{ required: true, message: '请输入文章标题' }]" />
                        <van-field v-model="form.content" rows="4" autosize label="内容" type="textarea" maxlength="100"
                            placeholder="请输入。。。" show-word-limit />
                        <div class="flex justify-start p-10">
                            <van-uploader v-model="fileList" multiple result-type="file" :max-count="9" class="mt-10" :after-read="afterReadFile"/>
                        </div>
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </Container>
</template>
