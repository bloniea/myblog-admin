<template>
  <div class="add-anime">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>娱乐管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Anime' }">动漫列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加动漫</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form
        ref="addform"
        :model="anime.addData"
        label-width="80px"
        :rules="anime.rules"
      >
        <el-form-item label="标题" prop="name">
          <el-input v-model="anime.addData.name" placeholder="标题"> </el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img_url">
          <el-input
            v-model="anime.addData.img_url"
            placeholder="htts://example1/1.png"
          ></el-input>
          <img
            v-if="anime.addData.img_url"
            :src="anime.addData.img_url"
            class="preview"
          />
        </el-form-item>
        <el-form-item label="简介" prop="generalize">
          <!-- 添加一个不显示的input已显示 v-md-editor 的校验信息-->
          <el-input v-model="anime.addData.generalize" class="seat"></el-input>
          <v-md-editor
            v-model="anime.addData.generalize"
            height="400px"
          ></v-md-editor>
        </el-form-item>
        <!-- 集数 -字幕 -->
        <el-form-item label="内容" prop="content">
          <div class="tags">
            <div
              class="tag"
              v-for="(tag, index) in anime.addData.content"
              :key="index"
            >
              <div class="tag-list">
                <span>第{{ index + 1 }}集:</span>
                <el-input v-model="anime.addData.content[index].title">
                </el-input>
              </div>

              <div class="tag-list">
                <span>视频:</span>
                <el-input
                  v-model="anime.addData.content[index].episode"
                  type="textarea"
                  autosize="true"
                >
                </el-input>
              </div>

              <div class="tag-list">
                <span>字幕ass:</span>
                <el-input
                  v-model="anime.addData.content[index].ass"
                  type="textarea"
                  autosize="true"
                >
                </el-input>
              </div>
              <div class="tag-list">
                <span>字幕vtt:</span>
                <el-input
                  v-model="anime.addData.content[index].vtt"
                  type="textarea"
                  autosize="true"
                >
                </el-input>
              </div>
              <el-button
                :icon="Delete"
                class="delete"
                @click="handleClose(tag)"
              ></el-button>
            </div>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              class="button-new-tag ml-1"
              size="small"
              @click="showInput"
            >
              添加集数
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="字幕字体" prop="fonts">
          <el-input
            v-model="anime.addData.fonts"
            type="textarea"
            placeholder="https://example1.com/1.ttf,https://example1.com/2.ttf"
            autosize="true"
          >
          </el-input>
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
import { addAnime } from '@/comm/fetch'
import { useRouter } from 'vue-router'
import { nextTick } from '@vue/runtime-core'
import { Delete } from '@element-plus/icons-vue'
const addform = ref()
const btnLoading = ref(false)
const router = useRouter()
const anime = reactive({
  addData: {
    name: '',
    generalize: '',
    content: [],
    img_url: '',
    fonts: '',
  },
  rules: {
    name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    generalize: [{ required: true, message: '请输入内容', trigger: 'change' }],
    content: [{ required: true, message: '请输入集数', trigger: 'blur' }],
    img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
  },
})
// 添加集数
const InputRef = ref(null)
const inputValue = ref('')
const inputVisible = ref(false)
// 点击添加显示文本框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.focus()
  })
}
// 删除tag
const handleClose = (tag) => {
  anime.addData.content.splice(anime.addData.content.indexOf(tag), 1)
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
    anime.addData.content.push(obj)
  }
  inputVisible.value = false
  inputValue.value = ''
}
// 提交
const submitForm = async (form) => {
  if (!form) return
  form.validate(async (valid) => {
    if (valid) {
      btnLoading.value = true
      const res = await addAnime(anime.addData)
      if (res.status == 200 && res.ok) {
        router.push({ name: 'Anime' })
        ElMessage.success('添加成功')
      }
      btnLoading.value = false
    }
  })
}
</script>

<style lang="stylus" scoped>
@import './AddAnime.styl'
</style>
