// user.ts
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface IUserState {
  id_token: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public id_token = '';

  @Mutation
  private SET_TOKEN(token: string) {
    this.id_token = token;
  }

  @Action
  public async Login(params: any) {
    this.SET_TOKEN(`token!!!`);
  }
}

export const UserModule = getModule(User);
