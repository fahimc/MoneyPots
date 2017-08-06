// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

const DB = {
  DATABASE_NAME: 'moneypots',
  VERSION_NUMBER: 1,
  db: null,
  request: null,
  openPromise: {
    resolve: null,
    reject: null
  },
  open() {
    var promise = new Promise(function(resolve, reject) {
      this.openPromise.resolve = resolve;
      this.openPromise.reject = reject;
      this.openDB();
    }.bind(this));

    return promise;
  },
  openDB() {
    this.request = indexedDB.open("moneypots", this.VERSION_NUMBER);
    this.request.onsuccess = this.onSuccess.bind(this);
    this.request.onerror = this.onError.bind(this);
    this.request.onupgradeneeded = this.onUpgradeNeeded.bind(this);
  },
  onSuccess(event) {
    var db = event.target.result;
    this.createTable(db);
    this.openPromise.resolve();
  },
  onError() {
    console.log('could not open db');
    this.openPromise.reject();
  },
  onUpgradeNeeded(event) {
    var db = event.target.result;
    var userStore = db.createObjectStore("user", { autoIncrement: true });
    var index = userStore.createIndex("balance", ["balance"]);
    var potStore = db.createObjectStore("pot", { autoIncrement: true });
    var incomeStore = db.createObjectStore("income", { autoIncrement: true });
    var outgoingStore = db.createObjectStore("outgoing", { autoIncrement: true });

    console.log('on upgrade');
  },
  createTable(db) {
     var transaction = db.transaction("user", "readwrite");
    var store = transaction.objectStore("user");
    var index = store.index("balance");
    console.log(index);
    request.onerror = function(event) {
      // Handle errors!
    };
    request.onsuccess = function(event) {
      // Do something with the request.result!
      alert("Name for SSN 444-44-4444 is " + request.result.name);
    };
  }
};

export default DB;
