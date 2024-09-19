import { ProductQuantityModifier } from '@/components/ui/QuantitySelector/QuantitySelector';
import { Order } from '@/models/order.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

export const serviceOptions = [
  { name: 'A Domicilio', value: 0 },
  { name: 'Retiro en local', value: 1 },
];

const initialState: Order = {
  id: 0,
  price: 0,
  shipment: null,
  phone: '',
  client: '',
  adress: '',
  houseNumber: '',
  neighborhood: '',
  complement: '',
  instructions: '',
  state: 0,
  method: 0,
  service: serviceOptions[0].value,
  created: new Date(),
  products: [],
};

const getOrderPrice = (products, shipment = 0) => {
  if (products.length > 0) {
    let price = 0;
    products.forEach((p) => {
      const productPrice =
        (p.isOnDiscount ? p.price.offPrice : p.price.price) * p.amount;
      let extrasPrice = 0;
      p.extras.forEach((e) => (extrasPrice = extrasPrice + e.price * e.amount));
      price = price + extrasPrice + productPrice + shipment;
    });

    return price;
  }
  return 0;
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      const updatedProducts = [...state.products, payload];
      return {
        ...state,
        products: updatedProducts,
        price: getOrderPrice(updatedProducts),
      };
    },
    deleteProduct: (state, { payload }) => {
      const updatedProducts = [...state.products].filter(
        (_p, index) => index !== payload
      );

      return {
        ...state,
        products: updatedProducts,
        price: getOrderPrice(updatedProducts),
      };
    },
    modifyOrderProductAmount: (
      state,
      { payload }: PayloadAction<{ type: ProductQuantityModifier; index: number }>
    ) => {
      const { index, type } = payload;

      if (!type || !index) return { ...state };

      // Using produce to manage deeper updates in order
      const updatedProducts = produce(state.products, (draft) => {
        if (type === 'increment' && draft[index]) {
          draft[index].amount++;
        } else if (type === 'decrement' && draft[index]) {
          draft[index].amount--;
        }
      });

      return {
        ...state,
        products: updatedProducts,
        price: getOrderPrice(updatedProducts),
      };
    },
    updateService: (state, { payload }) => {
      return {
        ...state,
        service: payload,
      };
    },
    updateMethod: (state, { payload }) => {
      return { ...state, method: payload };
    },
    updateShipment: (state, { payload }) => {
      return {
        ...state,
        shipment: payload,
      };
    },
    updateInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
    clearInfo: ({ products, price }) => {
      return { ...initialState, products, price };
    },
    resetStore: () => {
      return { ...initialState };
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  modifyOrderProductAmount,
  updateService,
  updateShipment,
  updateInfo,
  updateMethod,
  clearInfo,
  resetStore,
} = orderSlice.actions;

export default orderSlice.reducer;
