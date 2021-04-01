<!--  -->
<template>
  <div class="devbox">
    <div>
      <div>
        <el-button @click="down2" disabled>获取设备列表</el-button>
        <el-button @click="savelist"  >一键插入</el-button>
        <el-button @click="btn">先测试</el-button>
      </div>
      <div>
        <el-table :data="datalist" style="width: 100%" height="480"  >
          <el-table-column prop="deviceid" label="deviceid" width="120">
          </el-table-column>
          <el-table-column
            prop="factoryApikey"
            label="factory_apikey"
            width="300"
          >
          </el-table-column>
          <el-table-column prop="staMac" label="sta_mac" width="150">
          </el-table-column>
          <el-table-column prop="sapMac" label="sap_mac" width="150">
          </el-table-column>
          <el-table-column prop="deviceModel" label="device_model" width="150">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {format} from '../util/format'
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
    down2() {
      if (this.datas.availableLicenses) {
        let params = {
          count: "1",
          once: "4545466454466465",
        };

        this.$axios
          .post("/deviceid/", params, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "X-CK-Appid": "100014ba8f",
            },
          })
          .then((res) => {
            if (res.status == 200) {
              let json = res.data;
              console.log(res);
              let datalist = format(json);
              console.log("json", datalist[0]);

              this.datalist = datalist[0];
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
      } else {
        this.$message({
          message: "无数据！",
          showClose: true,
          type: "error",
        });
      }
    },
    //插入一条
    down4() {
      let url = "http://localhost:8081/save";
      let params = {
        deviceid: "Y",
        factoryApikey: "10013056c8",
        staMac: "9fb97b0e-5314-418e-8ecc-3af993729849",
        sapMac: "d0:27:02:60:aa:e0",
        deviceModel: "d0:27:02:60:aa:e1",
      };

      this.$axios
        .post(url, params)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "error",
            });
          }
          console.log(res);
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
    btn() {
      let j1 = [
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056c9", "factory_apikey": "54ee49f1-e499-4f1c-a404-06e08e313ffe", "sta_mac": "d0:27:02:60:aa:e2", "sap_mac": "d0:27:02:60:aa:e3", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056c9", "factory_apikey": "54ee49f1-e499-4f1c-a404-06e08e313ffe", "sta_mac": "d0:27:02:60:aa:e2", "sap_mac": "d0:27:02:60:aa:e3", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
      ];

      this.datalist = format(j1);
    },

      /**
       * 下一步将数据一条条插入数据库中
       * 批量插入
       */
    savelist( ) {
      let url = "http://localhost:8081/savelist";
      let savelist=this.datalist
      this.$axios
        .post(url, savelist, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "error",
            });
          }
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: res,
            showClose: true,
            type: "error",
          });
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
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
.devbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 5%;
}
</style>