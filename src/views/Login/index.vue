<template>
  <div class="login">
    <div class="login-form">
      <div class="avatar-box">
        <img src="https://image-cdn.bloniea.ml/images1/avatar.png" alt="" />
      </div>
      <h3 class="title">博客后台管理系统</h3>
      <el-form
        ref="loginForm"
        :model="loginData"
        label-width="80px"
        :rules="loginRules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="loginData.user"
            @keyup.enter="onSubmit(loginForm)"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginData.password"
            type="password"
            @keyup.enter="onSubmit(loginForm)"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证" prop="code">
          <div class="s-identify-box">
            <div style="display: none">
              <el-input v-model="loginData.code"></el-input>
            </div>

            <sliderIdentify
              :codeStatus="loginData.code"
              @status="status"
            ></sliderIdentify>
            <!-- <el-input v-model="loginData.code" @keyup.enter="onSubmit(loginForm)"></el-input> -->
            <!-- <SIdentify :identifyCode="code" @click="identifyCode"></SIdentify> -->
          </div>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button
            type="primary"
            :loading="loginLoad"
            @click="onSubmit(loginForm)"
            >登陆</el-button
          >
          <el-button @click="reset(loginForm)">重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SIdentify from '@/components/SIdentify/index.vue'
import sliderIdentify from '@/components/sliderIdentify/sliderIdentify.vue'
import { login } from '@/comm/fetch'

const router = useRouter()

const validateCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请先完成验证1'))
  } else {
    callback()
  }
}
// 变量
const loginRules = {
  user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ validator: validateCode, trigger: 'change' }],
}

const code = ref('')
const identifyCode = () => {
  const str = '1234567890abcdefghijklmnopqrstuvwsyz'
  let c = ''
  for (let i = 0; i < 4; i++) {
    let num = Math.floor(Math.random() * (str.length - 1))
    c += str[num]
  }
  code.value = c
}
// 初始化验证码
// identifyCode()
// 登录信息
const loginData = reactive({
  user: 'test',
  password: '123456',
  code: false,
})
const status = (val) => {
  loginData.code = val
}
// 弹窗

const loginForm = ref()
const loginLoad = ref(false)
// 登陆
const onSubmit = (loginForm) => {
  // loginData.code = false
  // return
  loginForm.validate(async (valid) => {
    if (valid) {
      loginLoad.value = true
      const reqData = { user: loginData.user, password: loginData.password }
      const res = await login(reqData)
      if (res.ok && res.status === 200) {
        loginLoad.value = false
        ElMessage.success('登录成功')
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify(res.data.data.user)
        )
        window.localStorage.setItem('token', res.data.data.token)
        window.localStorage.setItem(
          'refresh_token',
          res.data.data.refresh_token
        )
        router.push({ name: 'Welcome' })
      } else {
        loginLoad.value = false
        ElMessage.error('用户名或密码错误')
      }
    }
  })
}
// 重置表单
const reset = (loginForm) => {
  loginForm.resetFields()
}
</script>

<style lang="stylus" scoped>
.login {
  width 100%
  height 100%
  .login-form {
    width 400px
    height 440px
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
    .s-identify-box {
      display flex
      justify-content space-between
      .el-input {
        width 40%
      }
    }
    .login-btn {
      display flex
      justify-content flex-end
    }
  }
}
</style>
