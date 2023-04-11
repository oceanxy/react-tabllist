import './styles/index.scss'
import { mapGetters } from 'vuex'
import config from '@/config'

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
        title={config.systemName}
      >
        <Icon-font type={'icon-logo'} />
        {config.systemName}
      </div>
    )
  }
}
