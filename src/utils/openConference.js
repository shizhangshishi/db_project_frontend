const openConference = function (id) {
  // 在新标签页打开会议详情
  let url = '/conference/' + id;
  window.open(url, '_blank');
};

export default openConference;
