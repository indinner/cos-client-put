import COS from "cos-js-sdk-v5";



const cos={

    /**
     * 文件上传
     * @param id 腾讯云访问密钥ID
     * @param key 腾讯云访问密钥Key
     * @param file file文件对象、字符串、二进制数据
     * @param path 文件路径，格式参考: /path/ 、注意: ⚠️请不要使用根目录⚠️
     * @param name 文件名，格式参考: name
     * @param type 文件后缀，格式参考: png 注意: ⚠️后缀不需要带"点" ⚠️
     * @returns {Promise<unknown>} 返回一个promise对象
     */
    putFile(id,key,file,path,name,type){
        let cosClient=this.initCos(id,key)
        return new Promise(function (resolve, reject) {
            cosClient.putObject({
                Bucket: 'iai-1311740348',
                Region: 'ap-nanjing',
                Key: path+name+'.'+type,
                StorageClass: 'STANDARD',
                Body: file, // 上传文件对象
                onProgress: function(progressData) {
                }
            }, function(err, data) {
                data.Location=data.Location.replace("iai-1311740348.cos.ap-nanjing.myqcloud.com",'cdn.youngcode.net')
                resolve(data)
                reject(err)
            });
        })
    },

    initCos(id,key){
        const cosClient = new COS({
            SecretId: id,
            SecretKey: key,
        });
        return cosClient;
    },
}
export default cos
