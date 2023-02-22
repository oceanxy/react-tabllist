/**
 * 项目辅助函数集合（仅适用于当前项目的辅助函数）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-08 周二 17:24:00
 */

import { Tag } from 'ant-design-vue'

/**
 * 体检配置--项目分类 用于保存/传递街道树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForMedicallyType(treeHierarchy) {
  switch (treeHierarchy) {
    case 1:
    default:
      return 'parentId'
  }
}

/**
 * 体检配置--项目管理 用于保存/传递街道树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForMedicallyAdmin(treeHierarchy) {
  switch (treeHierarchy) {
    case 2:
      return 'ecId'
    case 1:
    default:
      return 'parentId'
  }
}

/**
 * 格式化年级显示
 * @param grade {number} 年级代号 4代表一年级，5代表二年级，以此类推
 */
export function getGradeStr(grade) {
  if (grade <= 9) {
    return ['一', '二', '三', '四', '五', '六'][grade - 4] + '年级'
  } else if (grade > 9 && grade <= 12) {
    return ['初一', '初二', '初三'][grade - 10]
  } else if (grade > 12 && grade <= 15) {
    return ['高一', '高二', '高三'][grade - 13]
  } else {
    return '-'
  }
}

/**
 * 获取学校树的自定义图标
 * @param treeNode
 * @returns {(function(): Promise<*>)|(function(): Promise<*>)|(function(): Promise<*>)}
 */
export function getSchoolTreeIcon(treeNode) {
  // 父ID为500001为树的最顶级（区县一级）
  if (+treeNode.obj.pid === 500001) {
    return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-district.svg')
  } else {
    // 排除父ID为500001的所有父级为树的第二级（街道一级），不是父级的为叶子节点（学校一级）
    if (treeNode.isParent) {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-street.svg')
    } else {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-school.svg')
    }
  }
}

/**
 * 获取组织树的自定义图标
 * @param treeNode
 * @returns {(function(): Promise<*>)|(function(): Promise<*>)|(function(): Promise<*>)}
 */
export function getOrganizationTreeIcon(treeNode) {
  if (treeNode.isParent) {
    return () => import('@/layouts/components/TGMenu/assets/images/organization.svg')
  } else {
    return () => import('@/layouts/components/TGMenu/assets/images/organizationItem.svg')
  }
}

/**
 * 获取体检配置树的定制图标
 * @param treeNode
 * @returns {(function(): Promise<*>)|(function(): Promise<*>)|(function(): Promise<*>)}
 */
export function getExaminedDisposeTreeIcon(treeNode) {
  if (+treeNode.obj.parentId === 0) {
    return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-item.svg')
  } else {
    if (!treeNode.isParent && treeNode.name === '内科') {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-malady.svg')
    } else if (!treeNode.isParent && treeNode.name === '五官') {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-five.svg')
    }
  }
}

/**
 * 专用于选择街道下拉框的值的配置
 * 参考 ant-design-vue this.form.getFieldDecorator(id, options) 和 v-decorator="[id, options]" 中的配置：
 *  options.getValueProps 设置控件的值的格式
 * @param value
 * @returns {{value: {label: *, key: *}}|undefined}
 */
export function getStreetValueProps(value) {
  return {
    value: value
      ? {
        key: value.id || value.key,
        label: value.name || value.label
      }
      : undefined
  }
}

/**
 * 专用于选择街道下拉框的返回值的配置
 * 参考 ant-design-vue this.form.getFieldDecorator(id, options) 和 v-decorator="[id, options]" 中的配置：
 *  options.getValueFromEvent 设置如何将 event 的值转换成控件的返回值
 * @param value
 * @returns {{name, id}}
 */
export function getStreetValueFromEvent(value) {
  return { id: value.key, name: value.label }
}
