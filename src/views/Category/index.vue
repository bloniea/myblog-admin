<template>
  <div class="category">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="categories.catRequest.keyword"
        @keyup.enter="searchCat"
        @blur="changeNull(categories.catRequest.keyword)"
        clearable
        @clear="getCategories"
      >
        <template #append>
          <el-button :icon="Search" @click="searchCat"></el-button>
        </template>
      </el-input>
      <el-button type="primary" class="add" @click="diglog.addCatVisible = true"
        >添加分类</el-button
      >

      <el-table
        :data="categories.list"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名字"> </el-table-column>
        <el-table-column prop="img_url" label="分类图片">
          <template #default="scope">
            <div class="img-box">
              <el-image :src="scope.row.img_url" fit="contain"></el-image>
            </div>
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
              @click="delCat(scope.row._id)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="categories.catRequest.pagenum"
        :page-sizes="categories.pagesizes"
        :page-size="categories.catRequest.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categories.total"
      >
      </el-pagination>
    </el-card>
    <!-- --------------------------------------------- -->
    <!-- 添加 -->
    <el-dialog
      title="添加分类"
      v-model="diglog.addCatVisible"
      width="30%"
      @close="closeAddForm(addForm)"
    >
      <el-form
        ref="addForm"
        :model="form.addReq"
        label-width="80px"
        :rules="form.rules"
      >
        <el-form-item label="活动名称" prop="cat_name">
          <el-input
            v-model="form.addReq.cat_name"
            @keyup.enter="submitAddCat(addForm)"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="img_url">
          <el-input
            v-model="form.addReq.img_url"
            @keyup.enter="submitAddCat(addForm)"
          ></el-input>
          <img
            v-if="form.addReq.img_url"
            :src="form.addReq.img_url"
            class="preview"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAddForm(addForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddCat(addForm)"
            :loading="btnLoading.btn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="修改分类"
      v-model="diglog.editCatVisible"
      width="30%"
      @close="closeEditForm(editForm)"
    >
      <el-form
        ref="editForm"
        :model="form.editReq"
        label-width="80px"
        :rules="form.rules"
      >
        <el-form-item label="活动名称" prop="cat_name">
          <el-input
            v-model="form.editReq.cat_name"
            @keyup.enter="submitEditCat(editForm)"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="img_url">
          <el-input
            v-model="form.editReq.img_url"
            @keyup.enter="submitEditCat(editForm)"
          ></el-input>
          <img
            v-if="form.editReq.img_url"
            :src="form.editReq.img_url"
            class="preview"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeEditForm(editForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEditCat(editForm)"
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
  getCategoriesApi,
  addCategoryApi,
  delCategoryApi,
  editCategoryApi,
} from '@/comm/fetch.js'

const loading = ref(true)

// 获取分类
const categories = reactive({
  list: [],
  total: 0,
  pagesizes: [1, 10, 15, 20],
  catRequest: {
    keyword: '',
    pagenum: 1,
    pagesize: 10,
  },
})
const btnLoading = reactive({
  btn: false,
})
// 获取分类
const getCategories = async () => {
  loading.value = true
  // const { data: res } = await p.$axios.get('/adminApi/categories', { params: categories.catRequest })
  const res = await getCategoriesApi(categories.catRequest)
  if (res.ok && res.status === 200) {
    loading.value = false
    categories.total = res.data.total
    categories.list = res.data.data
  }
}
getCategories()
// 搜索分类
const searchCat = async () => {
  getCategories()
}

// 每页数量发生变化
const pageSizeChange = (size) => {
  categories.catRequest.pagesize = size
  getCategories()
}
// 页码发生变化
const pageCurrentChange = (page) => {
  categories.catRequest.pagenum = page
  getCategories()
}
// 当输入框为空的时候
const changeNull = (val) => {
  if (!val) {
    getCategories()
  }
}

// diglog 对话框
const form = reactive({
  addReq: { cat_name: '', img_url: '' },
  rules: {
    cat_name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' },
      { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
    ],
    img_url: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
  },
  editId: {},
  editReq: { cat_name: '' },
})
const diglog = reactive({
  addCatVisible: false,
  editCatVisible: false,
})
const addForm = ref()
const closeAddForm = (form) => {
  form.resetFields()
  diglog.addCatVisible = false
}
// 添加分类
const submitAddCat = (addForm) => {
  addForm.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      const res = await addCategoryApi(form.addReq)
      if (res.status === 200 && res.ok) {
        addForm.resetFields()
        ElMessage.success('添加成功')
        diglog.addCatVisible = false
        getCategories()
        btnLoading.btn = false
      } else {
        btnLoading.btn = false
        return ElMessage.error(res.data.message)
      }
    }
  })
}

// 显示修改分类对话框
const showEditView = (data) => {
  form.editId = data._id
  form.editReq.cat_name = data.cat_name
  form.editReq.img_url = data.img_url
  diglog.editCatVisible = true
}
const editForm = ref()
const closeEditForm = (editForm) => {
  editForm.resetFields()
  diglog.editCatVisible = false
}
// 修改分类
const submitEditCat = (editForm) => {
  if (!editForm) return
  editForm.validate(async (valid) => {
    if (valid) {
      btnLoading.btn = true
      // const { data: res } = await p.$axios.put(`/adminApi/categories/${form.editId}`, form.editReq)
      const res = await editCategoryApi(form.editId, form.editReq)
      if (res.status === 200 && res.ok) {
        ElMessage.success('修改成功')
        diglog.editCatVisible = false
        getCategories()
        btnLoading.btn = false
      } else {
        btnLoading.btn = false
        return ElMessage.error(res.data.message)
      }
    }
  })
}
const delCat = async (id) => {
  ElMessageBox.confirm('确认删除分类？', '警告', {
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
      const res = await delCategoryApi(id)
      if (res.status === 200 && res.ok) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
        getCategories()
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
@import './index.styl'
</style>
