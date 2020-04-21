const origin = require('../../unity/origin/origin')
const File = require('../../unity/origin/File')
const Upload = require('../../unity/origin/Upload')

class Page {
  /**
   * 声明data
   */
  data = {

  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {

  }

  async upload() {
    let upload = new Upload(new File());
    const res = await upload.push();
    console.warn(res);

  }

}

origin(Page)