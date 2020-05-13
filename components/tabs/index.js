// components/tabs/index.js
Component({
  externalClasses: ['p-class'],

  relations: {
    '../tab/index': {
      type: 'child',
      linked () {
        this.changeCurrent();
      },
      linkChanged () {
        this.changeCurrent();
      },
      unlinked () {
        this.changeCurrent();
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: ''
    },
    scroll: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    scrollLeft: {
      type: String,
      value: false
    },
    scrollIntoView: {
      type: String,
      value: false
    },
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabCount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent(val = this.data.current) {
      let items = this.getRelationNodes('../tab/index')
      const len = items.length
      this.setData({
        tabCount: len
      })
      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.data.scroll)
          item.changeLength(len)
          item.changeCurrent(item.data.index === val)
          item.changeCurrentColor(this.data.color)
        })
      }
    },
    emitEvent (key) {
      this.triggerEvent('change', { ...key })
      this.setData({
        current: key.index
      })
    }
  }
})
