import './styles/index.scss'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    }
  },
  methods: {
    async goBackHome() {
      await this.$router.push({ name: 'home' })
    }
  },
  render() {
    return (
      <div
        class={'tg-logo'}
        onClick={this.goBackHome}
        title={'H+学生健康管理'}
      >
        {
          this.collapsed ? '' : 'H+学生健康管理'
        }
      </div>
    )
  }
}
