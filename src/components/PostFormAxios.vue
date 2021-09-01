
<template>
  <div>
    <h2> Login </h2>
    <form v-on:submit.prevent="submitForm">

      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com"
               v-model="form.email">
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password" placeholder="Your password" v-model="form.password">
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'postFormAxios',
  data(){
    return{
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    submitForm(){
      axios.post('http://34.150.38.10:8081/login', this.form)
          .then((res) => {
            if(res.data.code === 200){
              this.$fire({
                title: "Welcome",
                text: "Login successful",
                type: "success",
                timer: 3000
              });
              console.log("成功");

              this.$router.push({
                path: `/`,
              });
            }else{
              console.log("failed");
            }

            //Perform Success Action
          })
          .catch((error) => {
            console.log(error);
            // error.response.status Check status code
          }).finally(() => {
        //Perform action in always
      });
    }
  }
}
</script>

