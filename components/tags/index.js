// components/tags/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    column: {
      type: Boolean,
      value: false
    },
    tagPlaceholder: {
      type: String,
      value: '请输入标签'
    },
    value: {
      type: String,
      value: ''
    },
    modalTitle: {
      type: String,
      value: '添加标签'
    },
    tagMaxlength: {
      type: Number,
      value: -1
    },
    maxlength: {
      type: Number,
      value: -1
    },
    canUpdate: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalShow: false,
    tags: [],
    // 弹出框input值
    tempValue: '',
    
    // 更新的位置
    tempIndex: -1,
    modalShow2: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal () {
      this.setData({
        modalShow: true
      })
    },
    showUpdateModel (e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        modalShow2: true,
        tempIndex: index,
        tempValue: this.data.tags[index]
      })
    },
    saveTag () {
      let tags = this.data.tags
      let index = this.data.tempIndex
      tags[index] = this.data.tempValue
      this.setData({
        tags,
        tempValue: '',
        tempIndex: -1,
        modalShow2: false
      })
      this.triggerEvent('change', tags.join(','))
    },
    delTag2 () {
      let tags = this.data.tags
      let index = this.data.tempIndex
      tags.splice(index, 1)
      this.setData({
        tags,
        tempValue: '',
        tempIndex: -1
      })
      this.triggerEvent('change', tags.join(','))
    },
    delTag (e) {
      let index = e.currentTarget.dataset.index
      let tags = this.data.tags
      // if (this.data.canUpdate) {
      //   this.setData({
      //     modalShow2: true,
      //     tempIndex: index,
      //     tempValue: tags[index]
      //   })
      // } else {
      tags.splice(index, 1)
      this.setData({
        tags
      })
      // }
      this.triggerEvent('change', this.data.tags.join(','))
    },
    _bindinput (e) {
      this.setData({
        tempValue: e.detail.value
      })
      // console.log(this.data)
    },
    _bindcancel () {
      this.setData({
        modalShow: false,
        modalShow2: false,
        tempIndex: -1,
        tempValue: '',

      })
    },
    _bindconfirm () {
      if (this.data.tempValue) {
        this.data.tags.push(this.data.tempValue)
        this.setData({
          tags: this.data.tags,
          tempValue: ''
        })
      }
      this.setData({
        modalShow: false
      })
      this.triggerEvent('change', this.data.tags.join(','))
    },
  },
  attached () {
    if (this.data.value) {
      let tags = this.data.value.split(',')
      this.setData({
        tags
      })
    }
  }
})
