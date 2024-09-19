import Wrapper from '@/layout/Wrapper/Wrapper';
import Service from './Service/Service';
import Payment from './Payment';
import Contact from './Contact';
import ConfirmDelete from './ConfirmDelete';

const Order = () => {
  return (
    <Wrapper className='bg-layout-secondary h-fit flex flex-col gap-2 lg:gap-0 col-span-4'>
      <Contact />
      <Service />
      <Payment />
      <ConfirmDelete />
    </Wrapper>
  );
};

export default Order;
