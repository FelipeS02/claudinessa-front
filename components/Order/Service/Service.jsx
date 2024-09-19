'use client';

import { ShoppingBag } from 'lucide-react';
import { CheckoutSection } from '@/layout/Section/Section';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Delivery from './Delivery';
import PickUp from './PickUp';
import { useDispatch } from 'react-redux';
import { serviceOptions, updateService } from '@/redux/features/orderSlice';

const Title = ({ service, setService }) => {
  return (
    <div className='flex items-center justify-between'>
      <CheckoutSection.Title>
        <ShoppingBag size={20} /> Elegí tu servicio
      </CheckoutSection.Title>
      <Tabs value={service} onValueChange={setService}>
        <TabsList>
          {serviceOptions.map((o) => (
            <TabsTrigger value={o.value} key={`${o.name}-tab`}>
              {o.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

const Service = () => {
  const dispatch = useDispatch();
  const service = useSelector(({ order }) => order.service);

  const handleChange = (value) => {
    dispatch(updateService(value));
  };

  return (
    <CheckoutSection
      title={<Title service={service} setService={handleChange} />}
      style={{ '--_form-height': '300px' }}
      id='service'
    >
      {service === 0 ? <Delivery /> : <PickUp />}
    </CheckoutSection>
  );
};

export default Service;
