const sendUserToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

const sendShopToken = (shop, statusCode, res) => {
  const token = shop.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("shop_token", token, options).json({
    success: true,
    shop,
    token,
  });
};

export { sendUserToken, sendShopToken };
