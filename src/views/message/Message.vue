<template>
  <div id="message">
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">9.9包邮</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>

    <div
      class="bigBox"
      v-loading="loading"
    >
      <div
        v-for="(item,index) in nineGoodsList"
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
    </div>
    <!-- <div class="learnWords">
                        <p>❤️因为我选择了你❤️</p>
                        <p>❤️所以我不会再爱任何人了❤️</p>
                        <p>既然遇见你</p>
                        <p>❤️希望余生都是你❤️</p>
                        <p>今生今世除了你</p>
                        <p>我谁都不想要</p>
                        <p>❤️你若一直在，我便一直爱❤️</p>
                        <p>今生无怨无悔</p>
                        <p>若有来世</p>
                        <p>❤️我还会选择爱你❤️</p>
                </div> -->
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="50"
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
    <div style="margin-bottom: 50px"></div>
  </div>
</template>

<script>
import * as api from "../../network/api";
export default {
  name: "Message",
  components: {},
  data () {
    return {
      nineGoodsList: [],
      loading: true,
      message_list: [],
    };
  },
  created () {
    this.init();
    this.getNineGoodsList();
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
    //初始化数据，请求默认数据
    init () {
      api.get_message() //获取日记列表
        .then((res) => {
          console.log(res);
          this.message_list = res.DATA;
          this.loading = false
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNineGoodsList () {
      api.get('/tbk/get/nine/goodsList')
        .then((res) => {
          this.nineGoodsList = res.data.list
          console.log(res.data.list)
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>


<style lang="less" scoped>
#message {
  overflow-x: hidden;
}
.learnWords p {
  text-align: center;
  line-height: 36px;
  font-size: 18px;
  color: #f30;
}
.box {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #280bc1;
  font-size: 14px;
  color: #f65608;
}
.head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.send {
  display: flex;
}

.bg {
  width: 100%;
  height: 1140px;
  position: absolute;
  top: 0;
  z-index: -1;
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
</style>