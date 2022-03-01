<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        v-model="requestData.query"
        placeholder="请输入内容"
        class="input-with-select"
      >

        <template #append>
          <el-button
            :icon="Search"
            @click="searchUser"
          ></el-button>
        </template>
      </el-input>
      <el-button
        type="primary"
        class="add"
        @click="addUserView"
      >添加用户</el-button>

      <el-table
        :data="users.userData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="changeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
        >
          <template #default="scope">
            {{stampToTime(scope.row.created_at)}}

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">

            <el-button
              type="primary"
              :icon="Edit"
              @click="showEditView(scope.row)"
              size="small"
            >修改</el-button>

            <el-button
              type="danger"
              :icon="Delete"
              @click="delUser(scope.row.id)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="requestData.pagenum"
        :page-sizes="users.pagesizes"
        :page-size="requestData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.total"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框区域 -->
    <!-- ------------------------------------------------------------------------------------------------------------ -->
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      v-model="editUserVisible"
      width="30%"
    >
      <el-form
        ref="editform"
        :model="editData"
        label-width="80px"
        :rules="editRoles"
        v-loading="btnLoading.edit"
      >
        <el-form-item
          label="用户名"
          prop="user"
        >
          <el-input v-model="editData.user"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model.trim="editData.password"
            type="password"
            placeholder="******"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-switch v-model="editData.status"></el-switch>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role_id"
        >
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-select
            v-model="editData.role_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in users.roles"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="updateUser"
            :loading="btnLoading.btn"
            :disabled="btnLoading.edit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      v-model="addUserVisible"
      width="30%"
    >
      <el-form
        ref="addform"
        :model="addData"
        label-width="80px"
        :rules="addRoles"
        v-loading="btnLoading.add"
      >
        <el-form-item
          label="用户名"
          prop="user"
        >
          <el-input v-model="addData.user"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addData.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role_id"
        >
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-select
            v-model="addData.role_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in users.roles"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
            :loading="btnLoading.btn"
            :disabled="btnLoading.add"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, ref } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
// import { Eleme } from 'element-plus/icons-vue'

const loading = ref(true)
// 属性
const users = reactive({
  userData: [], // 用户列表
  total: 0, // 总数
  pagesizes: [10, 15, 20, 25], // 可选每页返回数量
  id: '',
  roles: ''
})
const btnLoading = reactive({
  add: false,
  edit: false,
  btn: false
})
const { proxy } = getCurrentInstance()
const editRoles = reactive({
  user: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    // { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' }
  ],
  role_id: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ]
})
const addRoles = reactive({
  user: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' }
  ],
  role_id: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ]
})
// 获取用户列表
const requestData = reactive({
  query: '',
  pagesize: 10,
  pagenum: 1
})
const getUsers = async () => {
  loading.value = true
  const { data: res } = await proxy.$axios.get('/adminApi/users', { params: requestData })
  if (res.meta.status !== 200) return ElMessage.error(res.mata.msg)
  loading.value = false
  users.userData = res.data.data
  users.total = res.data.total
}
getUsers()
// 搜索用户
const searchUser = () => {
  getUsers()
}
// 改变用户状态
const changeSwitch = async (user) => {
  const data = {
    role_id: user.role_id,
    user: user.user,
    status: user.status
  }
  // console.log(data)
  const { data: res } = await proxy.$axios.put(`/adminApi/users/${user.id}`, data)
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
}
// 每页条数发生变化
const pageSizeChange = (size) => {
  requestData.pagesize = size
  getUsers()
}
//  页数改变
const pageCurrentChange = (page) => {
  requestData.pagenum = page
  getUsers()
}
// 删除用户
const delUser = async ($id) => {
  // btnLoading.del = true

  ElMessageBox.confirm(
    '确认删除用户？',
    '警告',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )
    .then(async () => {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '正在删除中',
        type: 'warning',
        duration: 0
      })

      const { data: res } = await proxy.$axios.delete(`/adminApi/users/${$id}`)
      if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)

      btnLoading.del = false
      ElMessage.closeAll()
      ElMessage.success(res.meta.msg)
      getUsers()
    })
    .catch(() => {
      ElMessage.closeAll()
      ElMessage.error('您取消了操作')
    })
}
// 显示修改对话框
const editUserVisible = ref(false)
const editData = reactive({
  user: '',
  password: null,
  role_id: 0,
  status: true
})
const showEditView = async (data) => {
  editUserVisible.value = true
  btnLoading.edit = true
  users.id = data.id
  editData.role_id = data.role_id
  editData.user = data.user
  editData.status = data.status
  const { data: res } = await proxy.$axios.get('/adminApi/roles')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  users.roles = res.data
  btnLoading.edit = false
}
// 修改用户
const updateUser = () => {
  proxy.$refs.editform.validate(async vaild => {
    if (vaild) {
      btnLoading.btn = true
      const { data: res } = await proxy.$axios.put(`/adminApi/users/${users.id}`, editData)
      if (res.meta.status !== 200) {

        return ElMessage.error(res.meta.msg)
      }
      proxy.$refs.addform.resetFields()
      ElMessage.success(res.meta.msg)
      getUsers()
      btnLoading.btn = false
      editUserVisible.value = false
    }
  })
}
// 显示添加用户对话框
const addUserVisible = ref(false)
const addData = reactive({
  user: '',
  password: '',
  role_id: ''
})
const addUserView = async () => {
  addUserVisible.value = true
  btnLoading.add = true
  const { data: res } = await proxy.$axios.get('/adminApi/roles')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)

  users.roles = res.data
  btnLoading.add = false
}
// 添加用户
const addUser = () => {
  proxy.$refs.addform.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await proxy.$axios.post('/adminApi/users', addData)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      proxy.$refs.addform.resetFields()
      ElMessage.success(res.meta.msg)
      addUserVisible.value = false
      btnLoading.btn = false
      getUsers()
    }
  })
}






</script>

<style lang="stylus" scoped></style>
