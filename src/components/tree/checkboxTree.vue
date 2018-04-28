<template>
<div>
  <el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :default-checked-keys=checked
  :props="defaultProps">
</el-tree>
<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="setCheckedAll">全选</el-button>
  <el-button @click="resetChecked">清空</el-button>
</div>
</div>
</template>
<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      checked: null,
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getTree();
  },
  methods: {
    getTree() {
      // this.checked = [1,2]; //加载已经选中的
    },
    getCheckedNodes() {
      //选中后获取数据
      if (this.$refs.tree.getCheckedNodes().length == 0) {
        this.$message({
          message: "警告,没有选中任何数据！",
          type: "warning"
        });
      }
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      //获取选中的ID
      if (this.$refs.tree.getCheckedKeys().length == 0) {
        this.$message({
          message: "警告,没有选中任何数据！",
          type: "warning"
        });
      } else {
        this.$message({
          message: this.$refs.tree.getCheckedKeys(),
          type: "success"
        });
      }
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      //选中一组中的一个
      this.$refs.tree.setCheckedNodes([{ id: 5 }, { id: 10 }]);
    },
    setCheckedKeys() {
      //选中一组
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      //清空
      this.$refs.tree.setCheckedKeys([]);
    },
    setCheckedAll() {
      //全选
      const array = [];
      for (let i = 0; i < this.data2.length; i++) {
        array.push(this.data2[i].id);
      }
      this.$refs.tree.setCheckedKeys(array);
    }
  }
};
</script>