-- ============================================================
-- products
-- ============================================================
CREATE TABLE products (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text        NOT NULL,
  type       text        NOT NULL,          -- '패스' | '단품'
  price      integer,
  image_url  text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (true);

-- ============================================================
-- orders
-- ============================================================
CREATE TABLE orders (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,  -- null = 비회원
  email        text        NOT NULL,
  phone        text,
  name         text,
  status       text        NOT NULL DEFAULT '주문완료',  -- '주문완료' | '결제완료' | '취소'
  total_amount integer     NOT NULL,
  created_at   timestamptz DEFAULT now()
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
-- 샘플 데이터 (Supabase 대시보드 → SQL Editor에서 실행)
-- ============================================================
INSERT INTO products (title, type, price) VALUES
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '단품', NULL),
  ('2026 Hidden Kice 시즌7', '단품', NULL),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '단품', NULL),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000),
  ('2026 Hidden Kice 시즌7', '패스', 76000);
