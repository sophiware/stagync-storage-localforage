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
    return this.mergeItem(item, value, callback)
  }

  mergeItem (item, value, callback) {
    var that = this

    this.local.getItem(item, (err, data) => {
      if (typeof data === 'object') {
        if (Array.isArray(data)) {
          data.push(value)
          that.local.setItem(item, data, callback)
        } else {
          const result = merge(data, value)
          that.local.setItem(item, result, callback)
        }
      } else {
        that.local.setItem(item, value, callback)
      }
    })
  }

  clear (callback) {
    return this.local.clear(callback)
  }
}
