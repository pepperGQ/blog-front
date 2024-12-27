<script setup lang="ts">
import { api_login } from '@/api/users';
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type';
import { localStorage } from '@/utils/local-storage';



definePage({
  name: 'login',
  meta: {
    level: 2,
    title: '登录',
    // i18n: 'home.mockGuide',
  },
})

const router = useRouter()

const form = ref({
  username: 'admin',
  password: '123456'
})

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

// 登录
const onSubmit = async (values)=>{
  const res = await api_login(values)
  if(res.code === 0){
    localStorage.set(STORAGE_TOKEN_KEY, res.data)
    router.replace('/')
  }else{
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
      <!-- <van-icon name="warn-o" size="3em" /> -->
      <!-- <div> 登录 </div> -->

      <div class="mt-10">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="form.username" name="username" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="form.password" type="password" name="password" label="密码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
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
