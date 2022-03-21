<template>
  <el-form-item :label="tips" :error="errorStr" :inline-message="false">
    <el-input 
      class="message-code-input"
      placeholder="短信验证码"
      v-model="messageCode"
      ></el-input>
    <el-button class="message-code-button" v-show="show" @click="clickSendVerificationCodeBtn">短信验证码</el-button>
    <el-button class="message-code-button" v-show="!show" :disabled="isDisabled" @click="clickSendVerificationCodeBtn">{{auth_time}} 秒后重新发送</el-button>
  </el-form-item>
</template>

<style lang="less" scoped>
@import './index.less';
</style>

<script>
export default {
  props:{
    tips:{
      type:String,
      default:''
    },
  },
  data() {
    return {
      messageCode:'',
      errorStr:"",
      auth_time:'60',
      show:true,
      isDisabled:true
    }
  },

  methods:{
    $_setData(val) {
      this.messageCode = val;
    },

    $_getData() {
      return {
        messageCode:this.messageCode
      }
    },

    $_verify() {
      let res = this._checkMessageCode();
      return res;
    },

    async clickSendVerificationCodeBtn() {
      this.show = false
      this.$emit('onHandleMessageCode','发送验证码')

      let auth_timetimer =  setInterval(()=>{
        this.auth_time--;
        if(this.auth_time<=0){
            this.show = true;
            clearInterval(auth_timetimer);
            this.auth_time = 60;
        }
      }, 1000);
    },

    _checkMessageCode() {
      let message = "";
      let res = true;
      if(!this.messageCode) {
        message = "请输入验证码";
        res = false;
      } else if(this.messageCode.length > 4 || this.messageCode.length < 4){
        message = "请输入正确验证码";
        res = false;
      }
      this._setError("errorStr",message)
      return { status:res, message}
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