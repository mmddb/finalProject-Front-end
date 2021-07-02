<template>

  <el-container>
    <el-header>
      Welcome back ! {{admin.result.name}}
    </el-header>
    <el-aside width="200px"> Aside </el-aside>
    <el-main> Main </el-main>
  </el-container>


</template>



<script>
export default {
  name: "Home",
  data() {
    return {
      admin: "",
      form: {
        message: "hello"
      },
    }
  },
  created() {
    this.admin = JSON.parse(window.localStorage.getItem("access-admin"));
  }
}
</script>
