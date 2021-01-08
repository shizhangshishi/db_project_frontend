function getConferences(url,params,vue)
{
  vue.$axios.get(url, {
    params: params
  }).then(res =>
  {
    if (res.status === 200 && (res.data.conferences.length!=0))
    {
      vue.conferences = res.data.conferences;
      vue.totalPages = res.data.totalPages;
      vue.app.message('Get conferences successfully.', 'success');
    }
    else if (res.status === 200 &&(res.data.conferences.length==0))
    {
      vue.app.message('There is no conference.', 'info');
    }
    else
      {
      vue.app.message('Get conference error!', 'error');
    }
  }).catch(error =>
  {
    vue.app.message(error.message ? error.message :
      'get conference fail, please check your network connection', 'error');
  }).finally(() =>
  {
    vue.loading = false;
  });
}
export {
  getConferences
}
