<template>
  <router-view v-if="$route.meta.article"></router-view>

  <div class="my-article" v-else>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于我的文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="article-lookup">
        <div class="search">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="article.reqData.keyword"
            @keyup.enter="getArticles"
            clearable
            @clear="getArticles"
            @blur="blurGet(article.reqData.keyword)"
          >
            <template #append>
              <el-button :icon="Search" @click="getArticles"></el-button>
            </template>
          </el-input>
        </div>

        <div class="add-btn">
          <el-button type="primary" class="add" @click="toAdd"
            >添加文章</el-button
          >
        </div>
      </div>
      <el-table
        :data="article.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
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
              @click="delArticle(scope.row._id)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="article.reqData.pagenum"
        :page-sizes="article.pagesizes"
        :page-size="article.reqData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="article.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { getAboutArticles, delAboutArticle } from '@/comm/fetch'
import { stampToTime } from '@/comm/functions'
import { onActivated, watch } from '@vue/runtime-core'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const toAdd = () => {
  router.push({ name: 'aboutAddArticle' })
}
const article = reactive({
  list: [],
  total: 0,
  reqData: {
    pagesize: 10,
    pagenum: 1,
    keyword: '',
  },
  pagesizes: [1, 5, 10, 20],
})
// 获取文章
const getArticles = async () => {
  loading.value = true
  const res = await getAboutArticles(article.reqData)

  if (res.status == 200 && res.ok) {
    article.list = res.data.data
    article.total = res.data.total
    loading.value = false
    // console.log(res, loading)
  }
}
getArticles()

// 显示修改文章内容
const showEditView = (data) => {
  router.push({ name: 'aboutEditArticle', query: { id: data._id } })
}
const delArticle = async (id) => {
  ElMessageBox.confirm('确认删除文章？', '警告', {
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
      const res = await delAboutArticle(id)
      if (res.status === 200 && res.ok) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        loading.value = true
        getArticles()
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
// 修改后回到这个页面的时候重新获取文章
watch(route, (n) => {
  loading.value = true
  getArticles()
})

// 页码改变
const pageCurrentChange = (page) => {
  article.reqData.pagenum = page
  getArticles()
}
// 每页条数改变
const pageSizeChange = (size) => {
  article.reqData.pagesize = size
  getArticles()
}
// 如果搜索框失去焦点并且为空则返回全部数据
const blurGet = (val) => {
  if (val == '') {
    getArticles()
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
