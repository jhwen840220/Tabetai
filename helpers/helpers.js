export const getDevice = () => {
  if (process.browser) {
    var device = "web";
    if (navigator.userAgent.match(/Android/i)) device = "andriod";
    else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) device = "ios";
    return device;
  }
};
