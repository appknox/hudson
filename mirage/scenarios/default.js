function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function(server) {
  var userCount = getRandomInt(5, 7),
  pricingCount = getRandomInt(3, 3),
  couponCount = getRandomInt(5, 8),
  fileCount = getRandomInt(3,5),
  invoiceCount = getRandomInt(3,5),
  subscriptionCount = getRandomInt(3,5),
  deviceCount = getRandomInt(3,5);
  server.createList('user', userCount);
  server.createList('pricing', pricingCount);
  server.createList('coupon', couponCount);
  server.createList('file', fileCount);
  server.createList('invoice', invoiceCount);
  server.createList('subscription', subscriptionCount);
  server.createList('device', deviceCount);
}
