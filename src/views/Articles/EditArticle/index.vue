<template>
  <div class="editArticle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Articles' }"
        >文章列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="Editform"
        :model="article.req"
        label-width="80px"
        v-loading="loading"
        :rules="article.rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.req.title"></el-input>
        </el-form-item>
        <div class="category_label">
          <el-form-item label="分类" prop="category_id">
            <el-select
              v-model="article.req.category_id"
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in article.categories"
                :key="item._id"
                :label="item.cat_name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              v-model="article.req.label_ids"
              multiple
              placeholder="请选择标签"
            >
              <el-option
                v-for="item in article.labels"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="图片来源" prop="img_source">
          <el-input v-model="article.req.img_source"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="img_url">
          <el-input v-model="article.req.img_url"></el-input>

          <img
            v-if="article.req.img_url"
            :src="article.req.img_url"
            class="preview"
          />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <v-md-editor
            v-model="article.req.content"
            height="400px"
          ></v-md-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(Editform)"
            :loading="btnLoading.btn"
            >立即修改</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  editArticleApi,
  getArticleApi,
  getCategoriesApi,
  getLabelsApi,
} from '../../../comm/fetch'
import { exisets } from '@/comm/functions'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const Editform = ref()
const btnLoading = reactive({
  btn: false,
})
const article = reactive({
  req: {
    title: '',
    category_id: '',
    label_ids: '',
    img_url: '',
    content: '',
    img_source: '',
  },
  categories: [],
  labels: [],
  rules: {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    category_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
    img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
    img_source: [
      { required: true, message: '请输入图片来源', trigger: 'blur' },
    ],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  },
})
const headers = reactive({
  Authorization: window.sessionStorage.getItem('token')
    ? window.sessionStorage.getItem('token')
    : '',
})

// 获取分类
const getCategories = async () => {
  const res = await getCategoriesApi()
  if (res.status === 200 && res.ok) {
    article.categories = res.data.data
  }
}

// 获取标签
const getLabels = async () => {
  const res = await getLabelsApi()
  if (res.status === 200 && res.ok) {
    article.labels = res.data.data
  }
}

// 获取文章
const getArticle = async () => {
  loading.value = true
  const id = route.query.id
  const res = await getArticleApi(id)
  if (res.status === 200 && res.ok) {
    article.req = res.data.data
    await getLabels()
    await getCategories()
    loading.value = false
    article.req.category_id = (await exisets(
      article.req.category_id,
      article.categories
    ))
      ? res.data.data.category_id
      : ''
    article.req.label_ids = (await exisets(
      article.req.label_ids,
      article.labels
    ))
      ? res.data.data.label_ids
      : []
  }
}
getArticle()
// 修改文章
const submitForm = (form) => {
  if (!form) return
  form.validate(async (valid) => {
    if (valid) {
      const id = route.query.id
      btnLoading.btn = true
      const res = await editArticleApi(id, article.req)
      if (res.status === 200 && res.ok) {
        ElMessage.success('修改成功')
        btnLoading.btn = false
        router.push({ name: 'Articles' })
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })
}
const resetForm = (form) => {
  getArticle()
}
</script>

<style lang="stylus" scoped>
.category_label {
  display flex
  .el-form-item {
    width 30%
  }
}
:deep(.avatar-uploader .el-upload) {
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color #F284A9
}
.avatar-uploader-icon {
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center
}
.preview {
  width 400px
  height auto
  display block
  margin-top 20px
}
.preview {
  display flex
  .img {
    margin-left 20px
  }
}
</style>
