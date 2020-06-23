console.show()
console.log("开始")

function runrunrun()
{
    console.log("qingqiuzhong")
    let res = http.post("http://192.168.0.9/", {})
    console.log(res.body.json().length);
    console.log("qingqiu END")
    sleep(1e3)
}

try
{
    runrunrun()
    console.log("结束");
    
}catch(e)
{
    console.log("出错了")
}

