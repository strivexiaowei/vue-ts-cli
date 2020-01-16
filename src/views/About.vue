<template>
  <div class="about">
    <about-child match="欧洲五大联赛" @getData="getChildData"></about-child>
    <div>{{ childData }}</div>
    <el-button>默认按钮</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Provide } from 'vue-property-decorator';
import AboutChild from './AboutChild.vue';
import Request from '@/utils/request';
import { UserModule } from '@/store/modules/user';

@Component({
  components: {
    AboutChild
  }
})
export default class About extends Vue {
  @Provide() private matchDate!: string;
  private childData: string;
  private http = new Request();
  constructor() {
    super();
    this.childData = '';
    this.matchDate = '2018-2019赛季';
  }

  public getChildData(val: string) {
    this.childData = val; // 这就拿到啦
  }

  public created() {
    UserModule.Login('sdas');
    this.http.get('jj', 'da', 'dasf', {})
    .then((res: any) => {
      console.log(res);
    });
  }

  public mounted() {
    console.log(UserModule.id_token);
  }
}
</script>
