/** 4399新游戏小程序页面爬虫 */
const axios = require('axios');
const _ = require('lodash');
const url = 'https://miniprogram.my4399.com/api/gamecenter.php?dev2=1&a=game&c=gameList&v=3';
const utils = require('./utils');
const path = require('path');

async function req() {
    return axios.get(url)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return {};
        })
}

/** 获取推荐 */
async function getSectionList(arr) {
    let prr = [];
    let gameList = {};
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        const type_id = ele.type_id;
        const type = ele.type;
        const type_name = ele.type_name;
        const list = ele.list;
        for (let j = 0; j < list.length; j++) {
            const game = list[j];
            gameList[game.abbr] = {
                recommend_id: type_id,
                recommend_type: type,
                recommend_name: type_name,
            }
            prr.push(Promise.resolve());
        }
    }
    return Promise.all(prr).then(() => gameList);
}

/** 获取各个分类 */
async function getClassifyList(arr) {
    const TYPE = {
        1: '休闲',
        2: '益智',
        3: '敏捷',
        4: '角色',
        5: '射击',
        6: '消除',
    };
    let prr = [];
    let gameList = {};
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        const type_id = ele.type_id;
        const type = ele.type;
        const type_name = TYPE[type_id];
        const list = ele.list;
        for (let j = 0; j < list.length; j++) {
            const game = list[j];
            gameList[game.abbr] = {
                type_id: type_id,
                type_name: type_name,
            }
            prr.push(Promise.resolve());
        }
    }
    return Promise.all(prr).then(() => gameList);
}

/** insert */
async function insert(miniGame, sectionList, classifyList) {
    let prr = [];
    const len = miniGame.length;
    for (let i = 0; i < len; i++) {
        let game = miniGame[i];
        const abbr = game.abbr;
        if (sectionList.hasOwnProperty(abbr)) {
            await _.merge(game, sectionList[abbr]);
        }
        if (classifyList.hasOwnProperty(abbr)) {
            await _.merge(game, classifyList[abbr]);
        }
        prr.push(Promise.resolve(game))
    }
    return Promise.all(prr).then(results => results);
}

async function spider() {
    console.log('start 4399new-spider');
    const res = await req();

    const data = res.data.allData;
    let miniGame = data.miniGame;
    // 首页推荐类游戏
    const sectionList = await getSectionList(data.section);
    const classifyList = await getClassifyList(data.classify);
    const allGame = await insert(miniGame, sectionList, classifyList);
    console.log('total count : ' + allGame.length);
    await utils.exportJsonToCsv(path.join(__dirname, '../temp/4399new.csv'), allGame);
    await utils.utf8ToGbk(path.join(__dirname, '../temp/4399new.csv'), path.join(__dirname, `../out/4399new.${utils.getFileTime()}.csv`));
    console.log('end 4399new-spider');
}

module.exports = spider;