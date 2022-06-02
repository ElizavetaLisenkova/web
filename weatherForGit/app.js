const express = require('express'); 
const cheerio = require('cheerio');
const cyrillicToTranslit = require('cyrillic-to-translit-js');
const request = require('request');
const rp = require('request-promise');
const VKBot = require('node-vk-bot-api');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();
//const server = require('http').createServer(app);

app.use(bodyParser.json());

const token = '';
const confirmation_code = 'cr518197';

const bot = new VKBot({
    token: token,
    confirmation: confirmation_code
});

app.post('/', bot.webhookCallback);

bot.command('/start', (ctx)=>{
    ctx.reply('Для получения погоды введите название города');
});

bot.on((ctx)=>{
    // console.log(ctx);
    let city = ctx.message.text;
    city = cyrillicToTranslit().transform(city, "_");
    const url = `https://pogoda.mail.ru/prognoz/${city}`;
    
    //Вернуть введенное слово обратно пользователю
    //Вернуть текущую температуру и описание погоды

    rp(url)
        .then(function(html){
            const $ = cheerio.load(html);
            let data = [];
            $('body > div.g-layout.layout.layout_banner-side.js-module > div:nth-child(2) > div.block.block_forecast.block_index.forecast-rb-bg > div > div.information.block.js-city_one > div.information__content > div.information__content__wrapper.information__content__wrapper_left > a > div.information__content__additional.information__content__additional_temperature > div.information__content__temperature').each((idx, elem)=>{
                const title = $(elem).text().trim();
                data.push(title);
                // console.log(title);
                // ctx.reply(title);
            });
            $('body > div.g-layout.layout.layout_banner-side.js-module > div:nth-child(2) > div.block.block_forecast.block_index.forecast-rb-bg > div > div.information.block.js-city_one > div.information__content > div.information__content__wrapper.information__content__wrapper_left > a > div.information__content__additional.information__content__additional_first > div').each((idx, elem)=>{
                const title = $(elem).text().trim();
                data.push(title);
                // console.log(title);
                ctx.reply(data[0] + ' '+ data[1]);
            });
            // $('')
        })
        .catch(function(err){
            //ошибка
            console.log(city);
        })
    
});

app.get('/get/:city', (req, res)=>{
    let city = req.params.city;
    city = cyrillicToTranslit().transform(city, "_");
    const url = `https://pogoda.mail.ru/prognoz/${city}`;
    // rp(url)
    //     .then(function(html){
    //         const $ = cheerio.load(html);
    //         let data = [];
    //         $('body > div.g-layout.layout.layout_banner-side.js-module > div:nth-child(2) > div.block.block_forecast.block_index.forecast-rb-bg > div > div.information.block.js-city_one > div.information__content > div.information__content__wrapper.information__content__wrapper_left > a > div.information__content__additional.information__content__additional_first > div:nth-child(1)').each((idx, elem)=>{
    //             const title = $(elem).text();
    //             data.push(title);
    //             res.send(city);
    //         });
    //         // $('')
    //     })
    //     .catch(function(err){
    //         //ошибка
    //         console.log(err);
    //     })
    res.send(city);
    
});

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});