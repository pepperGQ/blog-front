<script setup lang="ts">
import { queryPostPage } from '@/api/post';
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type';
import { localStorage } from '@/utils/local-storage';

definePage({
  name: 'home',
  meta: {
    level: 1,
    needLogin: true
  },
})

const checked = ref<boolean>(isDark.value)
const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const pageList = ref([])
watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

onMounted(() => {
  const token = localStorage.get(STORAGE_TOKEN_KEY)
  if (token) {
    onLoadPostPage()
  } else {
    router.replace('/login')
  }

})
/* 获取博文列表 */
const onLoadPostPage = async () => {
  loading.value = true
  const res = await queryPostPage()
  loading.value = false
  if (res.code === 0) {
    pageList.value = res.data
  }
  finished.value = true
}
/* 点击新增 */
const handleAddClick = () => {
  router.push('/createPost')
}
</script>

<template>
  <Container :padding-x="0" :paddingT="0">
    <van-nav-bar title="首页">
      <template #right>
        <van-icon name="search" size="18" class="mr-10" />
        <van-icon name="add" size="18" @click="handleAddClick"/>
      </template>
    </van-nav-bar>
    <van-empty v-if="!pageList.length" description="暂无博文" />
    <van-list v-else v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoadPostPage">
      <van-cell v-for="item in pageList" :key="item.id" :title="item.title" />
    </van-list>
  </Container>
</template>
