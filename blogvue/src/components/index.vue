<!--  -->
<template>
  <div class="box">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="">
      <el-tab-pane label="获取设备信息" name="first"><HelloWorld /></el-tab-pane>
      <el-tab-pane label="操作设备信息" name="second"><GetList /></el-tab-pane>
      <el-tab-pane label="获取设备列表" name="third"><Listtable /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HelloWorld from "./HelloWorld";
import Listtable from "./listtable";
import GetList from "./GetList";
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    HelloWorld,
    Listtable,
    GetList,
  },
  props: [],
  data() {
    //这里存放数据
    return {
      activeName: "first",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
.box {
  padding: 50px 50px 0 50px;
}
</style>