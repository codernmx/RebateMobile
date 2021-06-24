<template>
  <div>
    <div
      @click="back"
      class="el-icon-caret-left back"
    >返回首页</div>
    <el-carousel
      v-if="isImgs"
      :interval="3000"
      arrow="always"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item,index) in detailPics"
        :key="index"
      >
        <el-image
          :src="item.img"
          fit="contain"
        >
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-else
      :interval="3000"
      arrow="always"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item,index) in imgs"
        :key="index"
      >
        <el-image
          :src="item"
          fit="contain"
        >
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div>
      <div class="title">{{info.title}}</div>
      <div class="priceBox">
        <div>淘宝参考价￥<span class="priceOriginal">{{info.originalPrice}}</span></div>
        <div>网站到手价<span class="priceIcon">￥</span><span class="price">{{info.actualPrice}}</span></div>
      </div>
      <!-- <div>佣金比率{{info.commissionRate}}</div> -->
      <div class="shareBuyButton">
        <el-button type="danger">
          立即分享
        </el-button>
        <el-button type="danger">
          购买返{{((info.actualPrice *info.commissionRate)/100) | parseInt}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../network/api";
export default {
  name: 'Goodsdeails',
  components: {},
  directives: {},

  data () {
    return {
      info: {
        commissionRate:null,
        actualPrice:null,
      },//详情信息
      detailPics: [],//转换后的图片
      imgs: [],//转换后的图片
      isImgs: null,
    };
  },
  mounted () {
    this.init()
  },
  filters: {
    parseInt: function (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    init () {
      api.getGoodsDetails(this.$route.query.goodsId)
        .then((res) => {
          this.info = res.data
          if (res.data.detailPics) {
            this.detailPics = JSON.parse(res.data.detailPics)
            this.isImgs = true
            // console.log(this.detailPics)
          } else {
            this.imgs.push(res.data.mainPic)
            if(res.data.imgs){
              this.imgs.push(res.data.imgs)
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    back () {
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.back {
  font-size: 15px;
  margin: 15px 0 15px 0;
}
.title{
  text-align: center;
  margin-top: 15px;
}
.priceBox {
  margin: 15px 0 15px 0;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  .priceOriginal{
    font-size: 30px;
    line-height: 40px;
    margin-right: 15px;
    text-decoration:line-through
  }
  .priceIcon {
    color: #f40;
  }
  .price {
    font-size: 30px;
    line-height: 40px;
    color: #f40;
  }
}

.shareBuyButton {
  display: flex;
  justify-content: center;
}
</style>