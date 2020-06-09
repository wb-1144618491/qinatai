<template>
  <div class="Useradd">
    <template>
      <!--面包屑导航 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'User' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="limitaddform">
        <el-form ref="form"
                 label-width="80px"
                 :rules="rules"
                 :model="form">
          <el-form-item label="角色">
            <el-select v-model="form.role"
                       placeholder="无"
                       style="
                       width:100%">
              <!-- 循环渲染权限列表 -->
              <template v-for="item in roles">
                <el-option :label="item.rolename"
                           :value="item._id"
                           :key="item._id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码"
                        prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item> -->
          <el-button type="primary"
                     style="text-align:right"
                     @click="onSubmit">立即创建</el-button>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      roles: [],
      form: {
        role: '0', //角色id
        username: '' //用户名
        // password: '' //密码
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      id: ''
    }
  },
  methods: {
    getUserList() {
      Http.role_listadd()
        .then(rst => {
          this.roles = rst.result
          if (this.form.role == '0') {
            this.form.role = rst.result[0]._id
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交表单新增
    addUser() {
      Http.user_add(this.form)
        .then(rst => {
          // element-ui 的Message消息提示

          this.$message({
            message: '恭喜你，创建成功',
            type: 'success'
          })
          this.$router.go(-1)
          console.log(rst)
        })
        .catch(err => {
          this.$message.error('失败')
          console.log(err)
        })
    },
    // 更新
    updateUser() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.user_upd(param)
        .then(rst => {
          console.log(rst)
          this.$message({
            message: '恭喜你，更新成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.addUser()
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateUser()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    //   this.$route.params传递的是update更新的数据
    let {
      _id = '',
      role = '0',
      username = ''
      // password = ''
    } = this.$route.params
    //  如果是修改，则role不等于0
    if (role != 0) {
      this.form.role = role._id
      console.log(role)
    }
    this.form.username = username
    // this.form.password = password
    this.id = _id
    // 初始化角色下拉框
    this.getUserList()
  },
  mounted() {}
}
</script>
<style lang="less">
.Useradd {
  .breadcrumb {
    height: 35px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>