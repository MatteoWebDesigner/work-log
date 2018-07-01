let ua = navigator.userAgent.toLowerCase();
let isAndroid = ua.indexOf("android") > -1;

export default { isAndroid };