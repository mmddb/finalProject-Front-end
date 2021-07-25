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
          axios.post('http://localhost:8081/login', this.form)
              .then((res) => {
                if(res.data.code === 200){
                  this.$fire({
                    title: "Welcome",
                    text: "Login successful",
                    type: "success",
                    timer: 3000
                  });
                  console.log("成功");
                  localStorage.setItem("access-admin", JSON.stringify(res.data))
                  this.$router.push({
                    path: `/home`,
                  });
                }else{
                  console.log("failed");
                }
                //Perform Success Action
              })
              .catch((error) => {
                console.log(error);
                // error.response.status   Check status code
              }).finally(() => {
               // Perform action in always
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
