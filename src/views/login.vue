<template>
  <div class="login">
    <h1>凤宝宝后台管理系统</h1>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="loginForm"
             class="demo-ruleForm"
             label-width="auto"
             :label-position="labelPosition">
      <el-form-item label="账号"
                    prop="username">
        <el-input v-model="ruleForm.username"
                  type='text'
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="ruleForm.password"
                  type='password'
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   class="btn"
                   @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Http from '../ajax/http'
import Vue from 'vue'
export default {
  data() {
    return {
      labelPosition: 'left',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      Http.user_login(this.ruleForm)
        .then(rst => {
          let { error_code, result } = rst
          if (error_code == 0 && result.length > 0) {
            // 存储token
            Vue.localStorage.set('token', result[0]._id)
            // 存储username
            Vue.localStorage.set('username', this.ruleForm.username)
            this.$router.push({ name: 'index' })
          } else {
            this.$message.error('用户名密码错误')
          }
        })
        .catch(() => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$message.error('请输入正确的密码')
          return false
        }
      })
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) != '{}') {
      let { error_code = 0, reason = '' } = this.$route.params.data
      if (error_code != 0) {
        Vue.localStorage.remove('username')
        Vue.localStorage.remove('token')
        this.$message.error(reason)
      }
    }
  }
}
</script>
<style lang="less">
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  padding: 20px 10px;
  box-shadow: 0px 0px 15px #838b83;
  h1 {
    text-align: center;
    font-weight: normal;
    margin-bottom: 30px;
  }
  .btn {
    width: 250px;
    margin: 0 auto;
  }
}
</style>