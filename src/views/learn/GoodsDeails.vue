<template>
  <div>
    <el-carousel v-if="isImgs" :interval="3000" arrow="always" indicator-position="none">
      <el-carousel-item v-for="(item,index) in detailPics" :key="index">
        <el-image
          :src="item.img"
          fit="contain">
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-carousel v-else :interval="3000" arrow="always" indicator-position="none">
      <el-carousel-item v-for="(item,index) in imgs" :key="index">
        <el-image
          :src="item"
          fit="contain">
        </el-image>
      </el-carousel-item>
    </el-carousel>

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
      info:{},//详情信息
      detailPics:[],//转换后的图片
      imgs:[],//转换后的图片
      isImgs:null,
    };
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      api.getGoodsDetails(this.$route.query.goodsId)
        .then((res) => {
          this.info =res.data
          if(res.data.detailPics){
            this.detailPics = JSON.parse(res.data.detailPics)
            this.isImgs = true
            console.log(this.detailPics)
          }else{
             this.imgs.push(res.data.imgs)
          }
        }).catch((err) => {
          console.log(err);
        });
        url = ''
        data = ''
        
        api.get('/tbk/get/goods/details',{id:this.$route.query.goodsId,ssss:'555'}).then((res) => {
            console.log('+++++++++++++',res)
        }).catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>