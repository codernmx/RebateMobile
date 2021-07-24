<template>
  <!-- 头部 -->
  <div id="nav">
    <div>
      <div class="nav">
        <div class="el-icon-arrow-left fz-xl"></div>
        <div class="diary">编程导航</div>
        <div class="el-icon-refresh fz-xl"></div>
      </div>

      <vue-particles
        color="#FF5777"
        :particleOpacity="0.6"
        :particlesNumber="80"
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

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="开发必备"
          name="first"
        >
          <h4 style="margin-bottom:15px;">在线文档</h4>
          <el-card
            class="box-card"
            v-for="item in infoList"
            :key="item.id"
          >
            <div
              class="nav_box"
              @click="toDetails(item)"
            >
              <img
                class="logo"
                :src="item.logoSrc"
                alt=""
              >
              <div>{{item.name}}</div>
              <div>{{item.time}}</div>
            </div>
          </el-card>
          <div class="line"></div>
        </el-tab-pane>
        <!-- <el-tab-pane label="编程语言" name="second">编程语言</el-tab-pane> -->
        <el-tab-pane
          label="基础教程"
          name="third"
        >
          <a href="https://www.runoob.com/html/html-tutorial.html">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/1_6.jpg"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>HTML学习教程</div>
                <div></div>
              </div>
            </el-card>
          </a>
          <a href="https://www.runoob.com/css/css-tutorial.html">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/css.png"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>CSS3学习教程</div>
                <div></div>
              </div>
            </el-card>
          </a>
          <a href="https://www.runoob.com/js/js-tutorial.html">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/1_5.png"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>Javascript学习教程</div>
                <div></div>
              </div>
            </el-card>
          </a>
        </el-tab-pane>
        <el-tab-pane
          label="求职宝典"
          name="fourth"
        >

          <a href="https://wow.liepin.com">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/lp.png"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>猎聘内推</div>
                <div></div>
              </div>
            </el-card>
          </a>

          <a href="https://www.zhaopin.com/">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/zl.jpg"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>智联内推</div>
                <div></div>
              </div>
            </el-card>
          </a>
          <a href="https://www.nowcoder.com/career/referral/157">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/360.jpg"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>360内推</div>
                <div></div>
              </div>
            </el-card>
          </a>

          <a href="https://www.wutongguo.com/">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/wtg.jpg"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>梧桐果内推</div>
                <div></div>
              </div>
            </el-card>
          </a>

          <a href="https://www.zhipin.com">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/boss.png"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>boss内推</div>
                <div></div>
              </div>
            </el-card>
          </a>

        </el-tab-pane>
        <el-tab-pane
          label="福利"
          name="five"
        >
          <a href="https://docs.qq.com/doc/DS0pEVGpzR3dHbWNL">
            <el-card class="box-card">
              <div class="nav_box">
                <img
                  class="logo"
                  src="https://file.nmxgzs.cn/upload/aly.jpg"
                  alt=""
                >
                <!-- <div>https://wow.liepin.com</div> -->
                <div>阿里云扩容码</div>
                <div></div>
              </div>
            </el-card>
          </a>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as api from "../../network/api";
export default {
  name: "Nav",
  data () {
    return {
      activeName: 'first',
      infoList: [
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_1.jpg',
          name: 'ApacheCN-文档社区',
          time: '2021-03-20',
          url: 'http://docs.apachecn.org/',
          details: '一些志同道合的小伙伴决定一起来装逼，来组织众多的中文文档翻译活动，并维护一个人工智能垂直社区（当然不止是人工智能）。'
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_2.png',
          name: 'jQuery API中文文档',
          time: '2021-03-20',
          url: 'https://jquery.cuishifeng.cn/',
          details: 'jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（框架）于2006年1月由John Resig发布。jQuery设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。'
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_3.png',
          name: 'React.js官方文档',
          time: '2021-03-20',
          url: 'https://reactjs.org/docs/getting-started.html',
          details: 'React是用于构建用户界面的JavaScript库，起源于Facebook的内部项目，因为该公司对市场上所有 JavaScript MVC框架，都不满意，就决定自己写一套，用来架设Instagram的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。'
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_4.png',
          name: 'Nodejs中文教程文档',
          time: '2021-03-20',
          url: 'http://nodejs.cn/learn',
          details: 'Node.js发布于2009年5月，由Ryan Dahl开发，是一个基于Chrome V8引擎的JavaScript运行环境，使用了一个事件驱动、非阻塞式I/O模型，让JavaScript 运行在服务端的开发平台，它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言。'
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_5.png',
          name: 'JavaScript API 文档',
          time: '2021-03-20',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
          details: 'JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。 '
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_6.jpg',
          name: 'HTML API 文档',
          time: '2021-03-20',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
          details: 'HTML的全称为超文本标记语言，是一种标记语言。它包括一系列标签．通过这些标签可以将网络上的文档格式统一，使分散的Internet资源连接为一个逻辑整体。HTML文本是由HTML命令组成的描述性文本，HTML命令可以说明文字，图形、动画、声音、表格、链接等'
        },
        {
          logoSrc: 'https://file.nmxgzs.cn/upload/1_7.png',
          name: 'w3school',
          time: '2021-03-20',
          url: 'https://www.w3school.com.cn/',
          details: 'W3Cschool是一个专业的编程入门学习及技术文档查询应用，提供包括HTML，CSS，Javascript，jQuery，C，PHP，Java，Python，Sql，Mysql等编程语言和开源技术的在线教程及使用手册，是类似国外w3schools的学习社区及菜鸟编程平台。'
        }
      ]
    };
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      api.post('xxx/login', {
        user: '123',
        pass: '123'
      }).then((res) => {
        console.log(res)
        localStorage.token = res.token;
      })

      setTimeout(() => {
        api.post('xxx/index', {
          user: '123',
          pass: '123'
        }).then((res) => {
          console.log(res)
        })
      }, 5000);
    },
    //跳转
    toDetails (row) {
      console.log(row)
      this.$router.push({
        name: "NavDetails",
        params: {
          info: row,
        }
      });
    },
    handleClick (tab, event) {
    }
  }
};
</script>

<style scoped>
#nav {
  padding-left: 15px;
  padding-right: 15px;
}
.bg {
  width: 100%;
  position: absolute;
  z-index: -1;
}
.nav_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 50px;
  height: 50px;
}
.line {
  margin-bottom: 50px;
}
.box-card {
  margin-bottom: 5px;
}
</style>