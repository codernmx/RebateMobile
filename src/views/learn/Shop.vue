
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
      v-loading="identifyLoading"
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
      width="80%"
      center
    >
      <div class="identifyInfoBox">
        <div class="imgTitle">
          <img
            :src="identifyInfo.itempic"
            alt=""
            width="105"
            height="105"
            class="imgTitleImg"
          >
          <div class="titleAmount">
            {{identifyInfo.itemtitle}}
            <div class="amount">优惠券{{identifyInfo.couponmoney}}元</div>
          </div>
        </div>
        <div class="priceBox">
          券后<span class="actualPrice">￥{{identifyInfo.itemendprice}}</span>
          <span class="originalPrice">￥{{identifyInfo.itemprice}}</span>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="toDetails(globalGoodsId)">查看详情</el-button>
        <el-button
          type="danger"
          @click="buyNow(globalGoodsId)"
        >购买返{{identifyInfo.ebateAmount | parseInt}}</el-button>
      </span>
    </el-dialog>

    <div style="overflow: auto;height:1000px;">
      <el-carousel
        :interval="2000"
        arrow="always"
        height="150px"
        indicator-position="none"
      >
        <el-carousel-item
          v-for="(item,index) in taoCarouseList"
          :key="index"
        >
          <el-image
            :src="item.topicImage"
            fit="fit"
          ></el-image>
        </el-carousel-item>
      </el-carousel> 
      <div
        v-if="list.length>1"
        class="bigBox"
        v-infinite-scroll="load"
      >
        <div
          v-for="(item,index) in list"
          :key="index"
          class="itemBox"
        >
          <img
            :src="item.mainPic"
            alt=""
            width="105"
            height="105"
            class="itemImg"
          >
          <div class="itemRight">
            <div @click="toDetails(item.goodsId)">{{item.dtitle}}</div>
            <div class="price"> <span class="lower">券：{{item.couponPrice}}元</span> 券后：￥<span>{{item.actualPrice}}</span></div>
            <div class="buyButton">预估收益：{{(item.actualPrice * item.commissionRate)/100 | parseInt}} <div
                style="color:white"
                @click="tkl(item.goodsId)"
              >立即抢</div>
            </div>
          </div>
        </div>

        <!-- <el-pagination
        background
        class="pageCenter"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="5"
        :page-size="pagesize"
        :total="200"
        layout="prev, pager, next"
      >
      </el-pagination> -->
        <!-- layout="prev, pager, next,jumper" -->

        <el-dialog
          :visible.sync="tklDialog.dialog"
          width="70%"
          custom-class="myDialog"
          center
        >
          <ClipBoard :inputData=tklDialog.dialogValue />
        </el-dialog>
      </div>
    </div>
    <div class="line"></div>
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
      count: 0,
      taoCarouseList: [],//存轮播图
      globalGoodsId: null,//全局商品id
      identifyLoading: false,//解析识别加载动画
      identifyInfo: {
        ebateAmount: '',
        originInfo: {
          image: ''
        }
      },//识别之后的信息
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
      if (value) {
        return Number(value).toFixed(2)
      } else {
        return value
      }
    }
  },
  methods: {
    init () {
      this.getShopList(1)
      this.getCarouseList()
    },
    load () {
      console.log('11')
      this.list.push(this.list[5])
    },
    load1 () {
      this.count += 2
      console.log(this.count)
    },
    buyNow (goodsId) {
      this.afterIdentifyDialog = false
      const channelId = localStorage.getItem('channelId')
      api.getPrivilegeLink(goodsId, channelId)
        .then((res) => {
          this.tklDialog.dialogValue = res.data.longTpwd
          this.tklDialog.dialog = true
          console.log(res.data.tpwd);
        }).catch((err) => {
          console.log(err);
        });
    },
    toDetails (id) {
      this.afterIdentifyDialog = false //关弹窗 （不影响用一个）
      this.$router.push({
        path: "/GoodsDeails", name: "GoodsDeails", query: {
          goodsId: id
        }
      });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
      console.log('val', val)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log('currentPage', currentPage)
      this.getShopList(currentPage)
    },
    identifyDialogSub () {
      this.identifyLoading = true
      api.tklParsing(this.identifyDialogInput)//请求解析接口
        .then((res) => {
          if (res.code == '0') {
            this.identifyDialogInput = ''//清空输入框
            //请求转连接 绑定 渠道ID //存在写死渠道IDbug
            // console.log('解析成功', res)
            this.globalGoodsId = res.data.goodsId
            api.hdkGetGoodsDetails(res.data.goodsId)
              .then((res) => {
                console.log('详情', res);
                if (res.msg != '该宝贝详情不存在。') {
                  this.identifyInfo = res.data//解析得到的值
                  this.identifyInfo.ebateAmount = res.data.tkmoney
                  this.closeDialogLoad()
                  this.afterIdentifyDialog = true
                } else {
                  this.$message.error('当前商品不可转换，或者未加入淘宝客返利');
                  this.closeDialogLoad()
                }
                //算返利金额
              }).catch((err) => {
                console.log(err);
                this.closeDialogLoad()
              });
          } else {//没有解析成功提示
            this.closeDialogLoad()
            this.$message.error(res.msg);
            this.identifyDialogInput = ''
          }
        }).catch((err) => {
          this.$message.error(err);
        });
    },
    closeDialogLoad () {
      this.identifyLoading = false
      this.identifyDialog = false
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
    getShopList (pageId) {
      api.getGoodsLists(pageId)
        .then((res) => {
          console.log(res)
          this.list = res.data
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    getCarouseList () {
      api.get('/tbk/get/carouseList')
        .then((res) => {

          res.data.forEach(item => {
            if (item.sourceType == 2)
              this.taoCarouseList.push(item)
          });

        })
        .catch((err) => {
          this.$message.error(err);
        });
    }
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
.identifyInfoBox {
  .imgTitle {
    display: flex;
    .imgTitleImg {
      margin-right: 10px;
      border-radius: 5px;
    }
    .amount {
      text-align: center;
      color: #ffffff;
      width: 100px;
      height: 30px;
      line-height: 30px;
      background: #ff6a69;
      border-radius: 5px;
    }
    .titleAmount {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
  .priceBox {
    line-height: 34px;
    text-align: center;
    margin-top: 10px;
    .actualPrice {
      font-size: 26px;
      color: #f40;
    }
    .originalPrice {
      margin-left: 15px;
      font-size: 26px;
      color: #b1a8a8;
      text-decoration: line-through;
    }
  }
}

.bigBox {
  padding-left: 15px;
  padding-right: 15px;
  .pageCenter {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .line {
    padding-bottom: 51px;
  }
  .bigBox {
    height: 100vh;
    overflow: auto;
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