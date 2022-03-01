<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="roleRequestData.query"
      >

        <template #append>
          <el-button
            :icon="Search"
            @click="searchRole"
          ></el-button>
        </template>
      </el-input>
      <el-button
        type="primary"
        class="add"
        @click="addRoleView"
      >添加角色</el-button>

      <el-table
        :data="roles.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
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
              @click="delRole(scope.row.id)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="roleRequestData.pagenum"
        :page-sizes="roles.pagesizes"
        :page-size="roleRequestData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roles.total"
      >
      </el-pagination>

    </el-card>
    <!-- -------------------------------------------------------------------------------- -->
    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      v-model="addVisible"
      width="30%"
    >
      <el-form
        ref="addFrom"
        :model="addData"
        label-width="80px"
        :rules="roleRules"
      >
        <el-form-item
          label="角色"
          prop="role_name"
        >
          <el-input v-model="addData.role_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button
            @click="addRole"
            type="primary"
            :loading="btnLoading.btn"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改角色 -->
    <el-dialog
      title="添加角色"
      v-model="editVisible"
      width="50%"
    >
      <el-form
        ref="editFrom"
        :model="editData"
        label-width="80px"
        :rules="roleRules"
        v-loading="btnLoading.edit"
      >
        <el-form-item
          label="角色"
          prop="role_name"
        >
          <el-input v-model="editData.role_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-tree
            :data="editrole.list"
            show-checkbox
            node-key="id"
            :default-checked-keys="editrole.defaultCheckedkeys"
            :props="editrole.treeProps"
            @check="checkChange"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button
            @click="submiteditRole"
            type="primary"
            :loading="btnLoading.btn"
            :disabled="btnLoading.edit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'

const loading = ref(true)
// 获取当前组件实例
const { proxy } = getCurrentInstance()
// 获取角色列表
const roleRequestData = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10
})
const btnLoading = reactive({
  edit: false,
  btn: false
})
const roles = reactive({
  list: [],
  total: 0,
  pagesizes: [5, 10, 15, 20]
})
const getRoles = async () => {
  loading.value = true
  const { data: res } = await proxy.$axios.get('/adminApi/roles', { params: roleRequestData })
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  roles.total = res.data.total
  roles.list = res.data.data
  loading.value = false
}
// 执行
getRoles()

// 显示添加角色对话框
const addVisible = ref(false)
const addRoleView = () => {
  addVisible.value = true
}
// 添加角色
const roleRules = reactive({
  role_name: [
    { required: true, message: '请输入角色名', trigger: 'blur' },
    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
  ]
})
const addData = reactive({
  role_name: ''
})
const addRole = () => {
  proxy.$refs.addFrom.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await proxy.$axios.post('/adminApi/roles', addData)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      ElMessage.success(res.meta.msg)
      addVisible.value = false
      btnLoading.btn = false
      getRoles()
    }
  })
}
// 删除角色
const delRole = async (id) => {
  ElMessageBox.confirm(
    '确认删除角色？',
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
      const { data: res } = await proxy.$axios.delete(`/adminApi/roles/${id}`)
      if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
      ElMessage.closeAll()
      ElMessage.success(res.meta.msg)
      getRoles()
    })
    .catch(() => {
      ElMessage.closeAll()
      ElMessage.error('您取消了操作')
    })
}
// 搜索角色
const searchRole = () => {
  getRoles()
}
// 分页
// 改变每页条数
const pageSizeChange = (size) => {
  roleRequestData.pagesize = size
  getRoles()
}
// 改变页码
const pageCurrentChange = (p) => {
  roleRequestData.pagenum = p
  getRoles()
}
// 显示修改对话框
const editVisible = ref(false)
const editData = reactive({})
const editrole = reactive({
  list: [],
  roleId: 0,
  treeProps: {
    label: 'per_name',
    children: 'children'
  },
  defaultCheckedkeys: []
})
const showEditView = async (data) => {
  editVisible.value = true
  btnLoading.edit = true
  editrole.defaultCheckedkeys = []
  editrole.roleId = data.id
  editData.role_name = data.role_name
  editData.per_ids = data.per_ids
  const { data: res } = await proxy.$axios.get('/adminApi/rights')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  editrole.list = res.data

  // 所有子节点
  const childrenNode = formatChildren(res.data, [])
  // 选中子节点
  const perids = data.per_ids ? data.per_ids.split(',') : []
  // 设置默认选中的节点
  editrole.defaultCheckedkeys = checknode(childrenNode, perids)
  btnLoading.edit = false
}
// 获取选中节点
const checkChange = (data, node) => {
  const nodes = [...node.checkedKeys, ...node.halfCheckedKeys]
  editData.per_ids = nodes.toString()
}
// 所有子节点
const formatChildren = (arrs, arr2) => {
  arrs.forEach(arr => {
    if (arr.children) {
      formatChildren(arr.children, arr2)
    } else {
      arr2.push(arr.id)
    }
  })
  return arr2
}
// 获取默认选中的节点
const checknode = (allNodes, checkids) => {
  const newIds = []
  allNodes.forEach(node => {
    checkids.forEach(id => {
      if (node === parseInt(id)) {
        newIds.push(id)
      }
    })
  })
  return newIds
}
// 提交修改
const submiteditRole = () => {
  proxy.$refs.editFrom.validate(async vaild => {
    if (vaild) {
      btnLoading.btn = true
      const { data: res } = await proxy.$axios.put(`/adminApi/roles/${editrole.roleId}`, editData)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      ElMessage.success(res.meta.msg)
      getRoles()
      editVisible.value = false
      btnLoading.btn = false
    }
  })
}

</script>

<style scoped>

</style>
