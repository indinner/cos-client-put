import {COS} from "./src/cos/cos.sdk.js";
const cos={
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
                console.log(err,data)
                data.Location=data.Location.replace('ak-1302363069.cos.ap-shanghai.myqcloud.com','cdn.youngcode.net')
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
