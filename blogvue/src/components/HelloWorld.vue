<!--  -->
<template>
  <div class="content">
    <div class="box">
      <div>
        <el-button @click="down">获取设备信息</el-button>
         <span>设置IP:127.0.0.1 PROT:8199</span>
        <el-card style="width: 480px; margin: 24px 24px 24px 0">
          <div slot="header" class="clearfix">
            <span>设备信息</span>
          </div>
          <div>
            <div class="info">
              <p>设备名称：</p>
              <p>{{ datas.orderName }}</p>
            </div>
            <div class="info">
              <p>可用数量：</p>
              <p>{{ datas.availableLicenses }}</p>
            </div>
            <div class="info">
              <p>总数：</p>
              <p>{{ datas.totalLicenses }}</p>
            </div>
            <div class="info">
              <p>设备模式：</p>
              <p>{{ datas.productModel }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ListTable from "./listtable";
import {sum} from '../util/format'
export default {
  name: "helloworld",
  //import引入的组件需要注入到对象中才能使用
  components: { ListTable },
  props: [],
  data() {
    //这里存放数据
    return {
      datas: [],
      datalist: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    down() {
      let params = {
        email: "zchangjian@waterworld.com.cn",
        once: "4545466454466465",
      };
      this.$axios
        .post("/usableID/", params, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-CK-Appid": "100014ba8f",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            let json = res.data;
            let datalist =  sum(json);
            console.log("json", datalist[0]);
            this.datas = datalist[0];
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: err,
            showClose: true,
            type: "error",
          });
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}
.box {
  height: 100%;
  min-width: 960px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}
</style>