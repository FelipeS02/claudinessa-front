'use client';

import { BookUser } from 'lucide-react';
import { CheckoutSection } from '@/layout/Section/Section';
import { Form } from '../ui/Form';
import { useContactForm } from '@/helpers/orderHelpers';
import RenderField from './RenderField';

const Title = () => {
  return (
    <div className='flex flex-col'>
      <CheckoutSection.Title>
        {' '}
        <BookUser size={20} /> Información de contacto
      </CheckoutSection.Title>
      <CheckoutSection.Subtitle>
        Tu informacion es importante para mantenerte al tanto del estado de tus
        pedidos
      </CheckoutSection.Subtitle>
    </div>
  );
};

const Contact = () => {
  const { form } = useContactForm();

  return (
    <CheckoutSection title={<Title />}>
      <Form {...form}>
        <form className='grid gap-2 grid-cols-2 md:gap-4'>
          <RenderField
            name={'client'}
            className='col-span-1'
            label='Tu nombre'
            form={form}
          />
          <RenderField
            name={'phone'}
            className='col-span-1'
            label='Numero de contacto'
            form={form}
          />
        </form>
      </Form>
    </CheckoutSection>
  );
};

export default Contact;
