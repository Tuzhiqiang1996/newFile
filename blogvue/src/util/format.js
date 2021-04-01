/**
 * 参数格式化
 */
export function format(data) {
  let jj = `${data}`;
  let shuang = jj.replace(/\'/gi, '"');
  let shuang1 = shuang.replace(/ /gi, "");
  let shuang2 = shuang1.replace(/\[\"{/gi, "[{");
  let shuang3 = shuang2.replace(/\}"]/gi, "}]");
  let shuang4 = shuang3.replace(/\_a/gi, "A");
  let shuang5 = shuang4.replace(/\_m/gi, "M");
  let tu = "[" + shuang5 + "]";
  return JSON.parse(tu);
}
export function sum(json) {
  let json1 = json.replace(/\[\"\{/, "[{");
  let json2 = json1.replace(/\}\"\]/, "}]");
  let json3 = json2.replace(/ /gi, "");
  let json4 = JSON.parse(json3); //转json对象
  return json4;
}
