import prisma from "../../database/prisma";

export const addStocksService = async (
  name: string,
  quantity: number,
  price: number,
  photo_url: string,
  merchant_id: string,
  user_id: string
) => {
  const stocks = await prisma.stocks.create({
    data: {
      name,
      quantity: Number(quantity),
      photo_url,
      merchant_id,
      user_id,
      price: Number(price),
    },
  });

  return stocks;
};

export const getStocksByMerchantIdService = async (merchant_id: string) => {
  const stocks = await prisma.stocks.findMany({
    where: {
      merchant_id,
    },
  });

  return stocks;
};

export const updateStocksService = async (
  stock_id: string,
  quantity: number
) => {
  const stocks = await prisma.stocks.update({
    where: {
      id: stock_id,
    },
    data: {
      quantity,
    },
  });

  return stocks;
};
