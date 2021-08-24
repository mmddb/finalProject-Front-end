<template>


    <el-form>
      Name: <el-input  :value="user.name" :placeholder="user.name" :disabled="edit"></el-input>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>


      <el-input  placeholder="请输入密码" v-model="user.password" show-password></el-input>
    </el-form>

</template>

<script>


//import axios from "axios";

export default {
  name: "MyInfo",

  beforeCreate() {
    // this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.name)

  },
  data() {
    return {
      edit: false,
      user: {
        id:'',
        name:'',
        email:'',
        telephone:'',
        type:'',
        password:''
      },
    }
  },


}
</script>


