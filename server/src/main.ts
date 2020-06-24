#!/usr/bin/env node

import * as logicS from "./logicScripts/logic_1";

(async ()=>
{
    console.log("======");
    logicS.init()
    logicS.eventInit()
    logicS.start()
    console.log("======");
})()
