const DEBUG = false

class LocalStorageCache {
  constructor (ttl, storageKey) {
    this.STORAGE_KEY = storageKey || 'app'
    if (ttl === void 0) { ttl = 0 }
    this.ttl = ttl
  }

  encode (storage) {
    const string = JSON.stringify(storage)
    if (DEBUG) { return string }
    else {
      const bytes = new Uint16Array(string.length)
      for (let i = 0; i < bytes.length; i++) { bytes[i] = string.charCodeAt(i) }
      return btoa(new Uint8Array(bytes.buffer).reduce((d, b) => d + String.fromCharCode(b), ''))
    }
  }

  decode (storage) {
    if (DEBUG) { return JSON.parse(storage) }
    else {
      const binary = atob(storage)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < bytes.length; i++) { bytes[i] = binary.charCodeAt(i) }
      return JSON.parse(new Uint16Array(bytes.buffer).reduce((d, b) => d + String.fromCharCode(b), ''))
    }
  }

  get (k) {
    const encodedStore = localStorage.getItem(this.STORAGE_KEY)
    if (encodedStore) {
      let store = this.decode(encodedStore)
      // Key provided return specific value from cache
      if (k) {
        if (store[k]?.expiresAt && Date.now() >= store[k].expiresAt) {
          delete store[k]
          localStorage.setItem(this.STORAGE_KEY, this.encode(store))
          return undefined
        }
        else return store[k]
      }
      // No key provided, entire cache returned
      else {
        // Clear expired items from cache before returning
        let modified = false
        Object.keys(store).forEach(key => {
          if (store[k]?.expiresAt && Date.now() >= store[key].expiresAt) {
            modified = true
            delete store[key]
          }
        })
        if (modified) localStorage.setItem(this.STORAGE_KEY, this.encode(store))
        return store
      }
    }
    else return undefined
  }

  set (k, v, ttl) {
    let timeToLive = ttl || this.ttl
    let now = Date.now()
    let store = this.get()
    let updatedStore = {
      ...store,
      [k]: {
        data: v,
        createdAt: now,
        expiresAt: timeToLive ? now + timeToLive : Infinity
      }
    }
    timeToLive && setTimeout(() => this.delete(k), timeToLive)
    localStorage.setItem(this.STORAGE_KEY, this.encode(updatedStore))
  }

  delete (k) {
    let store = this.get()
    delete store[k]
    localStorage.setItem(this.STORAGE_KEY, this.encode(store))
  }
}

export default (ttl, storageKey) => new LocalStorageCache(ttl, storageKey)
