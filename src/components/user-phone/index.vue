<template>
  <div class="user-telephone">
    <el-form-item :label="tips" :inline-message="false" :error="errorStr">
      <el-input 
        placeholder="手机号" 
        class="input-with-select"  
        v-model="telephone" 
        @blur="giveParent"
        >
      </el-input>
    </el-form-item>
  </div>
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
    }
  },
  data() {
    return {
      telephone:'',
      errorStr:'',
    }
  },

  methods:{
    $_setData(val) {
      this.telephone = val;
    },

    $_getData() {
      return {
        telephone:this.telephone
      }
    },

    $_verify() {
      let res = this._checkTelePhone();
      return res;
    },

    _checkTelePhone() {
      let message = "";
      let res = true;
      if (!this.telephone) {
        message = "请输入手机号";
        res = false;
      } else {
        if (this.telephone.length > 11) {
          message = "手机号不能超过11位";
          res = false;
        } 
        if(this.telephone.length < 11) {
          message = "请输入正确手机号格式";
          res = false;
        }
      }
      this._setError('errorStr', message);
      return { status: res, message }
    },

    _setError(key, msg) {
	    this[key] = "";
	    if (msg) {
	      this.$nextTick(() => {
	        this[key] = msg;
	      });
	    }
	  },

    giveParent() {
      this.$emit('onhandleTelephone',this.telephone)
    }
  }

}
</script>