
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer'
    check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);


create table public.categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);


create table public.brands (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);


create table public.products (
  id bigint generated always as identity primary key,
  category_id bigint references public.categories(id) on delete set null,
  brand_id bigint references public.brands(id) on delete set null,
  name text not null,
  slug text not null unique,
  model text,
  short_description text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  sku text unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create table public.product_images (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  image_path text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);



create table public.product_specs (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  spec_name text not null,
  spec_value text not null
);


create table public.addresses (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  district text,
  postal_code text,
  country text not null default 'Sri Lanka',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);


create table public.cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);


create table public.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  user_id uuid not null references public.profiles(id) on delete cascade,
  address_id bigint references public.addresses(id) on delete set null,
  order_status text not null default 'pending'
    check (order_status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'authorized', 'paid', 'failed', 'refunded')),
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  currency text not null default 'LKR',
  notes text,
  created_at timestamptz not null default now()
);


create table public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  product_name text not null,
  product_slug text,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null check (line_total >= 0)
);


create table public.payments (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  provider text not null,
  payment_method text,
  provider_ref text,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'LKR',
  status text not null default 'pending'
    check (status in ('pending', 'authorized', 'paid', 'failed', 'refunded')),
  failure_reason text,
  gateway_payload jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);


create index idx_products_category_id on public.products(category_id);
create index idx_products_brand_id on public.products(brand_id);
create index idx_product_images_product_id on public.product_images(product_id);
create index idx_product_specs_product_id on public.product_specs(product_id);
create index idx_addresses_user_id on public.addresses(user_id);
create index idx_cart_items_user_id on public.cart_items(user_id);
create index idx_cart_items_product_id on public.cart_items(product_id);
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_address_id on public.orders(address_id);
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_payments_order_id on public.payments(order_id);


create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_current_timestamp_updated_at();