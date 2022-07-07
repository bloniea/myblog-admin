<template>
  <div class="home" v-loading="loading">
    <el-container>
      <el-header>
        <h3 @click="toHome">博客后台管理系统</h3>
        <div class="logout">
          <span class="user">
            {{ user.role.length ? user.role[0].name : '' }}-{{ user.user }}
            <span class="edit-user" @click="showEditUser">修改</span>
          </span>
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
            :collapse="isCollapse"
          >
            <div class="zhedie">
              <i
                class="iconfont icon-zhedie2"
                @click="handelCollapse"
                v-if="isCollapse"
              ></i>
              <i
                class="iconfont icon-zhedie1"
                @click="handelCollapse"
                v-else
              ></i>
            </div>
            <el-sub-menu
              :index="item.path"
              v-for="item in page.list"
              :key="item.id"
            >
              <template #title>
                <i :class="'iconfont ' + item.iconfont"></i>
                <span>{{ item.menu_name }}</span>
              </template>
              <el-menu-item
                v-for="children in item.children"
                :key="children.id"
                :index="children.path"
              >
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{ children.menu_name }}</span>
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
            <div class="copyright">
              © {{ year }} Bloniea. All rights reserved.
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-dialog v-model="userInfo.editUserVisible" title="修改个人信息">
      <el-form
        ref="formRef"
        :model="userInfo.user"
        label-width="120px"
        :rules="userInfo.rules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="userInfo.user.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="userInfo.user.password"
            placeholder="******"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userInfo.editUserVisible = false">取消</el-button>
          <el-button type="primary" @click="editUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { editMeApi, getUserApi } from '@/comm/fetch'
const route = useRoute()
const router = useRouter()
const loading = ref(false)
// 属性：
const page = reactive({
  list: [
    {
      id: 0,
      iconfont: 'icon-yonghu',
      menu_name: '用户管理',
      path: 'user',
      children: [{ id: 10, menu_name: '用户列表', path: '/users' }],
    },
    {
      id: 1,
      iconfont: 'icon-jiaosexiugai',
      menu_name: '角色管理',
      path: 'roles',
      children: [{ id: 11, menu_name: '角色列表', path: '/roles' }],
    },
    {
      id: 2,
      iconfont: 'icon-grouping',
      menu_name: '分类管理',
      path: 'categories',
      children: [{ id: 12, menu_name: '分类列表', path: '/categories' }],
    },
    {
      id: 3,
      iconfont: 'icon-24gl-tags2',
      menu_name: '标签管理',
      path: 'labels',
      children: [{ id: 13, menu_name: '标签列表', path: '/labels' }],
    },
    {
      id: 4,
      iconfont: 'icon-shejiwenzhang',
      menu_name: '文章管理',
      path: 'articles',
      children: [{ id: 13, menu_name: '文章列表', path: '/articles' }],
    },
    {
      id: 5,
      iconfont: 'icon-pengyou',
      menu_name: '友链管理',
      path: 'friends',
      children: [{ id: 14, menu_name: '友链列表', path: '/friends' }],
    },
    {
      id: 6,
      iconfont: 'icon-dongman',
      menu_name: '娱乐管理',
      path: 'recreation',
      children: [{ id: 16, menu_name: '动漫', path: '/recreation/anime' }],
    },
    {
      id: 6,
      iconfont: 'icon-wodeshezhi',
      menu_name: '关于管理',
      path: 'about-setting',
      children: [
        { id: 15, menu_name: '关于我的文章', path: '/about-setting/article' },
      ],
    },
  ],
})

const user = ref()
// 获取当前登陆用户名
const getUser = () => {
  const userInfo = window.localStorage.getItem('userInfo')
  if (userInfo) {
    user.value = JSON.parse(userInfo)
  }
}
getUser()
// 登出
const logout = () => {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('refresh_token')
  router.push({ name: 'Login' })
}
const defaultActive = computed(() => route.path)
// 折叠
const isCollapse = ref(false)

const handelCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// 修改用户信息对象
const userInfo = reactive({
  editUserVisible: false,
  user: {
    user: '',
    password: null,
  },
  rules: {
    user: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' },
    ],
    password: [
      // { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' },
    ],
  },
})
// 显示修改用户表单
const showEditUser = () => {
  userInfo.editUserVisible = true
  userInfo.user.user = user.value.user
}

const editUser = async () => {
  const res = await editMeApi(user.value._id, userInfo.user)
  if (res.ok && res.status === 200) {
    userInfo.editUserVisible = false
    ElMessage.success('修改成功')
    getEditedUser(user.value._id)
  } else {
    ElMessage.error(res.data.message)
  }
}
const getEditedUser = async (id) => {
  const res = await getUserApi(id)
  if (res.status === 200 && res.ok) {
    window.localStorage.setItem('userInfo', JSON.stringify(res.data.data[0]))
    getUser()
  }
}
// 返回首页

const toHome = () => {
  router.push({ name: 'Home' })
}
const year = computed(() => {
  const year = ref(0)
  const nowYear = new Date().getFullYear()
  return (year.value = nowYear > 2022 ? 2022 + '-' + nowYear : 2022)
})
</script>

<style lang="stylus" scoped>
.home {
  min-width 1220px
  height 100%
  .el-container {
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
      width auto
      .iconfont {
        margin-right 10px
      }
      .el-menu {
        background rgba(232, 230, 230, 0.5)
        .zhedie {
          height 20px
          position relative
          i {
            position absolute
            right -10px
            cursor pointer
            height 20px
            font-size 24px
            &:hover {
              color #f284a9
            }
          }
          .icon-zhedie2 {
            right 10px
          }
        }
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
  :deep(.el-aside .el-menu) {
    height 100%
  }
}
:deep(.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title) {
  color #f284a9
}
</style>
