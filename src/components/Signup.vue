<template>
    <div class="vue-template">
        <form v-on:submit.prevent="submitForm">
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg" v-model="form.name"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="form.email" />
            </div>

          <div class="form-group">
            <label>Telephone number</label>
            <input type="telephone" class="form-control form-control-lg" v-model="form.telephone" />
          </div>

          <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="form.password"/>
          </div>

          <div class="form-group">
            <label class="label">User Type</label>
            <el-radio v-model="form.type" label="CLIENT">CLIENT</el-radio>
            <el-radio v-model="form.type" label="DRIVER">DRIVER</el-radio>
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{name: 'login'}">sign in?</router-link>
          </p>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "signup",
      methods:{
        submitForm(){
          if (this.form.email === "") {
          this.$fire({
              type: 'error',
              title: 'Oops...',
              text: 'Email is required!',
              footer: '<a href="">Why do I have this issue?</a>'
            });
            // this.$alert("Email is required.");
            return;
          }
          if (this.form.password === "") {
            this.$alert("Password is required.");
            return;
          }
          axios.post('http://34.150.38.10:8081/user', this.form)
              .then((res) => {
                console.log(res.status)
                if(res.status === 201){
                  console.log("成功");
                  this.$fire({
                    title: "Welcome",
                    text: "Signup successful",
                    type: "success",
                    timer: 3000
                  });
                  this.$router.push({
                    path: `/login`,
                  });
                }
                if(res.status === 226){
                  this.$fire({
                    title: "Sorry",
                    text: "Email has been registered",
                    type: "error",
                    timer: 3000
                  });
                } else{
                  console.log("sorry");
                }
                //Perform Success Action
              })
              .catch((error) => {
                console.log(error);
                // error.response.status Check status code
              }).finally(() => {
                // Perform action in always
          });
        }
      },
        data() {
            return {
              form:{
                email: '',
                password: '',
                telephone: '',
                name:'',
                type:''
              }
            }
        }
    }
</script>
