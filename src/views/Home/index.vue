<template>
  <div
    class="home"
    v-loading="loading"
  >
    <el-container>
      <el-header>
        <h3 @click="toHome">博客后台管理系统</h3>
        <div class="logout">
          <span class="user">{{page.user}} <span
              class="edit-user"
              @click="showEditUser"
            >修改</span> </span>
          <el-button @click="logout">退出</el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            unique-opened
          >
            <el-sub-menu
              :index="item.path"
              v-for="item in page.list"
              :key="item.id"
            >
              <template #title>
                <i :class="'iconfont '+item.iconfont "></i>
                <span>{{item.menu_name}}</span>
              </template>
              <el-menu-item
                v-for="
                children
                in
                item.children"
                :key="children.id"
                :index="children.path"
              >
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{children.menu_name}}</span>
                </template>
              </el-menu-item>

            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <div class="copyright">© {{year}} Bloniea. All rights reserved.</div>

          </el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-dialog
      v-model="userInfo.editUserVisible"
      title="修改个人信息"
    >
      <el-form
        ref="formRef"
        :model="userInfo.user"
        label-width="120px"
        :rules="userInfo.rules"
      >
        <el-form-item
          label="用户名"
          prop="user"
        >
          <el-input v-model="userInfo.user.user"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model.trim="userInfo.user.password"
            placeholder="******"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userInfo.editUserVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="editUser"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const loading = ref(false)
// 属性：
const page = reactive({
  list: [
    { id: 0, iconfont: '', menu_name: '用户管理', path: 'user', children: [{ id: 10, menu_name: '用户列表', path: '/users' }] },
    { id: 1, iconfont: '', menu_name: '角色管理', path: 'roles', children: [{ id: 11, menu_name: '角色列表', path: '/roles' }] },
    { id: 2, iconfont: '', menu_name: '分类管理', path: 'categories', children: [{ id: 12, menu_name: '分类列表', path: '/categories' }] },
    { id: 3, iconfont: '', menu_name: '标签管理', path: 'labels', children: [{ id: 13, menu_name: '标签列表', path: '/labels' }] },
    { id: 4, iconfont: '', menu_name: '文章管理', path: 'articles', children: [{ id: 13, menu_name: '文章列表', path: '/articles' }] },
    { id: 5, iconfont: '', menu_name: '友链管理', path: 'friends', children: [{ id: 14, menu_name: '友链列表', path: '/friends' }] }
  ],
  user: '',
  id: ''
})

// 方法：
// 获取菜单列表
// const getMenus = async () => {
// loading.value = true
// const { data: res } = await proxy.$axios.get('/adminApi/menu')
// if (res.meta.status !== 200) return proxy.$message.error('获取失败')
// page.list = res.data
// loading.value = false
// }
// 获取当前登陆用户名
const getUser = () => {
  const userInfo = window.sessionStorage.getItem('userInfo')
  if (userInfo) {
    page.user = JSON.parse(userInfo).user
    page.id = JSON.parse(userInfo).id
  }
}
// 登出
const logout = () => {
  window.sessionStorage.clear()
  proxy.$router.push({ name: 'Login' })
}
const defaultActive = computed(() => proxy.$route.path)
// 执行方法：
onMounted(() => {
  // getMenus()
  getUser()
})

// 修改用户信息对象
const userInfo = reactive({
  editUserVisible: false,
  user: {
    id: '',
    user: '',
    password: null
  },
  rules: {
    user: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
    ],
    password: [
      // { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' }
    ]
  }

})
// 显示修改用户表单
const showEditUser = () => {
  userInfo.editUserVisible = true
  userInfo.user.user = page.user
}

const editUser = async () => {
  const { data: res } = await proxy.$axios.put('/adminApi/editUserInfo/' + page.id, userInfo.user)
  if (res.meta.status !== 200) {
    return proxy.$message.error(res.meta.msg)
  } else {
    userInfo.editUserVisible = false
    window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
    getUser()
    return proxy.$message.success('修改成功')
  }
}
// 返回首页
const router = useRouter()
const toHome = () => {
  router.push({ name: 'Home' })
}
const year = computed(() => {
  const year = ref(0)
  const nowYear = new Date().getFullYear()
  return year.value = nowYear > 2022 ? 2022 + '-' + nowYear : 2022
})
</script>

<style lang='stylus' scoped>
.home, .el-container {
  height 100%
  .el-header {
    background rgba(232, 230, 230, 0.5)
    display flex
    justify-content space-between
    .user {
      color #4e4e4e
      cursor pointer
      .edit-user {
        color #888888
        &:hover {
          color red
        }
      }
    }
    h3 {
      color #4e4e4e
      cursor pointer
    }
    .el-button {
      margin 10px
    }
  }
  .el-aside {
    .iconfont {
      margin-right 10px
    }
    .el-menu {
      background rgba(232, 230, 230, 0.5)
    }
  }
  .el-main {
    // background #eee
  }
  .el-footer {
    background rgba(240, 196, 211, 0.5)
    .copyright {
      width 100%
      text-align center
      line-height 60px
      height 100%
    }
  }
  .el-container {
    height 100%
  }
}
.el-aside >>> .el-menu {
  height 100%
}
</style>
