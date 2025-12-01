// types/index.ts

export interface Brand {
  id: number;
  title: string;
}

export interface Price {
  currency: string;
  value: number;
}

export interface ConfigurableOptionValue {
  label: string;
  value_index: number;
  value: string | number;
}

export interface ConfigurableOption {
  attribute_id: number;
  attribute_code: string;
  label: string;
  position?: number;
  id?: number;
  values: ConfigurableOptionValue[];
}

export interface VariantAttribute {
  code: string;
  value_index: number;
}

export interface Variant {
  attributes: VariantAttribute[];
  product: {
    id: number;
    sku: string;
    image: string;
  };
}

export interface Product {
  id: number;
  type: "simple" | "configurable";
  sku: string;
  title: string;
  regular_price: Price;
  image: string;
  brand: number;
  configurable_options?: ConfigurableOption[];
  variants?: Variant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, number>;
  variantImage?: string;
}
