/** 方块玩小程序页面爬虫 */
const axios = require('axios');
const utils = require('./utils');
const fs = require('fs-extra');

const url = 'https://gamecenter.phonecoolgame.com/hezi/getHeziGames?appid=wx845a2f34af2f4235&token=';

async function getRequest() {
    return axios.get(url).then((res) => {
        return res.data.data;
    }).catch((err) => {
        console.log(err);
        return null;
    })
}

// 二级
async function getLabelPageGames(arr) {
    const type = 'labelPageGames';
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const labelname = item.labelname;
        const labelGames = item.labelGames;
        for (let j = 0; j < labelGames.length; j++) {
            const game = labelGames[j];
            game.labelname = labelname;
            game.positionType = type;
            if (game.findDetailUrls) {
                game.findDetailUrls.join(', ');
            }
        }
        newArr = await newArr.concat(labelGames);
    }
    return newArr;
}

// 一级
async function getOtherGames(type, arr) {
    // let pArr = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i].positionType = type;
        if (arr[i].findDetailUrls) {
            arr[i].findDetailUrls.join(', ');
        }
        // pArr.push(Promise.resolve());
    }
    return arr;
    // return Promise.all(pArr).then(() => arr)
}

async function spider() {
    const data = await getRequest();
    for (const key in data) {
        let arr = [];
        if (key === 'labelPageGames') {
            arr = await getLabelPageGames(data[key]);
        } else {
            arr = await getOtherGames(key, data[key]);
        }
        const fileName = `temp/fkw.${key}.csv`;
        await fs.ensureFileSync(fileName);
        await utils.exportJsonToCsv(fileName, arr);
        await utils.utf8ToGbk(fileName, `out/fkw.${key}.${utils.getFileTime()}.csv`)
    }
}

module.exports = spider;