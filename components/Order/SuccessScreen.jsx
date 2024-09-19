'use client';

import Logo from '@/public/images/minlogo-white.webp';
import { Clipboard } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/Tooltip';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { formatCurrency, timeout } from '@/lib/utils';
import Whatsapp from '@/public/icons/whatsapp';

import Link from 'next/link';
import { getWhatsAppLink } from '@/helpers/orderHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { resetStore } from '@/redux/features/orderSlice';

const AliasToClipboard = () => {
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText('laclaudinessa.mp');
      setOpen(true);
      await timeout(1000);
      setOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <div className='flex items-center'>
        Transferencia
        <Tooltip open={open}>
          <TooltipTrigger
            onClick={onClick}
            className='flex items-center gap-1 px-1 cursor-pointer'
            asChild
          >
            <Clipboard size={24} className='text-brand' />
          </TooltipTrigger>

          <TooltipContent className='h-auto'>¡Alias copiado!</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

const WhatsappButton = ({ link, onClick }) => {
  if (!link) return null;
  return (
    <Link
      className='bg-[#25D366] shadow-lg lg:hover:shadow-[#25d36565] w-full rounded-full text-[white] gap-2 flex items-center justify-center px-4 p-2 cursor-pointer lg:w-fit'
      href={link}
      target='_blank'
      onClick={onClick}
    >
      <Whatsapp className={'w-7 h-auto'} />
      <span className='text-xl font-medium '>
        Enviar confirmacion a WhatsApp
      </span>
    </Link>
  );
};

const Footer = ({ link, onLinkClick }) => {
  return (
    <div className='w-full flex justify-center text-[black] bg-[white] items-center p-3 pb-8 lg:p-6'>
      <div className='flex flex-col items-center gap-4 w-full lg:w-[400px]'>
        <div className='flex flex-col'>
          <span className='text-neutral-800 text-lg font-semibold'>
            ¿Ahora que hago?
          </span>
          <span className='text-neutral-600 text-base'>
            Envianos el resumen de tu pedido para saber su estado en tiempo
            real.
          </span>
        </div>
        <WhatsappButton link={link} onClick={onLinkClick} />
      </div>
    </div>
  );
};

const ResumeInfo = ({ title, value }) => {
  return (
    <div className='flex items-center justify-between'>
      <span className=''>{title}</span>
      <span className='font-medium'>{value}</span>
    </div>
  );
};

const Resume = ({ order }) => {
  const { products, shipment, price, service, method } = order;
  const priceTitle = `${products?.length} producto${
    products?.length > 1 ? 's' : ''
  }:`;

  const serviceTitle = service === 0 ? 'Envio:' : 'Servicio:';
  const serviceValue =
    service === 0
      ? shipment === 0
        ? 'GRATIS'
        : formatCurrency(shipment?.type?.value)
      : 'Retiro en local';

  const methodValue = method === 0 ? 'Efectivo' : <AliasToClipboard />;

  return (
    <div className='flex flex-col bg-white text-neutral-800 p-3 gap-1 rounded-lg shadow-md w-[300px]'>
      <span className='font-semibold text-lg'>Informacion de tu pedido:</span>

      <ResumeInfo title={priceTitle} value={formatCurrency(price)} />
      <ResumeInfo title={serviceTitle} value={serviceValue} />
      <ResumeInfo title={'Metodo:'} value={methodValue} />
    </div>
  );
};

const SuccessScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const order = useSelector(({ order }) => order);

  const onLinkClick = () => {
    router.replace('/productos');
    dispatch(resetStore());
  };

  const link = useMemo(() => {
    return getWhatsAppLink(order);
  }, [order]);

  return (
    <div className='text-[white] z-50 flex left-0 top-0 flex-col fixed justify-center items-center bg-gradient-to-b from-brand-600 via-brand to-brand-400 gap-4 h-screen w-full will-change-transform data-[active=false]:invisible lg:bg-gradient-to-br success-screen'>
      <div className='grow flex flex-col gap-4 items-center justify-center'>
        <Image src={Logo} width={200} height={200} alt='logo' />
        <span className={'font-titling tracking-wider text-4xl font-semibold'}>
          ¡Pedido enviado!
        </span>
        <Resume order={order} />
      </div>
      <Footer link={link} onLinkClick={onLinkClick} />
    </div>
  );
};

export default SuccessScreen;
