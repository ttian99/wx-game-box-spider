const BASE_URL = 'https://goplatform.minigame.qq.com/mpgather';
const axios = require('axios');
const _ = require('lodash');

/** 通用的请求参数 */
const requestConfig = {
    "uid": 609941,
    "openid": "osvfL4o7GhdEaXVDsGgsFEkLZoc4",
    "session": "",
    "ver": "2.0.0"
}

const utils = require('./utils');

/** post方法 */
async function post(url, opts) {
    return axios.post(url, opts)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
}
/** 获取请求参数 */
function getOptions(obj) {
    return _.merge(obj, requestConfig);
}

/**
 * 获取游戏数量
 * @param {*} type 榜单类型：new_rank, hot_rank, category
 * @param {*} category_type 游戏分类：yz(益智), xc(消除), qp(棋牌), xx(消除)
 * @param {*} category_rank_type 
 * @example 省略号表示公共参数
 * 所有游戏: {"type":"new_rank", ...}
 * 单个分类: {"type":"category","category_type":"yz","category_rank_type":"time", ...}
 */
async function getGameNum(type, category_type, category_rank_type) {
    const count_url = `${BASE_URL}/mgetallgamenum`;  // 总数量URL
    let opts = { type: type };
    if (type == 'category') {
        opts.category_type = category_type;
        opts.category_rank_type = category_rank_type;
    }
    opts = getOptions(opts);
    const data = await post(count_url, opts);
    return data.all_num;
}

/**
 * 
 * @param {String} type 类型：new, hot
 * @param {Number} startId 开始Id: 0
 * @param {Number} len 长度: 默认的最大长度为50
 * @param {Number} count 游戏总数
 */
async function getGameRank(type, startId, len, count) {
    if (startId >= count) return [];
    const gameInfoUrl = `${BASE_URL}/mget${type}ginfo`;
    const opts = getOptions({ gt: `${type}Rank`, s: startId, l: len });
    const data = await post(gameInfoUrl, opts);
    startId += len;
    const next = await getGameRank(type, startId, len, count);
    return data.concat(next);
}

// 增加排名信息
async function addRank(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].rank = await Promise.resolve(i + 1);
    }
    return arr;
}

/** 获取新游榜 */
async function getNewGameRank() {
    const count = await getGameNum('new_rank');
    console.log(`getNewGameRank count: ${count}`);
    let arr = await getGameRank('new', 0, 50, count);
    arr = await addRank(arr);
    await utils.exportJsonToCsv('temp/new_rank.csv', arr);
    await utils.utf8ToGbk('temp/new_rank.csv', `out/new_rank.${utils.getFileTime()}.csv`);
    console.log('getNewGameRank over');
}
/** 获取热门榜 */
async function getHotGameRank() {
    const count = await getGameNum('hot_rank');
    console.log(`getHotGameRank count: ${count}`);
    let arr = await getGameRank('hot', 0, 50, count);
    arr = await addRank(arr);
    await utils.exportJsonToCsv('temp/hot_rank.csv', arr);
    await utils.utf8ToGbk('temp/hot_rank.csv', `out/hot_rank.${utils.getFileTime()}.csv`);
    console.log('getHotGameRank over');
}

/** 获取排行榜信息 */
async function compareRank() {

}

async function spider() {
    await getNewGameRank();
    // await getHotGameRank();
}

module.exports = spider;
