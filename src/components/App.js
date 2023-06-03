import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
import styles from './App.module.css';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import { socket } from '../common/socket';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);

    socket.on('onlineUsers', (data) => {
      AppActions.updateOnlineUsers(data);
    });

  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader} />
        <h1 className={styles.AppTitle}>心灵特工（在线人数:{this.state.onlineUsers}）</h1>
        <Link to="/game">
          <Button type="primary">进入游戏</Button>
        </Link>
      </div>
    );
  }
}

export default App;