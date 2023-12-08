import moment from 'moment'

/**
 * 验证邮件格式
 * @param rule
 * @param value
 * @param callback
 */
export function verifyEmail(rule, value, callback) {
  if (rule.required || value) {
    const EMAIL_REG = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/

    if (!EMAIL_REG.test(value)) {
      callback(new Error('邮箱地址有误！'))
    }
  }

  callback()
}

/**
 * 验证身份证号码格式
 * @param rule
 * @param value
 * @param callback
 */
export function verifyIDNumber(rule, value, callback) {
  if (rule.required || value) {
    const ID_REG_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    const ID_REG_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/

    // 校验身份证：
    if (!ID_REG_18.test(value) && !ID_REG_15.test(value)) {
      callback(new Error('身份证号码格式有误！'))
    }
  }

  callback()
}

/**
 * 验证手机号格式（宽松）
 * @param rule
 * @param value
 * @param callback
 */
export function verifyMobileNumber(rule, value, callback) {
  if (rule.required || value) {
    const MOBILE_NUMBER_REG = /^1[3-9]\d{9}$/

    if (!MOBILE_NUMBER_REG.test(value)) {
      callback(new Error('手机号码格式有误！'))
    }
  }

  callback()
}

/**
 * 验证固定电话号码格式
 * @param rule
 * @param value
 * @param callback
 */
export function verifyLandlineNumber(rule, value, callback) {
  if (rule.required || value) {
    const LANDLINE_NUMBER_REG = /^0\d{2,3}-?[1-9]\d{6,7}$/

    if (!LANDLINE_NUMBER_REG.test(value)) {
      callback(new Error('电话号码格式有误！'))
    }
  }

  callback()
}

/**
 * 同时验证手机号码和固定电话号码格式
 * @param rule
 * @param value
 * @param callback
 */
export function verifyPhoneNumber(rule, value, callback) {
  if (rule.required || value) {
    const MOBILE_NUMBER_REG = /^1[3-9]\d{9}$/
    const LANDLINE_NUMBER_REG = /^0\d{2,3}-?[1-9]\d{6,7}$/

    if (!MOBILE_NUMBER_REG.test(value) && !LANDLINE_NUMBER_REG.test(value)) {
      callback(new Error('电话号码格式有误！'))
    }
  }

  callback()
}

/**
 * 验证给定日期范围是否与目标日期范围存在交叉
 * @param range {[Moment, Moment][]} - 目标日期范围
 * @param [unit] {string} - 如果要将粒度限制为毫秒以外的单位，请将单位作为第三个参数传递。详见：https://momentjs.cn/docs/#/query/is-between/
 * @return {(function(*, *, *): void)|*}
 */
export const verifyIsDateRangeBetween = (range, unit = 'second') => (rule, value, callback) => {
  if (rule.required || value) {
    for (const r of range) {
      if (
        !(
          moment(value[1]).endOf(unit).isBefore(r[0].startOf(unit)) ||
          moment(value[0]).startOf(unit).isAfter(r[1].endOf(unit)))
      ) {
        rule.message = rule.message.replace(
          '{date}',
          moment(value[0]).format('YYYY-MM-DD') + ' 至 ' + moment(value[1]).format('YYYY-MM-DD') + ' '
        )

        callback(new Error(rule.message))
      }
    }
  }

  callback()
}

/**
 * 验证给定日期是否介于目标日期范围之间
 * @param range {[Moment, Moment][]} - 目标日期范围
 * @param [unit] {string} - 如果要将粒度限制为毫秒以外的单位，请将单位作为第三个参数传递。详见：https://momentjs.cn/docs/#/query/is-between/
 * @param [inclusivity] {string} - 日期包容性，默认“()”。详见 https://momentjs.cn/docs/#/query/is-between/
 * @return {(function(*, *, *): void)|*}
 */
export const verifyIsDateBetween = (range, unit = 'second', inclusivity = '()') => (rule, value, callback) => {
  if (rule.required || value) {
    for (const r of range) {
      if (
        moment(value).isBetween(
          r[0].startOf(unit),
          r[1].endOf(unit),
          unit,
          inclusivity
        )
      ) {
        callback(new Error(rule.message.replace('{date}', moment(value).format('YYYY-MM-DD')) + ' '))
      }
    }
  }

  callback()
}
