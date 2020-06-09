<template>
  <div class='index'>
    <el-container class="index">
      <el-header class="header">后台管理</el-header>
      <el-container>
        <el-aside width="200px"
                  class="aside">

          <!-- <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>管理员</template>
              <el-menu-item-group>
                <el-menu-item index="1-1"
                              @click="showMain('Limit')">权限管理</el-menu-item>
                <el-menu-item index="1-2"
                              @click="showMain('Role')">角色管理</el-menu-item>
                <el-menu-item index="1-3"
                              @click="showMain('User')">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu> -->

          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   :default-openeds="defaultOpeneds">
            <!-- <template v-for="limit in limits"> -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>管理员
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"
                              @click="showMain('Limit')">权限管理</el-menu-item>
                <el-menu-item index="1-2"
                              @click="showMain('Role')">角色管理</el-menu-item>
                <el-menu-item index="1-3"
                              @click="showMain('User')">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- </template> -->

          </el-menu>

        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      limits: [], //左侧导航栏的权限列表
      defaultOpeneds: [] //默认展开导航列表
    }
  },
  methods: {
    showMain(routerName) {
      console.log(routerName)
      this.$router.replace({ name: routerName })
    },
    getDate() {
      let _id = Vue.localStorage.get('token')
      Http.user_info(_id)
        .then(rst => {
          // this.dealTreeData(rst.result[0].role.limit)
          console.log(rst)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 把权限数据处理为导航需要的格式数据
    dealTreeData(limit) {
      console.log(limit)
    }
  },
  created() {
    this.getDate()
  }
}
</script>
<style lang="less">
body {
  width: 100%;
  height: 100%;
}
.index {
  width: 100%;
  height: 100%;
  .header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .aside {
    height: 100%;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .main {
    height: 100%;
    background-color: #e9eef3;
    color: #333;
    padding: 0px;
    text-align: center;
  }
}
</style>