<template>
  <el-card>
    <div>
      Nice to see you  {{username}}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      username: "",
    }
  }
}
</script>

<style scoped>

</style>
