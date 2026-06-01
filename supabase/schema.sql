-- ============================================================
-- products
-- ============================================================
CREATE TABLE products (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text        NOT NULL,
  type          text        NOT NULL,           -- '패스' | '단품'
  price         integer,                        -- 원가
  discount_rate integer     NOT NULL DEFAULT 0, -- 할인율 (0~100)
  shipping_fee  integer     NOT NULL DEFAULT 0, -- 배송비 (0 = 무료)
  image_url     text,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (true);

-- ============================================================
-- orders
-- ============================================================
CREATE TABLE orders (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  email            text        NOT NULL,
  phone            text,
  name             text,
  -- 배송 정보
  recipient_name   text,
  recipient_phone  text        NOT NULL,
  zipcode          text,
  address          text        NOT NULL,
  address_detail   text,
  -- 결제
  payment_method   text        NOT NULL DEFAULT '카드',
  shipping_fee     integer     NOT NULL DEFAULT 0,
  status           text        NOT NULL DEFAULT '주문완료',  -- '주문완료' | '결제완료' | '취소'
  total_amount     integer     NOT NULL,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 누구나 주문 생성 가능 (비회원 포함)
CREATE POLICY "orders_insert_all"
  ON orders FOR INSERT WITH CHECK (true);

-- 로그인 유저는 본인 주문만 조회
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- order_items
-- ============================================================
CREATE TABLE order_items (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  uuid    NOT NULL REFERENCES products(id),
  quantity    integer NOT NULL DEFAULT 1,
  unit_price  integer NOT NULL   -- 주문 시점 가격 스냅샷
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "order_items_insert_all"
  ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "order_items_select_own"
  ON order_items FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- shipping_addresses (저장된 배송지 — 추후 구현용)
-- ============================================================
CREATE TABLE shipping_addresses (
  id             uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label          text,                  -- 집, 회사 등
  recipient_name text    NOT NULL,
  phone          text    NOT NULL,
  zipcode        text,
  address        text    NOT NULL,
  address_detail text,
  is_default     boolean NOT NULL DEFAULT false,
  created_at     timestamptz DEFAULT now()
);

ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "shipping_addresses_own"
  ON shipping_addresses USING (auth.uid() = user_id);

-- ============================================================
-- 샘플 데이터 (Supabase 대시보드 → SQL Editor에서 실행)
-- ============================================================
INSERT INTO products (title, type, price, discount_rate, shipping_fee, image_url) VALUES
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '단품', 40000,  0, 0, '/sol.png'),
  ('2026 Hidden Kice 시즌7', '단품', 40000,  0, 0, '/sol.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '단품', 40000,  0, 0, '/sol.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png'),
  ('2026 Hidden Kice 시즌7', '패스', 72000, 10, 0, '/pass.png');
