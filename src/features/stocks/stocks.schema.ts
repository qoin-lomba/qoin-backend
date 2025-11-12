import z from "zod";

// For multipart/form-data, numeric fields arrive as strings. Use z.coerce.number.
// Photo can be provided either as an uploaded file (product_photo) OR an existing URL (photo_url).
// Make photo_url optional so validation doesn't fail when a file is uploaded instead.
export const addStocksSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(1, "Price is required"),
});

export const updateStocksSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
});
