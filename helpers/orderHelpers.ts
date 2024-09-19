// import { generateCombo } from '@/lib/utils';
// import { useEffect, useState } from 'react';

// import { useDispatch } from 'react-redux';
// import { updateInfo } from '@/redux/features/orderSlice';

// export const getShipments = async () => {
//   try {
//     const shipments = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/Shipments/GetShipments`
//     );

//     return shipments.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const useShipments = () => {
//   const [shipments, setShipments] = useState(null);
//   const [options, setOptions] = useState(null);

//   const fillShipments = async () => {
//     const s = await getShipments();
//     setShipments(s);
//     setOptions(generateCombo(s, 'name', 'id'));
//   };

//   useEffect(() => {
//     fillShipments();
//   }, []);

//   return { shipments, options };
// };

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateInfo } from '@/redux/features/orderSlice';

const formSchema = z.object({
  adress: z.string().min(2).max(254),
  houseNumber: z
    .string()
    .min(4)
    .max(10)
    .refine((value) => /^(0|[1-9]\d*)(\.\d+)?$/.test(value)),
  neighborhood: z.string().min(1).max(45),
  complement: z.string().optional(),
  instructions: z.string().optional(),
});

export const useDeliveryForm = () => {
  const dispatch = useDispatch();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: '',
      houseNumber: '',
      neighborhood: '',
      complement: '',
      instructions: '',
    },
  });

  const { trigger } = form;

  useEffect(() => {
    trigger();
    const subscription = form.watch((value) => {
      dispatch(updateInfo(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form, dispatch, trigger]);

  return { form, dispatch };
};

export const useContactForm = () => {
  const dispatch = useDispatch();

  const formSchema = z.object({
    client: z.string().min(10).max(50),
    phone: z.string().min(10).max(20),
  });

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: { client: '', phone: '' },
  });

  const { trigger } = form;

  useEffect(() => {
    trigger();
    const subscription = form.watch((value) => {
      dispatch(updateInfo(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form, dispatch, trigger]);

  return { form, dispatch };
};

export const generateOrderBody = (o) => {
  const formatedProducts = o.products.map((p) => {
    const price = p.price[p.isOnDiscount ? 'offPrice' : 'price'];
    return {
      ...p,
      price,
    };
  });

  return {
    ...o,
    shipment: o.shipment?.type?.value || 0,
    created: null,
    products: formatedProducts,
  };
};

export const getMessage = (o) => {
  const { shipment, products } = o;

  if (products?.length > 0) {
    let price = 0;
    const shipmentPrice = shipment?.type?.value || 0;
    const productsText = products
      .map((p) => {
        const productPrice = p.isOnDiscount ? p.price.price : p.price.offPrice;
        const extrasPrice =
          p?.extras?.reduce(
            (acc, { amount, price }) => acc + price * amount,
            0
          ) || 0;
        const totalPrice = (productPrice + extrasPrice) * p.amount;

        const extras =
          p.extras
            .map((e) => ` _+ ${e.amount} ${e.name} *(+${e.price * e.amount})*_`)
            .join('') || '';

        price = price + productPrice + extrasPrice;

        return `*x${p.amount} ${p.name} ${totalPrice}*
      - Precio por unidad: *${productPrice}*
        ${extras}`;
      })
      .join('');

    const method =
      o.method === 0
        ? `Transferencia a _laclaudinessa.mp🏛️_
*¡Enviar comprobante luego de realizar la transferencia 💯!*`
        : '*Efectivo💵*';

    const service =
      o.service === 1
        ? '*Retiro en local* 🛍️'
        : `*Envio a domicilio:* ${o.neighborhood}, ${o.adress}, ${
            o.houseNumber
          }${o.instructions ? ` - *${o.instructions}*` : ''} ${
            o.complement ? `\n"${o.complement}"` : ''
          }`;

    const message = `¡Gracias por tu pedido en La Nueva Claudinessa! 🎉 Aquí tienes la confirmación de tu compra:
        
📦 Productos:

${productsText}
  
💳 Método de Pago:

${method}

🚚 Servicio:

${service}
        
💰 Precio Total:
        
Productos: *${price}* ${
      o.service === 0 ? `\nEnvío: *${shipmentPrice || 'GRATIS'}*` : ''
    }
Total: *${price + shipmentPrice}*`;

    return message;
  }
  return '';
};

export const getWhatsAppLink = (order) => {
  return `https://api.whatsapp.com/send?phone=541171166194&text=${encodeURIComponent(
    getMessage(order)
  )}`;
};

export const createOrder = async (order) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Orders/CreateOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(generateOrderBody(order)),
      }
    );

    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const orderIsExpired = (orderDate: Date, hours: number) => {
  if (!orderDate) return null;

  const currentDate = new Date();

  const miliseconsDifference =
    currentDate.getMilliseconds() - orderDate.getMilliseconds();

  const hoursDifference = miliseconsDifference / (1000 * 60 * 60);

  return hoursDifference >= hours;
};
