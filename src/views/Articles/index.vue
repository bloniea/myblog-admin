<template>
  <router-view v-if="$route.meta.article"></router-view>
  <div
    class="articles"
    v-else
  >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <div class="head-con">

        <div class="cat">
          分类:
          <el-select
            placeholder="请选择"
            v-model="articles.category_id"
            clearable
          >
            <el-option
              v-for="item in articles.categories"
              :key="item.id"
              :label="item.cat_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="label">
          标签:
          <el-select
            placeholder="请选择"
            v-model="articles.label_ids"
            multiple
          >
            <el-option
              v-for="item in articles.labels"
              :key="item.id"
              :label="item.label_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="articles.req.query"
            @keyup.enter="searchArticle"
            @change="changeNull"
          >
            <template #append>
              <el-button
                :icon="Search"
                @click="searchArticle"
              ></el-button>
            </template>
          </el-input>
        </div>

        <div>
          <el-button
            type="primary"
            class="add"
            @click="toAddArticle"
          >添加文章</el-button>
        </div>

      </div>

      <el-table
        :data="articles.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="cat_name"
          label="分类"
        >
        </el-table-column>
        <el-table-column
          prop="labels"
          label="标签"
        >
          <template #default="scope">
            <div v-if="scope.row.labels">
              <el-tag
                v-for="(item,i) in formatLabel(scope.row.labels)"
                :key="i"
              >{{item}}</el-tag>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="img_url"
          label="图片"
        >
          <template #default="scope">
            <div class="img-box">
              <el-image
                :src="scope.row.img_url"
                fit="contain"
              ></el-image>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="img_source"
          label="图片来源"
        >
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
        >
          <template #default="scope">
            {{stampToTime(scope.row.created_at)}}

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">

            <el-button
              type="primary"
              :icon="Edit"
              @click="showEditView(scope.row)"
              size="small"
            >修改</el-button>

            <el-button
              type="danger"
              :icon="Delete"
              @click="delArticle(scope.row.id)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="articles.req.pagenum"
        :page-sizes="articles.pagesizes"
        :page-size="articles.req.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articles.total"
      >
      </el-pagination>

    </el-card>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(true)
const articles = reactive({
  list: [],
  req: {
    query: '',
    pagesize: 10,
    pagenum: 1,
    category_id: '',
    label_ids: ''
  },
  category_id: [],
  label_ids: [],
  total: 0,
  categories: [],
  labels: [],
  pagesizes: [1, 5, 10, 20]
})
const { proxy: p } = getCurrentInstance()
// 获取文章列表
const getArticles = async () => {
  loading.value = true
  const { data: res } = await p.$axios.get('/adminApi/articles', { params: articles.req })
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  loading.value = false
  articles.list = res.data.data
  articles.total = res.data.total
}
getArticles()
// 获取分类
const getCategories = async () => {
  const { data: res } = await p.$axios.get('/adminApi/categories')
  if (res.meta.status !== 200) return ElMessage.error('获取分类出错')
  articles.categories = res.data
}
getCategories()
// 获取标签
const getLabels = async () => {
  const { data: res } = await p.$axios.get('/adminApi/labels')
  if (res.meta.status !== 200) return ElMessage.error('获取标签出错')
  articles.labels = res.data
}
getLabels()
// 搜索
const searchArticle = () => {
  articles.req.category_id = articles.category_id.toString()
  articles.req.label_ids = articles.label_ids.toString()
  getArticles()
}
// 搜索输入框清空的时候返回全部数据
const changeNull = val => {
  if (!val) {
    getArticles()
  }
}
// 改变每页数据条数
const pageSizeChange = size => {
  articles.req.pagesize = size
  getArticles()
}
// 改变页码
const pageCurrentChange = page => {
  articles.req.pagenum = page
  getArticles()
}
// 删除文章
const delArticle = async id => {
  ElMessageBox.confirm(
    '确认删除文章？',
    '警告',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )
    .then(async () => {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '正在删除中',
        type: 'warning',
        duration: 0
      })
      const { data: res } = await p.$axios.delete(`/adminApi/articles/${id}`)
      if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
      ElMessage.closeAll()
      ElMessage.success(res.meta.msg)
      getArticles()
    })
    .catch(() => {
      ElMessage.closeAll()
      ElMessage.error('您取消了操作')
    })
}
// 跳转到添加文章页面

const toAddArticle = () => {
  router.push({ name: 'AddArticle' })
}
// 监听
watch(() => p.$route.path,
  () => { getArticles() })

//
const showEditView = article => {
  router.push({ name: 'EditArticle', query: { id: article.id } })
}
const formatLabel = labels => {
  return labels.split(',')
}

</script>

<style lang="stylus" scoped>
.head-con {
  display flex
  div {
    margin-right 10px
    >>>.el-input {
      width 100%
    }
  }
}
.img-box {
  height 100px
  .el-image {
    height 100%
    width 100%
  }
}
.el-tag {
  margin 5px
}
</style>
