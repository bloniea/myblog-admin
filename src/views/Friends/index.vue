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
              @click="delFriend(scope.row.id)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- -------------------------------------------- -->
    <!-- 添加 -->
    <el-dialog
      title="添加友链"
      v-model="addFriend.addVisible"
      width="30%"
    >

      <el-form
        ref="addform"
        :model="addFriend.req"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="addFriend.req.title"></el-input>
        </el-form-item>

        <el-form-item
          label="副标题"
          prop="bio"
        >
          <el-input v-model="addFriend.req.bio"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="url"
        >
          <el-input v-model="addFriend.req.url"></el-input>
        </el-form-item>
        <el-form-item
          label="头像"
          prop="avatar"
        >
          <el-input v-model="addFriend.req.avatar"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img_url"
        >
          <el-input v-model="addFriend.req.img_url"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFriend.addVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAdd"
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
    >

      <el-form
        ref="addform"
        :model="editFriend.req"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="editFriend.req.title"></el-input>
        </el-form-item>

        <el-form-item
          label="副标题"
          prop="bio"
        >
          <el-input v-model="editFriend.req.bio"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="url"
        >
          <el-input v-model="editFriend.req.url"></el-input>
        </el-form-item>
        <el-form-item
          label="头像"
          prop="avatar"
        >
          <el-input v-model="editFriend.req.avatar"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img_url"
        >
          <el-input v-model="editFriend.req.img_url"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editFriend.editVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEdit"
            :loading="btnLoading.btn"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { stampToTime } from '@/comm/functions'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
const { proxy: p } = getCurrentInstance()
const friends = reactive({
  list: []
})
const loading = ref(false)
const btnLoading = reactive({
  btn: false
})
// 获取
const getFriends = async () => {
  loading.value = true
  const { data: res } = await p.$axios.get('/adminApi/friends')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)

  friends.list = res.data
  loading.value = false
  // ElMessage.success('')
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

const submitAdd = async () => {
  p.$refs.addform.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await p.$axios.post('/adminApi/friends', addFriend.req)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        return ElMessage.error(res.meta.msg)
      }
      p.$refs.addform.resetFields()
      ElMessage.success('添加成功')
      addFriend.addVisible = false
      btnLoading.btn = false
      getFriends()

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
  editFriend.id = data.id
  editFriend.editVisible = true
}
const submitEdit = async () => {
  p.$refs.addform.validate(async valid => {
    if (valid) {
      btnLoading.btn = true
      const { data: res } = await p.$axios.put('/adminApi/friends/' + editFriend.id, editFriend.req)
      if (res.meta.status !== 200) {
        btnLoading.btn = false
        ElMessage.error(res.meta.msg)
      }
      ElMessage.success('修改成功')
      p.$refs.addform.resetFields()
      editFriend.editVisible = false
      btnLoading.btn = false
      getFriends()
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
      const { data: res } = await p.$axios.delete('/adminApi/friends/' + id)
      if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
      ElMessage.closeAll()
      ElMessage.success('删除成功')

      getFriends()
    })
    .catch(() => {
      ElMessage.error('您取消了操作')
      ElMessage.closeAll()
    })
}

</script>

<style lang="stylus" scoped>
.friends {
  .add {
    margin-bottom 20px
  }
}
</style>
