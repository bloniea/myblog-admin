<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="roleRequestData.keyword"
        @keyup.enter="getRoles"
        @blur="blurGet(roleRequestData.keyword)"
        clearable
        @clear="getRoles"
      >
        <template #append>
          <el-button :icon="Search" @click="getRoles"></el-button>
        </template>
      </el-input>
      <el-button type="primary" class="add" @click="addRoleView"
        >添加角色</el-button
      >

      <el-table
        :data="roles.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="name" label="角色"> </el-table-column>
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
              @click="delRole(scope.row._id)"
              size="small"
              >删除</el-button
            >
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
      @close="closeAddVisible"
    >
      <el-form
        ref="addFrom"
        :model="addData"
        label-width="80px"
        :rules="roleRules"
        @submit.prevent
      >
        <el-form-item label="角色" prop="name">
          <el-input v-model="addData.name" @keyup.enter="addRole"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAddVisible">取 消</el-button>
          <el-button @click="addRole" type="primary" :loading="btnLoading.btn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改角色 -->
    <el-dialog
      title="修改角色"
      v-model="editVisible"
      width="50%"
      @close="editClose"
    >
      <el-form
        ref="editFrom"
        :model="editData"
        label-width="80px"
        :rules="roleRules"
        v-loading="btnLoading.edit"
        @submit.prevent
      >
        <el-form-item label="角色" prop="name">
          <el-input
            v-model="editData.name"
            @keyup.enter="submiteditRole"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-tree
            :data="editrole.list"
            show-checkbox
            node-key="per_name"
            :default-checked-keys="editrole.defaultCheckedkeys"
            :props="editrole.treeProps"
            @check="checkChange"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editClose">取 消</el-button>
          <el-button
            @click="submiteditRole"
            type="primary"
            :loading="btnLoading.btn"
            :disabled="btnLoading.edit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import {
  getRolesApi,
  delRoleApi,
  addRoleApi,
  getRightsApi,
  updateRoleApi,
} from '@/comm/fetch'
const loading = ref(true)
// 获取当前组件实例
const { proxy } = getCurrentInstance()
// 获取角色列表
const roleRequestData = reactive({
  keyword: '',
  pagenum: 1,
  pagesize: 10,
})
const btnLoading = reactive({
  edit: false,
  btn: false,
})
const roles = reactive({
  list: [],
  total: 0,
  pagesizes: [1, 5, 10, 20],
})
const getRoles = async () => {
  loading.value = true
  const res = await getRolesApi(roleRequestData)
  if (res.ok && res.status === 200) {
    roles.total = res.data.total
    roles.list = res.data.data
    loading.value = false
  }
}
// 执行
getRoles()
// 如果搜索框为空并且失去焦点则返回全部数据
const blurGet = (val) => {
  if (val == '') {
    getRoles()
  }
}
// 显示添加角色对话框
const addVisible = ref(false)
const addRoleView = () => {
  addVisible.value = true
}
// 添加角色
const roleRules = reactive({
  name: [
    { required: true, message: '请输入角色名', trigger: 'blur' },
    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
  ],
})
const addData = reactive({
  name: '',
})
const addRole = () => {
  proxy.$refs.addFrom.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      const res = await addRoleApi(addData)
      if (res.ok && res.status === 200) {
        ElMessage.success('添加成功')
        proxy.$refs.addFrom.resetFields()
        addVisible.value = false
        btnLoading.btn = false
        getRoles()
      } else {
        btnLoading.btn = false
        return ElMessage.error(res.data.message)
      }
    }
  })
}
const closeAddVisible = () => {
  proxy.$refs.addFrom.resetFields()
  addVisible.value = false
}
// 删除角色
const delRole = async (id) => {
  ElMessageBox.confirm('确认删除角色？', '警告', {
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
      const res = await delRoleApi(id)
      if (res.ok && res.status === 200) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        getRoles()
      } else {
        ElMessage.closeAll()
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage.closeAll()
    })
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
    label: 'name',
    children: 'children',
  },
  defaultCheckedkeys: [],
})
const editClose = () => {
  editVisible.value = false
}
const showEditView = async (data) => {
  // console.log(data)
  editVisible.value = true

  btnLoading.edit = true
  editrole.defaultCheckedkeys = []
  editrole.roleId = data._id
  editData.name = data.name
  editData.pers = data.pers
  // const { data: res } = await proxy.$axios.get('/adminApi/rights')
  const res = await getRightsApi()
  if (res.status !== 200) return ElMessage.error(res.data.message)
  editrole.list = res.data.data

  // 所有子节点
  const childrenNode = formatChildren(res.data.data, [])
  // 选中子节点

  const perids = data.pers ? data.pers.split(',') : []
  // 设置默认选中的节点
  editrole.defaultCheckedkeys = checknode(childrenNode, perids)
  btnLoading.edit = false
}
// 获取选中节点
const checkChange = (data, node) => {
  const nodes = [...node.checkedKeys, ...node.halfCheckedKeys]
  editData.pers = nodes.toString()
}
// 所有子节点
const formatChildren = (arrs, arr2) => {
  arrs.forEach((arr) => {
    if (arr.children) {
      formatChildren(arr.children, arr2)
    } else {
      arr2.push(arr.per_name)
    }
  })
  return arr2
}
// 获取默认选中的节点
const checknode = (allNodes, checkids) => {
  const newNames = []
  allNodes.forEach((node) => {
    checkids.forEach((name) => {
      if (node === name) {
        newNames.push(name)
      }
    })
  })
  // console.log(newNames, allNodes, checkids, 22)
  return newNames
}
// 提交修改
const submiteditRole = () => {
  proxy.$refs.editFrom.validate(async (vaild) => {
    if (vaild) {
      btnLoading.btn = true
      const res = await updateRoleApi(editrole.roleId, editData)
      if (res.ok && res.status === 200) {
        ElMessage.success('修改成功')
        getRoles()
        editVisible.value = false
        btnLoading.btn = false
      } else {
        btnLoading.btn = false
        return ElMessage.error(res.data.message)
      }
    }
  })
}
</script>

<style scoped></style>
