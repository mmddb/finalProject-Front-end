<template>
  <el-container>
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
          label="Operation"
          width="110">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">More</el-button>
          <el-button @click="showRoutes(scope.row)" type="text" size="small">Route</el-button>
<!--          <el-button @click="quoteOrder(scope.row)" type="text" size="small">Quote</el-button>-->
          <el-button @click="showQuotes(scope.row)" type="text" size="small">Quotes</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Quotes" :visible.sync="quotesVisible"
               width="60%" :before-close="handleClose">
      <Quotes :orderid="orderId" ></Quotes>
      <span slot="footer" class="dialog-footer">
        <el-input size="small" placeholder="input your quote" v-model="quote"></el-input>
        <el-button type="primary" @click="quoteOrder">Submit</el-button>
      </span>
    </el-dialog>


    <el-dialog title="Details" :visible.sync="dialogVisible"
        width="40%" :before-close="handleClose">
      <div> Telephone: {{infoData.telephone}}</div>
      <div> startPostcode: {{infoData.startPostcode}} </div>
      <div> endPostcode: {{infoData.endPostcode}} </div>
      <div> CargoInfo: {{infoData.cargoInfo}} </div>
      <div> Comments: {{infoData.comments}} </div>
      <div> Time: {{infoData.time}} </div>

<!--      <span slot="footer" class="dialog-footer">-->
<!--&lt;!&ndash;    <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
<!--        <el-button type="primary" @click="dialogVisible = false">OK</el-button>-->
<!--      </span>-->
    </el-dialog>

    <el-dialog title="Routes" :visible.sync="routesVisible">
      <div>distance : {{this.distance}}</div>
      <div>duration : {{this.duration}}</div>
      <GmapMap :zoom="7" :center="{ lat: 10, lng: 0 }">
        <DirectionsRenderer travelMode="DRIVING" :origin="startpoint" :destination="endpoint" />
      </GmapMap>
    </el-dialog>

  </el-container>
</template>

<script>
import axios from "axios";
import Quotes from "@/components/Quotes";
import DirectionsRenderer from "@/components/DirectionsRenderer1";
// import RouteInfo from "@/components/RouteInfo";
export default {
  components: {
    Quotes,
    DirectionsRenderer
  },

  // 写
  beforeCreate() {

    axios.get('http://localhost:8082/order/all')
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
      axios.get('http://localhost:8082/order/all')
          .then((res) => {
            // res -> data
            this.tableData = res.data;
            console.log("res :" + res);
          }).catch((error)=>{
        console.log(error);
      });
    },

    // 展示 quote， set orderId
    showQuotes(row) {
      this.orderId = row.orderId;
      console.log(row.orderId);
      this.quotesVisible = true;
    },

    showRoutes(row) {
      this.startpoint = row.startAddress;
      this.endpoint = row.endAddress;
      this.distance = localStorage.getItem('distance');
      console.log(this.distance);
      this.duration = localStorage.getItem('duration')
      this.routesVisible = true;
    },

    handleClick(row) {
      // 弹框，显示具体信息
      console.log(row);

      this.infoData.telephone = row.telephone;
      this.infoData.startPostcode = row.spostcode;
      this.infoData.endPostcode = row.epostcode;
      this.infoData.cargoInfo = row.cargoInfo;
      this.infoData.time = row.time;
      this.infoData.orderId = row.orderId;
      this.dialogVisible = true;
    },

    fetchOrder(row) {
     // 发送，把 用户名，和 订单 id 放到 请求体中
     var driverId = JSON.parse(localStorage.getItem('user')).id;
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

    // 发送数据
    quoteOrder(){
      this.userId = JSON.parse(localStorage.getItem('user')).id;
      axios.post("http://localhost:8082/quote?driverId=" + this.userId
          + "&orderId=" + this.orderId + "&quote=" + this.quote,
      ).then((resp) => {
        console.log(resp);
      })
    },

    handleClose(done) {
      done();
    }
  },

  data() {
    return {
      // route info
      startpoint:'',
      endpoint:'',
      distance:'',
      duration:'',

      // quote info
      quote:'', // driver's quote
      orderId:'',
      userId:'',

      // control info
      dialogVisible: false,
      quotesVisible: false,
      routesVisible: false,
      tableData: [{
        date: '',
        start: '',
        end: '',
        cargoType: '',
        telephone:'',
        time:'',
        orderId:''
      }],
      infoData: {
        start:'',
        end:'',
        cargoInfo: '',
        telephone:'',
        comments:'',
        startPostcode:'',
        endPostcode:'',
        time:'',
        orderId:'',
        duration:'',
        distance:''
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


