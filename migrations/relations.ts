import { relations } from "drizzle-orm/relations";
import { product, priceHistory, userFavorite } from "./schema";

export const priceHistoryRelations = relations(priceHistory, ({one}) => ({
	product: one(product, {
		fields: [priceHistory.productId],
		references: [product.id]
	}),
}));

export const productRelations = relations(product, ({many}) => ({
	priceHistories: many(priceHistory),
	userFavorites: many(userFavorite),
}));

export const userFavoriteRelations = relations(userFavorite, ({one}) => ({
	product: one(product, {
		fields: [userFavorite.productId],
		references: [product.id]
	}),
}));