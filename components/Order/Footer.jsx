'use client';

import { useEffect, useRef } from 'react';
import { Text } from '../ui/Text';
import ConfirmButton from './ConfirmButton';
import { formatCurrency } from '@/lib/utils';

const DeliveryCost = ({ value }) => {
  if (value === 0) return <span className='text-md text-brand'>GRATIS</span>;
  return <Text className='text-md'>{formatCurrency(value)}</Text>;
};

const Footer = ({ order }) => {
  const { price, shipment, products, service, phone, client, adress } = order;
  const footer = useRef(null);

  const disabled =
    phone.length < 10 ||
    client.length < 1 ||
    (service === 0 && (!shipment || !adress || products.length === 0));

  useEffect(() => {
    // Load the height of the form, which is higher.
    // Avoiding displacement of the layout with the map
    const root = document.getElementById('resume-price');

    if (footer.current) {
      root.style.setProperty('--_footer-h', footer.current.offsetHeight + 'px');
    }
  }, [footer]);

  return (
    <div
      className='flex bg-primary max-w-full w-full max-lg:left-0 max-lg:px-4 max-lg:py-4 flex-col max-lg:fixed max-lg:bottom-0 space-y-1'
      ref={footer}
    >
      {shipment ? (
        <div className='flex justify-between items-center'>
          <Text color='primary'>Envio:</Text>
          <DeliveryCost value={shipment?.type?.value || 0} />
        </div>
      ) : null}

      <div className='flex justify-between items-center'>
        <Text>Productos:</Text>
        <Text>{formatCurrency(price)}</Text>
      </div>

      <div className='flex font-semibold justify-between items-center'>
        <Text color='primary'>Total de la orden:</Text>
        <Text color='brand'>
          {formatCurrency(price + (shipment?.type?.value || 0))}
        </Text>
      </div>
      <ConfirmButton disabled={disabled} order={order} />
    </div>
  );
};

export default Footer;
