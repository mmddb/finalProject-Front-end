<template>

  <el-container style="height: 500px; width: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>Publish</template>
          <el-menu-item-group>
<!--            <template slot="title">Menu</template>-->
            <el-menu-item index="1-1" @click="showPublish">New Order</el-menu-item>
            <el-menu-item index="1-2">...</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>Orders</template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="showOrderList" >Check Orders</el-menu-item>
            <el-menu-item index="2-2" @click="showMyOrders">My Orders</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>Info</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">Myself</el-menu-item>
            <el-menu-item index="3-2">Support</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; width: 800px; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{admin}}</span>
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
export default {
  name: "Home",
  components: {PublishOrder, OrderList, MyOrders},
  comments:{
    PublishOrder
  },
  methods:{
    showPublish: function(){
      this.currentView = "PublishOrder";
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
      admin: "",
      currentView: "",
      form: {
        message: "hello"
      },
    }
  },
  created() {
    this.admin = JSON.parse(window.localStorage.getItem("access-admin")).result.name;
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
