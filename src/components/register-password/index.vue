<template>
  <div>
    <el-form-item label="设置密码" :error="firstErrorStr" >
      <el-input 
        type="password" 
        placeholder="请输入密码"
        v-model="firstPassword"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item label="确认密码" :error="secondErrorStr" >
      <el-input 
        type="password"
        placeholder="再次输入密码"
        v-model="secondPassword"
        show-password
      ></el-input>
    </el-form-item>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>

<script>
export default {
  data() {
    return {
      firstPassword:'',
      secondPassword:'',
      firstErrorStr:'',
      secondErrorStr:'',
    } 
  },
  methods:{
    $_setData(val) {
      this.firstPassword = val;
      this.secondPassword = val;
    },

    $_getData() {
      return {
        firstPassword:this.firstPassword,
        secondPassword:this.secondPassword,
      }
    },

    $_verify() {
      let res = this._checkPassword();
      return res
    },

    _checkPassword() {
      let message = "";
      let res = true;
      if(!this.firstPassword) {
        message = "请输入密码";
        res = false;
        this._setError("firstErrorStr",message)
      }else if(!this.secondPassword) {
        this._setError("firstErrorStr",message = "")
        message = "请输入密码";
        res = false;
        this._setError("secondErrorStr",message)
      }else if(this.firstPassword !== this.secondPassword) {
        this._setError("secondErrorStr",message = "")
        message = "两次密码输入不一致，请重新输入！";
        res = false;
        this._setError("secondErrorStr",message)
      }
      this._setError("secondErrorStr",message = "")

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