<script setup lang="ts">
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type';
import { localStorage } from '@/utils/local-storage';

import { api_login, queryUser } from '@/api/users';
// import { queryUser } from '@/api/users';

definePage({
  name: 'mock',
  meta: {
    level: 2,
    title: '💿 Mock 指南',
    i18n: 'home.mockGuide',
  },
})

const messages = ref<string>('')

const pull = async()=> {
  await login()
  
  queryUser().then(({ code, result }) => {
    if (code === 0)
      messages.value = result
  })
}

const login = async()=>{
  const res = await api_login({username:'admin', password:'123456'})
  if(res.code === 0){
    localStorage.set(STORAGE_TOKEN_KEY, res.data)
  }
}
</script>

<template>
  <Container>
    <div class="data-label">
      {{ $t('mock.fromAsyncData') }}
    </div>

    <div class="data-content bg-white dark:bg-[--van-background-2]">
      <div v-if="messages">
        {{ messages }}
      </div>
      <VanEmpty v-else :description="$t('mock.noData')" />
    </div>

    <van-space class="m-10" direction="vertical" fill>
      <VanButton type="primary" round block @click="pull">
        {{ $t('mock.pull') }}
      </VanButton>
      <VanButton type="default" round block @click="messages = ''">
        {{ $t('mock.reset') }}
      </VanButton>
    </van-space>
  </Container>
</template>

<style lang="less" scoped>
.data-label {
  color: #969799;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
}

.data-content {
  height: 300px;
  padding: 20px;
  line-height: 30px;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
