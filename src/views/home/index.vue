<template lang="html">
    <div class="home-container">
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :class="collapsed?'logo-collapse-width':'logo-width'" :span="4" class="logo">
                    <!-- logo存放点 -->
                </el-col>
                <!-- <el-col :span="10">
                    <div @click.prevent="collapseFun" class="tools">
                        <i class="el-icon-tickets">
                        </i>
                    </div>
                </el-col> -->
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            {{sysUserName}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                我的消息
                            </el-dropdown-item>
                            <el-dropdown-item>
                                设置
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logoutFun" divided="">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
            <el-col :span="24" class="main">
                <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                    <!--导航菜单-->
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" v-show="!collapsed" :router='true'>
                        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                            <el-submenu :index="index+''" v-if="!item.leaf">
                                <template slot="title">
                                    <i :class="item.iconCls">
                                    </i>
                                    {{item.name}}
                                </template>
                                <el-menu-item :index="child.path" :key="child.path" v-for="child in item.children" v-if="!child.hidden">
                                    {{child.name}}
                                </el-menu-item>
                            </el-submenu>
                            <!-- <el-menu-item :index="item.children[0].path" v-if="item.leaf&&item.children.length>0">
                                <i :class="item.iconCls">
                                </i>
                                {{item.children[0].name}}
                            </el-menu-item> -->
                        </template>
                    </el-menu>
                </aside>
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title">
                                {{$route.name}}
                            </strong>
                            <el-breadcrumb class="breadcrumb-inner" separator="/">
                                <el-breadcrumb-item :key="item.path" v-for="item in $route.matched">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="24" class="content-wrapper">
                            <transition mode="out-in" name="fade">
                                <router-view>
                                </router-view>
                            </transition>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sysUserName: "admin",
      collapsed: false
    };
  },
  methods: {
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    //退出登录
    logoutFun: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
      })
        .then(() => {
            this.$router.push('/login');
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 45px;
    line-height: 45px;
    background: #2b445d;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 45px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      width:200px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 45px;
      line-height: 45px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 45px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 200px;
      width: 200px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 200px;
      width: 200px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>