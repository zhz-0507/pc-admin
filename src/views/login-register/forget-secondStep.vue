<template>
  <div class="step2-wrapper">
    <div class="step2-wrapper-info">
      <el-form :label-position="'right'" label-width="104px">
        <RegisterPassword ref="refPassWord"></RegisterPassword>
        <el-form-item>
          <el-button type="primary" class="finish-button" @click="handlerUpdate">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// COMPONENTS
import RegisterPassword from '@/components/register-password/index.vue';

// APIS
import {updatePassword} from '../../services/login.js'

// import { EventBus } from "../../utils/event-bus";
export default {
  components:{
    RegisterPassword,

  },
  data() {
    return{
      uTelephone:"",
      validateCode:'',
    }
  },

  created() {
    var pageUrl = window.location.href;
    const res = this.getUrlData(pageUrl)
    console.log("res",res)
    if(res) {
      this.uTelephone = res.uTelephone;
      this.validateCode = res.validateCode;
    }
  },

  mounted() {
   
  },

  methods: {
    handlerUpdate() {
      // let checkRes = this._checkAll();
      // console.log('校验结果',checkRes)
      this.submitParams();
    },

    async submitParams() {
      let formData = this._getParamsByfix();
      console.log('提交的参数',JSON.stringify(formData))
      const res = await updatePassword(JSON.stringify(formData));
      if(res.resultCode == 200) {
        console.log('提交的结果',res)
        this.$message({
          message: '密码重置成功',
          type: 'success'
        });
        

      }
    },

    // 统一校验
    _checkAll() {
      let checkArr = ["refPassWord"]
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
      let firstPassword = this.$refs.refPassWord.$_getData().firstPassword;

      formData = {
        loginName:this.uTelephone,
        password:firstPassword,
        random:this.validateCode,
      }

      return formData;
    },

    getUrlData(url,OneKey,Delete_key=[]){
      if(!url)url = window.location.search;
      var url_l = url.split('?')[1];
      var url_ll = url_l.split('&'),obj ={};
      url_ll.forEach((item,idx)=>{
        var key = item.split('=')[0];
        var val = item.split('=')[1];
        if(Delete_key.indexOf(key)==-1) obj[key] = val;
      })
      if(OneKey&&url_l.indexOf(OneKey))return obj[OneKey];
      return obj;
    }
  },

}
</script>

<style lang="less" scoped>
.step2-wrapper-info{
  width: 423px;
  margin: 50px auto 0 auto;
}

.finish-button{
  width: 319px;
}
</style>