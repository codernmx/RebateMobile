<template>
  <div id="tools">
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">记账</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>
    <p>gitee: <a
        href="https://gitee.com/codernmx"
        target="_blank"
        rel="noopener noreferrer"
      >https://gitee.com/codernmx</a></p>
    <p>github: <a
        href="https://github.com/codernmx"
        target="_blank"
        rel="noopener noreferrer"
      >https://github.com/codernmx</a></p>
    <p>博客地址：<a href="https://blog.csdn.net/qq_31754591">https://blog.csdn.net/qq_31754591</a></p>

  </div>
</template>

<script>
import * as api from "../../network/api";
export default {
  name: "Tools",
  components: {},
  data () {
    return {

    };
  },
  created () {
    this.init();
  },
  methods: {
    //初始化数据，请求默认数据
    init () {

      //读取localStorage
    },
  },
};
</script>
<style scoped>
#tools {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
