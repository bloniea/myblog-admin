<template>
  <div class="label">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="label.req.keyword"
        @keyup.enter="getLabels"
        @blur="changeNull(label.req.keyword)"
        clearable
        @clear="getLabels"
      >
        <template #append>
          <el-button :icon="Search" @click="getLabels"></el-button>
        </template>
      </el-input>
      <el-button type="primary" class="add" @click="form.addVisible = true"
        >添加标签</el-button
      >

      <el-table
        :data="label.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="name" label="标签名字">
          <template #default="scope">
            <el-tag :color="scope.row.color">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"> </el-table-column>
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
              @click="delLabel(scope.row._id)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="label.req.pagenum"
        :page-sizes="label.pagesizes"
        :page-size="label.req.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="label.total"
      >
      </el-pagination>
    </el-card>
    <!-- ------------------------------------------------------------------------------------ -->
    <!-- 添加 -->
    <el-dialog
      title="添加标签"
      v-model="form.addVisible"
      width="30%"
      @close="closeAdd(addForm)"
    >
      <el-form
        ref="addForm"
        :model="form.addReq"
        label-width="80px"
        :rules="form.rules"
        @submit.prevent
      >
        <el-form-item label="标签名字" prop="name">
          <el-input
            v-model="form.addReq.name"
            @keyup.enter="submitAddLabel(addForm)"
          ></el-input>
        </el-form-item>

        <el-form-item label="颜色" prop="color">
          <div class="color">
            <el-color-picker v-model="form.addReq.color"></el-color-picker>
            <div class="name" :style="'color:' + form.addReq.color + ';'">
              {{ form.addReq.name ? form.addReq.name : '预览' }}
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAdd(addForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddLabel(addForm)"
            :loading="btnLoading.btn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title="添加标签"
      v-model="form.editVisible"
      width="30%"
      @close="editClose(editForm)"
    >
      <el-form
        ref="editForm"
        :model="form.editReq"
        label-width="80px"
        :rules="form.rules"
        @submit.prevent
      >
        <el-form-item label="标签名字" prop="name">
          <el-input
            v-model="form.editReq.name"
            @keyup.enter="submitEditLabel(editForm)"
          ></el-input>
        </el-form-item>

        <el-form-item label="颜色" prop="color">
          <div class="color">
            <el-color-picker v-model="form.editReq.color"></el-color-picker>
            <div class="name" :style="'color:' + form.editReq.color + ';'">
              {{ form.editReq.name ? form.editReq.name : '预览' }}
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editClose(editForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEditLabel(editForm)"
            :loading="btnLoading.btn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import {
  getLabelsApi,
  addLabelApi,
  editLabelApi,
  delLabelApi,
} from '@/comm/fetch'
const loading = ref(true)
const label = reactive({
  list: [],
  req: {
    keyword: '',
    pagenum: 1,
    pagesize: 10,
  },
  pagesizes: [1, 5, 10, 20],
  total: 0,
})

const btnLoading = reactive({
  btn: false,
})
// 获取标签
const getLabels = async () => {
  loading.value = true
  const res = await getLabelsApi(label.req)
  if (res.status === 200 && res.ok) {
    loading.value = false
    label.list = res.data.data
    label.total = res.data.total
  }
}
getLabels()

// 每页条数改变
const pageSizeChange = (size) => {
  label.req.pagesize = size
  getLabels()
}
// 页码改变
const pageCurrentChange = (page) => {
  label.req.pagenum = page
  getLabels()
}
// 输入框为空返回全部数据
const changeNull = (val) => {
  if (val == '') {
    getLabels()
  }
}

const form = reactive({
  addVisible: false,
  addReq: {
    name: '',
    color: '#F065A6',
  },
  rules: {
    name: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' },
    ],
    color: [
      { required: true, message: '请输入颜色值', trigger: 'blur' },
      { min: 4, max: 7, message: '长度在 4到 7 个字符', trigger: 'blur' },
    ],
  },
  editVisible: false,
  editId: 0,
  editReq: {
    name: '',
    color: '',
  },
})
const addForm = ref()
const closeAdd = (addForm) => {
  addForm.resetFields()
  form.addVisible = false
}
// 添加标签
const submitAddLabel = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      // const { data: res } = await p.$axios.post('/adminApi/labels', form.addReq)
      const res = await addLabelApi(form.addReq)
      if (res.status === 200 && res.ok) {
        ElMessage.success('添加成功')
        addForm.resetFields()
        form.addVisible = false
        btnLoading.btn = false
        getLabels()
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })
}
// 显示修改对话框
const showEditView = (data) => {
  form.editId = data._id
  form.editReq.name = data.name
  form.editReq.color = data.color
  form.editVisible = true
}
// 修改
const editForm = ref()
const submitEditLabel = (editForm) => {
  editForm.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      const res = await editLabelApi(form.editId, form.editReq)
      if (res.status === 200 && res.ok) {
        ElMessage.success('修改成功')
        form.editVisible = false
        btnLoading.btn = false
        editForm.resetFields()
        getLabels()
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })
}
const editClose = (editForm) => {
  form.editVisible = false
  editForm.resetFields()
}
// 删除
const delLabel = async (id) => {
  ElMessageBox.confirm('确认删除标签？', '警告', {
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
      const res = await delLabelApi(id)
      if (res.status === 200 && res.ok) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        getLabels()
      } else {
        ElMessage.closeAll()
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage.closeAll()
    })
}
</script>

<style lang="stylus" scoped>
.color {
  display flex
  .name {
    margin-left 10px
  }
}
</style>
