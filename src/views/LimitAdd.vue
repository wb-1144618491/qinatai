<template>
  <div class="limitAdd">
    <!-- 面脑屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Limit' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 新增权限表单 -->
    <div class="limitAddForm">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="上级权限">
          <!--第一个为无 -->
          <el-select v-model="form.pid"
                     placeholder="无">
            <el-option label='无'
                       value='0'>
            </el-option>
            <!-- 循环渲染权限列表 -->
            <el-option v-for="item in selectData"
                       :key="item._id"
                       :label="item.title"
                       :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="form.limitname"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success"
                 @click="onSubmit">立即创建</el-button>
    </div>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      form: {
        pid: '0',
        title: '',
        limitname: ''
      },
      id: '',
      selectData: [],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 新增
    addlimit() {
      Http.limit_add(this.form)
        .then(rst => {
          this.$message({
            message: '恭喜你，创建成功',
            type: 'success'
          })
          this.$router.go(-1)
          console.log(rst)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('创建失败')
        })
    },
    //更新
    updatelimit() {
      let param = { _id: this.id, ...this.form }
      Http.limit_upd(param)
        .then(rst => {
          this.$message({
            message: '恭喜你，创建成功',
            type: 'success'
          })
          console.log(rst)
        })
        .catch(err => {
          this.$message.error('更新失败')
          console.log(err)
        })
    },

    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.addlimit()
          } else {
            // 如果id不为空，则当前提交为修改
            this.updatelimit()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取权限列表
    getLimitList() {
      Http.limit_alllist()
        .then(rst => {
          console.log(rst)
          rst.result.forEach(val => {
            if (val.pid == '0') {
              this.selectData.push(val)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getLimitList()
    console.log(this.$route.params)
  },
  mounted() {
    let { _id = '', pid = '0', title = '', limitname = '' } = this.$route.params
    this.id = _id
    this.form.pid = pid
    this.form.title = title
    this.form.limitname = limitname
  }
}
</script>
<style lang="less">
.limitAdd {
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    background-color: azure;
    display: flex;
    align-items: center;
  }
}
</style>