'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from '@/public/images/minlogo-white.webp';
import { buttonVariants } from '../ui/Button';
import { cn, timeout } from '@/lib/utils';
import revealer from 'circular-revealer';
import { createOrder } from '@/helpers/orderHelpers';
import Swal from 'sweetalert2';

const ConfirmButton = ({ disabled, order }) => {
  const [trigger, setTrigger] = useState(null);
  const [{ loading, button, showLogo }, setProcess] = useState({
    button: 'Enviar pedido',
    loading: false,
    showLogo: false,
    success: false,
  });

  const onClick = async () => {
    try {
      const page = document.getElementById('body');

      setProcess((prev) => ({
        ...prev,
        button: 'Dos segunditos...',
        loading: true,
      }));

      await createOrder(order);

      setProcess((prev) => ({ ...prev, showLogo: true }));

      await timeout(700);

      page.setAttribute('aria-hidden', true);
      page.classList.add('overflow-hidden');

      trigger.reveal();
    } catch {
      Swal.fire({
        title: 'Hubo un error al enviar la orden',
        text: 'Volvé a intentar en unos minutos',
        icon: 'error',
        confirmButtonText: "Continuar",
        confirmButtonColor: "#e4732f"
      });
      setProcess((prev) => ({
        ...prev,
        button: 'Enviar pedido',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    const func = revealer({
      revealElementSelector: '.success-screen',
      options: {
        anchorSelector: '.trigger-button',
      },
    });

    setTrigger(func);
  }, [setTrigger]);

  return (
    <button
      className={cn(
        buttonVariants({
          variant: 'default',
          size: 'lg',
          className:
            'flex items-center justify-center w-full relative disabled:opacity-100 overflow-hidden',
        }),
        'trigger-button'
      )}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {showLogo ? (
        <Image
          src={Logo}
          width={30}
          height={30}
          alt='logo'
          className='animate-ping'
        />
      ) : (
        button
      )}
    </button>
  );
};

export default ConfirmButton;
