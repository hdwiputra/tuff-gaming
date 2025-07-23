import ProductModel from "@/db/models/ProductModel";

export async function GET() {
  const products = await ProductModel.getHomeProduct();
  return Response.json(products);
}
