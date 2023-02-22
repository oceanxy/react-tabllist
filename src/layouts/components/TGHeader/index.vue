<template>
  <a-layout-header class="tg-layout-header">
    <div class="tg-header manager">
      <a-button
        v-if="page === 'normal'"
        class="btn menu-fold"
        :class="{reverse: collapsed}"
        :title="!collapsed ? '折叠菜单' : '展开菜单'"
        @click="onMenuFold()"
      />
      <span class="tg-router-name">{{ parentRouteName }}</span>
      <div class="tg-login-info" v-if="isLogin">
        <a-badge class="tg-badge">
          <a-avatar
            shape="circle"
            class="tg-avatar"
            :class="{ man: userInfo.gender === 1 }"
          />
        </a-badge>
        <span class="tg-user-name">{{ userInfo.nickName || userInfo.fullName }}</span>
        <a-divider type="vertical" />
        <a-button
          class="btn edit-pwd"
          title="修改密码"
          @click="onEditPassword()"
        />
        <a-button
          class="btn logout"
          title="注销"
          @click="onLogOut()"
        />
      </div>
    </div>
    <modal-of-edit-password modalTitle="修改密码" />
  </a-layout-header>
</template>

<script>
import { Avatar, Badge, Divider, Dropdown, Icon, Layout, Menu, Tag } from 'ant-design-vue'
import { mapActions, mapGetters } from 'vuex'
import ModalOfEditPassword from '@/views/manager/organizations/StaffManagement/components/ModalOfEditPassword'

export default {
  name: 'TGHeader',
  props: {
    layout: {
      // 'manager' || 'client'
      type: String,
      default: 'client'
    },
    page: {
      // 'normal' || 'not-found'
      type: String,
      default: 'normal'
    }
  },
  components: {
    [Layout.Header.name]: Layout.Header,
    [Badge.name]: Badge,
    [Avatar.name]: Avatar,
    [Icon.name]: Icon,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Dropdown.name]: Dropdown,
    [Tag.name]: Tag,
    [Divider.name]: Divider,
    ModalOfEditPassword: ModalOfEditPassword
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    ...mapGetters('login', { companyList: 'getCompanyList' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    userInfo() {
      return this.getState('userInfo', 'login')
    },
    manager() {
      return this.layout !== 'client'
    },
    isLogin() {
      return !!window.localStorage.getItem('token')
    },
    parentRouteName() {
      if (this.$route.matched.length <= 2) {
        return this.$route.matched.at(-1).meta.title
      }

      return this.$route.matched.at(-2).meta.title
    }
  },
  provide: { moduleName: 'login' },
  methods: {
    ...mapActions('login', { logout: 'logout' }),
    async onLogOut() {
      await this.logout()
    },
    async onEditPassword() {
      await this.$store.dispatch('setCurrentItem', {
        value: { id: this.userInfo.id },
        moduleName: 'login'
      })

      await this.$store.dispatch('setModalVisible', {
        statusField: 'visibilityOfEditPassword',
        statusValue: true,
        moduleName: 'login'
      })
    },
    onMenuFold() {
      this.$store.commit('setState', {
        value: !this.collapsed,
        moduleName: 'common',
        stateName: 'collapsed'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/theme.scss';

.tg-layout-header {
  padding: 0;
  background: $primary-color;
  line-height: unset;

  .tg-header {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.manager {
      width: 100%;
      padding: 0 14px;
    }

    .btn {
      border: none;

      &:hover {
        transform: scale(1.1);
      }
    }

    .btn.menu-fold {
      background: url('./images/menu-fold.png') no-repeat center / 24px;

      &.reverse {
        transform: rotateY(180deg);
      }
    }

    .tg-router-name {
      font-size: 16px;
      font-family: Source Han Sans SC, Source Han Sans SC-Medium, Microsoft JhengHei UI, serif;
      font-weight: bolder;
      text-align: left;
      color: #f6fef9;
      margin-left: 12px;
    }

    .tg-login-info {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .tg-switch-ent {
        padding: 0 20px;
        cursor: pointer;
        margin-right: 40px;
      }

      .tg-badge {
        .tg-avatar {
          //font-size: 14px;
          //background: linear-gradient(to bottom, #007aff, #0066ff);
          background: url('./images/avatar.png') no-repeat;

          &.man {
            background: url('./images/avatar-man.png') no-repeat;
          }
        }
      }

      .tg-user-name {
        padding-left: 12px;
        color: #ffffff;
        font-size: 16px;
        padding-right: 16px;
      }

      .btn.edit-pwd {
        background: url('./images/lock.png') no-repeat center / 16px;
      }

      .btn.logout {
        background: url('./images/power.png') no-repeat center / 16px;
      }
    }
  }
}

.header-menu {
  min-width: 200px;

  &.ant-dropdown-menu {
    .tg-menu-user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 30px;
      gap: 10px;

      .ant-avatar {
        width: 60px;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(to bottom, #2f9bff, #0078e8);
      }

      .ant-tag {
        border: none;
      }

      .corporate-services {
        font-size: 20px;
        font-weight: 700;
        color: #000000;
        line-height: 40px;
      }
    }

    .my-news {
      display: flex;
      align-items: center;

      .news-number {
        background: #f5222d;
        color: #ffffff;
        border-radius: 10px;
        margin-left: 8px;
      }

      .anticon {
        margin-left: auto;
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }

  .ant-dropdown-menu-item:not(:first-child) {
    line-height: 54px;
    font-size: 15px;
    color: #1f1f1f;
    padding: 0 20px;
  }

  .ant-dropdown-menu-item:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
}

.header-ent-menu {
  .ant-dropdown-menu-item {
    line-height: 54px;
    font-size: 15px;
    color: #1f1f1f;
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .disable {
    color: #cdcaca;
    cursor: default;
  }
}
</style>
