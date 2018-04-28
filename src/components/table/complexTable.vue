<template>
<div>
    <div>
        <!-- tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) 这句话是实现分页的重点 -->
  <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  stripe border style="width: 100%">
    <el-table-column label="id" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.dataTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column label="内容">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<br>
<div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :background='true'
      :page-sizes="[10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=totals>
    </el-pagination>
  </div>
<!--打开弹出框 -->
<el-dialog title="编辑内容" :visible.sync="dialogFormVisible" center width="30%">
  <el-form :model="form">
    <el-form-item label="名字" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off" ></el-input>
    </el-form-item>
   <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="upData(form)">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      tableData: null,
      totals: null,
      currentPage: 1,
      pagesize: 10,

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        title: ""
      },
      formLabelWidth: "80px"
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var lists = Mock.mock({
        "data|50-60": [
          {
            "id|+1": 1,
            name: "@cname",
            dataTime: "@datetime",
            address: "@county(true)",
            title: "@csentence()"
          }
        ]
      });
      this.tableData = lists.data; //数据
      this.totals = lists.data.length; //总条数
      console.log(lists.data.length);
      //   console.log(lists.data)
    },
    //编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.title = row.title;
      this.form.id = row.id;
      console.log(index, row);
    },
    //修改
    upData(data) {
      console.log(data);
      this.getList();
      if (1 == 1) {
        this.dialogFormVisible = false;
      }
    },
    //删除
    handleDelete(index, row) {
      console.log(row);
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.pagesize = val; // 改变每页条数
      console.log(`每页 ${val} 条`);
    },
    // 跳转页数
    handleCurrentChange(val) {
      this.currentPage = val; //改变跳转页
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style  lang="scss">
.el-form-item__label {
  text-align: center;
}
</style>
