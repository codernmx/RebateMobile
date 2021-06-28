<template>
  <div class="box">
    <div class="item">
      <div class="left">真实姓名：</div>
      <div class="right">
        <el-input
          v-model="name"
          placeholder="请输入支付宝实名认证的真实姓名"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="left">支付账号：</div>
      <div class="right">
        <el-input
          v-model="account"
          placeholder="请输入支付宝账号"
        ></el-input>
      </div>
    </div>
    <div class="submit">
      <el-button
        style="width:150px"
        type="primary"
        round
      >立即绑定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bound',

  components: {},

  directives: {},

  data () {
    return {
      name:'',
      account:'',

    };
  },

  mounted () {

  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.box {
  margin-top: 30px;
  .item {
    padding: 0 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    .left {
      width: 80px;
      text-align: left;
    }
    .right {
      flex: 1;
    }
  }
  .submit {
    display: block;
    text-align: center;
  }
}
</style>