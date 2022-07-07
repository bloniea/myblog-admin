<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        v-model="requestData.keyword"
        placeholder="请输入内容"
        class="input-with-select"
        @keyup.enter="getUsers"
        @blur="blurGet(requestData.keyword)"
        clearable
        @clear="getUsers"
      >
        <template #append>
          <el-button :icon="Search" @click="getUsers"></el-button>
        </template>
      </el-input>
      <el-button type="primary" class="add" @click="addUserView"
        >添加用户</el-button
      >

      <el-table
        :data="users.userData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="user" label="用户"> </el-table-column>
        <el-table-column prop="role_name" label="角色">
          <template #default="scope">
            {{ scope.row.role.length ? scope.row.role[0].name : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="changeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <template #default="scope">
            {{ stampToTime(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              @click="showEditView(scope.row)"
              size="small"
              >修改</el-button
            >

            <el-button
              type="danger"
              :icon="Delete"
              @click="delUser(scope.row._id)"
              size="small"
              >删除</el-button
            >
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
    <el-dialog title="修改用户" v-model="editUserVisible" width="30%">
      <el-form
        ref="editform"
        :model="editData"
        label-width="80px"
        :rules="editRoles"
        v-loading="btnLoading.edit"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="editData.user"
            @keyup.enter="updateUser"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="editData.password"
            @keyup.enter="updateUser"
            type="password"
            placeholder="******"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-switch v-model="editData.status"></el-switch>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-select v-model="editData.role_id" placeholder="请选择">
            <el-option
              v-for="item in users.roles"
              :key="item._id"
              :label="item.name"
              :value="item._id"
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
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      v-model="addUserVisible"
      width="30%"
      @close="closeAddUserVisible"
    >
      <el-form
        ref="addform"
        :model="addData"
        label-width="80px"
        :rules="addRoles"
        v-loading="btnLoading.add"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="addData.user" @keyup.enter="addUser"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addData.password"
            type="password"
            @keyup.enter="addUser"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <!-- <el-input v-model="editData.status"></el-input> -->
          <el-select v-model="addData.role_id" placeholder="请选择">
            <el-option
              v-for="item in users.roles"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAddUserVisible">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
            :loading="btnLoading.btn"
            :disabled="btnLoading.add"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, ref } from 'vue'
import { stampToTime, exisets } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import {
  getUsersApi,
  getRolesApi,
  addUserApi,
  delUserApi,
  updateUserApi,
} from '@/comm/fetch'
// import { Eleme } from 'element-plus/icons-vue'

const loading = ref(true)
// 属性
const users = reactive({
  userData: [], // 用户列表
  total: 0, // 总数
  pagesizes: [1, 5, 10, 20], // 可选每页返回数量
  id: '',
  roles: '',
})
const btnLoading = reactive({
  add: false,
  edit: false,
  btn: false,
})
const { proxy } = getCurrentInstance()
const validateUser = (rule, value, callback) => {
  if (!/^[a-z]+/i.test(value)) {
    callback(new Error('用户名必须英文开头'))
  } else if (!/[a-z0-9]+$/i.test(value)) {
    callback(new Error('用户名只能包含英文和数字'))
  } else {
    callback()
  }
}
const editRoles = reactive({
  user: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
    { validator: validateUser, trigger: 'blur' },
  ],
  password: [
    // { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' },
  ],
  role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
})
const addRoles = reactive({
  user: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
    { validator: validateUser, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在6 到 16 个字符', trigger: 'blur' },
  ],
  role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
})
// 获取用户列表
const requestData = reactive({
  keyword: '',
  pagesize: 10,
  pagenum: 1,
})
const getUsers = async () => {
  loading.value = true
  const res = await getUsersApi(requestData)
  if (res.status === 200 && res.ok) {
    loading.value = false
    users.userData = res.data.data
    users.total = res.data.total
  }
}
getUsers()

// 改变用户状态
const changeSwitch = async (user) => {
  const data = {
    role_id: user.role_id,
    user: user.user,
    status: user.status,
  }
  const res = await updateUserApi(user._id, data)
  if (res.ok && res.status === 200) {
    ElMessage.success('修改成功')
    getUsers()
  } else {
    ElMessage.error(res.data.message)
  }
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
const delUser = async (id) => {
  // btnLoading.del = true

  ElMessageBox.confirm('确认删除用户？', '警告', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(async () => {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '正在删除中',
        type: 'warning',
        duration: 0,
      })

      // const { data: res } = await proxy.$axios.delete(`/adminApi/users/${id}`)
      // if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
      const res = await delUserApi(id)
      if (res.ok && res.status === 200) {
        btnLoading.del = false
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        getUsers()
      } else {
        ElMessage.closeAll()
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage.closeAll()
      // ElMessage.error('您取消了操作')
    })
}
// 显示修改对话框
const editUserVisible = ref(false)
const editData = reactive({
  user: '',
  password: null,
  role_id: 0,
  status: true,
})
const showEditView = async (data) => {
  btnLoading.edit = true
  const res = await getRolesApi()
  if (res.ok && res.status === 200) {
    users.roles = res.data.data
    btnLoading.edit = false
  }
  editUserVisible.value = true
  users.id = data._id
  editData.role_id = data.role_id
  editData.role_id = !(await exisets(editData.role_id, users.roles))
    ? ''
    : data.role_id
  editData.user = data.user
  editData.status = data.status
}
// 修改用户
const updateUser = () => {
  proxy.$refs.editform.validate(async (vaild) => {
    if (vaild) {
      btnLoading.btn = true
      const res = await updateUserApi(users.id, editData)
      if (res.ok && res.status === 200) {
        proxy.$refs.editform.resetFields()
        ElMessage.success('修改成功')
        getUsers()
        btnLoading.btn = false
        editUserVisible.value = false
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })
}
// 显示添加用户对话框
const addUserVisible = ref(false)
const addData = reactive({
  user: '',
  password: '',
  role_id: '',
})
const addUserView = async () => {
  addUserVisible.value = true
  btnLoading.add = true
  // const { data: res } = await proxy.$axios.get('/adminApi/roles')
  const res = await getRolesApi()
  if (res.ok && res.status === 200) {
    users.roles = res.data.data
    btnLoading.add = false
  }
}
// 添加用户
const addUser = () => {
  proxy.$refs.addform.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      // console.log(addData)
      const res = await addUserApi(addData)
      if (res.ok && res.status === 200) {
        proxy.$refs.addform.resetFields()
        ElMessage.success('添加成功')
        addUserVisible.value = false
        btnLoading.btn = false
        getUsers()
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })
}

const closeAddUserVisible = () => {
  addUserVisible.value = false
  proxy.$refs.addform.resetFields()
}

// 如果搜索框为空并且失去焦点则返回全部数据
const blurGet = (val) => {
  if (val == '') {
    getUsers()
  }
}
</script>

<style lang="stylus" scoped></style>
