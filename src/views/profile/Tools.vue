<template>
  <div id="tools">
    <div class="nav">
      <div
        class="el-icon-arrow-left fz-xl"
        @click="back"
      ></div>
      <div class="diary">个人</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>
    <div class="coderLink">
      <p>
        gitee: <a
          href="https://gitee.com/codernmx"
          target="_blank"
          rel="noopener noreferrer"
        >https://gitee.com/codernmx</a>
      </p>
      <p>
        github: <a
          href="https://github.com/codernmx"
          target="_blank"
          rel="noopener noreferrer"
        >https://github.com/codernmx</a>
      </p>
      <p>
        博客地址：<a href="https://blog.csdn.net/qq_31754591">https://blog.csdn.net</a>
      </p>
    </div>

  </div>
</template>

<script>
import * as api from "../../api/api";
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
    back () {
      this.$router.go(-1)
    }
  },
};
</script>
<style scoped>
#tools {
  padding-left: 15px;
  padding-right: 15px;
}
.coderLink {
  margin-top: 30px;
  text-align: center;
  line-height: 32px;
}
</style>
