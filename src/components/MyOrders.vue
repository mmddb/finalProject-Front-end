<template>
  <el-container>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          fixed
          prop="orderId"
          label="OrderId"
          width="80">
      </el-table-column>

      <el-table-column
          prop="startAddress"
          label="startAddress"
          width="150">
      </el-table-column>

      <el-table-column
          prop="endAddress"
          label="endAddress"
          width="150">
      </el-table-column>

      <el-table-column
          prop="cargoType"
          label="Type"
          width="100">
      </el-table-column>

      <el-table-column
          prop="status"
          label="status"
          width="110">
      </el-table-column>

      <el-table-column
          label="Operation"
          width="300">
        <template slot-scope="scope">
          <el-button @click="transportedOrder(scope.row)" v-if="scope.row.status === 'PAID'" type="text" size="small">Transported</el-button>
          <el-button @click="cancelOrder(scope.row)" v-if="scope.row.status === 'FETCHED' || scope.row.status === 'PUBLISHED' " type="text" size="small">Cancel</el-button>
          <el-button @click="confirmPayment(scope.row)" v-if="scope.row.status === 'FETCHED'" type="text" size="small">Paid</el-button>
          <el-button @click="makeReview(scope.row)" v-if="scope.row.status === 'TRANSPORTED'" type="text" size="small">Review</el-button>
          <el-button @click="confirmTransport(scope.row)" v-if="scope.row.status === 'TRANSPORTED'" type="text" size="small">Confirm</el-button>
          <el-button @click="handleClick(scope.row)"  type="text" size="small">Details</el-button>

        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="Review" :visible.sync="reviewVisible">
      <el-rate v-model="value"></el-rate>
      <el-input v-model="comment" type="textarea" placeholder="input your comments"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitReview()">Submit</el-button>
      </span>
    </el-dialog>


    <el-dialog
        title="More"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <span> Details </span>
      <div> Telephone: {{infoData.telephone}}</div>
      <div> startPostcode: {{infoData.startPostcode}} </div>
      <div> endPostcode: {{infoData.endPostcode}} </div>
      <div> CargoInfo: {{infoData.cargoInfo}} </div>
      <div> Time: {{infoData.time}} </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "MyOrders",
  userType: '',
  userId: '',
  beforeCreate() {
    this.userType = JSON.parse(localStorage.getItem('user')).type;
    this.userId = JSON.parse(localStorage.getItem('user')).id;

    axios.get('http://localhost:8082/order?userType=' + this.userType+'&userId='+this.userId, {
      headers:{
        token:localStorage.getItem('token')
      }
    }).then((res) => {
          // res -> data
          this.tableData = res.data;
          console.log("res :" + res);
          console.log(this.userType);
        }).catch((error)=>{
          console.log(error);
    });
  },
  methods: {
    refresh() {
      axios.get('http://localhost:8082/order?userType='+this.userType+'&userId='+this.userId)
          .then((res) => {
            this.tableData = res.data;
            console.log("res :" + res.data);
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

    cancelOrder(row) {
      console.log(row);
      axios.delete('http://localhost:8082/order',{
        params:{
          userId: this.userId,
          type: this.userType,
          orderId: row.orderId,
        }
      }).then((res) => {
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      });

    },
    confirmPayment(row) {
      console.log(row);
      axios.put('http://localhost:8082/order?userId='+ this.userId
          + '&type=' + this.userType + '&orderId=' + row.orderId
          + '&status='+'PAID'
      ).then((res) => {console.log(res);}).catch((error)=>{console.log(error);});
    },

    confirmTransport(row) {
      console.log(row);
      axios.put('http://localhost:8082/order?userId='+ this.userId
      + '&type=' + this.userType + '&orderId=' + row.orderId
          + '&status='+'COMPLETED'
      ).then((res) => {console.log(res);}).catch((error)=>{console.log(error);});
    },

    // make review
    makeReview(row) {
      console.log(row.orderId);
      console.log(row.driverId);
      this.reviewVisible = true;
      this.currentRow = row;
      console.log(this.currentRow);
    },
    submitReview(){
      console.log(this.value);
      console.log(this.comment);
      axios.post("http://localhost:8081/review",{
           comment : this.comment,
           clientId : this.userId,
           orderId: this.currentRow.orderId,
           driverId: this.currentRow.driverId,
           star: this.value
      })
    },

    transportedOrder(row) {
      axios.put('http://localhost:8082/order?userId='+ this.userId
          + '&type=' + this.userType + '&orderId=' + row.orderId
          + '&status='+'TRANSPORTED'
      ).then(rep => {
        if(rep.status === 200){
          this.$fire({
            title: "Congrats!",
            text: "Thanks for completed the service",
            type: "success",
            timer: 3000
          });
        }
        this.refresh();
      console.log(rep);}
      )},
    handleClose(done) {
      done();
    }
  },

  data() {
    return {
      // review data
      value:"",
      comment:"",
      currentRow: null,
      dialogVisible: false,
      reviewVisible: false,

      tableData: [{
        orderId:'',
        date: '',
        start: '',
        end: '',
        cargoType: '',
        telephone:'',
        time:'',
        status:'',
        driverId:'',  // driverId
      }],
      infoData: {
        status:'',
        cargoInfo: '',
        telephone:'',
        comments:'',
        startPostcode:'',
        endPostcode:'',
        time:'',
        driverId:''
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
.vue-map-container {
  height: 400px;
}
</style>



