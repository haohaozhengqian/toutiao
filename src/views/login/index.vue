<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.go(-1)"></van-icon>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 用户框 -->
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down :time="5000" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false" />
          <!-- 发送验证码 -->
          <van-button round size="small" type="default" class="send-sms-btn" @click="onSendSms" native-type="button" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <!-- 登录按钮 -->
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111', //手机号
        code: '246810', //验证码
      },
      //表单验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' },
        ],
        code: [
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
          },
        ],
      },
      isCountDownShow: false, //控制倒计时的展示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //点击登录按钮
    async onSubmit() {
      //表单验证
      //在组件中需要通过
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, //禁用背景点击
        duration: 0, //持续时间默认是2秒如果为0则持续展示不会关闭
      })
      //登录请求
      try {
        const { data: res } = await login(this.user)
        this.$store.commit('setUser', res.data)
        console.log(res)
        this.$toast.success('登陆成功')
        //登陆成功跳转回原来的页面
        this.$router.back()
      } catch (err) {
        if (err.response.statue === 400) {
          console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍后再试', err)
          this.$toast.fail('登陆失败')
        }
      }
    },
    //点击发送验证码的方法
    async onSendSms() {
      //1.验证手机号是否有效
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      //显示倒计时
      this.isCountDownShow = true
      //3.发送验证法到手机上
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.page-nav-bar {
  background-color: #3296fa;
}
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
.van-icon {
  color: #fff;
}
</style>