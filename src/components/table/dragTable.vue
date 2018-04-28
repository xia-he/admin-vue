<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table :data="list" row-key="id"  v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="星值">
        <template slot-scope="scope">
          <span class="xxx">{{scope.row.importance}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="读数" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="scope">
         拖拉
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import Sortable from "sortablejs";
import Mock from "mockjs";

export default {
  name: "dragTable",
  data() {
    return {
      list: null,
      listLoading: true,
      sortable: null,
      num:'',
      oldList: [],
      newList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var lists = Mock.mock({
        "data|10": [
          {
            "id|+1": 1,
            author: "@cname",
            timestamp: "@datetime",
            "edit|1-2": true,
            "importance|1-3": "★",
            title: "@csentence()",
            "pageviews|2000-5000": 5000
          }
        ]
      });
      // console.log(lists.data);
      this.listLoading = true;
      this.list = lists.data;
      this.oldList = this.list.map(v => v.id);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
      this.listLoading = false;
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // 下拉占位符的类名，
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // 避免火狐bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // 为了显示更改，可以在代码中删除
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          // console.log(this.list)  //拖拉后的数据变化
        }
      })
    }
  }
};
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
.xxx {
  font-size: 20px;
}
</style>
