"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDatabase = openDatabase;
exports.storeDataWithExpiry = storeDataWithExpiry;
exports.getDataWithExpiry = getDataWithExpiry;
exports.getAllData = getAllData;
function openDatabase(dbName, storeName) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(dbName)) {
                db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = function (event) {
            return resolve(event.target.result);
        };
        request.onerror = function (event) {
            return reject(event.target.error);
        };
    });
}
function storeDataWithExpiry(db, storeName, value, ttl) {
    if (ttl === void 0) { ttl = 1000 * 60 * 20; }
    return new Promise(function (resolve, reject) {
        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);
        var expiry = new Date().getTime() + ttl;
        var item = { value: value, expiry: expiry };
        var request = store.add(item);
        request.onsuccess = function () { return resolve(); };
        request.onerror = function (event) { return reject(event.target.error); };
    });
}
function getDataWithExpiry(db, storeName) {
    return new Promise(function (resolve, reject) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        var request = store.getAll();
        request.onsuccess = function () {
            var now = new Date().getTime();
            var validItems = request.result.filter(function (item) { return item.expiry > now; });
            resolve(validItems);
        };
        request.onerror = function (event) { return reject(event.target.onerror); };
    });
}
function getAllData(db, storeName) {
    return new Promise(function (resolve, reject) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        var request = store.getAll();
        request.onsuccess = function () {
            var items = request.result.map(function (item) { return item; });
            resolve(items);
        };
        request.onerror = function (event) {
            return reject(event.target.onerror);
        };
    });
}
