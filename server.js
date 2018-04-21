const db = require('monk')("login:pass@id_addr:port/auto_trading");
const settings_collection = db.get('settings');
const edges_collection = db.get('edges_and_vertexes');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var TelegramBot = require('node-telegram-bot-api');
var dateFormat = require('dateformat');



var token = 'werwrwrwr'; // Устанавливаем токен, который выдавал нам бот.
var access_key = "werwerwe"; //для доступа к серверу указываем этот параметр в загаловке
var chat_id = 555; //Сюда вставляем чат id с ботом для своего аккаунта

var bot = new TelegramBot(token, { polling: true });
var port = 4050;        // set our port
var router = express.Router();
app.use(bodyParser.json());


var list_messages = [];


function repeat_send_message() {
    if (list_messages.length > 0) {
        bot.sendMessage(chat_id, list_messages[0]);
        list_messages.splice(0, 1);
    }
    setTimeout(repeat_send_message, 1500);
}
setImmediate(repeat_send_message);



function send_message(message) {
    list_messages.push(message);
    console
}


router.post('/send_notify', function (req, res) {
    //Принимаем событие о том что за последние 15 минут не найденно логов в pool api manager на сервере 159.89.18.59 
    if (req.headers.access_key && req.headers.access_key === access_key) {
        send_message(req.body.message);
        res.json({ success: true });
    }
    else {
        res.json({ success: false, error_msg: "Bad access key" });
    }
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);


bot.onText(/^\/start_finded_app$/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await start_finded_app();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});

bot.onText(/^\/stop_finded_app$/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await stop_finded_app();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});

bot.onText(/^\/start_execute_app$/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await start_execute_app();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});

bot.onText(/^\/stop_execute_app$/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await stop_execute_app();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});


bot.onText(/^\/get_loaded_modules$/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await get_list_modules_from_db();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});

bot.onText(/^\/get_current_settings/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        if (chatId == chat_id) {
            var result = await get_current_settings_from_db();
            if (result.success)
                bot.sendMessage(chatId, result.value)
            else
                bot.sendMessage(chatId, result.error_msg)
        }
    }
    catch (e) {
        console.log(e);
    }
});



bot.onText(/min_percent_profit (.+)/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        var number_ = match[1];
        if (chatId == chat_id) {
            var number = parseFloat(number_);
            if (number > 0 && typeof number === "number") {
                var result = await set_min_percent_profit(number);
                if (result.success)
                    bot.sendMessage(chatId, result.value)
                else
                    bot.sendMessage(chatId, result.error_msg)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});


bot.onText(/max_percent_profit (.+)/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        var number_ = match[1];
        if (chatId == chat_id) {
            var number = parseFloat(number_);
            if (number > 0 && typeof number === "number") {
                var result = await set_max_percent_profit(number);
                if (result.success)
                    bot.sendMessage(chatId, result.value)
                else
                    bot.sendMessage(chatId, result.error_msg)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});


bot.onText(/max_exchange_sync_time (.+)/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        var number_ = match[1];
        if (chatId == chat_id) {
            var number = parseInt(number_);
            if (number > 0 && typeof number === "number") {
                var result = await set_max_exchange_sync_time(number);
                if (result.success)
                    bot.sendMessage(chatId, result.value)
                else
                    bot.sendMessage(chatId, result.error_msg)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});


bot.onText(/overdue_time (.+)/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        var number_ = match[1];
        if (chatId == chat_id) {
            var number = parseInt(number_);
            if (number > 0 && typeof number === "number") {
                var result = await set_overdue_time(number);
                if (result.success)
                    bot.sendMessage(chatId, result.value)
                else
                    bot.sendMessage(chatId, result.error_msg)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});


bot.onText(/update_settings_interval (.+)/, async function (msg, match) {
    try {
        var chatId = msg.from.id;
        var number_ = match[1];
        if (chatId == chat_id) {
            var number = parseInt(number_);
            if (number > 0 && typeof number === "number") {
                var result = await set_update_settings_interval(number);
                if (result.success)
                    bot.sendMessage(chatId, result.value)
                else
                    bot.sendMessage(chatId, result.error_msg)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});






/** Функция возвращает из базы список загруженных модулей
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка получения из базы"}
 */
async function get_list_modules_from_db() {
    return new Promise(async (resolve, reject) => {
        try {
            var records = await edges_collection.find({}, { exchange: 1, last_sync: 1 });
            if (records.length > 0) {
                var t = "Список загруженных модулей ("+dateFormat(new Date(), "dd.mm.yyyy HH:MM:ss")+"):\n";
                for (var i = 0; i < records.length; i++) {
                    s = "" + (i + 1) + ") " + records[i].exchange + " " + dateFormat(new Date(records[i].last_sync.high_ * 1000), "dd.mm.yyyy HH:MM:ss") + "\n";
                    t = t + s;
                }

                resolve({ success: true, value: t })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка получения списка загруженных модулей " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка получения списка загруженных модулей " });
        }
    })
}


/** Функция возвращает из базы список текущих настроек
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка получения из базы"}
 */
async function get_current_settings_from_db() {
    return new Promise(async (resolve, reject) => {
        try {
            var settings_ = await settings_collection.find({});
            var settings = settings_[0];
            var t = "Текущие настройки :\n";
            var i=0;
            for (var key in settings) {
                if (key!=="descriptions" && key!=="_id") {
                    i++;
                    s = ""+i+") "+key+" - "+ settings[key]+"\n";
                    t = t + s;
                }
            }

            resolve({ success: true, value: t })
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка получения списка текущих настроек" });
        }
    })
}




/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function start_finded_app() {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { enable_finding_routes: true } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}


/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function stop_finded_app() {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { enable_finding_routes: false } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}



/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function start_execute_app() {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { enable_execute_routes: true } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}


/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function stop_execute_app() {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { enable_execute_routes: false } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}


/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function set_min_percent_profit(min_percent_profit) {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { min_percent_profit_by_task: min_percent_profit } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна на значение " + min_percent_profit + " %" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}


/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function set_max_percent_profit(max_percent_profit) {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { max_percent_profit_by_task: max_percent_profit } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна на значение " + max_percent_profit + " %" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}



/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function set_max_exchange_sync_time(max_exchange_sync_time) {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { max_exchange_sync_time: max_exchange_sync_time } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна на значение " + max_exchange_sync_time + " мс" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}



/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function set_overdue_time(overdue_time) {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { overdue_time: overdue_time } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна на значение " + overdue_time + " мс" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}



/** Функция записывает в базу данных параметр включить модуль поиска маршрутов
 * Возвращает
 * {success: true, value:"Настройка успешно измененна"} 
 * либо
 * {success: false, error_msg: "Ошибка добавления в базу"}
 */
async function set_update_settings_interval(update_settings_interval) {
    return new Promise(async (resolve, reject) => {
        try {
            var new_record = await settings_collection.update({}, { $set: { update_settings_interval: update_settings_interval } });
            if (new_record.ok > 0) {
                resolve({ success: true, value: "Настройка успешно измененна на значение " + update_settings_interval + " мс" })
            }
            else {
                resolve({ success: false, error_msg: "Ошибка изменения настройки " + JSON.stringify(new_record) });
            }
        }
        catch (e) {
            resolve({ success: false, error_msg: "Ошибка изменения настройки " });
        }
    })
}











// // Простая команда без параметров.
// bot.on('message', function (msg) {
//     try {
//         var chatId = msg.chat.id;
//         bot.sendMessage(chatId, "Привет стоп")
//     }
//     catch (e) {
//         console.log(e);
//     }
// });



//Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
// bot.onText(/start (.+)/, function (msg, match) {
//     try {
//         var fromId = msg.from.id;
//         var resp = match[1];
//         bot.sendMessage(fromId, resp);
//     }
//     catch (e) {
//         console.log(e);
//     }
// });

// bot.sendMessage(-288490826, "Привет ханик")