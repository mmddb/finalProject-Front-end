<template>

    <div class="vue-template" >

      <form v-on:submit.prevent="submitForm" >
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="form.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="form.password" />
            </div>


            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
      name: "login",
      methods:{
        submitForm(){
          if(this.form.email === "" || this.form.password === "" ){
            this.$fire({
              type: 'error',
              title: 'Oops...',
              text: 'Email is required!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          axios.get('http://localhost:8081/user?email=' + this.form.email + "&password=" + this.form.password)
              .then((res) => {
                if(res.status === 200){
                  this.$fire({
                    title: "Welcome",
                    text: "Login successful",
                    type: "success",
                    timer: 3000
                  });
                  console.log("成功");
                  localStorage.setItem("user", JSON.stringify(res.data))
                  this.$router.push({
                    path: `/home`,
                  });
                }
                if(res.status === 404){
                  this.$fire({
                    title: "Sorry",
                    text: "Login failed",
                    type: "error",
                    timer: 3000
                  });
                  console.log("failed");
                }
                //Perform Success Action
              })
              .catch((error) => {
                console.log(error);
                // error.response.status   Check status code
              }).finally(() => {
               // Perform action in always

            // then get a token

          });
          axios.get('http://localhost:8081/token?email=' + this.form.email + "&password=" + this.form.password)
              .then((res) => {
                  if(res.status === 200){
                    localStorage.setItem("token", JSON.stringify(res.data))
                    console.log(JSON.stringify(res.data));
                  }else{
                    console.log("error");
                  }
                if(res.status === 404){
                  this.$fire({
                    title: "Sorry",
                    text: "Login failed",
                    type: "error",
                    timer: 3000
                  });
                  console.log("failed");
                }
              });
        }
      },
      data() {
        return {
          form:{
            email:"",
            password:""
          },
        }
      }
    }
</script>
