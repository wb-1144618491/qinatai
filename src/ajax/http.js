import Vue from 'vue'
/*  管理员接口  */
const USER_LOGIN = '/admin/login' //管理员登录接口
const USER_ADD = '/admin/adduser' //新增用户
const USER_LIST = '/admin/getadminuser' //用户分页查询
const USER_ADDLIST = '/admin/getaddadminuser' //查询所有用户
const USER_COUNT = '/admin/getadminusercount' //用户列表数量查询
const USER_UPD = '/admin/updateuser' //更新用户
const USER_DEL = '/admin/deleteuser' //删除用户
const USER_INFO = '/admin/getadminuserbyid' //获取指定_id用户的信息

/* 权限接口 */
const LIMIT_ADD = '/admin/addlimit' //新增权限
const LIMIT_LIST = '/admin/getlimit' //查询权限
const LIMIT_ALLLIST = '/admin/getlimitall' //查询权限
const LIMIT_DEL = '/admin/deletelimit' //删除权限
const LIMIT_UPD = '/admin/updatelimit' //修改权限
const LIMIT_COUNT = '/admin/getlimitcount' //获取权限列表数量
/* 角色接口 */

const ROLE_ADD = '/admin/addrole' //新增角色
const ROLE_LIST = '/admin/getrole' //分页查询角色
const ROLE_ALLLIST = '/admin/getaddrole' //查询所有角色
const ROLE_DEL = '/admin/deleterole' //删除角色
const ROLE_COUNT = '/admin/getrolecount' //查询角色数量
const ROLE_UPD = '/admin/updaterole' //更新角色

/* 城市列表*/
const CITY = '/citys'
/* 影院管理 */
const CINEMA_ADD = '/addcinemas' //新增
const CINEMA_UPD = '/updcinemas' //更新
const CINEMA_DEL = '/delcinemas' //删除
const CINEMA_LIST = 'cinemas' //分页
const CINEMA_COUNT = '/cinemascount' //数量
const CINEMA_BYID = '/cinemasbycityid' //根据城市id获取影院信息

// 影片
const MOVIE_ADD = '/admin/addmovie' //新增
const MOVIE_UPD = '/admin/updmovie' //更新
const MOVIE_DEL = '/admin/delmovie' //删除
const MOVIE_LIST = '/movie' //分页
const MOVIE_COUNT = '/moviecount' //数量

// 卖品分类
const SALERTYPE_ADD = '/addsalertype' //新增
const SALERTYPE_UPD = '/updsalertype' //更新
const SALERTYPE_DEL = '/admin/delsalertype' //删除
const SALERTYPE_LIST = '/salertype' //分页
const SALERTYPE_COUNT = '/salertypecount' //数量
const SALERTYPE_ALL_LIST = '/salertypelist' //所有

// 卖品
const SALER_ADD = '/addsaler' //新增
const SALER_UPD = '/updsaler' //更新
const SALER_DEL = '/delsaler' //删除
const SALER_LIST = '/saler' //分页
const SALER_COUNT = '/salercount' //数量

// 会员
const MEMBER_ADD = '/registermember' //新增
const MEMBER_UPD = '/updatemember' //更新
const MEMBER_DEL = '/deletemember' //删除
const MEMBER_LIST = '/memberlist' //分页
const MEMBER_COUNT = '/membercount' //数量

class Http {
  static common({
    url = '',
    method = 'GET',
    params = {},
    data = {},
    baseURL = '/api'
  } = {}) {
    return Vue.axios({
      // 请求的URL地址
      url,
      //   method 是请求方法
      method,
      //   baseURl将于url做字符串拼接合并
      baseURL,
      //   params是get携带的参数
      params,
      //   data是psot携带的参数
      data
    })
  }
  //   用户登录
  static user_login({ username, password }) {
    return this.common({
      url: USER_LOGIN,
      method: 'POST',
      data: { username, password }
    })
  }
  /* *************权限接口*********** */
  // 新增
  static limit_add({ pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_ADD,
      method: 'POST',
      data: { pid, limitname, title }
    })
  }
  // 分页查询
  static limit_list(currpage) {
    return this.common({
      url: LIMIT_LIST,
      params: { currpage }
    })
  }
  // 列表
  static limit_alllist() {
    return this.common({
      url: LIMIT_ALLLIST
    })
  }
  // 数量
  static limit_count() {
    return this.common({
      url: LIMIT_COUNT
    })
  }
  // 删除
  static limit_del(_id) {
    return this.common({
      url: LIMIT_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 更新
  static limit_upd({ _id, pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_UPD,
      method: 'POST',
      data: { _id, pid, limitname, title }
    })
  }
  /* *******角色接口******** */

  // 新增
  static role_add({ rolename, limit } = {}) {
    return this.common({
      url: ROLE_ADD,
      method: 'POST',
      data: { rolename, limit }
    })
  }
  // 分页
  static role_list(currpage) {
    return this.common({
      url: ROLE_LIST,
      params: { currpage }
    })
  }
  // 所有
  static role_listadd() {
    return this.common({
      url: ROLE_ALLLIST
    })
  }
  // 数量
  static role_count() {
    return this.common({
      url: ROLE_COUNT
    })
  }
  // 删除
  static role_del(_id) {
    return this.common({
      url: ROLE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改
  static role_upd({ _id, rolename, limit } = {}) {
    return this.common({
      url: ROLE_UPD,
      method: 'POST',
      data: { _id, rolename, limit }
    })
  }
  /* **************用户接口************** */
  // 新增
  static user_add({ username, password, role } = {}) {
    return this.common({
      url: USER_ADD,
      method: 'PPST',
      data: { username, password, role }
    })
  }
  // 分页
  static user_list(currpage) {
    return this.common({
      url: USER_LIST,
      params: { currpage }
    })
  }
  // 所有
  static user_alllist() {
    return this.common({
      url: USER_ADDLIST
    })
  }
  // 数量
  static user_count() {
    return this.common({
      url: USER_COUNT
    })
  }
  // 删除
  static user_del(_id) {
    return this.common({
      url: USER_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改
  static user_upd({ _id, username, password, role } = {}) {
    return this.common({
      url: USER_UPD,
      method: 'POST',
      data: { _id, username, password, role }
    })
  }
  static user_info(_id = '') {
    return this.common({
      url: USER_INFO,

      params: { _id }
    })
  }
  /* ************城市列表************ */
  static city_info() {
    return this.common({
      url: CITY
    })
  }
  /* **********影院管理*************** */
  //添加
  static cinema_add({ cinmea_name, cinema_address, cityid } = {}) {
    return this.common({
      url: CINEMA_ADD,
      method: 'POST',
      data: { cinmea_name, cinema_address, cityid }
    })
  }
  //分页
  static cinema_list(currpage) {
    return this.common({
      url: CINEMA_LIST,
      params: { currpage }
    })
  }
  //更新
  static cinema_upd({ _id, cinmea_name, cinema_address, cityid } = {}) {
    return this.common({
      url: CINEMA_UPD,
      method: 'POST',
      data: { _id, cinmea_name, cinema_address, cityid }
    })
  }
  // 删除
  static cinema_del(_id) {
    return this.common({
      url: CINEMA_DEL,
      method: 'PSOT',
      data: { _id }
    })
  }
  // 数量
  static cinema_count() {
    return this.common({
      url: CINEMA_COUNT
    })
  }
  // 根据城市id查询影院
  static cinema_byid(cityid) {
    return this.common({
      url: CINEMA_BYID,
      method: 'POST',
      data: { cityid }
    })
  }
  /* **********影片管理********* */
  // 新增
  static movie_add({ moviename, moviedes, moviecover, cinema } = {}) {
    return this.common({
      url: MOVIE_ADD,
      method: 'POST',
      data: { moviename, moviedes, moviecover, cinema }
    })
  }
  // 删除
  static movie_del(_id) {
    return this.common({
      url: MOVIE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改
  static movie_upd({ _id, moviename, moviedes, moviecover, cinema } = {}) {
    return this.common({
      url: MOVIE_UPD,
      method: 'PSOT',
      data: { _id, moviename, moviedes, moviecover, cinema }
    })
  }
  // 查询分页
  static movie_list(currpage) {
    return this.common({
      url: MOVIE_LIST,
      params: { currpage }
    })
  }
  // 数量
  static movie_count() {
    return this.common({
      url: MOVIE_COUNT
    })
  }
  /* ************卖品类别************ */
  // 新增
  static salertype_add({ salertype } = {}) {
    return this.common({
      url: SALERTYPE_ADD,
      method: 'POST',
      data: { salertype }
    })
  }
  //删除
  static salertype_del(_id) {
    return this.common({
      url: SALERTYPE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 更新
  static salertype_upd({ _id, salertype } = {}) {
    return this.common({
      url: SALERTYPE_UPD,
      method: 'POST',
      data: { _id, salertype }
    })
  }
  // 分页
  static salertype_list(currpage) {
    return this.common({
      url: SALERTYPE_LIST,
      params: { currpage }
    })
  }
  // 数量
  static salertype_count() {
    return this.common({
      url: SALERTYPE_COUNT
    })
  }
  // 所有
  static salertype_alllist() {
    return this.common({
      url: SALERTYPE_ALL_LIST
    })
  }
  /* *******卖品管理******* */
  // 新增
  static saler_add({
    salertitle,
    salerdes,
    salerpice,
    salerimg,
    salertype,
    cinema
  } = {}) {
    return this.common({
      url: SALER_ADD,
      method: 'POST',
      data: { salertitle, salerdes, salerpice, salerimg, salertype, cinema }
    })
  }
  // 删除
  static saler_del(_id) {
    return this.common({
      url: SALER_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 更新
  static saler_upd({
    _id,
    salertitle,
    salerdes,
    salerpice,
    salerimg,
    salertype,
    cinema
  } = {}) {
    return this.common({
      url: SALER_UPD,
      method: 'POST',
      data: {
        _id,
        salertitle,
        salerdes,
        salerpice,
        salerimg,
        salertype,
        cinema
      }
    })
  }
  // 分页
  static saler_list(currpage) {
    return this.common({
      url: SALER_LIST,
      params: { currpage }
    })
  }
  // 数量
  static saler_count() {
    return this.common({
      url: SALER_COUNT
    })
  }
  /* *********会员管理*********** */
  //新增
  static member_add({ mobile, password } = {}) {
    return this.common({
      url: MEMBER_ADD,
      method: 'POST',
      data: { mobile, password }
    })
  }
  // 删除
  static member_del(_id) {
    return this.common({
      url: MEMBER_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 更新
  static member_upd({ _id, mobile, password } = {}) {
    return this.common({
      url: MEMBER_UPD,
      method: 'POST',
      data: { _id, mobile, password }
    })
  }
  //分页
  static member_list(currpage) {
    return this.common({
      url: MEMBER_LIST,
      params: { currpage }
    })
  }
  // 数量
  static member_count() {
    return this.common({
      url: MEMBER_COUNT
    })
  }
}

export default Http
