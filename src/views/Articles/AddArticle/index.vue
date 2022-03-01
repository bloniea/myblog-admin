<template>
  <div class="addArticle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name:'Articles' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="Addform"
        :model="article.req"
        label-width="80px"
        :rules="article.rules"
        v-loading="loading"
      >

        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="article.req.title"></el-input>
        </el-form-item>
        <div class="category_label">
          <el-form-item
            label="分类"
            prop="category_id"
          >
            <el-select
              v-model="article.category_id"
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in article.categories"
                :key="item.id"
                :label="item.cat_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              v-model="article.label_ids"
              multiple
              placeholder="请选择标签"
            >
              <el-option
                v-for="item in article.labels"
                :key="item.id"
                :label="item.label_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <el-form-item
          label="图片来源"
          prop="img_source"
        >
          <el-input v-model="article.req.img_source"></el-input>
        </el-form-item>
        <el-form-item
          label="图片地址"
          prop="img_url"
        >
          <el-input v-model="article.req.img_url"></el-input>
          <img
            v-if="article.req.img_url"
            :src="article.req.img_url"
            class="preview"
          >
          <!-- <el-upload
            class="avatar-uploader"
            action="/adminApi/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :headers="headers"
            accept=".jpg,.png,.jpeg"
          >
            <img
              v-if="article.req.img_url"
              :src="article.req.img_url"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload> -->

        </el-form-item>

        <el-form-item
          label="内容"
          prop="content"
        >
          <v-md-editor
            v-model="article.req.content"
            height="400px"
          ></v-md-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('Addform')"
            :loading="btnLoading.btn"
          >立即创建</el-button>
          <el-button @click="resetForm('Addform')">重置</el-button>
          <el-button @click="resetForm('Addform')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const router = useRouter()
const btnLoading = reactive({
  btn: false
})
const article = reactive({
  req: {
    title: '',
    category_id: '',
    label_ids: '',
    img_url: '',
    content: '',
    img_source: ''
  },
  category_id: [],
  label_ids: [],
  categories: [],
  labels: [],
  rules: {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    category_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
    img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
    img_source: [{ required: true, message: '请输入图片来源', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
  }

})
const headers = reactive({
  Authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : ''
})
const { proxy: p } = getCurrentInstance()
// 获取分类
const getCategories = async () => {
  loading.value = true
  const { data: res } = await p.$axios.get('/adminApi/categories')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  article.categories = res.data
  loading.value = false
}
getCategories()
// 获取标签
const getLabels = async () => {
  loading.value = true
  const { data: res } = await p.$axios.get('/adminApi/labels')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  article.labels = res.data
  loading.value = false
}
getLabels()
// 上传图片成功回调

const handleImgSuccess = response => {
  if (response.meta.status !== 200) return ElMessage.error('上传出错')
  article.req.img_url = response.data.img_url
}
// 创建文章
const submitForm = form => {
  article.req.category_id = article.category_id.toString()
  article.req.label_ids = article.label_ids.toString()
  p.$refs[form].validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await p.$axios.post('/adminApi/articles', article.req)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      p.$refs[form].resetFields()
      ElMessage.success(res.meta.msg)
      btnLoading.btn = false
      router.push({ name: 'Articles' })
    }
  })
}


</script>

<style lang="stylus" scoped>
.category_label {
  display flex
  .el-form-item {
    width 30%
  }
}
.avatar-uploader >>> .el-upload {
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
}
.avatar-uploader>>>.el-upload:hover {
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
</style>
