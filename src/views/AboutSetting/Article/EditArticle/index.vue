<template>
  <div class="edit-article">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'aboutArticle' }"
        >我的文章</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ name: 'aboutArticle' }"
        >修改文章</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="editform"
        :model="article.editData"
        label-width="80px"
        :rules="article.rules"
        v-loading="loading"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.editData.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <!-- 添加一个不显示的input已显示 v-md-editor 的校验信息-->
          <el-input v-model="article.editData.content" class="seat"></el-input>
          <v-md-editor
            v-model="article.editData.content"
            height="400px"
          ></v-md-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(editform)"
            :loading="btnLoading"
            >立即修改</el-button
          >
          <el-button @click="editform.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { getAboutArticle } from '@/comm/fetch'
import { useRouter, useRoute } from 'vue-router'
import { editAboutArticle } from '@/comm/fetch'
import { ElMessage } from 'element-plus'
const editform = ref()
const btnLoading = ref(false)
const loading = ref(true)
const router = useRouter()
const route = useRoute()
const article = reactive({
  editData: {
    title: '',
    content: '',
  },
  rules: {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'change' }],
  },
})

// 获取需要修改的文章内容
const getEditArticle = async () => {
  const id = route.query.id
  const res = await getAboutArticle(id)

  if (res.status == 200 && res.ok) {
    article.editData.title = res.data.data.title
    article.editData.content = res.data.data.content
    loading.value = false
  } else {
    ElMessage.error('网络超时，请稍后再试')
  }
}
getEditArticle()
// 提交
const submitForm = async (form) => {
  if (!form) return
  form.validate(async (valid) => {
    if (valid) {
      btnLoading.value = true
      const id = route.query.id
      const res = await editAboutArticle(id, article.editData)
      if (res.status == 200 && res.ok) {
        btnLoading.value = false
        router.push({ name: 'aboutArticle' })
        ElMessage.success('修改成功')
      }
    }
  })
}
</script>

<style lang="stylus" scoped>
.edit-article {
  .seat {
    display none
  }
}
</style>
