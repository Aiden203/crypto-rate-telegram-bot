const token = '6891674248:AAFS5OYjhblBH3JYgMq0XFyG2mEY_ZAw-Zw';
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const coincap = 'https://api.coincap.io/v2/assets';
const riyalapi = 'http://api.navasan.tech/latest/?api_key=freemBxry5of1RxsvNDcCmuM2eBLrP2d';

async function getExchangeRate() {
  try {
    const response = await axios.get(coincap);
    const data = response.data;

    const relevantData = data.data.map(item => ({
      [item.symbol.toLowerCase()]: item.priceUsd
    }));

    const exchangeRates = Object.assign({}, ...relevantData);

    return exchangeRates;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}


async function getRiyalRate() {
  try {
    const response_riyal = await axios.get(riyalapi);
    const data_riyal = response_riyal.data.usdt.value;

    return data_riyal;
  } catch (error) {
    console.error('Error fetching riyal rate:', error);
    return null;
  }
}

const bot = new TelegramBot(token, {polling: true});
const btn_about = 'درباره ربات';
const btn_btc_rate = 'قیمت بیتکوین';
const btn_eth_rate = 'قیمت اتریوم';
const btn_doge_rate = 'قیمت دوج‌کوین';
const btn_ltc_rate = 'قیمت لایت‌کوین';
const btn_ada_rate = 'قیمت کاردانو';
const btn_xrp_rate = 'قیمت ریپل';
const btn_bnb_rate = 'قیمت بایننس‌کوین';
const btn_usdt_rate = 'قیمت تتر';

const btn_gp = {"reply_markup": {"keyboard": [[btn_btc_rate, btn_eth_rate, btn_doge_rate],[btn_ltc_rate, btn_ada_rate, btn_xrp_rate],[btn_about,btn_bnb_rate,btn_usdt_rate]]}};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const data_usdt_riyal = await getRiyalRate();
    const data = await getExchangeRate();    

    switch (messageText) {
  case btn_about:
    bot.sendMessage(chatId, 'این ربات توسط علی پهلوان برای پروژه درس آقای محمدزاده توسعه یافته است.');
    break;
  case "/start":
    bot.sendMessage(chatId, 'به ربات من خوش اومدی!\n\nلطفا انتخاب کن:', btn_gp);
    break;

    case btn_btc_rate:
      let btc_riyal = data_usdt_riyal * data.btc;
      btc_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(btc_riyal);
      btc_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.btc);
      if (data) {
        bot.sendMessage(chatId, `قیمت بیتکوین: \n ${btc_riyal} Toman \n ${btc_usd} Dollars`);
      } else {
        bot.sendMessage(chatId, 'خطا!');
      }
      break;

  case btn_eth_rate:
    let eth_riyal = data_usdt_riyal * data.eth;
    eth_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(eth_riyal);
    eth_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.eth);
    if (data) {
          bot.sendMessage(chatId, `قیمت اتریوم: \n ${eth_riyal} Toman \n ${eth_usd} Dollars`);
    } else {
      bot.sendMessage(chatId, 'خطا!');
    }
    break;

    case btn_ltc_rate:
      let ltc_riyal = data_usdt_riyal * data.ltc;
      ltc_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(ltc_riyal);
      ltc_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.ltc);
      if (data) {
        bot.sendMessage(chatId, `‌قیمت لایت‌کوین: \n ${ltc_riyal} Toman \n ${ltc_usd} Dollars`);
      } else {
        bot.sendMessage(chatId, 'خطا!');
      }
      break;
      
      case btn_ada_rate:
      let ada_riyal = data_usdt_riyal * data.ada;
      ada_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(ada_riyal);
      ada_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.ada);
      if (data) {
            bot.sendMessage(chatId, `قیمت کاردانو: \n ${ada_riyal} Toman \n ${ada_usd} Dollars`);
      } else {
        bot.sendMessage(chatId, 'خطا!');
      }
      break;
      
      case btn_bnb_rate:
      let bnb_riyal = data_usdt_riyal * data.bnb;
      bnb_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(bnb_riyal);
      bnb_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.bnb);
      if (data) {
            bot.sendMessage(chatId, `قیمت بایننس‌کوین: \n ${bnb_riyal} Toman \n ${bnb_usd} Dollars`);
      } else {
        bot.sendMessage(chatId, 'خطا!');
      }
      break;

      case btn_xrp_rate:
      let xrp_riyal = data_usdt_riyal * data.xrp;
      xrp_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(xrp_riyal);
      xrp_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.xrp);
        if (data) {
              bot.sendMessage(chatId, `قیمت ریپل: \n ${xrp_riyal} Toman \n ${xrp_usd} Dollars`);
        } else {
          bot.sendMessage(chatId, 'خطا!');
        }
        break;

        case btn_doge_rate:
          let doge_riyal = data_usdt_riyal * data.doge;
          doge_riyal = new Intl.NumberFormat(  'ir-IR', { maximumSignificantDigits: 8 }).format(doge_riyal);
          doge_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.doge);
            if (data) {
                  bot.sendMessage(chatId, `قیمت دوج‌کوین: \n ${doge_riyal} Toman \n ${doge_usd} Dollars`);
            } else {
              bot.sendMessage(chatId, 'خطا!');
            }
            break;

        case btn_usdt_rate:
        usdt_usd = new Intl.NumberFormat(  'en-IN', { maximumSignificantDigits: 4 }).format(data.usdt);
        if (data_usdt_riyal || data) {
              bot.sendMessage(chatId, `قیمت تتر: \n ${data_usdt_riyal} Toman \n ${usdt_usd} Dollars`);
        } else {
          bot.sendMessage(chatId, 'خطا!');
        }
        break;
  default:
    break;
}

});


