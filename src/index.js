import merge from 'deepmerge'
import localforage from 'localforage'

export default class Localstorage {
  constructor (parent) {
    const driver = ( 'driver' in parent.config ) ? parent.config.driver.toUpperCase() : 'LOCALSTORAGE'

    this.local = localforage

    this.local.config({
      driver: localforage[driver],
      name: parent.database
    })
  }

  removeItem (item, callback) {
    return this.local.removeItem(item, callback)
  }

  getItem (item, callback) {
    return this.local.getItem(item, callback)
  }

  setItem (item, value, callback) {
    var that = this

    return this.local.getItem(item, (err, data) => {
      if (data !== null && typeof data === 'object') {
        let obj = data

        Object.keys(value).map(key => {
          obj[key] = value[key]
        })

        return that.local.setItem(item, obj, callback)
      }

      that.local.setItem(item, value, callback)
    })
  }

  mergeItem (item, value, callback) {
    var that = this

    return this.local.getItem(item, (err, data) => {
      if (typeof data === 'object') {
        const result = merge(data, value)
        that.local.setItem(item, result, callback)
      }

      that.local.setItem(item, value, callback)
    })
  }

  clear (callback) {
    return this.local.clear(callback)
  }
}
