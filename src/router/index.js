import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home/index'
import Admin from '@/components/admin/index'
import Table from '@/components/table/index'
import InlineEditTable from '@/components/table/inlineEditTable'
import DragTable from '@/components/table/dragTable'
import Not401 from '@/views/errorPage/401'
import Not404 from '@/views/errorPage/404'
import ComplexTable from '@/components/table/complexTable'
import CheckboxTree from '@/components/tree/checkboxTree'
import ZipExport from '@/components/zip/zipExport'
import ExportExcel from '@/components/excel/exportExcel'
import SelectExcel from '@/components/excel/selectExcel'
import Editor from '@/components/fromEditor/editor'
import JyEditor from '@/components/fromEditor/jyEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/401',
      name: 'Not401',
      component: Not401,
      hidden: true
    }, {
      path: '/404',
      name: 'Not404',
      component: Not404,
      hidden: true
    }, {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message', //图标样式class
      children: [
        {
          path: "/table",
          component: Table,
          name: '数据展示'
        }, {
          path: "/inlineEditTable",
          component: InlineEditTable,
          name: '内嵌table'
        }, {
          path: "/dragTable",
          component: DragTable,
          name: '拖拽table'
        }, {
          path: "/complexTable",
          component: ComplexTable,
          name: '一般table'
        }
      ]

    }, {
      path: '/',
      component: Home,
      name: '用户管理',
      iconCls: 'el-icon-menu',
      children: [
        {
          path: '/admin',
          component: Admin,
          name: '用户信息'
        }
      ]
    }, {
      path: '/',
      component: Home,
      name: '树状图',
      iconCls: ' el-icon-tickets',
      children: [
        {
          path: '/checkboxTree',
          component: CheckboxTree,
          name: '带选中的树状图'
        }
      ]
    }, {
      path: '/',
      component: Home,
      name: 'ZIP',
      children: [
        {
          path: '/zipExport',
          component: ZipExport,
          name: '导出ZIP'
        }
      ]
    }, {
      path: '/',
      component: Home,
      name: 'Excel',
      children: [
        {
          path: '/exportExcel',
          component: ExportExcel,
          name: '导出Excel'
        }, {
          path: '/selectExcel',
          component: SelectExcel,
          name: '选中导出Excel'
        }
      ]
    }, {
      path: '/',
      component: Home,
      name: 'From',
      children: [
        {
          path: '/editor',
          component: Editor,
          name: '编辑器'
        },{
          path: '/jyEditor',
          component: JyEditor,
          name: '简易编辑器'
        }
      ]
    }
  ]
})
