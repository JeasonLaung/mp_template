// components/tab/index.js
Component({
  externalClasses: ['p-class'],

  relations: {
    '../tabs/index': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      value: ''
    },
    key: {
        type: String,
        value: ''
    },
    title: {
        type: String,
        value: ''
    },
    dot: {
        type: Boolean,
        value: false
    },
    count: {
        type: Number,
        value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: false,
    currentColor: '',
    scroll: false,
    tabCount: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeLength (tabCount) {
      // 判断
      if (tabCount !== this.data.tabCount) {
        this.setData({ tabCount })
      }
    },
    changeCurrent (current) {
      this.setData({ current })
    },
    changeCurrentColor (currentColor) {
      this.setData({ currentColor })
    },
    changeScroll (scroll) {
      this.setData({ scroll })
    },
    handleClick () {
      let parent = this.getRelationNodes('../tabs/index')[0]
      parent.emitEvent({key: this.data.key, index: this.data.index})
    }
  }
})
