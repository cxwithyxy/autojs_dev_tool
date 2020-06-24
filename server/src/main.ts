#!/usr/bin/env node

import * as logicS from "./logicScripts/logic_1";

(async ()=>
{
    logicS.init()
    logicS.eventInit()
    logicS.start()
})()
