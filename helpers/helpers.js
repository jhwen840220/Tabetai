export const getDevice = () => {
  if (process.browser) {
    var device = "web";
    if (navigator.userAgent.match(/Android/i)) device = "andriod";
    else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) device = "ios";
    return device;
  }
};

export const setCookie = (cname, cvalue) => {
  var d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

export const getCookie = cname => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
};
