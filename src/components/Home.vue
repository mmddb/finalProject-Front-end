<template>

  <el-container style="height: 90%; width: 100%; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="1" @click="showPublish" v-if="usertype === 'CLIENT'"><i class="el-icon-circle-plus"></i>
          Publish</el-menu-item>
        <el-menu-item index="2" @click="showOrderList"  v-if="usertype === 'DRIVER'"><i class="el-icon-s-marketing" ></i>Markets</el-menu-item>
        <el-menu-item index="3" @click="showMyOrders"><i class="el-icon-s-order" ></i>MyOrders</el-menu-item>
        <el-menu-item index="4" @click="showReviews"><i class="el-icon-s-comment"></i>Reviews</el-menu-item>
        <el-menu-item index="5" @click="showMyInfo"><i class="el-icon-info"></i>MySelf</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 500px; width: 500px; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-button type="primary" icon="el-icon-user">{{username}}</el-button>
      </el-header>

      <el-main style="width: 800px">
<!--          <el-table-column prop="date" label="日期" width="140">-->
<!--          </el-table-column>-->
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
<!--          <publish-order></publish-order>-->
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import PublishOrder from "@/components/PublishOrder";
import OrderList from "@/components/OrderList";
import MyOrders from "@/components/MyOrders";
import Welcome from "@/components/Welcome";
import Reviews from "@/components/Reviews";
import MyInfo from "@/components/MyInfo";

export default {
  name: "Home",
  components: {PublishOrder, OrderList, MyOrders, Reviews, MyInfo},
  comments:{
    PublishOrder
  },
  methods:{
    showPublish: function(){
      this.currentView = "PublishOrder";
    },
    showReviews: function(){
      this.currentView = "Reviews";
    },
    showMyInfo: function(){
      this.currentView = "MyInfo";
    },
    showMyOrders: function(){
      this.currentView = "MyOrders";
    },
    showOrderList: function(){
      this.currentView = "OrderList";
    }
  },
  data() {
    return {
      usertype:"",
      username: "",
      currentView: "",
      form: {
        message: "hello"
      },
    }
  },
  created() {
    this.currentView = Welcome;
    this.username = JSON.parse(window.localStorage.getItem("user")).name;
    this.usertype = JSON.parse(window.localStorage.getItem("user")).type;
    Welcome.data().username = this.username;
  }
}
</script>
