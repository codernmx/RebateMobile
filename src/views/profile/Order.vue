<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">全部</el-tab-pane>
      <el-tab-pane label="待结算" name="second">待结算</el-tab-pane>
      <el-tab-pane label="已结算" name="third">已结算</el-tab-pane>
      <el-tab-pane label="已失效" name="fourth">已失效</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Order',
  components: {},
  directives: {},

  data () {
    return {
      activeName: 'first',
    };
  },

  mounted () {

  },

  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    }

  },
};
</script>

<style lang="scss" scoped>
</style>