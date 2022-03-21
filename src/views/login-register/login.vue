<template>
  <div class="login-wrapper">
    <div class="login-wrapper-header">大学生心理建设平台</div>
    <div class="login-type">
      <div :class="[loginCase==0?'change-type':'']">密码登录</div>
    </div>
    
    <div class="login-info">
      <!-- 密码  -->
      <div class="login-info-wrapper" v-if="loginCase == 0">
        <el-form>
          <UserTelephone ref="refTelephone"></UserTelephone>
          <UserPassword ref="refPassword"> </UserPassword>
          <el-radio-group v-model="radio" @change="handleRadio">
            <el-radio :label="1">学生</el-radio>
            <el-radio :label="2">心理医生</el-radio>
            <el-radio :label="3">管理员</el-radio>
          </el-radio-group>

          <el-form-item class="bth-login">
            <el-button type="primary" @click="handleLogin">登录系统</el-button>
          </el-form-item>
        
        </el-form>

        <!-- 注册｜忘记密码 -->
        <div class="resign-forget-wrapper">
          <a href="#/register">立即注册</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#/forgetStepOne">忘记密码</a>
        </div>
      </div>
    </div>
     
  </div>
</template>


<style lang="less" scoped>
@import './login.less';
</style>

<script>
// COMPONENTS
import UserTelephone from '@/components/user-phone/index.vue';
import UserPassword from '@/components/password/index.vue';

// APIS
import {postLogin} from "../../services/login.js"

// utils
// import { EventBus } from "../../utils/event-bus";

export default {
  name: 'Home',
  components: {
    UserTelephone,
    UserPassword,
  },
  data() {
    return {
      loginCase:0,
      radio:1,
      radioStr:'STUDENT',
      radioNum:'',
    }
  },

  methods:{
    changeLoginCase(type) {
      console.log(type)
      this.loginCase = type;
    },

    handleRadio() {
      console.log(this.radio)
      if(this.radio === 1) {
        this.radioStr = 'STUDENT';
      }else if(this.radio === 2) {
        this.radioStr = 'TEACHER';
      }else {
        this.radioStr = 'ADMIN';
      }
      console.log(this.radioStr)
    },

    handleLogin() {
      // 进行校验
      let checkRes = this._checkAll();
      console.log('校验结果',checkRes)
      this.submitParams();
    },

    async submitParams() {
      let formData = this._getParamsByLogin();
      console.log('提交的参数',formData)
      const res = await postLogin(JSON.stringify(formData));
      if(res && res.resultCode === 200) {
        console.log("登录成功")
        console.log('res',res)
        localStorage.setItem('token', res.data.token); 
        this.radioNum = res.data.value;
        this.$router.push(`/home?val=${this.radioNum}`); 
        
      }
      
    },

    // 统一校验
    _checkAll() {
      let checkArr = ['refTelephone','refPassword']
      let res = { status: true, message: "" };
      checkArr.forEach(name => {
        if(res.status && this.$refs[name]) {
          res = this.$refs[name].$_verify();
        }
      });
      return res;
    },

    // 登录参数
    _getParamsByLogin() {
      let formData = {};
      let telephone = this.$refs.refTelephone.$_getData().telephone;
      let password = this.$refs.refPassword.$_getData().password;
      formData = {
        loginName:telephone,
        password:password,
        psychologyRoleEnum:this.radioStr,
      }

      return formData
    }

  },

}
</script>
