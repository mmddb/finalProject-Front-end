<template>
  <container>
    <el-table
        :data="tableData"
        border
        :header-row-style="{height:'20px'}"
        style="width: 780px">
      <el-table-column
          fixed
          prop="date"
          label="Date"
          width="150">
      </el-table-column>

      <el-table-column
          prop="startAddress"
          label="startAddress"
          width="200">
      </el-table-column>

      <el-table-column
          prop="endAddress"
          label="endAddress"
          width="200">
      </el-table-column>
      <el-table-column
          prop="cargoType"
          label="Type"
          width="80">
      </el-table-column>

      <el-table-column
          label="Do something"
          width="110">
        <template slot-scope="scope">
<!--          @click="dialogVisible = true"  handleClick(scope.row) -->
          <el-button @click="handleClick(scope.row)" type="text" size="small">More</el-button>
          <el-button @click="fetchOrder(scope.row)" type="text" size="small">Accept</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-table-footer store>
      <div class="block">
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
      </div>
    </el-table-footer>
    <el-dialog
        title="Details"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div> Telephone: {{infoData.telephone}}</div>
      <div> startPostcode: {{infoData.startPostcode}} </div>
      <div> endPostcode: {{infoData.endPostcode}} </div>
      <div> CargoInfo: {{infoData.cargoInfo}} </div>
      <div> Time: {{infoData.time}} </div>

      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">OK</el-button>
  </span>
    </el-dialog>
  </container>
</template>

<script>
import axios from "axios";

export default {
  beforeCreate() {
    //
    axios.get('http://localhost:8082/checkOrders')
        .then((res) => {
          // res -> data
          this.tableData = res.data;
          console.log("res :" + res);
        }).catch((error)=>{
      console.log(error);
    });
  },
  methods: {
    refresh(){
      axios.get('http://localhost:8082/checkOrders')
          .then((res) => {
            // res -> data
            this.tableData = res.data;
            console.log("res :" + res);
          }).catch((error)=>{
        console.log(error);
      });
    },
    handleClick(row) {
      // 弹框，显示具体信息
      this.dialogVisible = true;
      console.log(row);
      this.infoData.telephone = row.telephone;
      this.infoData.startPostcode = row.spostcode;
      this.infoData.endPostcode = row.epostcode;
      this.infoData.cargoInfo = row.cargoInfo;
      this.infoData.time = row.time;
    },
    fetchOrder(row) {
     // 发送，把 用户名，和 订单 id 放到 请求体中
     var driverId = JSON.parse(localStorage.getItem('access-admin')).result.id;
     var orderId = row.orderId;

     console.log(driverId, orderId);
     axios.get("http://localhost:8082/updateOrderStatus", {
       params : {
         driverId: driverId,
         orderId: orderId,
         status: 'FETCHED'
       }
     }).then(rep => {
        if(rep.data === true){
          this.$fire({
            title: "Congrats !",
            text: "Accept successful",
            type: "success",
            timer: 3000
          });
          this.refresh();
        }
       console.log(rep);}
     )},
    handleClose(done) {
      done();
    }
  },

  data() {
    return {
      dialogVisible: false,
      tableData: [{
        date: '',
        start: '',
        end: '',
        cargoType: '',
        telephone:'',
        time:''
      }],
      infoData: {
        cargoInfo: '',
        telephone:'',
        comments:'',
        startPostcode:'',
        endPostcode:'',
        time:''
      }
    }
  }
}
</script>

<style>
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 10px;
}
</style>


