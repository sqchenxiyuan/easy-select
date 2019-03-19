const globalInput = document.createElement("input")
globalInput.type = "file"
globalInput.style.opacity = "0"

//文件类型过滤器
class FileTypeFilter{
    constructor(acceptsString){
        let accepts = acceptsString.split(",").map(type => type.trim()).filter(type => type)
        this.accepts = accepts

        let acceptTests = accepts.map(type => {
            if (/^\./.test(type)){ //为后缀
                return {
                    target: "name", //检查名称
                    regExp: new RegExp(`${type.replace(".", "\\.")}$`, "i")
                }
            } else { //为MIME类型
                if (/\/\*$/){ //泛匹配
                    return {
                        target: "type", //检查名称
                        regExp: new RegExp(`^${type.replace("*", "\\S+")}$`, "i")
                    }
                } else {
                    return {
                        target: "type", //检查名称
                        regExp: new RegExp(`^${type}$`, "i")
                    }
                }
            }
        })

        this.acceptTests = acceptTests
    }

    filter(files){
        if (this.acceptTests.length === 0) return files

        return files.filter(file => {
            return this.acceptTests.some(test => {
                return test.regExp.test(file[test.target])
            })
        })
    }

    getInputAccept(){
        return this.accepts.join(",")
    }
}

class FileSizeFilter{
    constructor(size){
        this.size = size
    }

    filter(files){
        return files.filter(file => {
            return this.size >= file.size
        })
    }
}

//选取文件函数
function selectFile(accept = "", size){
    return new Promise((resolve, reject) => {
        //后缀格式为 .xxx类型
        //MIME为  xxxx/yy 或者 xxxx/*
        //逗号分隔
        let input = globalInput
        let typeFilter = new FileTypeFilter(accept)
        input.accept = typeFilter.getInputAccept()
        input.multiple = true

        input.onchange = e => {
            let files = Array.from(input.files)
            if (files.length === 0) resolve([])

            files = typeFilter.filter(files)
            if (size){
                let sizeFilter = new FileSizeFilter(size)
                files = sizeFilter.filter(files)
            }

            resolve(files)

            document.removeEventListener("wheel", cancle, true)
            document.removeEventListener("mousemove", cancle, true)
            document.removeEventListener("keydown", cancle, true)

            // if (size && file.size > size){
            //     reject(new TypeError("ERROR_FILE_SIZE"))
            //     return
            // }

            // let result = true
            // if (acceptTests.length > 0) {
            //     result = acceptTests.some(test => {
            //         return test.regExp.test(file[test.target])
            //     })
            // }

            // if (result){
            //     resolve(file)
            // } else {
            //     reject(new TypeError("ERROR_FILE_TYPE"))
            // }

            input.value = ""
        }

        function cancle(){
            document.removeEventListener("wheel", cancle, true)
            document.removeEventListener("mousemove", cancle, true)
            document.removeEventListener("keydown", cancle, true)
            reject("cancle")
        }

        //通过这三个来获取用户的取消动作
        document.addEventListener("wheel", cancle, true)
        document.addEventListener("mousemove", cancle, true)
        document.addEventListener("keydown", cancle, true)
        
        //兼容IE Input不在DOM树上无法触发选择的问题
        document.body.appendChild(input)
        input.click()
        document.body.removeChild(input)
    })
}

module.exports = selectFile