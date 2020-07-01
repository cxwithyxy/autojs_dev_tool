let ip = rawInput("请输入服务器ip地址:", "192.168.0.13");
let hostpath = "http://"+ ip + "/"


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
    let fileContent = res.body.bytes()
    if(!files.exists(filepath))
    {
        files.createWithDirs(filepath)
    }
    files.writeBytes(filepath, fileContent);
}

function runrunrun()
{
    while(true)
    {
        let fileList = getCommandList()
        for(let i = 0; i < fileList.length; i++)
        {
            let file = fileList[i]
            let filepath = file.content
            downloadFile(filepath)
            finishCommand(file.id)
            console.log("update: " + filepath);
            
        }
        sleep(1e3)
    }
}

try
{
    console.show()
    console.log("开始")
    runrunrun()
    console.log("结束");
    
}catch(e)
{
    console.log(e)
}

