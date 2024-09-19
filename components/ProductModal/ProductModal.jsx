import { getProduct } from '@/helpers/productsHelpers';
import { DialogContent } from '../ui/Dialog';
import Body from './Body/Body';

const ProductModal = async ({ params }) => {
  const { id } = params;
  const product = await getProduct(id);

  return (
    <DialogContent
      closeButton={false}
      className='bg-primary p-[-1.6rem] min-w-full max-w-full min-h-full max-h-full flex flex-col items-start gap-0 lg:grid lg:grid-cols-10 lg:gap-4'
    >
      {product ? <Body p={product} params={params} /> : null}
    </DialogContent>
  );
};

export default ProductModal;
