<template>
  <div>
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl" @click="back"></div>
      <div class="diary">设置</div>
      <div class="el-icon-star-off fz-xl" ></div>
    </div>
    <el-card>
      <div>
        <p>到账支付宝：19923756596</p>
        <p>提现金额</p>
        <el-input v-model="money" placeholder="请输入内容"></el-input>
        <p>可提现余额666</p>
        <el-button round @click="submit" class="submit">提现</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { } from "../../network/api";
export default {
  name: 'WithDrawal',

  data () {
    return {
      money:''
    };
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {//默认展示的数据
    },
    back(){
      this.$router.go(-1)
      console.log(this.$router)
    },
    submit(){
      this.$message.success('请等待审核')
      this.money = ''
    }

  },
};
</script>

<style lang="less" scoped>
.submit{
  width: 200px;
  margin: 0 auto;
  display: block;
}
p{
  line-height: 34px;
}
</style>