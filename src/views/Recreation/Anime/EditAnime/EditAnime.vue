<template>
  <div class="edit-anime">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>娱乐管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Anime' }">动漫列表</el-breadcrumb-item>
      <el-breadcrumb-item>修改动漫</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form ref="editForm" :model="anime.editData" label-width="80px" :rules="anime.rules" v-loading="loading">
        <el-form-item label="标题" prop="name">
          <el-input v-model="anime.editData.name" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img_url">
          <el-input v-model="anime.editData.img_url" placeholder="htts://example1/1.png"></el-input>
          <img v-if="anime.editData.img_url" :src="anime.editData.img_url" class="preview" />
        </el-form-item>
        <el-form-item label="内容" prop="generalize">
          <!-- 添加一个不显示的input已显示 v-md-editor 的校验信息-->
          <el-input v-model="anime.editData.generalize" class="seat"></el-input>
          <v-md-editor v-model="anime.editData.generalize" height="400px"></v-md-editor>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div class="tags">
            <div class="tag" v-for="(tag, index) in anime.editData.content" :key="index">
              <div class="tag-list">
                <span>第{{ index + 1 }}集:</span>
                <el-input v-model="anime.editData.content[index].title">
                </el-input>
              </div>

              <div class="tag-list">
                <span>视频:</span>
                <el-input v-model="anime.editData.content[index].episode" @blur="blurClose(tag)" type="textarea"
                  :autosize="true">
                </el-input>
              </div>

              <el-button :icon="Delete" class="delete" @click="handleClose(tag)"></el-button>
            </div>
            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
              @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              添加集数
            </el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(editForm)" :loading="btnLoading">立即修改</el-button>
          <el-button @click="editForm.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { getAnimeApi, editAnimeApi } from '@/comm/fetch'
import { useRoute, useRouter } from 'vue-router'
import { computed, nextTick } from '@vue/runtime-core'
import { Delete } from '@element-plus/icons-vue'
const editForm = ref()
const btnLoading = ref(false)
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const anime = reactive({
  editData: {
    name: '',
    generalize: '',
    content: [],
    img_url: '',
  },
  rules: {
    name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    generalize: [{ required: true, message: '请输入内容', trigger: 'change' }],
    content: [{ required: true, message: '请输入集数', trigger: 'blur' }],
    img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
  },
})
// 添加集数
const InputRef = ref()
const inputValue = ref('')
const inputVisible = ref(false)
// 点击添加显示文本框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
// 删除tag
const handleClose = (tag) => {
  anime.editData.content.splice(anime.editData.content.indexOf(tag), 1)
}
//失去焦点如果为空则删除该dom元素
const blurClose = (tag) => {
  if (tag == '') {
    handleClose(tag)
  }
}
// 添加方法
const handleInputConfirm = () => {
  if (inputValue.value) {
    const obj = { title: inputValue.value, episode: '', ass: '', vtt: '' }
    anime.editData.content.push(obj)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const getStrFonts = computed(() => {
  return anime.editData.fonts.toString()
})
// 获取需要修改的动漫信息
const getAnime = async () => {
  loading.value = true
  const id = route.query.id
  const res = await getAnimeApi(id)
  if (res.status == 200 && res.ok) {
    anime.editData = res.data.data
    anime.editData.generalize =
      String(res.data.data.generalize) == 'null' ? '' : res.data.data.generalize
    loading.value = false
  }
}
getAnime()
// 提交
const submitForm = async (form) => {
  if (!form) return
  form.validate(async (valid) => {
    if (valid) {
      btnLoading.value = true
      const res = await editAnimeApi(route.query.id, anime.editData)
      if (res.status == 200 && res.ok) {
        router.push({ name: 'Anime' })
        ElMessage.success('修改成功')
      } else {
        ElMessage.error(res.data.message)
      }
      btnLoading.value = false
    }
  })
}
</script>

<style lang="stylus" scoped>
@import './EditAnime.styl'
</style>
