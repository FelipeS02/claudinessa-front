import { getProduct } from '@/helpers/productsHelpers';
import { notFound } from 'next/navigation';

const page = async ({ params }) => {
  const { id } = params;

  if (!id) return notFound();

  const product = await getProduct(id);

  if (!product) return notFound();

  return <div>page</div>;
};

export default page;
