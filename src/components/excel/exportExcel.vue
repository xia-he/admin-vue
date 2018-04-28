<template>
    <div class="app-container">

    <label class="radio-label" style="padding-left:0;">文件名: </label>
    <el-input style='width:340px;' :placeholder="'输入导出文件名'" prefix-icon="el-icon-document" v-model="filename"></el-input>
    <label class="radio-label">是否自适应宽度</label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>是</el-radio>
      <el-radio :label="false" border>否</el-radio>
    </el-radio-group>
    <el-button style='margin:0 0 20px 20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出excel</el-button>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      list: null,
      downloadLoading: false,
      listLoading: true,
      filename: "",
      autoWidth: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var lists = Mock.mock({
        "data|10-20": [
          {
            "id|+1": 1,
            author: "@cname",
            timestamp: "@datetime",
            pageviews: "@increment(1000)",
            title: "@csentence()"
          }
        ]
      });
      this.list = lists.data;
      this.listLoading = false;
    },
    handleDownload() {
      this.downloadLoading = true;
      if (this.filename == "" || this.filename == null) {
        this.$message({
          message: "警告：文件名不能为空！",
          type: "warning"
        });
        this.downloadLoading = false;
        return;
      }
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
        const filterVal = ["id", "title", "author", "pageviews", "timestamp"];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    }
  }
};
</script>
<style>
.app-container {
  margin-top: 30px;
}
</style>

