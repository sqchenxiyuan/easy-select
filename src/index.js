const globalInput = document.createElement("input")
globalInput.type = "file"
globalInput.style.opacity = "0"

//选取文件函数
function selectFile(accept = "", size){
    //后缀格式为 .xxx类型
    //MIME为  xxxx/yy 或者 xxxx/*
    //逗号分隔
    let input = globalInput
    let accepts = accept.split(",").map(type => type.trim()).filter(type => type)
    input.accept = accepts.join(",")

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

    return new Promise((resolve, reject) => {
        input.onchange = e => {
            let file = input.files[0]
            if (!file) return

            if (size && file.size > size){
                reject(new TypeError("ERROR_FILE_SIZE"))
                return
            }

            let result = true
            if (acceptTests.length > 0) {
                result = acceptTests.some(test => {
                    return test.regExp.test(file[test.target])
                })
            }

            if (result){
                resolve(file)
            } else {
                reject(new TypeError("ERROR_FILE_TYPE"))
            }

            input.value = ""
        }
        
        //兼容IE Input不在DOM树上无法触发选择的问题
        document.body.appendChild(input)
        input.click()
        document.body.removeChild(input)        
    })
}

//通过这三个来获取用户的取消动作
document.addEventListener("wheel", _ => console.log("wheel"), true)
document.addEventListener("mouseup", _ => console.log("mouseup"))
document.addEventListener("keydown", _ => console.log("keydown"), true)


module.exports = selectFile