<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img
        slot="item-icon"
        src="~assets/img/tabbar/home.svg"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">日记</div>
    </tab-bar-item>

    <tab-bar-item path="/nav">
      <img
        slot="item-icon"
        src="~assets/img/tabbar/category.svg"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">精选</div>
    </tab-bar-item>

    <tab-bar-item path="/shop">
      <img
        slot="item-icon"
        src="~assets/img/tabbar/center.svg"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/center_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/message">
      <img
        slot="item-icon"
        src="~assets/img/tabbar/shopcart.svg"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">9块9包邮</div>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <img
        slot="item-icon"
        src="~assets/img/tabbar/profile.svg"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
