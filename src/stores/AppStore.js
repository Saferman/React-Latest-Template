import alt from '../dispatcher/alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.onlineUsers = 0;

  }


  onUpdateOnlineUsers(data) {
    console.log("Get message")
    this.onlineUsers = data.onlineUsers;
  }
}
export default alt.createStore(AppStore);