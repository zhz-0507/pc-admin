<template>
  <div class="nav-wrapper">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item >大学生心理建设平台设计与实现</el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">问卷调查</el-menu-item>
      <el-menu-item index="3">心理老师</el-menu-item>
      <el-menu-item index="4">减压大本营</el-menu-item>
      <el-menu-item index="5">心闻推荐</el-menu-item>
      <el-menu-item index="6">心理辅导</el-menu-item>
      <el-menu-item index="7" v-show="isShowAdmin">后台管理</el-menu-item>
      <el-menu-item index="8">个人中心</el-menu-item>

      <div class="img-header">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgURL" :src="imgURL" class="avatar">
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </div>

    </el-menu>


    <div class="line"></div>
  </div>
</template>


<style scoped lang="less">
@import './nav.less';
</style>

<script>
import {updatePersonHead} from '../../services/home'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    isShowAdmin:{
      type:Boolean,
      default:false,
    },
    INDEXVAL:{
      type:String,
      default:'1',
    },
    imgURL:{
      type:String,
      default:'',
    }
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      // imgURL:'',
      
    };
  },
  mounted() {
    console.log("nav组件中的isShowAdmin",this.isShowAdmin)
   
  },
  methods: {
    $setData(val) {
      // console.log(val);
      console.log('====',val);
      this.activeIndex2 = val;
      this.$emit("onHandleShow",this.activeIndex2)
    },
    handleSelect(key) {
      console.log(key);
      this.$emit('onhandleSelect',key)
    },
    handleUpdate() {
      console.log('更换头像') 

    },

    async beforeAvatarUpload(file) {
      let fd = new FormData();
      fd.append('file', file);
      
      const res = await updatePersonHead(fd)
      console.log(res);
      if(res && res.resultCode == 200) {
        this.imgURL = res.data;
        console.log('修改头像',this.imgURL);
      }
      
    }
  }
}
</script>




