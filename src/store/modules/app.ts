// user.ts
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface IAppState {
  name: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public name = '';
  @Mutation
  private SET_TOKEN(token: string) {
    this.name = token;
  }
}

export const appModule = getModule(App);
