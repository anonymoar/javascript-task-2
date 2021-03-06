'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = false;

/**
 * Телефонная книга {
 *      phoneNumber1 : { name, email, phone},
 *      phoneNumber2 : { name, email, phone},
 *  }
 */
let phoneBook = {};

/**
 * Проверка номера телефона на удовлетворение виду: 1234567890
 * @param {String} phone
 * @returns {Boolean}
 */
function phoneValidCheck(phone) {
    return /^\d{10}$/.test(phone);
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (!phoneValidCheck(phone)) {
        return false;
    }

    if (!name) {
        return false;
    }

    if (!(phone in phoneBook)) {
        phoneBook[phone] = {
            name,
            email,
            phone
        };

        return true;
    }

    return false;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (!phoneValidCheck(phone)) {
        return false;
    }

    if (phone in phoneBook && name) {
        phoneBook[phone].name = name;
        phoneBook[phone].email = email;

        return true;
    }

    return false;
}

/**
 * Проверка, удовлетворяет ли телефон запросу
 * @param {String} phone
 * @param {String} query
 * @returns {Boolean}
 */
function checkPhoneMatchesQuery(phone, query) {
    return query && Object.values(phoneBook[phone]).some(
        value => value && value.includes(query)
    );
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
function findAndRemove(query) {
    let countOfRemovedPhones = 0;

    for (const phone in phoneBook) {
        if (query === '*' || checkPhoneMatchesQuery(phone, query)) {
            delete phoneBook[phone];
            countOfRemovedPhones++;
        }
    }

    return countOfRemovedPhones;
}

/**
 * Превращает переданный номер вида '1234567890' в '+7 (123) 456-78-90'
 * @param {String} phone
 * @returns {String}
 */
function formatPhone(phone) {
    return '+7 (' +
            phone.slice(0, 3) +
            ') ' +
            phone.slice(3, 6) +
            '-' +
            phone.slice(6, 8) +
            '-' +
            phone.slice(8, 10);
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
function find(query) {
    if (!query) {
        return [];
    }

    const reducer = (acc, phone) => {
        const record = phoneBook[phone];

        if (query === '*' || checkPhoneMatchesQuery(phone, query)) {
            acc.push(
                `${record.name}, ${formatPhone(phone)}${record.email ? ', ' + record.email : ''}`
            );
        }

        return acc;
    };

    return Object
        .keys(phoneBook)
        .reduce(reducer, [])
        .sort((a, b) => a.localeCompare(b));
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
function importFromCsv(csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
}

module.exports = {
    add,
    update,
    findAndRemove,
    find,
    importFromCsv,

    isStar
};
