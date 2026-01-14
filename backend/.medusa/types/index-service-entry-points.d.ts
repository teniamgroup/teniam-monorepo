import "@medusajs/framework/types"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  Date: { input: any; output: any; }
  Time: { input: any; output: any; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type Product = {
  __typename?: 'Product';
  id: Maybe<Scalars['ID']['output']>;
  title: Maybe<Scalars['String']['output']>;
  handle: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  type_id: Maybe<Scalars['String']['output']>;
  collection_id: Maybe<Scalars['String']['output']>;
  is_giftcard: Maybe<Scalars['Boolean']['output']>;
  external_id: Maybe<Scalars['String']['output']>;
  created_at: Maybe<Scalars['DateTime']['output']>;
  updated_at: Maybe<Scalars['DateTime']['output']>;
  variants: Maybe<Array<Maybe<ProductVariant>>>;
  sales_channels: Maybe<Array<Maybe<SalesChannel>>>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Maybe<Scalars['ID']['output']>;
  product_id: Maybe<Scalars['String']['output']>;
  sku: Maybe<Scalars['String']['output']>;
  prices: Maybe<Array<Maybe<Price>>>;
};

export type Price = {
  __typename?: 'Price';
  id: Maybe<Scalars['ID']['output']>;
  amount: Maybe<Scalars['Float']['output']>;
  currency_code: Maybe<Scalars['String']['output']>;
};

export type SalesChannel = {
  __typename?: 'SalesChannel';
  id: Maybe<Scalars['ID']['output']>;
  is_disabled: Maybe<Scalars['Boolean']['output']>;
};


declare module '@medusajs/framework/types' {
  interface IndexServiceEntryPoints  {
    sales_channel: SalesChannel
    sales_channels: SalesChannel
    price: Price
    prices: Price
    product_variant: ProductVariant
    product_variants: ProductVariant
    variant: ProductVariant
    variants: ProductVariant
    product: Product
    products: Product
  }
}