import alt from '../dispatcher/alt';

class AppActions {
  constructor() {
    //这种方式定义的action会直接传递参数
    this.generateActions(
      'updateOnlineUsers', //当Socket.IO事件更新时设置在线用户数
    );
    
  }

  // updateOnlineUsers(data){return data;}

}

export default alt.createActions(AppActions);