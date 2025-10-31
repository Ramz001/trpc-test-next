import {
  pgTable,
  unique,
  uuid,
  text,
  numeric,
  boolean,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

export const product = pgTable(
  "product",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    url: text(),
    currency: text(),
    image: text(),
    title: text(),
    currentPrice: numeric("current_price"),
    originalPrice: numeric("original_price"),
    lowestPrice: numeric("lowest_price"),
    highestPrice: numeric("highest_price"),
    averagePrice: numeric("average_price"),
    discountRate: numeric("discount_rate"),
    description: text(),
    category: text(),
    reviewsCount: numeric("reviews_count"),
    isOutOfStock: boolean("is_out_of_stock").default(false),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => [unique("product_url_unique").on(table.url)]
);

export const priceHistory = pgTable(
  "price_history",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    productId: uuid("product_id"),
    price: numeric(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "price_history_product_id_product_id_fk",
    }),
  ]
);

export const userFavorite = pgTable(
  "user_favorite",
  {
    userEmail: text("user_email"),
    productId: uuid("product_id"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "user_favorite_product_id_product_id_fk",
    }),
  ]
);

// RELATIONS