<template>
  <router-view v-if="route.meta.anime"></router-view>
  <div class="anime" v-else>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>娱乐管理</el-breadcrumb-item>
      <el-breadcrumb-item>动漫列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="anime.reqData.keyword"
        @keyup.enter="getAnimes"
        @blur="blurGetAnimes"
        clearable
        @clear="getAnimes"
      >
        <template #append>
          <el-button :icon="Search" @click="getAnimes"></el-button>
        </template>
      </el-input>
      <el-button type="primary" class="add" @click="addAnime"
        >添加动漫
      </el-button>

      <el-table
        :data="anime.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="name" label="标题"> </el-table-column>
        <el-table-column prop="img_url" label="图片">
          <template #default="scope">
            <div class="img-box">
              <el-image :src="scope.row.img_url" fit="contain"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <template #default="scope">
            {{ stampToTime(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              @click="showEditView(scope.row)"
              size="small"
              >修改</el-button
            >

            <el-button
              type="danger"
              :icon="Delete"
              @click="delAnime(scope.row._id)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="anime.reqData.pagenum"
        :page-sizes="anime.pagesizes"
        :page-size="anime.reqData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="anime.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { stampToTime } from '@/comm/functions'

import { reactive, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { getAnimesApi, delAnimeApi } from '@/comm/fetch'
import { watch } from '@vue/runtime-core'
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const anime = reactive({
  list: [],
  total: 0,
  reqData: {
    keyword: '',
    pagenum: 1,
    pagesize: 10,
  },
  pagesizes: [1, 5, 10, 20],
})
// 获取动漫列表
const getAnimes = async () => {
  loading.value = true
  const res = await getAnimesApi(anime.reqData)
  if (res.status == 200 && res.ok) {
    anime.list = res.data.data
    anime.total = res.data.total
    loading.value = false
  }
}
getAnimes()
// 显示添加表单
const addAnime = () => {
  router.push({ name: 'AddAnime' })
}

// 监听路由的变化以更新数据
watch(route, () => getAnimes())

// 跳转到修改页面
const showEditView = (data) => {
  router.push({ name: 'EditAnime', query: { id: data._id } })
}

// 删除动漫
const delAnime = async (id) => {
  ElMessageBox.confirm('确认删除动漫？', '警告', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(async () => {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '正在删除中',
        type: 'warning',
        duration: 0,
      })
      const res = await delAnimeApi(id)
      if (res.status === 200 && res.ok) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        loading.value = true
        getAnimes()
      } else {
        ElMessage.closeAll()
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage.closeAll()
      // ElMessage.error('您取消了操作')
    })
}

// 页码改变
const pageCurrentChange = (page) => {
  anime.reqData.pagenum = page
  getAnimes()
}
// 每页条数改变
const pageSizeChange = (size) => {
  anime.reqData.pagesize = size
  getAnimes()
}
// 如果搜索框失去焦点并且为空则返回全部数据
const blurGetAnimes = () => {
  if (anime.reqData.keyword == '') {
    getAnimes()
  }
}
</script>

<style lang="stylus" scoped></style>
