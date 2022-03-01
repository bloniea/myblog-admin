<template>
  <div class="label">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="label.req.query"
        @keyup.enter="searchLabel"
        @change="changeNull"
      >
        <template #append>
          <el-button
            :icon="Search"
            @click="searchLabel"
          ></el-button>
        </template>
      </el-input>
      <el-button
        type="primary"
        class="add"
        @click="form.addVisible = true"
      >添加标签</el-button>

      <el-table
        :data="label.list"
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
          prop="label_name"
          label="标签名字"
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
              @click="delLabel(scope.row.id)"
              size="small"
            >删除</el-button>
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
    >

      <el-form
        ref="addform"
        :model="form.addReq"
        label-width="80px"
        :rules="form.rules"
      >
        <el-form-item
          label="标签名字"
          prop="label_name"
        >
          <el-input v-model="form.addReq.label_name"></el-input>

        </el-form-item>

        <el-form-item
          label="颜色"
          prop="color"
        >
          <div class="color">
            <el-color-picker v-model="form.addReq.color"></el-color-picker>
            <div
              class="name"
              :style="'color:'+form.addReq.color+';'"
            >{{form.addReq.label_name?form.addReq.label_name:'预览'}}</div>
          </div>

        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.addReq.des"
            type="textarea"
          > </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form.addVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddLabel"
            :loading="btnLoading.btn"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title="添加标签"
      v-model="form.editVisible"
      width="30%"
    >

      <el-form
        ref="editform"
        :model="form.editReq"
        label-width="80px"
        :rules="form.rules"
      >
        <el-form-item
          label="标签名字"
          prop="label_name"
        >
          <el-input v-model="form.editReq.label_name"></el-input>

        </el-form-item>

        <el-form-item
          label="颜色"
          prop="color"
        >
          <div class="color">
            <el-color-picker v-model="form.editReq.color"></el-color-picker>
            <div
              class="name"
              :style="'color:'+form.editReq.color+';'"
            >{{form.editReq.label_name?form.editReq.label_name:'预览'}}</div>
          </div>

        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.editReq.des"
            type="textarea"
          > </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form.editVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEditLabel"
            :loading="btnLoading.btn"
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
const label = reactive({
  list: [],
  req: {
    query: '',
    pagenum: 1,
    pagesize: 10
  },
  pagesizes: [1, 5, 10, 20],
  total: 0
})
const { proxy: p } = getCurrentInstance()
const btnLoading = reactive({
  btn: false
})
// 获取标签
const getLabels = async () => {
  loading.value = true
  const { data: res } = await p.$axios.get('/adminApi/labels', { params: label.req })
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  loading.value = false
  label.list = res.data.data
  label.total = res.data.total
}
getLabels()
//  搜索
const searchLabel = () => { }
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
const changeNull = () => {
  getLabels()
}

const form = reactive({
  addVisible: false,
  addReq: {
    label_name: '',
    des: '',
    color: '#F065A6'
  },
  rules: {
    label_name: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
    ],
    color: [
      { required: true, message: '请输入颜色值', trigger: 'blur' },
      { min: 4, max: 7, message: '长度在 4到 7 个字符', trigger: 'blur' }
    ]
  },
  editVisible: false,
  editId: 0,
  editReq: {
    label_name: '',
    des: '',
    color: ''
  }
})
// 添加标签
const submitAddLabel = () => {
  p.$refs.addform.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await p.$axios.post('/adminApi/labels', form.addReq)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      ElMessage.success(res.meta.msg)
      p.$refs.addform.resetFields()
      form.addVisible = false
      btnLoading.btn = false
      getLabels()
    }
  })
}
// 显示修改对话框
const showEditView = (data) => {
  form.editId = data.id
  form.editReq.label_name = data.label_name
  form.editReq.des = data.des
  form.editReq.color = data.color
  form.editVisible = true
}
// 修改
const submitEditLabel = () => {
  p.$refs.editform.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await p.$axios.put(`/adminApi/labels/${form.editId}`, form.editReq)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      ElMessage.success(res.meta.msg)
      form.editVisible = false
      btnLoading.btn = false
      getLabels()
    }
  })
}
// 删除
const delLabel = async id => {
  ElMessageBox.confirm(
    '确认删除标签？',
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
      const { data: res } = await p.$axios.delete(`/adminApi/labels/${id}`)
      if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
      ElMessage.closeAll()
      ElMessage.success(res.meta.msg)
      getLabels()
    })
    .catch(() => {
      ElMessage.closeAll()
      ElMessage.error('您取消了操作')
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
