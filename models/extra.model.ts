export type Extra = {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
};

export type ExtraCategory = {
  id: number;
  name: string;
  // Extras quantity params when selected or required
  min: number;
  max: number;
  isOptional: boolean;
  // If true each extra can be selected multiple times
  isQuantifiable: boolean;
  extras: Extra[];
};
