<template>
  <el-form-item :error="errorStr" :inline-message="false">
    <el-input 
      type="password"
      placeholder="输入登录密码" 
      show-password
      v-model="password"
      ></el-input>
  </el-form-item>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>

<script>
export default {
  data() {
    return {
      password:"",
      errorStr:"",
    }
  },
  methods:{
    $_setData(val) {
      this.password = val;
    },

    $_getData() {
      return {
        password:this.password
      }
    },

    $_verify() {
      let res = this._checkPassword();
      return res
    },

    _checkPassword() {
      let message = "";
      let res = true;
      if (!this.password) {
        message = "请输入密码";
        res = false;
      }
      this._setError("errorStr",message)
      return { status: res, message }
    },

    _setError(key, msg) {
	    this[key] = "";
	    if (msg) {
	      this.$nextTick(() => {
	        this[key] = msg;
	      });
	    }
	  }
  }
}
</script>