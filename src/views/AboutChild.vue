<template>
  <div class="about-child">
    {{ description }}
    <div>{{ match }}</div>
    <div>{{ matchDate }}</div>
    <button @click="toParent">子组件</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Inject, Emit } from 'vue-property-decorator';
@Component
export default class AboutChild extends Vue {
  @Prop({ default: '欧洲冠军联赛' }) private match!: string; // 注意!"
  @Inject() private matchDate!: string;
  private name: string;
  private team: string;
  constructor() {
    super();
    this.name = 'C罗'; // 初始化数据
    this.team = '意大利尤文图斯';
  }
  // 计算属性
  public get description() {
    return `${this.name}的球队是${this.team}`;
  }

  @Watch('name')
  public nameChanged(val: string, oldVal: string) {
    if (val === '梅西') {
      this.team = '西班牙巴塞罗那';
    }
  }

  @Emit('getData')
  public getData(data: string) {
    return data; // 传给父组件
  }
  // created生命周期钩子
  public created() {
    setTimeout(() => {
      this.name = '梅西';
    }, 2000);
  }

  public toParent() {
    this.getData('父组件你好'); // 等同于 this.$emit('getData', '父组件你好');
  }
}
</script>
