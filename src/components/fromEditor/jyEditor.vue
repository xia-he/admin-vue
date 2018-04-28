<template>
    <div class="divTop">
        <div>
          <label>插件--vue2-editor</label>
          <br/>
            <vue-editor v-model="htmlForEditor"></vue-editor>
        </div>
        <div>
            <textarea v-model="htmlEditor" class="editorWidth"></textarea>
        </div>
        <div>
            <el-button type="primary" class="top" @click="submitOK">保存</el-button>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  data() {
    return {
      htmlForEditor: "<h1>Html For Editor</h1>",
      htmlEditor: ""
    };
  },

  methods: {
    submitOK() {
      this.htmlEditor = this.htmlForEditor;
      console.log(this.htmlForEditor);
    }
  }
};
</script>
<style lang="scss">
.divTop {
  margin-top: 20px;
  .top {
    margin-top: 5px;
  }
  .bottom {
    margin-bottom: 10px;
  }
  .editorWidth {
    width: 800px;
    height: 100px;
  }
  .ql-snow .ql-tooltip {
    left: 100px !important;
    top: 15px !important;
  }
}
</style>
