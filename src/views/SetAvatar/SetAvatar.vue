<template>
  <div class>
    <van-nav-bar title="修改頭像" left-text="返回" left-arrow @click-left="back" fixed />
    <main class="main">
      <div>
        <img :src="IMGBASEURL+userInfo.avatar" ref="img" />
      </div>
    </main>
    <div class="footer">
      <input type="file" v-show="false" ref="file" @change="getChange" />
      <van-button type="info" size="large" @click="selectImg">選擇圖片</van-button>
      <van-button type="primary" size="large" @click="upAvatar">上傳圖片</van-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reqAvatar } from 'network/api'
import { IMGBASEURL } from 'network/baseUrl'
export default {
  data() {
    return {
      getImg: '',
      IMGBASEURL,
    }
  },
  props: {},
  methods: {
    ...mapMutations(['changeAvatar']),
    // 選擇了圖片
    getChange() {
      // 创建读取文件的对象
      const readFile = new FileReader()
      // 读取指定的文件
      readFile.readAsDataURL(this.$refs.file.files[0])
      // 等待图片读取完成
      readFile.onload = () => {
        console.log(readFile.result)
        this.$refs.img.src = readFile.result
      }
    },
    // 上傳圖片
    async upAvatar() {
      // if(this.$refs.file.files.length < 1) return this.$toast("请选择新的图片")
      const fromData = new FormData()
      fromData.append('avatar', this.$refs.file.files[0])
      const { errcode, data } = await reqAvatar(fromData)
      if (errcode !== 0) return this.$toast('上传失败')
      this.changeAvatar(data.avatar)
      this.$router.replace('/me')
    },
    // 選擇圖片
    selectImg() {
      this.$refs.file.click()
    },
    // 返回按鈕
    back() {
      this.$router.back()
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created() {
    // 一進入頁面就獲取目前的頭像。
  },
}
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.main {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #ddd;
  div {
    box-shadow: 0 0 1px 0.7 rgb(100, 100, 100);

    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 50%;
    img {
      border: solid 0.1px rgb(100, 100, 100);
      width: 100%;
      height: 100%;
      border-radius: 50% !important;
    }
  }
}
</style>