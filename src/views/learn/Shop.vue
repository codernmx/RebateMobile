
<template>
  <div id="shop">
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#FF5777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="130"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="nav navTop">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">首页</div>
      <div class="fz-xl el-icon-s-tools"></div>
    </div>

    <div
      class="identify"
      @click="identifyDialog = true"
    >点击识别淘口令</div>

    <el-dialog
      title="粘贴需要解析的淘口令"
      :visible.sync="identifyDialog"
      width="70%"
      center
    >
      <div>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="粘贴需要解析的淘口令"
          v-model="identifyDialogInput"
        >
        </el-input>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <!-- <el-button @click="identifyDialog = false">取 消</el-button> -->
        <el-button
          type="primary"
          @click="identifyDialogSub"
        >解析</el-button>
      </span>
    </el-dialog>

    <!-- 解析后的弹窗 -->
    <el-dialog
      title="检测到含有优惠的商品"
      :visible.sync="afterIdentifyDialog"
      width="70%"
      center
    >
      <div>
        55
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="afterIdentifyDialog = false">查看详情</el-button>
        <el-button
          type="primary"
          @click="afterIdentifyDialog = false"
        >立即购买</el-button>
      </span>
    </el-dialog>

    <div class="bigBox">

      <div
        v-for="item in list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :key="item.ID"
        class="itemBox"
      >
        <img
          :src="item.ImgUrl"
          alt=""
          width="105"
          height="105"
          class="itemImg"
        >
        <div class="itemRight">
          <div @click="toDetails(item.GoodsId)">{{item.GoodsName}}</div>
          <div class="price"> <span class="lower">券：{{item.ActMoney}}元</span> 券后：￥<span>{{item.LastPrice}}</span></div>
          <div class="buyButton">预估收益：{{(item.LastPrice * item.TKMoneyRate)/100 | parseInt}} <div
              style="color:white"
              @click="tkl(item.GoodsId)"
            >立即抢</div>
          </div>
        </div>
      </div>

      <el-pagination
        background
        class="pageCenter"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="5"
        :page-size="pagesize"
        :total="list.length"
        layout="prev, pager, next"
      >
        <!-- layout="prev, pager, next,jumper" -->
      </el-pagination>

      <el-dialog
        :visible.sync="tklDialog.dialog"
        width="70%"
        custom-class="myDialog"
        center
      >
        <ClipBoard :inputData=tklDialog.dialogValue />
      </el-dialog>
      <div class="line"></div>
    </div>
    <el-backtop :bottom="100">
      <div class="el-icon-caret-top"></div>
    </el-backtop>
  </div>
</template>

<script>
import * as api from "../../network/api";
import ClipBoard from "../clipboard/index.vue";
export default {
  name: "Shop",
  components: { ClipBoard },
  data () {
    return {
      identifyDialogInput: '',
      identifyDialog: false,
      afterIdentifyDialog: false,
      tklDialog: {
        dialog: false,
        dialogValue: ''
      },
      pagesize: 20,//默认分页每页数据量
      currentPage: 1,//默认展示第一页数据
      list: [],//产品列表
    };
  },
  created () {
    this.init();
  },
  filters: {
    parseInt: function (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    init () {
      this.getShoList()

    },
    toDetails (id) {
      this.$router.push({
        path: "/GoodsDeails", name: "GoodsDeails", query: {
          goodsId: id
        }
      });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    identifyDialogSub () {
      this.identifyDialog = false
      //请求解析接口
      api.tklParsing(this.identifyDialogInput)
        .then((res) => {
          //没有解析成功提示
          if (res.code == '20003') {
            this.$message.error(res.msg);
            this.identifyDialogInput = ''
          } else if (res.code == '0') {
            //清空输入框
            this.identifyDialogInput = ''
            this.$message.success('解析成功请等待弹窗');
            //请求转连接 绑定 渠道ID //存在写死渠道IDbug
            api.getPrivilegeLink(res.data.goodsId, localStorage.getItem('channelId'))
              .then((res) => {
                // this.tklDialog.dialogValue = '0(' + res.data.tpwd + ')/'
                this.tklDialog.dialogValue = res.data.tpwd
                this.tklDialog.dialog = true
                console.log(res.data.tpwd);
              }).catch((err) => {
                console.log(err);
              });
          }
        }).catch((err) => {
          this.$message.error(err);
        });
    },
    tkl (id) {
      api.getPrivilegeLink(id, localStorage.getItem('channelId'))
        .then((res) => {
          // this.tklDialog.dialogValue = '0(' + res.data.tpwd + ')/'
          this.tklDialog.dialogValue = res.data.tpwd
          this.tklDialog.dialog = true
          console.log(res.data.tpwd);
        }).catch((err) => {
          console.log(err);
        });
    },
    getShoList () {
      api.shopList()
        .then((res) => {
          this.list = res.data
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
#shop {
  .bg {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: -1;
  }
  .navTop {
    margin-top: 50px;
  }
  .identify {
    width: 100%;
    height: 50px;
    color: #898070;
    position: fixed;
    top: 0;
    background: #fdd48a;
    text-align: center;
    line-height: 50px;
  }
}

.bigBox {
  padding-left: 15px;
  padding-right: 15px;
  .pageCenter{
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .line {
    padding-bottom: 51px;
  }
  .itemBox {
    display: flex;
    margin-top: 15px;
    .itemImg {
      border-radius: 10px;
    }
    .itemRight {
      margin-left: 10px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .price {
        color: #fe355d;
        .lower {
          padding-right: 10px;
          background: #ff6a69;
          color: #ffffff;
          padding-left: 10px;
        }
      }
      .buyButton {
        height: 35px;
        background: url(https://web.cms.haodanku.com/static/img/todayBg.png)
          center no-repeat;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 7px;
        font-size: 15px;
        justify-content: space-between;
      }
    }
  }
}
</style>