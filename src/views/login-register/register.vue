<template>
  <div class="register-wrapper">
    <div class="register-wrapper-info">
      <el-form :label-position="'right'" label-width="104px">
        <UserTelephone :tips="lableName[0]" ref="refTelephone" @onhandleTelephone="onhandleTelephone"></UserTelephone>
        <MessagCode :tips="lableName[1]" ref="refMessagCode" @onHandleMessageCode="onHandleMessageCode"></MessagCode>
        <RegisterPassword ref="refPassWord"></RegisterPassword>
        <el-form-item>
          <el-button type="primary" class="weidian-button" @click="handlerRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './register.less';
</style>

<script>
// COMPONENTS
import UserTelephone from '@/components/user-phone/index.vue';
import MessagCode from '@/components/message-code/index.vue';
import RegisterPassword from '@/components/register-password/index.vue';

// APIS
import {postRegister,getMessageCode} from '../../services/login.js'

export default {
  components:{
    UserTelephone,
    MessagCode,
    RegisterPassword
  },

  data() {
    return {
      lableName:['手机号',"短信验证码"],
      uTelephone:'',
    }
  },

  mounted() {

  },

  methods:{
    handlerRegister() {
      let checkRes = this._checkAll();
      console.log('校验结果',checkRes)
      this.submitParams();
      // this.$router.push('/login');
    },

    onhandleTelephone(val) {
      this.uTelephone = val;
      console.log('拿到的手机号',this.uTelephone)
    },
    onHandleMessageCode(val) {
      console.log(val)
      this.submitTelephone();
    },
  
    async submitTelephone() {
      const res = await getMessageCode(this.uTelephone)
      console.log("发送验证码的结果",res)
    },


    async submitParams() {
      let formData = this._getParamsByRegister();
      console.log('提交的参数',JSON.stringify(formData))
      const res = await postRegister(JSON.stringify(formData));
      console.log('提交的结果',res)
    },
    
    // 统一校验
    _checkAll() {
      let checkArr = ['refTelephone','refMessagCode',"refPassWord"]
      let res = { status: true, message: "" };
      checkArr.forEach(name => {
        if(res.status && this.$refs[name]) {
          res = this.$refs[name].$_verify();
        }
      });
      return res;
    },

    _getParamsByRegister() {
      let formData = {};
      let telephone = this.$refs.refTelephone.$_getData().telephone;
      let messageCode = this.$refs.refMessagCode.$_getData().messageCode;
      let firstPassword = this.$refs.refPassWord.$_getData().firstPassword;

      formData = {
        loginName:telephone,
        sms:messageCode,
        password:firstPassword,
      }

      return formData;
    }

  }
}
</script>