<template>
  <div>
    <el-form ref="loginForm"
             v-bind:model="loginForm"
             :rules="rules"
             class="loginContainer"
             v-loading="loading"

             element-loading-text="正在登录"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <h3 class="loginTitle">系统登录</h3>

      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" style="width:250px;margin-right: 5px"
                  placeholder="点击图片更换验证码"></el-input>
        <img :src="captchUrl" @click="updateCaptcha">
      </el-form-item>

      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" @click="submitLogin" style="width: 100%">登录</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchUrl: "/captcha?time=" + new Date(),
      checked: "",
      loading: false,
      loginForm: {
        username: "admin",
        password: "123",
        code: ""
      },
      rules: {
        username: [{required: true, message: "请输入用户名", trigger: "blur"}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
        code: [{required: true, message: "请输入验证码", trigger: "blur"}]
      }
    }
  },
  methods: {
    updateCaptcha() {
      this.captchUrl = "/captcha?time=" + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest("/login", this.loginForm).then(resp => {
            this.loading = false;
            if (resp) {
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              //存储用户token
              window.sessionStorage.setItem("tokenStr",tokenStr);
              //跳转首页
              this.$router.replace("/home");
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请输入输入完整信息',
            type: 'error'
          });
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

el-form-item {
  display: flex;
  align-items: center;
}
</style>