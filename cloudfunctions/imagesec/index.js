const cloud = require('wx-server-sdk');
cloud.init()

exports.main = async (event, context) => {
  // 待实现
  //1.下载此图片，获取文件内容 （可参考 文档 cloud.downloadFile）

  //2. 将文件内容构造image，使用云调用检测结果 （可参考 ）

  const imgmsg = (await cloud.downloadFile({
    fileID:event.img,
  })).fileContent;
  return cloud.openapi.security.imgSecCheck({
  media: {
    contentType: 'image/png',
    value: imgmsg
  }
})
}