import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
import styles from "./App.module.css";
import AppStore from "../stores/AppStore";
import AppActions from "../actions/AppActions";
import { socket } from "../common/socket";
import { Col, Row,Input } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);

    socket.on("onlineUsers", (data) => {
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
  //   function urlABS(s){
  //     return new URL(s, document.baseURI).href
  //  }
  
  //   var clickhandler = function () {
  //     window.location.href = urlABS("/game?id=")+document.getElementById('room').value;
  //   };
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <div >
            <b className={styles.GameTitle}>心灵特工电子版</b>
            <b>在线人数:<u style={{color:"red"}}>{this.state.onlineUsers}</u></b>
          </div>
        </header>
        <Row>
          <Col span={24}><div className={styles.roomIntro}>Enter a room number between 0 and 99</div></Col>
        </Row>
        <Row>
          <Col span={8} offset={10}>
            <Row>
              <Col span={8}><Input id="room" placeholder="0" /></Col>
              <Col span={8}><Link to="/game"><Button type="primary">进入游戏</Button></Link></Col>
            </Row>
          </Col>
          
        </Row>
        <Row>
          <Col span={24}><div className={styles.introduction}>
              心灵特工Mind MGMT桌游是一款猫捉老鼠类型的桌游,Made By <a href="https://saferman.github.io/" target="_blank">Saferman</a>
            </div></Col>
        </Row>
      </div>
    );
  }
}

export default App;
