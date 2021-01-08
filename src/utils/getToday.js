/*
* 以“YYYY-MM-DD”的格式得到今天的日期
* */
const getToday = function () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + day;
};

export default getToday;
