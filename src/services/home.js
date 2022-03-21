import axios from "./axios/index";

export function getHome() {
  return axios.get('/index-infos');
}

export function getUserImg() {
  return axios.get(`user/getUpload`);
}

// 个人信息展示
export function getUserInfo() {
  return axios.get(`user/getPsychologyPersonInfo`);
}

// 个人信息修改
export function updateUserInfo(params) {
  return axios.put(`/user/updatePsychologyPersonInfo`,params);
}

// 心理老师查寻
export function getTeacherInfo(pageNum,pageSize) {
  return axios.get(`/user/queryTeacher?pageNo=${pageNum}&pageSize=${pageSize}`,);
}

// 心理咨询
export function putTeacherInfo(params) {
  return axios.post(`/user/savePsychologyProblem`,params);
}

// 后台个人信息展示
export function getAdminUserInfo() {
  return axios.get(`user/info`);
}

// 后台个人信息展示
export function putPerInfo(params) {
  return axios.put(`/user/updateInfo`,params);
}

// 用户查寻
export function getAllUserInfo(pageNum,pageSize) {
  return axios.get(`/user/queryAllUser?pageNo=${pageNum}&pageSize=${pageSize}`,);
}

// 用户编辑
export function editUserInfo(param) {
  return axios.get(`user/queryUserById/${param}`);
}


// 用户删除
export function delUserInfo(param) {
  return axios.get(`user/delete?userId=${param}`);
}

//  问卷删除
export function delQuestion(id) {
  return axios.get(`user/deleteQuestion?id=${id}`);
}

// 加入黑名单
export function joinBlack(param) {
  return axios.get(`user/joinBlackList?userId=${param}`);
}

// 移除黑名单
export function removeBlack(param) {
  return axios.put(`user/outBlackList?userId=${param}`);
}

// 个人信息头像修改
export function putAvatar(params) {
  return axios.put(`/user/updateEditHead`,params);
}

// 编辑信息修改
export function editUpdate(params) {
  return axios.post(`/user/updateUser`,params);
}

// 问卷编辑
export function editQuestion(id) {
  return axios.get(`/user/getPsychologyQuestion?id=${id}`);
}

// 黑明单关理
export function BlackUser(pageNum,pageSize) {
  return axios.get(`/user/getBlackList?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 问卷调查列表
export function QuestionList(pageNum,pageSize) {
  return axios.get(`/user/getPsychologyPageQuestion?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 更新问卷调查列表
export function updateQuestion(params) {
  return axios.post(`/user/changeQuestion`,params);
}

// 大本营列表
export function bigBenList() {
  return axios.get(`/user/getAllDecompression`);
}


// 大本营列表
export function adminbigBenList(pageNum,pageSize) {
  return axios.get(`/user/getPsychologyPageDecompression?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 用户删除
export function deldabenying(param) {
  return axios.get(`user/deleteDecompression?id=${param}`);
}

// 心理辅导列表
export function adminfudaoList(pageNum,pageSize) {
  return axios.get(`/user/getPsychologyPageSpecial?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 心理辅导删除
export function delfudao(param) {
  return axios.get(`user/deleteSpecial?id=${param}`);
}

// 心闻推荐列表
export function admintuijianList(pageNum,pageSize) {
  return axios.get(`/user/getPsychologyHeart?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 心闻推荐删除
export function deltuijian(param) {
  return axios.get(`user/deleteHeart?id=${param}`);
}

// 注销列表
export function adminzhuxiaoList(pageNum,pageSize) {
  return axios.get(`/user/getCancelList?pageNo=${pageNum}&pageSize=${pageSize}`);
}

// 注销删除
export function deltzhuxiao(param) {
  return axios.get(`user/outBlackList?userId=${param}`);
}

// 注销列表
export function adminzixunList(pageNum,pageSize) {
  return axios.get(`/user/queryPsychologyMessage?pageNo=${pageNum}&pageSize=${pageSize}`);
}


//心闻咨询------
export function xinwentuijianList() {
  return axios.get(`/user/getAllHeart`);
}

// 心闻咨询删除
export function deltzixun(param) {
  return axios.get(`user/deletePsychologyMessage?id=${param}`);
}



//根据心闻id查询相对应的心闻(
export function xinwentuijianInfo(id) {
  return axios.get(`/user/heart/${id}`);
}

//根据心闻id查询相对应的心闻(
export function fudaoInfo(sid) {
  return axios.get(`/user/special/${sid}`,);
}

//根据心闻id查询相对应的心闻(
export function dabenyingInfo(did) {
  return axios.get(`/user/decompression/${did}`,);
}

//根据问卷id查询相对应的问卷套题
export function questionInfo(id) {
  return axios.get(`/user/question/${id}`,);
}

//根据问卷id查询相对应的问卷套题
export function questionpost(params) {
  return axios.post(`/user/getMaxResult`,params);
}

//
export function updatePersonHead(params) {
  return axios.put(`/user/updatePersonHead`,params);
}












