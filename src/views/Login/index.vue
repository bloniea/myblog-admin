<template>
  <div class="login">
    <div class="login-form">
      <div class="avatar-box">
        <img
          src="https://cloud.bloniea.xyz/images/avatar.png"
          alt=""
        >
      </div>
      <h3 class="title">
        博客后台管理系统
      </h3>
      <el-form
        ref="loginForm"
        :model="loginData"
        label-width="80px"
        :rules="loginRules"
      >
        <el-form-item
          label="用户名"
          prop="user"
        >
          <el-input
            v-model="loginData.user"
            @keyup.enter="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >

          <el-input
            v-model="loginData.password"
            type="password"
            @keyup.enter="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">

          <el-button
            type="primary"
            :loading="loginLoad"
            @click="onSubmit"
          >登陆</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { onBeforeRouteLeave, useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
// import $axios from 'axios'
const router = useRouter()
const route = useRoute()
// 变量
const loginRules = {
  user: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}
const loginData = reactive({
  user: '',
  password: ''
})
const loginLoad = ref(false)

const { proxy: p } = getCurrentInstance()
// 登陆
const onSubmit = () => {


  p.$refs.loginForm.validate(async valid => {
    if (valid) {
      loginLoad.value = true
      const { data: res } = await p.$axios.post('/adminApi/login', loginData)
      loginLoad.value = false
      if (res.meta.status != 200) {
        return ElMessage.error(res.meta.msg)
      }
      ElMessage.success(res.meta.msg)
      window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      window.sessionStorage.setItem('token', res.data.token)
      router.push({ name: 'Welcome' })
    }
  })
}
// 重置表单
const reset = () => {
  this.$refs.loginForm.resetFields()
}


</script>

<style lang='stylus' scoped>
.login {
  width 100%
  height 100%
  .login-form {
    width 400px
    height 400px
    background #fff
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    box-sizing border-box
    padding 20px
    .avatar-box {
      width 120px
      height 120px
      margin 10px auto
      overflow hidden
      border-radius 50%
      img {
        width 100%
      }
    }
    .title {
      text-align center
    }
    .login-btn {
      display flex
      justify-content flex-end
    }
  }
}
</style>
