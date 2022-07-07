<template>
  <div class="friends">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name:'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友链管理</el-breadcrumb-item>
      <el-breadcrumb-item>友链列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button
        type="primary"
        class="add"
        @click="addFriend.addVisible = true"
      >添加友链</el-button>
      <el-table
        :data="friends.list"
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
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="bio"
          label="副标题"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像地址"
        >
          <template #default="scope">
            <div class="img-box">
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
                fit="contain"
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="img_url"
          label="图片地址"
        >
          <template #default="scope">
            <div class="img-box">
              <el-image
                :src="scope.row.img_url"
                :preview-src-list="[scope.row.img_url]"
                fit="contain"
              ></el-image>
            </div>
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
              @click="delFriend(scope.row._id)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="friends.req.pagenum"
        :page-sizes="friends.pagesizes"
        :page-size="friends.req.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="friends.total"
      >
      </el-pagination>
    </el-card>
    <!-- -------------------------------------------- -->
    <!-- 添加 -->
    <el-dialog
      title="添加友链"
      v-model="addFriend.addVisible"
      width="30%"
      @close="addClose(addForm)"
    >

      <el-form
        ref="addForm"
        :model="addFriend.req"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="addFriend.req.title"
            @keyup.enter="submitAdd(addForm)"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="副标题"
          prop="bio"
        >
          <el-input
            v-model="addFriend.req.bio"
            @keyup.enter="submitAdd(addForm)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="url"
        >
          <el-input
            v-model="addFriend.req.url"
            @keyup.enter="submitAdd(addForm)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="头像"
          prop="avatar"
        >
          <el-input
            v-model="addFriend.req.avatar"
            @keyup.enter="submitAdd"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img_url"
        >
          <el-input
            v-model="addFriend.req.img_url"
            @keyup.enter="submitAdd(addForm)"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addClose(addForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAdd(addForm)"
            :loading="btnLoading.btn"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="修改友链"
      v-model="editFriend.editVisible"
      width="30%"
      @close="editClose(editForm)"
    >

      <el-form
        ref="editForm"
        :model="editFriend.req"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="editFriend.req.title"
            @keyup.enter="submitEdit(editForm)"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="副标题"
          prop="bio"
        >
          <el-input
            v-model="editFriend.req.bio"
            @keyup.enter="submitEdit(editForm)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="url"
        >
          <el-input
            v-model="editFriend.req.url"
            @keyup.enter="submitEdit(editForm)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="头像"
          prop="avatar"
        >
          <el-input
            v-model="editFriend.req.avatar"
            @keyup.enter="submitEdit(editForm)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img_url"
        >
          <el-input
            v-model="editFriend.req.img_url"
            @keyup.enter="submitEdit(editForm)"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editClose(editForm)">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEdit(editForm)"
            :loading="btnLoading.btn"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { getFriendsApi, addFriendApi, editFriendApi, delFriendApi } from '@/comm/fetch'


const friends = reactive({
  list: [],
  req: {
    pagesize: 10,
    pagenum: 1
  },
  pagesizes: [1, 5, 10, 20],
  total: 0
})
const loading = ref(false)
const btnLoading = reactive({
  btn: false
})
const pageSizeChange = (size) => {
  friends.req.pagesize = size
  getFriends()
}
// 页码改变
const pageCurrentChange = (page) => {
  friends.req.pagenum = page
  getFriends()
}
// 获取
const getFriends = async () => {
  loading.value = true
  const res = await getFriendsApi(friends.req)
  if (res.status === 200 && res.ok) {
    friends.list = res.data.data
    friends.total = res.data.total
    loading.value = false
  }

}
getFriends()
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  url: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请输入头像地址', trigger: 'blur' }
  ],
  img_url: [
    { required: true, message: '请输入图片地址', trigger: 'blur' }
  ]
}
// 添加
const addFriend = reactive({
  addVisible: false,
  req: {
    title: '',
    bio: '',
    url: '',
    avatar: '',
    img_url: ''
  }
})
const addForm = ref()
const addClose = (addForm) => {
  addFriend.addVisible = false
  addForm.resetFields()
}
const submitAdd = async (addForm) => {
  addForm.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const res = await addFriendApi(addFriend.req)
      if (res.status === 200 && res.ok) {
        addForm.resetFields()
        ElMessage.success('添加成功')
        addFriend.addVisible = false
        btnLoading.btn = false
        getFriends()
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }

    }
  })

}
// 修改
const editFriend = reactive({
  editVisible: false,
  req: {
    title: '',
    bio: '',
    url: '',
    avatar: '',
    img_url: ''
  },
  id: 0
})

const showEditView = (data) => {
  editFriend.req.title = data.title
  editFriend.req.bio = data.bio
  editFriend.req.url = data.url
  editFriend.req.avatar = data.avatar
  editFriend.id = data._id
  editFriend.req.img_url = data.img_url
  editFriend.editVisible = true
}
const editForm = ref()
const submitEdit = async (editForm) => {
  if (!editForm) return
  editForm.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const res = await editFriendApi(editFriend.id, editFriend.req)
      if (res.status === 200 && res.ok) {
        ElMessage.success('修改成功')
        editForm.resetFields()
        editFriend.editVisible = false
        btnLoading.btn = false
        getFriends()
      } else {
        btnLoading.btn = false
        ElMessage.error(res.data.message)
      }
    }
  })

}
const delFriend = async (id) => {
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
      const res = await delFriendApi(id)
      if (res.status === 200 && res.ok) {
        ElMessage.closeAll()
        ElMessage.success('删除成功')
      } else {
        ElMessage.closeAll()
        ElMessage.error(res.data.message)
      }
      getFriends()
    })
    .catch(() => {
      ElMessage.closeAll()
    })
}
const editClose = (editForm) => {
  editFriend.editVisible = false
  editForm.resetFields()
}
</script>

<style lang="stylus" scoped>
.friends {
  .add {
    margin-bottom 20px
  }
}
</style>
