const express = require('express');
const http = require('http');
const cfg = require('./config.json');
const qqgameSpider = require('./lib/wx-qqgame-spider');
const readygoSpider = require('./lib/wx-readygo-spider');
const fkwSpider = require('./lib/wx-fkw-spider');
const scheduler = require('./lib/scheduler');

// 所有任务
async function task() {
    console.log('== start wx-game-box-spider task ==');
    console.log(new Date());
    console.log('start qqgame spider');
    await qqgameSpider();
    console.log('end qqgame spider');
    console.log('start readygo spider');
    await readygoSpider();
    console.log('end readygo spider');
    console.log('start fkw spider');
    await fkwSpider();
    console.log('end fkw spider');
    console.log('== end wx-game-box-spider task ==');
    console.log(new Date());
}

// 启动定时任务
const job = scheduler.on(cfg.scheduleRule, function () {
    task();
});

// 启动服务器
const app = express();
const httpServer = http.createServer(app);
httpServer.listen(cfg.svr.port, () => {
    console.log(new Date());
    console.log(`HTTP Server running on port ${cfg.svr.port}!`);
});

// 单独触发爬取任务
app.get('/task', async (req, res) => {
    res.send('开始爬取任务');
    await task();
});