/** 5588游戏中心 小程序页面爬虫 */
const axios = require('axios');
const _ = require('lodash');
const url = 'https://wxhz.jfydgame.com/jfyd_advert_wechat/wxbox?content=eyJ1aWQiOiI2ZWIwNmNhZC1iNTRlLTRkZjktYTJlZC1kYTc4MjgxZjFjODQiLCJ3eGlkIjoid3hlNjc1YjZhYWQ5NjEyYzc0IiwiZnJvbSI6LTF9&sign=64cffaa9a46b165e7b3647a5799d615d';
const utils = require('./utils');
const path = require('path');

async function req() {
    return axios.get(url)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return [];
        })
}

async function spider() {
    console.log('start 5588-spider');
    const res = await req();
    const data = JSON.parse(new Buffer(res, 'base64').toString());
    const arr = data.adverts;
    const len = arr.length;
    console.log('total count : ' + len);
    await utils.exportJsonToCsv(path.join(__dirname, '../temp/5588.csv'), arr);
    await utils.utf8ToGbk(path.join(__dirname, '../temp/5588.csv'), path.join(__dirname, `../out/5588.${utils.getFileTime()}.csv`));
    console.log('end 5588-spider');
}

module.exports = spider;