<template>
  <div class="add-article">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'aboutArticle' }"
        >我的文章</el-breadcrumb-item
      >
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="addform"
        :model="article.addData"
        label-width="80px"
        :rules="article.rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.addData.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <!-- 添加一个不显示的input已显示 v-md-editor 的校验信息-->
          <el-input
            v-model="article.addData.content"
            style="display: none"
            class="seat"
          ></el-input>
          <v-md-editor
            v-model="article.addData.content"
            height="400px"
          ></v-md-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(addform)"
            :loading="btnLoading"
            >立即创建</el-button
          >
          <el-button @click="addform.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { addAboutArticle } from '@/comm/fetch'
import { useRouter } from 'vue-router'
const addform = ref()
const btnLoading = ref(false)
const router = useRouter()
const article = reactive({
  addData: {
    title: '',
    content: '',
  },
  rules: {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'change' }],
  },
})
// 提交
const submitForm = async (form) => {
  if (!form) return
  form.validate(async (valid) => {
    if (valid) {
      btnLoading.value = true
      const res = await addAboutArticle(article.addData)
      if (res.status == 200 && res.ok) {
        btnLoading.value = false
        router.push({ name: 'aboutArticle' })
        ElMessage.success('添加成功')
      }
    }
  })
}
</script>

<style lang="stylus" scoped>
.add-article {
  .seat {
    display none
  }
}
</style>
