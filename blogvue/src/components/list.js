let j1 = [
  '{"deviceid": "10013056c9", "factory_apikey": "54ee49f1-e499-4f1c-a404-06e08e313ffe", "sta_mac": "d0:27:02:60:aa:e2", "sap_mac": "d0:27:02:60:aa:e3", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}',
  '{"deviceid": "10013056ca", "factory_apikey": "34f2ff7f-a6ef-4037-9d25-31aad9cbd35f", "sta_mac": "d0:27:02:60:aa:e4", "sap_mac": "d0:27:02:60:aa:e5", "device_model": "WTW-SNL-02"}'
];
let jj = `${j1}`;
let json = jj.replace(/\[\[\'|\"\]\{/, "[{");
let json1 = json.replace(/\][\'|\"]\}/, "}]");
let json2 = jj.replace(/\'\{\"/gi, "{");
let json3 = json2.replace(/\'\}\"/gi, "}");

//将所有单双引号 统一 双引号
let shuang = jj.replace(/\'/gi, '"');
let shuang1 = shuang.replace(/ /gi, "");
let shuang2 = shuang1.replace(/\[\"{/gi, "[{");
let shuang3 = shuang2.replace(/\}"]/gi, "}]");
console.log(shuang3);
let tu= "["+shuang3+"]"
console.log(JSON.parse(tu));

let d1 = [];
// let shuang4=  d1.concat(shuagn3)
d1.push(shuang3);

console.log(d1)
// console.log(shuang4);
// console.log(shuang3.length);
let up=JSON.parse(tu)

