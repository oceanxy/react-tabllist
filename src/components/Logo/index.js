import './styles/index.scss'
import { mapGetters } from 'vuex'

export default {
  name: 'TGLogo',
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    showMenu() {
      return this.getState('showMenu', 'common')
    }
  },
  methods: {
    async goBackHome() {
      if (this.showMenu) {
        await this.$router.push({ name: 'home' })
      }
    }
  },
  render() {
    return (
      <div
        class={'tg-logo'}
        onClick={this.goBackHome}
        title={this.$config.systemName}
      >
        <IconFont type={'icon-logo'} />
        {this.$config.systemName}
      </div>
    )
  }
}
