<template>
  <Form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Start">
          <el-input v-model="form.startAddress"></el-input>
        </el-form-item>
        <el-form-item label="Postcode">
          <el-input v-model="form.spostcode"></el-input>
        </el-form-item>
        <el-form-item label="End">
          <el-input v-model="form.endAddress"></el-input>
        </el-form-item>
        <el-form-item label="Postcode">
          <el-input v-model="form.epostcode"></el-input>
        </el-form-item>
        <el-form-item label="City">
          <el-select v-model="form.city" placeholder="Choose the city">
            <el-option label="Bristol" value="Bristol"></el-option>
            <el-option label="Bath" value="Bath"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Time">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Choose date" v-model="form.date" format="yyyy/MM/dd"
                            value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <!--        <el-time-picker placeholder="Choose time" v-model="form.time" style="width: 100%;"></el-time-picker>-->
            <el-input placeholder="input time" v-model="form.time"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="packaging">
          <el-switch v-model="form.packaging"></el-switch>
        </el-form-item>

        <el-form-item label="CargoType">
          <el-input placeholder="Furniture, Grocery, Instrument, others" v-model="form.cargoType"></el-input>
        </el-form-item>

        <el-form-item label="CargoInfo">
          <el-input placeholder="Cargo Information" v-model="form.cargoInfo"></el-input>
          <!--      <el-checkbox-group v-model="form.type">-->
          <!--        <el-checkbox label="Furniture" name="type"></el-checkbox>-->
          <!--        <el-checkbox label="Grocery" name="type"></el-checkbox>-->
          <!--        <el-checkbox label="Instrument" name="type"></el-checkbox>-->
          <!--        <el-checkbox label="Others" name="type"></el-checkbox>-->
          <!--      </el-checkbox-group>-->
        </el-form-item>

        <el-form-item label="Comments">
          <el-input type="textarea" v-model="form.other"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Publish Now</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </Form>



</template>

<script>
import axios from "axios";
export default {
  beforeCreate() {
    this.userType = JSON.parse(localStorage.getItem('user')).type;
    this.userId = JSON.parse(localStorage.getItem('user')).id;
  },
  name: "PublishOrder",
  data() {
    return {
      form: {
        startAddress: '',
        endAddress: '',
        spostcode:'',
        epostcode:'',
        packaging:'',
        city: '',
        date: '',
        time: '',
        cargoType: '',
        cargoInfo: '',
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('http://localhost:8082/order?clientId='+this.userId, this.form, {
        headers:{
          'token':JSON.parse(localStorage.getItem('token'))
        }
      })
          .then((res) => {
            if(res != null){
              this.$fire({
                title: "Congrats !",
                text: "Publish successful",
                type: "success",
                timer: 3000
              });
            }
            console.log("res :" + res);
          }).catch((error)=>{
        console.log(error);
      });
      console.log('submit!');
    }
  }
}
</script>


<style scoped>

</style>
