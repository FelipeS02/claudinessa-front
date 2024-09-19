'use client';

import { CheckoutSection } from '@/layout/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import { Landmark, Receipt } from 'lucide-react';
import { updateMethod } from '@/redux/features/orderSlice';
import Money from '@/public/icons/money';

const methods = [
  {
    name: 'Efectivo',
    icon: <Money className={'h-auto w-[20px]'} />,
  },
  {
    name: 'Transferencia',
    icon: <Landmark size={20} className='text-blue-95000' />,
  },
];

const RenderMethods = ({ handler, value }) => {
  return (
    <>
      {methods.map((m, i) => (
        <label
          className='flex items-center justify-between py-2 border-b last:border-b-0'
          key={i}
        >
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              value={i}
              onClick={handler}
              readOnly
              checked={value === i}
            />
            {m.icon}
            <span className='text-base'>{m.name}</span>
          </div>
        </label>
      ))}
    </>
  );
};

const Title = () => {
  return (
    <CheckoutSection.Title>
      <Receipt size={20} /> ¿Como queres pagar?
    </CheckoutSection.Title>
  );
};

const Payment = () => {
  const dispatch = useDispatch();
  const method = useSelector(({ order }) => order.method);

  const handleMethodChange = (e) => {
    const value = Number(e.target.value);
    dispatch(updateMethod(value));
  };

  return (
    <>
    
    <CheckoutSection title={<Title />}>
      <RenderMethods value={method} handler={handleMethodChange} />
    </CheckoutSection>
    </>
  );
};

export default Payment;
