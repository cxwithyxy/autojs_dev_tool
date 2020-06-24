console.show()
console.log("开始")

let hostpath = "http://192.168.0.13/"

function getCommandList()
{
    let res = http.post(hostpath, {})
    return res.body.json()
}

function finishCommand(id)
{
    http.post(hostpath + "done/", {id:id})
}

function downloadFile(filepath)
{
    let res = http.post(hostpath + "download/", {filepath: filepath})
    let fileContent = res.body.string()
    if(!files.exists(filepath))
    {
        files.createWithDirs(filepath)
    }
    console.log(filepath);
    
    files.write(filepath, fileContent);
}

function runrunrun()
{
    console.log("qingqiuzhong")
    let fileList = getCommandList()
    for(let i = 0; i < fileList.length; i++)
    {
        let file = fileList[i]
        let filepath = file.content
        downloadFile(filepath)
        finishCommand(file.id)
    }
    console.log("qingqiu END")
    sleep(1e3)
}

try
{
    runrunrun()
    console.log("结束");
    
}catch(e)
{
    console.log(e)
}

