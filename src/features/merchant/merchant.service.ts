import prisma from "../../database/prisma";

export const addMerchantService = async (payload: {
  user_id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  profile_photo: string;
  banner_img: string;
  gallery_photo: string;
  latitude?: number | null;
  longitude?: number | null;
  profilePhotoUrl?: string;
  bannerImageUrl?: string;
  galleryImages?: string[];
}) => {
  const newMerchant = await prisma.merchants.create({
    data: {
      user_id: payload.user_id,
      name: payload.name,
      type: payload.type,
      location: payload.location,
      description: payload.description,
      profile_photo: payload.profile_photo || "",
      banner_img: payload.banner_img || "",
      gallery_photo: payload.galleryImages?.[0] || payload.gallery_photo || "",
      latitude: payload.latitude ?? null,
      longitude: payload.longitude ?? null,
      profilePhotoUrl: payload.profilePhotoUrl || null,
      bannerImageUrl: payload.bannerImageUrl || null,
      galleryImages: payload.galleryImages ?? [],
    },
  });
  console.log("New merchant added:", newMerchant);
  return newMerchant;
};

export const getAllMerchantService = async () => {
  const merchants = await prisma.merchants.findMany();
  return merchants;
};

export const getMerchantByIdService = async (merchant_id: string) => {
  const merchant = await prisma.merchants.findUnique({
    where: {
      id: merchant_id,
    },
    include: {
      followers: true,
      ratings: true,
      selledStocks: true,
      stocks: true,
    },
  });

  return merchant;
};

export const addMerchantRatingService = async (
  merchant_id: string,
  user_id: string,
  rate: number,
  comment: string
) => {
  const merchant_rating = await prisma.merchant_rating.create({
    data: {
      merchant_id,
      user_id,
      rate,
      comment,
    },
  });

  return merchant_rating;
};

export const getUserMerchantService = async (user_id: string) => {
  const merchant = await prisma.merchants.findMany({
    where: { user_id },
    select: {
      id: true,
      name: true,
      user_id: true,
      profilePhotoUrl: true,
    },
  });
  return merchant;
};
