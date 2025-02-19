import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://192.168.2.117:3030', //incubadora
  // baseURL: 'http://192.168.2.134:3030', //incubadora plus
  // baseURL: 'http://192.168.2.110:3030', //casa plus
  // baseURL: 'http://192.168.2.112:3030', //casa
  // baseURL: 'http://192.168.2.161:3030', //codi centro
  // baseURL: 'http://192.168.2.153:3030', //codi centro
  //baseURL: 'http://10.23.96.122:3030', //segundo andar
  baseURL: "http://localhost:3000", //local
  // baseURL: 'http://192.168.1.166:3030', //local

  headers: {
    "Content-Type": "application/json",
  },
});
