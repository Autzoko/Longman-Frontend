<template>
  <div class="login-container">
    <div class="login-title">Login</div>
    <el-form class="login-form" ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="User" prop="user_name">
        <el-input v-model="loginForm.user_name"/>
      </el-form-item>
      <el-form-item label="Password" prop="user_pwd">
        <el-input v-model="loginForm.user_pwd" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="handleLogin">Login</el-button>
        <el-button class="login-button" @click="showRegisterDialog = true">Register</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="Register" v-model="showRegisterDialog">
      <RegisterDialog @registered="registerSuccess" @register-failed="handleFailure"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import RegisterDialog from "@/components/RegisterDialog.vue";

export default {
  name: "LoginView",
  components: {RegisterDialog},
  data() {
    return {
      loginForm: {
        user_name: '',
        user_pwd: '',
      },
      showRegisterDialog: false,
    };
  },

  methods: {
    async handleLogin() {
      if(this.loginForm.user_name === '') {
        this.$message.warning("please fill user name");
        return;
      }
      if(this.loginForm.user_pwd === '') {
        this.$message.warning("please fill password");
        return;
      }
      try {
        const response = await axios.post('api/user/login', this.loginForm).catch();
        console.log(response);
        if (response.status === 200) {
          this.$router.push('/warehouse-managers');
        }
      } catch (error) {
          this.$message.error(error.response.data.info);
      }
    },

    registerSuccess() {
      this.showRegisterDialog = false;
      this.$message.success("register success");
    },

    handleFailure() {
      this.showRegisterDialog = false;
      this.$message.error("register failed");
    }
  }

}
</script>

<style scoped>
.login-container {
  background: linear-gradient(to bottom, #ffcccc, #99ccff);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

.login-form {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-button[type="primary"] {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.login-button[type="primary"]:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.login-button {
  margin-left: 10px;
}

</style>