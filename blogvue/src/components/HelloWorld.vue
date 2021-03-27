<!--  -->
<template>
  <div class="content">
    <div class="box">
      <div>
        <el-button @click="down">获取设备信息</el-button>
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
      <div>
        <div>
          <el-button @click="down2" disabled>获取设备列表</el-button>
          <el-button @click="down4" disabled>一键插入</el-button>
          <el-button @click="btn">先测试</el-button>
        </div>
        <div>
          <el-table :data="datalist" style="width: 100%" height="480">
            <!-- <el-table-column label="姓名" width="100">
              <template slot-scope="scope">
                <el-tag size="medium">{{ scope.row.deviceid }}</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column prop="deviceid" label="deviceid" width="150">
            </el-table-column>
            <el-table-column
              prop="factoryApikey"
              label="factory_apikey"
              width="300"
            >
            </el-table-column>
            <el-table-column prop="staMac" label="sta_mac" width="200">
            </el-table-column>
            <el-table-column prop="sapMac" label="sap_mac" width="200">
            </el-table-column>
            <el-table-column
              prop="deviceModel"
              label="device_model"
              width="200"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <ListTable />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ListTable from "./listtable";
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

            // let json3 = json.replace(/ /gi, "");
            // let json4 = json3.replace(/'/gi, '"');
            // let err1 = JSON.parse(json4);
            // if (err1.error == 0) {
            //   this.$message({
            //     message: err1.msg,
            //     showClose: true,
            //     type: "error",
            //   });
            // } else {

            //   }
            let datalist = this.down3(json, 1);
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
    down2() {
      if (this.datas.availableLicenses) {
        let params = {
          count: "2",
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
              let datalist = this.down3(json, 2);
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
    down3(json, num) {
      let json1 =
        num == 1 ? json.replace(/\[\"\{/, "[{") : json.replace(/\[\'\{/, "[{");
      let json2 =
        num == 1
          ? json1.replace(/\}\"\]/, "}]")
          : json1.replace(/\}\'\]/, "}]");
      let json3 = json2.replace(/ /gi, "");
      let json4 = JSON.parse(json3); //转json对象
      return json4;
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
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
        '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
      ];

      let jj = `${j1}`;
      let shuang = jj.replace(/\'/gi, '"');
      let shuang1 = shuang.replace(/ /gi, "");
      let shuang2 = shuang1.replace(/\[\"{/gi, "[{");
      let shuang3 = shuang2.replace(/\}"]/gi, "}]");
      let shuang4 = shuang3.replace(/\_a/gi, "A");
      let shuang5 = shuang4.replace(/\_m/gi, "M");
      let tu = "[" + shuang5 + "]";
      console.log(JSON.parse(tu));

      this.datalist = JSON.parse(tu);
      this.savelist(JSON.parse(tu));

      /**
       * 下一步将数据一条条插入数据库中
       * 批量插入
       */
    },
    savelist(savelist) {
      let url = "http://localhost:8081/savelist";
      let params = this.datalist;
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
              type: "succes",
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