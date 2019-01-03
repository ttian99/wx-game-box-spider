/** readygo小程序页面爬虫 */
// miniprogram: wxce8556babd23a6b3
const axios = require('axios');
const _ = require('lodash');
const url = 'https://api.kuaiyugo.com/api/readygo/v1/programs/eb3ecf1f22014060a2f17e8c477dca99/homepage';
const utils = require('./utils');

async function req() {
    return axios.get(url, { headers: { 'miniprogram': 'wxce8556babd23a6b3' } })
        .then((res) => {
            return res.data.data.data;
        })
        .catch((err) => {
            console.log(err);
            return [];
        })
}

async function getInfo(item) {
    let arr = [];
    const type = item.name;
    const list = item.list;
    for (let j = 0; j < list.length; j++) {
        const info = await _.merge({ type: type }, list[j]);
        const tempStr = info.describe.replace('人在玩', '');
        info.describe = utils.trans(tempStr);
        arr.push(info);
    }
    // 从大到小排序
    arr.sort((a, b) => {
        const aStr = a.describe.replace(/,/ig, ''); 
        const bStr = b.describe.replace(/,/ig, ''); 
        return Number(aStr) - Number(bStr);
    });
    return arr;
}

async function spider() {
    console.log('start readygo-spider');
    const arr = await req();
    const len = arr.length;
    let newArr = [];
    for (let i = 0; i < len; i++) {
        const item = arr[i];
        const tempArr = await getInfo(item);
        newArr = newArr.concat(tempArr);
    }
    console.log('total count : ' + newArr.length);
    await utils.exportJsonToCsv('temp/readygo.csv', newArr);
    await utils.utf8ToGbk('temp/readygo.csv', `out/readygo.${utils.getFileTime()}.csv`);
    console.log('end readygo-spider');
}

module.exports = spider;