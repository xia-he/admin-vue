<template>
    <div class="app-top">
      <el-input style='width:300px;' :placeholder="'请输入文件名称(默认file)'" prefix-icon="el-icon-document" v-model="filename"></el-input>
      <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出zip</el-button>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="95" align="center">
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
          <span>{{scope.row.display_time}}</span>
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
      filename: ""
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
            display_time: "@datetime",
            pageviews:'@increment(1000)',
            title: "@csentence()"
          }
        ]
      });
      this.list=lists.data;
      this.listLoading=false;
    },
    handleDownload() {
        this.downloadLoading = true;
          import('@/vendor/Export2Zip').then(zip => {
        const tHeader = ['Id', '标题', '作者', '点击数', '时间']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>
<style>
.app-top{
    margin-top: 30px;
}
</style>

