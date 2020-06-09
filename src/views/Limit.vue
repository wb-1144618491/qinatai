<template>
  <div class="limit">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Limit' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="limitAdd">
      <el-button type="primary"
                 icon="el-icon-circle-plus"
                 @click="showLimitAdd">新增</el-button>
    </div>
    <!-- 详细列表 -->
    <div class="tabList">
      <el-table :data="tableData"
                style="width: 100%"
                height="380"
                border>
        <el-table-column fixed
                         type='index'
                         label="序号"
                         width="50"
                         align='center'>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题"
                         width="120">
        </el-table-column>
        <el-table-column prop="limitname"
                         label="路由"
                         width="120">
        </el-table-column>

        <el-table-column prop="city"
                         label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button @click="updataLimit(scope.row)"
                       type="primary"
                       size="small">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </el-button>

            <el-button type="danger"
                       size="small"
                       @click="deleteLimit(scope.row)">
              <i class="el-icon-delete"></i>
              <span>删除</span>
            </el-button>

          </template>

        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination"
         v-if="total>0">
      <el-pagination background
                     layout="prev, pager, next"
                     :total='total'
                     :page-size='5'
                     @current-change='currchange'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      total: 0, //权限列表总条数(注意不是页码)
      tableData: [], //渲染列表的数据源
      currpage: 1 //分页的当前页
    }
  },
  methods: {
    // 路由跳转
    showLimitAdd() {
      this.$router.push({ name: 'LimitAdd' })
    },
    getLimitList(currpage) {
      Http.limit_list(currpage)
        .then(rst => {
          this.tableData = rst.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLimitCount() {
      Http.limit_count()
        .then(rst => {
          // 获取权限列表的总数量
          this.total = rst.result
          // 根据总数量计算分页页码
          let total_page = Math.ceil(this.total / 5)
          // 判断如果当前页大于分页的总页码时，把总页码赋值给当前页，否则当前当前也不变
          this.currpage =
            this.currpage > total_page ? total_page : this.currpage
          // 如果当前数据库没有任何数据，则保持currpage为1，否则（page-1）*limit会报错
          if (this.currpage == 0) {
            this.currpage = 1
          }
          // 根据当前页请求权限数据，用于列表渲染
          this.getLimitList(this.currpage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页点击事件
    currchange(page) {
      // 分页点击获取page参数，表示当前点击的页码
      // 把页码赋值给当前页

      this.currpage = page
      // 根据当前页请求数据
      this.getLimitList(page)
    },
    // 更新
    updataLimit(row) {
      this.$router.push({ name: 'LimitAdd', params: row })
    },
    // 删除
    deleteLimit(row) {
      Http.limit_del(row._id)
        .then(rst => {
          this.getLimitCount()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          console.log(rst)
        })
        .catch(err => {
          this.$message({
            message: '删除失败'
          })
          console.log(err)
        })
    }
  },
  created() {
    this.getLimitCount()
  }
}
</script>
<style lang="less">
.limit {
  height: 100%;
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    background-color: azure;
    display: flex;
    align-items: center;
  }
  .limitAdd {
    display: flex;
    align-items: center;
    width: 100px;
    height: 50px;
  }
}
</style>