// components/uploader/index.js
import {UPLOAD_PATH} from '../../config/index'
import axios from '../../utils/axios'
Component({
  properties: {
    host: {
      value: '',
      type: String
    },
    maxlength: {
      value: 6,
      type: Number
    },
    value: {
      value: [],
      type: [Array, String]
    }
  },
  data: {
    files: [],
    show: false
  },
  attached () {
    if (this.data.value == false || !this.data.value) {
      this.setData({
        show: true
      })
      return false
    }
    let files = []
    if (Array.isArray(this.data.value)) {
      for (let i in this.data.value) {
        files.push({
          status: 200,
          temp: this.data.value[i],
          url: this.data.value[i]
        })
      }
    } else {
      let value = this.data.value.split(',')
      for (let i in value) {
        if (i) {
          files.push({
            status: 200,
            temp: value[i],
            url: value[i]
          })
        }
      }
    }
    // for (let i in this.data.value) {
    //   files.push({
    //     status: 200,
    //     tempPath: this.data.value[i]
    //   })
    // }
    this.setData({
      files,
      show: true
    })
  },
  methods: {
    deletePhoto (e) {
      let index = e.currentTarget.dataset.index
      this.data.files.splice(index, 1)
      this.setData({
        files: this.data.files
      })
      let urls = []
      for (let i in this.data.files) {
        urls.push(this.data.files[i].url)
      }
      this.triggerEvent('change', urls.join(','))
    },
    upload: function (data) {
      return axios({
        absolute: true,
        url: UPLOAD_PATH,
        upload: true,
        filePath: data['filePath'],
        name: 'image'
      })
    },
    chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: that.data.maxlength - that.data.files.length,
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // that.setData({
          //   files: that.data.files.concat({ temp: res.tempFilePaths, url: '', status: 0 })
          // });
          // console.log(that.data.files)
          // 创建一个文件容器
          let files = []
          // 循环准备上传的文件
          for (let i in res.tempFilePaths) {
            // 单个文件
            let tempPath = res.tempFilePaths[i]
            // 新增到容器中，并附带属性 status：0上传中，200上传成功，400,上传失败
            files.push({ temp: res.tempFilePaths[i], url: '', status: 0 })
            // 先放页面渲染
            
            // 开始上传
            that.upload({
              filePath: res.tempFilePaths[i]
            }).then(({ path }) => {
              // 成功
              // files[i].url = path
              // files[i].status = 200
              // // 重渲染一次
              // that.setData({
              //   files
              // })
              // 上传成功之后
              for (let x in that.data.files) {
                // console.log(that.data.files.length)
                if (tempPath === that.data.files[x].temp) {
                  let f = that.data.files
                  f[x].url = path
                  f[x].status = 200
                  that.setData({
                    files: f
                  })
                  break
                }
              }
              let urls = []
              // console.log(that.data.files)
              for (let j in that.data.files) {
                if (that.data.files[j].url) {
                  urls.push(that.data.files[j].url)
                }
              }
              // console.log(JSON.stringify(urls))
              that.triggerEvent('change', urls.join(','))
            }).catch(data => {
              // 失败
              // files[i].status = 400
              // // 重渲染一次
              // that.setData({
              //   files
              // })
              // console.log(data)
              for (let x in that.data.files) {
                // console.log(that.data.files)
                if (tempPath === that.data.files[x].temp) {
                  let f = that.data.files
                  f[x].status = 400
                  that.setData({
                    files: f
                  })
                  break
                }
              }
            })
          }
          // console.log(that.data.files)
          // 渲染到页面
          that.setData({
            files: that.data.files.concat(files)
          });
          
        }
      })
    },
    previewImage: function (e) {
      let urls = []
      for (let i in this.data.files) {
        urls.push(this.data.files[i].temp)
      }
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: urls// 需要预览的图片http链接列表
      })
    }
  }
})
