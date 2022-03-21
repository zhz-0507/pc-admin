<template>
  <div class="admin-user">
    <div class="admin-user-title">
      大学生心理建设平台设计与实现
    </div>
    <div class="px"></div>
    <el-row class="tac">
      <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
        >

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1" @click="handlePer">个人信息</el-menu-item>
          <el-menu-item index="1-2" @click="handleUser">修改信息</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="2-1" @click="handleUserList">用户列表</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>黑名单管理</span>
          </template>
          <el-menu-item index="3-1" @click="handleBlackList">黑名单管理列表</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>问卷调查管理</span>
          </template>
          <el-menu-item index="4-1" @click="handleQuestionList">问卷调查列表</el-menu-item>
          <el-menu-item index="4-2" @click="handlAddQuestion">添加问卷</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>减压大本营管理</span>
          </template>
          <el-menu-item index="5-2" @click="handlejianyaList">减压大本营列表</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>心理辅导管理</span>
          </template>
          <el-menu-item index="6-2" @click="handlefudaoList">心理辅导列表</el-menu-item>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>心闻推荐管理</span>
          </template>
          <el-menu-item index="7-2" @click="handletuijianList">心闻推荐列表</el-menu-item>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>注销管理</span>
          </template>
          <el-menu-item index="8-2" @click="handlezhuxiaoList">注销列表</el-menu-item>
        </el-submenu>

        <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>心理咨询管理</span>
          </template>
          <el-menu-item index="9-2" @click="handlezixunList">心理咨询列表-</el-menu-item>
        </el-submenu>

        </el-menu>
      </el-col>



      <!-- 个人信息展示表格 -->
      <div v-show="isShowOne">
        <el-descriptions title="个人信息" direction="vertical" :column="4" border>
          <el-descriptions-item label="昵称">{{this.person.nickName}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{this.person.loginName}}</el-descriptions-item>
          <el-descriptions-item label="头像" :span="2">
            <el-avatar :size="30" :src="this.person.path"></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item label="个性签名">
            <el-tag size="small">{{this.person.introduceSign}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{this.person.createTime}}</el-descriptions-item>
        </el-descriptions>      
      </div>

      <!-- 个人信息修改 -->
      <div v-show="isShowTwo" class="update-show">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="personUpdate.nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="personUpdate.password"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="personUpdate.introduceSign"></el-input>
          </el-form-item>

          <el-button type="primary" @click="submitbtn">确定</el-button>
        </el-form>
      </div>

      <!-- 个人信息修改 -->
      <div v-show="isShowThree">
        <el-table
          :data="userList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="loginName"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="introduceSign"
            label="个性签名"
            width="120">
          </el-table-column>
           <el-table-column
            prop="role"
            label="身份"
            width="120">
          </el-table-column>
          <el-table-column
            path="path"
            label="头像"
            width="120">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="40" :src="scope.row.path"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            
              <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>

              <el-button @click="handleJionBlack(scope.row)" type="text" size="small">加入黑名单</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNum"
          :page-sizes="[1,2,5,10]"
          :total="totalCount"
          :page-size="pageSize"
          >
        </el-pagination>
      </div>

      <!-- 黑名单管理 -->
      <div v-show="isShowFour">
        <el-table
          :data="blackList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="loginName"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="introduceSign"
            label="个性签名"
            width="120">
          </el-table-column>
           <el-table-column
            prop="role"
            label="身份"
            width="120">
          </el-table-column>
          <el-table-column
            path="path"
            label="头像"
            width="120">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="40" :src="scope.row.path"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">

              <el-button @click="handleRemoveBlack(scope.row)" type="text" size="small">移除黑名单</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeB"
          @size-change="handleSizeChangeB" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumB"
          :page-sizes="[1,2,5,10]"
          :total="totalCountB"
          :page-size="pageSizeB"
          >
        </el-pagination>
      </div>

      <!-- 问卷调查管理 -->
      <div v-show="isShowFive">
        <el-table
          :data="questionList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="introduceSign"
            label="个性签名"
            width="120">
          </el-table-column>
           <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            path="path"
            label="头像"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="40" :src="scope.row.image"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEditQuestion(scope.row)" type="text" size="small">编辑</el-button>
            
              <el-button @click="handleDelQuestion(scope.row)" type="text" size="small">删除</el-button>
              
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeC"
          @size-change="handleSizeChangeC" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumC"
          :page-sizes="[1,2,5,10]"
          :total="totalCountC"
          :page-size="pageSizeC"
          >
        </el-pagination>
      </div>

      <!-- 添加问卷 -->
      <div v-show="isShowSix">

        添加问卷
      </div>

      <!-- 大本营列表 -->
      <div v-show="isShowSeven">
        <el-table
          :data="dabenyingList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="简介"
            width="120">
          </el-table-column>
         
           <el-table-column
            path="path"
            label="音乐"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="40" :src="scope.row.music"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            path="path"
            label="图片"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="40" :src="scope.row.image"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="教师姓名"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDeldabenying(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeD"
          @size-change="handleSizeChangeD" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumd"
          :page-sizes="[1,2,5,10]"
          :total="totalCountd"
          :page-size="pageSized"
          >
        </el-pagination>
      </div>

      <!-- 心理辅导列表 -->
      <div v-show="isShowEight">
        <el-table
          :data="fudaoList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="120">
          </el-table-column>
          <el-table-column
            path="image"
            label="图片"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="80" :src="scope.row.image"></el-avatar>
            </template>
          </el-table-column>
           <el-table-column
            prop="content"
            label="内容"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发布时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="教师姓名"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDeldudao(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeE"
          @size-change="handleSizeChangeE" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNume"
          :page-sizes="[1,2,5,10]"
          :total="totalCounte"
          :page-size="pageSizee"
          >
        </el-pagination>
      </div>

      <!-- 心闻推荐列表 -->
      <div v-show="isShowNine">
        <el-table
          :data="tuijianList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="150">
          </el-table-column>

          <el-table-column
            prop="content"
            label="内容"
            width="120">
          </el-table-column>

          <el-table-column
            path="image"
            label="图片"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="80" :src="scope.row.image"></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="发布时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="教师姓名"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDeltuijian(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeF"
          @size-change="handleSizeChangeF" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumF"
          :page-sizes="[1,2,5,10]"
          :total="totalCountF"
          :page-size="pageSizeF"
          >
        </el-pagination>
      </div>
      
      <!-- 注销管理列表 -->
      <div v-show="isShowTen">
        <el-table
          :data="zhuxiaoList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="loginName"
            label="手机号"
            width="150">
          </el-table-column>

          <el-table-column
            prop="nickName"
            label="昵称"
            width="120">
          </el-table-column>

          <el-table-column
            path="path"
            label="头像"
            width="100">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="80" :src="scope.row.path"></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="发布时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="introduceSign"
            label="个性签名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="role"
            label="身份"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDelzhuxiao(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeF"
          @size-change="handleSizeChangeF" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumF"
          :page-sizes="[1,2,5,10]"
          :total="totalCountF"
          :page-size="pageSizeF"
          >
        </el-pagination>
      </div>

      <!-- 心理咨询管理 -->
      <div v-show="isShowEle">
        <el-table
          :data="zixunList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="message"
            label="我要咨询"
            width="150">
          </el-table-column>

          <el-table-column
            prop="sname"
            label="学生姓名"
            width="120">
          </el-table-column>

          <el-table-column
            path="nickName"
            label="教师姓名"
            width="100">
          </el-table-column>

          <el-table-column
            prop="sno"
            label="学号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="学生手机号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDelzixun(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChangeG"
          @size-change="handleSizeChangeG" 
          background
          layout="total, prev, pager, next"
          :current-page="pageNumG"
          :page-sizes="[1,2,5,10]"
          :total="totalCountG"
          :page-size="pageSizeG"
          >
        </el-pagination>
      </div>

    </el-row>

    <!-- 用户弹层 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="user_edit.imageUrl" :src="user_edit.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      
      <div class="form-edit">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="user_edit.nickName"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="user_edit.introduceSign"></el-input>
          </el-form-item>
          <!-- <div class="l_form_l">
            性别&nbsp;&nbsp;
            <div class="l_form-radios">
              <el-radio v-model="user_edit.sex" label="1">男</el-radio>
              <el-radio v-model="user_edit.sex" label="2">女</el-radio>
            </div>
            
          </div> -->
        </el-form>
      </div>
      

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanldleSubmit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 问卷弹层 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisibleTwo"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="question_edit.image" :src="question_edit.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      
      <div class="form-edit">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="question_edit.title"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="question_edit.sname"></el-input>
          </el-form-item>
          
        </el-form>
      </div>
      

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTwo = false">取 消</el-button>
        <el-button type="primary" @click="hanldleSubmitQuestion()">确 定</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>
<style lang="less" scoped>
@import "./index.less";
</style>
<script>

// COMPONENTS
import NavBar from '@/components/nav-bar/nav.vue'

// api
import {
  getAdminUserInfo,
  putPerInfo ,
  getAllUserInfo ,
  editUserInfo,
  delUserInfo,
  joinBlack,
  putAvatar,
  editUpdate,
  BlackUser,
  removeBlack,
  QuestionList,
  editQuestion,
  delQuestion,
  updateQuestion,
  adminbigBenList,
  deldabenying,
  adminfudaoList,
  delfudao,
  admintuijianList,
  deltuijian,
  adminzhuxiaoList,
  deltzhuxiao,
  adminzixunList,
  deltzixun,
} from '../../services/home'


export default {
  components: {
    NavBar
  },
  data() {
    return{
      isLoaded:false,
      imgURL:'',
      msg: '',
      isShowAdmin:false,

      personInfoList:[],

      person:{
        nickName:'',
        loginName:'',
        introduceSign:'',
        path:'',
        createTime:'',
      },

      personUpdate:{
        nickName:"",
        password:"",
        introduceSign:"",
      },
      tableData:[],

      isShowOne:true,
      isShowTwo:false,
      isShowThree:false,
      isShowFour:false,
      isShowFive:false,
      isShowSix:false,
      isShowSeven:false,
      isShowEight:false,
      isShowNine:false,
      isShowTen:false,
      isShowEle:false,

      labelPosition: 'left',

      // 用户列表分页
      userList:[], 
      pageNum:1,  // 当前的页数
      pageSize:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:0,  

      // 黑名单列表分页
      blackList:[],
      pageNumB:1,  // 当前的页数
      pageSizeB:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountB:0,  

      // 问卷调查列表分页
      questionList:[],
      pageNumC:1,  // 当前的页数
      pageSizeC:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountC:0,  

      // 减压大本营列表分页
      dabenyingList:[],
      pageNumd:1,  // 当前的页数
      pageSized:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountd:0,  

      // 心理辅导列表分页
      fudaoList:[],
      pageNume:1,  // 当前的页数
      pageSizee:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCounte:0,  

      // 心闻推荐列表分页
      tuijianList:[],
      pageNumF:1,  // 当前的页数
      pageSizeF:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountF:0, 
      
      // 注销列表分页
      zhuxiaoList:[],
      pageNumI:1,  // 当前的页数
      pageSizeI:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountI:0, 

       // 心理咨询列表分页
      zixunList:[],
      pageNumG:1,  // 当前的页数
      pageSizeG:5,     // 当前每页显示的数据
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCountG:0, 


      // 用户列表下的编辑
      user_edit:{
        userId:'',
        nickName:'',
        imageUrl:'',
        introduceSign:'',
        role:'',
        sex:'1',
        isDeleted:'',
        psychologyRoleEnum:"STUDENT",
      },

      // 用户列表下的编辑
      question_edit:{
        id:'',
        title:'',
        sname:'',
        image:'',
        createTime:'',
      },

      dialogVisible: false,
      dialogVisibleTwo: false

    }
  },
  created() {
    this.initPersonInfo();

    this.initUserList();

    this.initBlackList();

    this.initQuestionList();

    this.initdabenyingList();

    this.initfudaoList();

    this.inittuijianList();

    this.initzhuxiaoList();

    this.initzixunList();
  },  

  methods:{
    async initPersonInfo() {
      const res = await getAdminUserInfo();
      if(res && res.resultCode == 200) {
        let result = res.data;
        this.person.nickName = result.nickName;
        this.person.loginName = result.loginName;
        this.person.introduceSign = result.introduceSign;
        this.person.path = result.path;
        this.person.createTime = result.createTime;

        console.log("打印一下个人信息列表",this.person) ;
      }
    },


    async initUserList() {
      const res = await getAllUserInfo(this.pageNum,this.pageSize)
      if(res && res.resultCode == 200) {
        console.log('用户列表',res)
        let result = res.data;
        this.userList = result.psychologyUserResponseList;
        console.log('用户列表的数组',this.userList)
        this.totalCount = result.total;
        console.log('totalCount',this.totalCount)
      }
    },

    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initUserList();
    },

    // 监听pagesize改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.initUserList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeB(val) {
      this.pageNumB = val;
      this.initBlackList();
    },

    // 监听pagesize改变
    handleSizeChangeB(val) {
      this.pageSizeB = val;
      this.initBlackList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeC(val) {
      this.pageNumC = val;
      this.initQuestionList();
    },

    // 监听pagesize改变
    handleSizeChangeC(val) {
      this.pageSizeC = val;
      this.initQuestionList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeD(val) {
      this.pageNumd = val;
      this.initdabenyingList();
    },

    // 监听pagesize改变
    handleSizeChangeD(val) {
      this.pageSized = val;
      this.initdabenyingList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeE(val) {
      this.pageNume = val;
      this.initfudaoList();
    },

    // 监听pagesize改变
    handleSizeChangeE(val) {
      this.pageSizee = val;
      this.initfudaoList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeF(val) {
      this.pageNumF = val;
      this.inittuijianList();
    },

    // 监听pagesize改变
    handleSizeChangeF(val) {
      this.pageSizeF = val;
      this.inittuijianList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeG(val) {
      this.pageNumI = val;
      this.initzhuxiaoList();
    },

    // 监听pagesize改变
    handleSizeChangeG(val) {
      this.pageSizeI = val;
      this.initzhuxiaoList()
    },

    // 监听页码值改变的事件
    handleCurrentChangeG(val) {
      this.pageNumG = val;
      this.initzixunList();
    },

    // 监听pagesize改变
    handleSizeChangeG(val) {
      this.pageSizeG = val;
      this.initzixunList()
    },


    async initBlackList() {
      const res = await BlackUser(this.pageNumB,this.pageSizeB);
      if(res && res.resultCode == 200) {
        // console.log('黑名单列表',res)
        let result = res.data;
        this.blackList = result.psychologyUserResponseList;
        // console.log('黑名单列表的数组',this.blackList)
        this.totalCountB = result.total;
      }
    },

    async initQuestionList() {
      const res = await QuestionList(this.pageNumC,this.pageSizeC);
      if(res && res.resultCode == 200) {
        // console.log('列表',res)
        let result = res.data;
        this.questionList = result.psychologyQuestionResponses;
        // console.log('数组',this.questionList)
        this.totalCountC = result.total;
      }
    },

    async initdabenyingList() {
      const res = await adminbigBenList(this.pageNumd,this.pageSized);
      if(res && res.resultCode == 200) {
        // console.log('大本营列表',res)
        let result = res.data;
        this.dabenyingList = result.lists;
        console.log('大本营',this.dabenyingList)
        this.totalCountd = result.total;
      }
    },

    async initfudaoList() {
      const res = await adminfudaoList(this.pageNume,this.pageSizee);
      if(res && res.resultCode == 200) {
        let result = res.data;
        this.fudaoList = result.psychologySpecials;
        this.totalCounte = result.total;
      }
    },

    async inittuijianList() {
      const res = await admintuijianList(this.pageNumF,this.pageSizeF);
      if(res && res.resultCode == 200) {
        let result = res.data;
        this.tuijianList = result.lists;
        this.totalCountF = result.total;
      }
    },

    async initzhuxiaoList() {
      const res = await adminzhuxiaoList(this.pageNumI,this.pageSizeI);
      if(res && res.resultCode == 200) {
        let result = res.data;
        this.zhuxiaoList = result.psychologyUserResponseList;
        this.totalCountI = result.total;
      }
    },

    async initzixunList() {
      const res = await adminzixunList(this.pageNumG,this.pageSizeG);
      if(res && res.resultCode == 200) {
        let result = res.data;
        console.log(result,'心闻咨询分页')
        this.zixunList = result.psychologyTeacherResponses;
        console.log('心闻咨询分页',this.zhuxiaoList)
        this.totalCountG = result.total;
      }
    },

    


    // 编辑
    async handleEdit(data) {
      localStorage.setItem('userId', data.userId); 

      const res = await editUserInfo(data.userId);
        console.log('user_edit',res)

      if(res && res.resultCode == 200) {
        let result = res.data;
        // 开始赋值
        this.user_edit = {
          userId:result.userId,
          nickName:result.nickName,
          imageUrl:result.path,
          introduceSign:result.introduceSign,
          role:result.role,
          isDeleted:result.isDeleted,
          psychologyRoleEnum:result.psychologyRoleEnum,
        }

        this.dialogVisible = true;
        console.log('user_edit',this.user_edit)
      }
    },

    // 编辑问卷
    async handleEditQuestion(data) {
      localStorage.setItem('qusetionId', data.id); 

     const res = await editQuestion(data.id);
      console.log('=====',res)
      if(res && res.resultCode == 200) {
        let result = res.data;
        // 开始赋值
        this.question_edit = {
          id:result.id,
          title:result.title,
          sname:result.sname,
          image:result.image,
          createTime:result.createTime,
        }
        console.log('00000',this.question_edit)
        this.dialogVisibleTwo = true;
      }


    },


    // 处理编辑中的提交
    async hanldleSubmit() {
      let formData = {
        userId:this.user_edit.userId,
        nickName:this.user_edit.nickName,
        introduceSign:this.user_edit.introduceSign,
        // isDeleted:this.user_edit.isDeleted,
        psychologyRoleEnum:this.user_edit.role,
      }

      console.log("canshu ",formData)
      // return
      const res = await editUpdate(formData);
      console.log('修改',res);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogVisible = false;

      }else {
         this.$message({
          message: '修改失败',
          type: 'warning'
        });
      }

    },
    
    // 处理编辑中的提交
    async hanldleSubmitQuestion() {
      let formData = {
        id:this.question_edit.id,
        title:this.question_edit.title,
        sname:this.question_edit.sname,
      }
      const res = await updateQuestion(formData);
      console.log('修改',res);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '更新问卷成功',
          type: 'success'
        });
        this.dialogVisibleTwo = false;

      }else {
         this.$message({
          message: '更新问卷失败',
          type: 'warning'
        });
      }



    },

    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },

    async beforeAvatarUpload(file) {
      let userId = localStorage.getItem('userId') || '';
      let fd = new FormData();
      fd.append('file', file);
      fd.append('userId', userId);

      console.log('fd',fd)
      
      const result =  await putAvatar(fd);
      if(result && result.resultCode == 200) {
        this.user_edit.imageUrl = result.data;
        console.log('修改头像',this.user_edit.imageUrl);
      }
      

    },

    // 删除
    async handleDel(data) {
      const res = await delUserInfo(data.userId);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updateList(data);
      }  
    },


    // 删除问卷
    async handleDelQuestion(data) {
      const res = await delQuestion(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updateQuestionList(data);
      }  
    },

    // 删除大本营
    async handleDeldabenying(data) {
      const res = await deldabenying(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updatedabenyingList(data);
      }  
    },

    // 删除心理辅导
    async handleDeldudao(data) {
      const res = await delfudao(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updatefudaogList(data);
      }  
    },

    // 删除心闻推荐
    async handleDeltuijian(data) {
      const res = await deltuijian(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updatetuijianList(data);
      }  
    },

    // 删除注销
    async handleDelzhuxiao(data) {
      const res = await deltzhuxiao(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updatezhuxiaoList(data);
      }  
    },

    // 删除咨询
    async handleDelzixun(data) {
      const res = await deltzixun(data.id);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.updatezixunList(data);
      }  
    },



    updateList(data) {
      let _index = this.userList.findIndex(el => el.userId === data.userId);
      if (_index >= 0) {
        this.userList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updateQuestionList(data) {
      let _index = this.questionList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.questionList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updatedabenyingList(data) {
      let _index = this.dabenyingList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.dabenyingList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updatefudaogList(data) {
      let _index = this.fudaoList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.fudaoList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updatetuijianList(data) {
      let _index = this.tuijianList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.tuijianList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updatezhuxiaoList(data) {
      let _index = this.zhuxiaoList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.zhuxiaoList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    updatezixunList(data) {
      let _index = this.zixunList.findIndex(el => el.id === data.id);
      if (_index >= 0) {
        this.zixunList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },



    // 加入黑名单
    async handleJionBlack(data) {
      const res = await joinBlack(data.userId);
      console.log(res,'111111')
      if(res && res.resultCode == 200) {
        this.$message({
          message: '加入黑名单成功',
          type: 'success'
        });
      }else {
        this.$message({
          message: '加入黑名单失败',
          type: 'warning'
        });
      }  
    },

    updateBlackList(data) {
      let _index = this.blackList.findIndex(el => el.userId === data.userId);
      if (_index >= 0) {
        this.blackList.splice(_index, 1);
      } else {
        // 删除失败 - 兜底使用页面重新加载
        window.location.reload();
      }  
    },

    async handleRemoveBlack(data) {
      const res = await removeBlack(data.userId);
      if(res && res.resultCode == 200) {
        this.$message({
          message: '移除黑名单成功',
          type: 'success'
        });
        this.updateBlackList(data)
      }else {
        this.$message({
          message: '移除黑名单失败',
          type: 'warning'
        });
      }  
    },

    handlePer() {
      this.isShowOne = true;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;


    },

    handleUser() {
      this.isShowTwo = true;
      this.isShowOne = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;


    },

    handleUserList() {
      this.isShowThree = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;


    },

    handleBlackList() {
      this.isShowFour = true;
      this.isShowOne = false;
      this.isShowThree = false;
      this.isShowTwo = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;


    },

    handleQuestionList() {
      this.isShowFive = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;

    },

    // 添加问卷
    handlAddQuestion() {
      this.isShowSix = true;
      this.isShowThree = false;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;

    },

    // 减压大本营列表
    handlejianyaList() {
      this.isShowSeven = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;

    },

    // 心理辅导列表
    handlefudaoList() {
      this.isShowEight = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowNine = false;
      this.isShowTen = false;
      this.isShowEle = false;

    },

    // 心闻推荐管理
    handletuijianList() {
      this.isShowNine = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowTen = false;
      this.isShowEle = false;

    },

    // 注销管理
    handlezhuxiaoList() {
      this.isShowTen = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowEle = false;

    },

    // 心理咨询管理
    handlezixunList() {
      this.isShowEle = true;
      this.isShowOne = false;
      this.isShowTwo = false;
      this.isShowThree = false;
      this.isShowFour = false;
      this.isShowFive = false;
      this.isShowSix = false;
      this.isShowSeven = false;
      this.isShowEight = false;
      this.isShowNine = false;
      this.isShowTen = false;
    },



    handleOpen(index,indexPath) {
      console.log('1111',index,indexPath)
    },

    handleClose() {

    },

    handlebackhome() {
      this.$router.go(-1);
    },

    async submitbtn() {
      const checkRes =  this._checkAllPerson();
      let formData =  this._getParamsByPer();
      
      if(checkRes) {
        const res = await putPerInfo(formData);
          if(res && res.resultCode === 200) {
            this.$message({
              message: '修改信息成功',
              type: 'success'
            });
            //重置数据
            this.personUpdate.nickName = '';
            this.personUpdate.password = '';
            this.personUpdate.introduceSign = '';
          }
        
      }

    },

    _getParamsByPer() {
      let formData = {};
        formData = {
          nickName: this.personUpdate.nickName,
          password: this.personUpdate.password,
          introduceSign: this.personUpdate.introduceSign,
        }
       return formData;
    },

    _checkAllPerson() {
      if(!this.personUpdate.nickName) {
        this.$message({
          message: '输入昵称不能为空',
          type: 'warning'
        });
      }else if(!this.personUpdate.password) {
        this.$message({
          message: '输入密码不能为空',
          type: 'warning'
        });
        return false;
      }else if(!this.personUpdate.introduceSign) {
        this.$message({
          message: '输入个性签名不能为空',
          type: 'warning'
        });
        return false;
      }else {
        return true;
      }
    }

  }

  
}

</script>

