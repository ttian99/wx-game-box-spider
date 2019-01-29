const express = require('express');
const http = require('http');
const cfg = require('./config.json');
const qqgameSpider = require('./lib/wx-qqgame-spider');
const readygoSpider = require('./lib/wx-readygo-spider');
const fkwSpider = require('./lib/wx-fkw-spider');
const scheduler = require('./lib/scheduler');
const new4399Spider = require('./lib/wx-4399new-spider');
const new5588Spider = require('./lib/wx-5588-spider');
const haowan123Spider = require('./lib/wx-haowan123-spider');

// 保证报错
process.addListener('uncaughtException', (err) => { throw err });

// 所有任务
async function task() {
    console.log('== start wx-game-box-spider task ==');
    console.log(new Date());
    await qqgameSpider();
    await readygoSpider();
    await fkwSpider();
    await haowan123Spider();
    await new5588Spider();
    await new4399Spider();
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