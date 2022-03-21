<template>
  <div class="step1-wrapper">
    <div class="step1-wrapper-info">
      <el-form :label-position="'right'" label-width="104px">
        <UserTelephone :tips="lableName[0]" ref="refTelephone" @onhandleTelephone="onhandleTelephone"></UserTelephone>
        <MessagCode :tips="lableName[1]" ref="refMessagCode" @onHandleMessageCode="onHandleMessageCode"></MessagCode>
        <el-form-item>
          <el-button type="primary" class="next-button" @click="handlerNext">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
// COMPONENTS
import UserTelephone from '@/components/user-phone/index.vue';
import MessagCode from '@/components/message-code/index.vue';

// APIS
import {validateCode,getMessageCode} from '../../services/login.js'

// import { EventBus } from "../../utils/events-bus";

export default {
  components :{
    UserTelephone,
    MessagCode,
  },
  data() {
    return {
      lableName:['手机号',"短信验证码"],
      userInfo:{
        uTelephone: '',
        validateCode: '',
      }
    }
  },

  methods: {
    handlerNext() {
      let checkRes = this._checkAll();
      console.log('校验结果',checkRes)
      this.submitParams();
    },

    onhandleTelephone(val) {
      this.userInfo.uTelephone = val;
    },

    onHandleMessageCode(val) {
      console.log(val)
      this.submitTelephone();
    },

    async submitTelephone() {
      console.log("this.userInfo.uTelephone",this.userInfo.uTelephone)
      const res = await getMessageCode(this.userInfo.uTelephone)
      console.log("发送验证码的结果",res) 
    },

    async submitParams() {
      let formData = this._getParamsByfix();
      console.log('提交的参数',JSON.stringify(formData))
      const res = await validateCode(JSON.stringify(formData));
      if(res && res.data) {
        console.log('提交的参数',res.data)
        this.userInfo.validateCode = res.data;
        this.$router.push(`/forgetStepTwo/?uTelephone=${this.userInfo.uTelephone}&validateCode=${this.userInfo.validateCode}`);    
      }
      console.log('提交的结果',res)
    },

    _checkAll() {
      let checkArr = ['refTelephone','refMessagCode']
      let res = { status: true, message: "" };
      checkArr.forEach(name => {
        if(res.status && this.$refs[name]) {
          res = this.$refs[name].$_verify();
        }
      });
      return res;
    },
    

    _getParamsByfix() {
      let formData = {};
      let telephone = this.$refs.refTelephone.$_getData().telephone;
      let messageCode = this.$refs.refMessagCode.$_getData().messageCode;

      formData = {
        loginName:telephone,
        sms:messageCode,
      }

      return formData;
    }
  }
}
</script>

<style lang="less" scoped>
.step1-wrapper-info{
  width: 423px;
  margin: 50px auto 0 auto;
}

.next-button{
  width: 319px;
}
</style>