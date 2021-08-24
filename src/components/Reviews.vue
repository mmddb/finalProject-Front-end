<template>
  <el-table
      :data="reviews"
      stripe
      style="width: 100%">
    <el-table-column
        fixed
        prop="orderId"
        label="Order"
        width="80">
    </el-table-column>
    <el-table-column
        fixed
        prop="date"
        label="Time"
        width="100">
    </el-table-column>
    <el-table-column
        fixed
        prop="star"
        label="Star"
        width="150">
      <template slot-scope="scope">
        <el-rate v-model="scope.row.star"></el-rate>
      </template>
    </el-table-column>
    <el-table-column
        fixed
        prop="comment"
        label="Comment"
        width="150">
    </el-table-column>

  </el-table>

</template>

<script>


import axios from "axios";

export default {
  name: "Reviews",

  beforeCreate() {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    axios.get('http://localhost:8081/review?userId='+this.userId, {
      headers:{
        'token' : localStorage.getItem('token')
      }
    }).then((res) => {
      // res -> data
      this.reviews = res.data;
      console.log("reviews :" + this.reviews);
    }).catch((error)=>{
      console.log(error);
    });
  },
  data() {
    return {
      userId:'',
      reviews: [{
        id:'',
        clientId:'',
        driverId:'',  // driverId
        orderId:'',
        star:'',
        date:'',
        comment:'',
      }],
    }
  },


}
</script>

