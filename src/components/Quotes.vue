<template>
  <el-table-co :data="quotes"  border
            :header-row-style="{height:'20px'}"
            style="width: 400px">

    <el-table-column
        prop="createdate"
        label="Time"
        width="200">
    </el-table-column>

    <el-table-column
        prop="driverId"
        label="Driver"
        width="100">
    </el-table-column>

    <el-table-column
        prop="quote"
        label="Quote"
        width="100">
    </el-table-column>

  </el-table-co>
</template>

<script>
import axios from "axios";
export default {
  props:{
    orderid: String
  },
  name: "Quotes",
  created() {
    axios.get("http://localhost:8082/quote?orderId="+this.orderid
    ).then((res) => {
      // res -> data
      this.quotes = res.data;
      console.log("res :" + res);
    }).catch((error)=>{
      console.log(error);
    });

  },
  data() {
    return {
      quotes:[{
        quoteId:'',
        orderId:'',
        createdate: '',
        quote: '',
        driverId:''
      }]
    }
  }
}
</script>


