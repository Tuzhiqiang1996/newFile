<!--  -->
<template>
  <div class="devbox">
    <div style="dispaly:felx">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="设备id">
    <el-input v-model="formInline.devid" placeholder="设备id"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <div style="margin: 0 auto; display: table">
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        height="288"
      >
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
        <el-table-column prop="created" label="created" width="150">
        </el-table-column>

        <!-- <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div style="text-align: center; padding: 20px 0">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="currentpage"
        :page-size="pagesize"
        @current-change="pages"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: [],
  data() {
    //这里存放数据
    return {
      loading: true,
      tableData: [],
      total: 0, //总条目数
      currentpage: 1, //当前页数
      pagesize: 5, //每页显示条目个数
      data: {}, //数据
      formInline:{
        devid:''
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    pages(pages) {
      let url = `http://localhost:8081/devquery?currentPage=${pages}&deviceid=${this.formInline.devid}`;

      this.$axios
        .get(url  )
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
            this.currentpage = res.data.data.current;
            this.pagesize = res.data.data.size;

          } else {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "error",
            });
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
    onSubmit(){
      this.pages(1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.pages(1);
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
  flex-direction: column;
}
</style>