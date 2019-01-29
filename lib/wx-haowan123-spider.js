/** 好玩123游戏中心 小程序页面爬虫 */
const axios = require('axios');
const _ = require('lodash');
const url = 'https://xyx-mainland-api.raink.com.cn/v1/index/list?box_id=5049';
const utils = require('./utils');
const path = require('path');

async function req() {
    return axios.get(url)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            return [];
        })
}

async function spider() {
    console.log('start haowan123-spider');
    const res = await req();
    const arr = res.data.data;
    const len = arr.length;
    console.log('total count : ' + len);
    await utils.exportJsonToCsv(path.join(__dirname, '../temp/haowan123.csv'), arr);
    await utils.utf8ToGbk(path.join(__dirname, '../temp/haowan123.csv'), path.join(__dirname, `../out/haowan123.${utils.getFileTime()}.csv`));
    console.log('end haowan123-spider');
}

module.exports = spider;