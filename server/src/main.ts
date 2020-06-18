

// import { Server } from "./net/Server"

// new Server().start()

import {FSController} from "./fileSystem/FSController"


(async ()=>
{
    let fsc = new FSController("./build")
    console.log(await fsc.dir());
})()
