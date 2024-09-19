'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form';
import ShipmentsSelect from './ShipmentsSelect';
import { Textarea } from '@/components/ui/Textarea';
import { useDeliveryForm, useShipments } from '@/helpers/orderHelpers';
import { updateShipment } from '@/redux/features/orderSlice';

import { useEffect, useRef } from 'react';
import RenderField from '../RenderField';
import { Text } from '@/components/ui/Text/Text';

const Neighborhood = ({ form, shipments, shipmentHandler }) => {
  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
      <RenderField
        name={'neighborhood'}
        label={'Barrio'}
        placeholder={'Hudson'}
        form={form}
        className='md:col-span-2'
      />
      <FormItem>
        <FormLabel required>Zona de envío</FormLabel>
        <ShipmentsSelect
          className='w-full'
          shipments={shipments}
          handleChange={shipmentHandler}
        />
      </FormItem>
    </div>
  );
};

const Street = ({ form }) => (
  <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
    <RenderField
      name={'adress'}
      label={'Calle'}
      placeholder={'Ej: Av. Otto Bemberg'}
      form={form}
      className='md:col-span-2'
    />
    <RenderField
      name={'houseNumber'}
      label={'Numero'}
      placeholder={'Ej: 5990'}
      form={form}
      className='col-auto'
    />
  </div>
);

const Instructions = ({ form }) => (
  <>
    <RenderField
      name='complement'
      className='w-full'
      label='Complemento'
      placeholder={'Apartamento, lote, edificio...'}
      form={form}
      required={false}
    />
    <FormField
      control={form.control}
      name='instructions'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Referencia</FormLabel>
          <FormControl>
            <Textarea
              placeholder='Cerca de...'
              className='resize-none'
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </>
);

const Delivery = () => {
  const ref = useRef(null);
  const { shipments, options } = useShipments();
  const { form, dispatch } = useDeliveryForm();

  useEffect(() => {
    // Load the height of the form, which is higher.
    // Avoiding displacement of the layout with the map
    const root = document.getElementById('service');

    if (ref.current) {
      root.style.setProperty('--_form-height', ref.current.offsetHeight + 'px');
    }
  }, [ref]);

  const handleShipmentChange = (value) => {
    const shipment = shipments.find((s) => s.id === value);

    if (shipment) {
      dispatch(updateShipment(shipment));
    }
  };

  return (
    <div className='flex flex-col gap-3' ref={ref}>
      <Form {...form}>
        <form className='space-y-3'>
          <Neighborhood
            form={form}
            shipments={options}
            shipmentHandler={handleShipmentChange}
          />
          <Street form={form} />
          <Instructions form={form} />
        </form>
      </Form>
      <Text type='secondary' className='text-sm'>
        Los campos marcados con <em className='text-brand'>*</em> son
        obligatorios
      </Text>
    </div>
  );
};

export default Delivery;
