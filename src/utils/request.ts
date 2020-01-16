import axios from 'axios';
import { UserModule } from '@/store/modules/user';
export default class Request {
  protected service: any;
  private token: string;
  constructor() {
    this.token = UserModule.id_token;
    this.service = axios.create({
      baseURL: process.env.VUE_APP_SERVER_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    this.interceptorsRequest();
  }
  public get(
    module: string,
    id: string,
    action: string,
    params: object,
  ) {
    const url = module + '/' + id + '/' + action;
    return new Promise((resolve, reject) => {
      const options = {
        url,
        params
      };
      this.service(options)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject();
          console.error(error);
        });
    });
  }
  public post(
    module: string,
    id: string,
    action: string,
    params: {},
  ) {
    const url = module + '/' + id + '/' + action;
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method: 'POST',
        data: params
      };
      this.service(options)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject();
          console.error(error);
        });
    });
  }

  protected interceptorsRequest() {
    // 拦截请求
    this.service.interceptors.request.use(
      (config: any) => {
        if (this.token) {
          console.log(this.token);
          config.headers.authorization = this.token;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 拦截响应

    // 响应拦截器
    this.service.interceptors.response.use(
      // 请求成功
      (response: any) => {
        if (response.status === 200) {
          return Promise.resolve(response.data);
        } else {
          // this.errorHandle(response);
          return Promise.reject(response.data);
        }
      },
      // 请求失败
      (error: any) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          // this.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        }
      });
  }
  private errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      default:
        console.error('网络连接失败');
    }
  }
}
