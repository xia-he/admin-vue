<template  type="primary">
  <div class="app-container calendar-list-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>

      <!-- 多个修改 -->
      <!-- <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.author"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">还原</el-button>
          </template>
          <span v-else>{{ scope.row.author }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="星值">
        <template slot-scope="scope">
          <span class="xxx">{{scope.row.importance}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="内容">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">还原</el-button>
          </template>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认修改</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import Mock from "mockjs";
export default {
  name: "inlineEditTable",
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var lists = Mock.mock({
        "data|5-10": [
          {
            "id|+1": 1,
            author: "@cname",
            timestamp: "@datetime",
            "edit|1-2": true,
            "importance|1-3": "★",
            originalTitle: "",
            title: "@csentence()"
          }
        ]
      });
      this.listLoading = true;
      const items = lists.data;
      // console.log(items);
      this.list = items.map(v => {
        // console.log(v);
        this.$set(v, "edit", false);
        v.originalTitle = v.title;
        return v;
      });
      this.listLoading = false;

      // setTimeout(() => {
      //   const items = lists.data;
      //   // console.log(items);
      //   this.list = items.map(v => {
      //     // console.log(v);
      //     this.$set(v, "edit", false);
      //     v.originalTitle = v.title;
      //     return v;
      //   });
      //   this.listLoading = false;
      // }, 0);
    },
    cancelEdit(row) {
      console.log(row);
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "恢复到原来的值",
        type: "warning"
      });
    },
    confirmEdit(row) {
      console.log(row);
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "修改成功",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.xxx {
  font-size: 20px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
