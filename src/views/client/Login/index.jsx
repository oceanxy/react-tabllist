/**
 * 首屏
 */

import './assets/styles/index.scss'
import BNContainer from '@/components/TGModule'
import apis from '@/apis'

export default {
  name: 'Login',
  data() {
    return {
      leftArticle: [],
      rightArticle: []
    }
  },
  async mounted() {
    await this.getNews()
  },
  methods: {
    async getNews() {
      const res = await apis.getNewsHomeList()

      if (res.status) {
        const { leftArticle, rightArticle } = res.data

        this.leftArticle = this.onTransformData(leftArticle.articleList)
        this.rightArticle = this.onTransformData(rightArticle.articleList)
      }
    },
    onTransformData(dataList) {
      return dataList.map(item => {
        item.title = item.articleTitle
        item.time = item.publishTime

        return item
      })
    },
    async onLogin() {
      await this.$router.push({ name: 'login' })
    },
    async onLogon() {
      await this.$router.push({ name: 'logon' })
    },
    async onClickItem(data) {
      const token = window.localStorage.getItem('token')

      if (!token) {
        await this.$router.push({ name: 'login' })

        return
      }

      await this.$router.push({
        name: 'parkNewsDetail',
        query: { id: data.id }
      })
    }
  },
  render() {
    return (
      <div class="bn-login-container">
        <BNContainer
          modalTitle="通知公告"
          width={390}
          showMore
          showTitleShape={false}
        >
          <TGList
            data={this.leftArticle}
            onclickItem={this.onClickItem}
          />
        </BNContainer>
        <BNContainer
          modalTitle="中心政策"
          width={390}
          showMore
          showTitleShape={false}
        >
        </BNContainer>
        <RouterView />
      </div>
    )
  }
}
