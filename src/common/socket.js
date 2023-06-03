import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3003';
const URL = 'http://localhost:3003'; //客户端和服务端同源不需要用到这个

export const socket = io();