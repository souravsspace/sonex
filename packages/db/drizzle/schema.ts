import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * @enum
 * Defines application-wide enumeration constants.
 */
export enum Plan {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

/**
 * @timestamps
 * Defines automatic creation and update timestamps for records.
 */

const createdAt = timestamp("created_at").defaultNow().notNull();

const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull();

/**
 * @better_auth
 * Configuration and initialization for Better Auth.
 */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt,
  updatedAt,
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt,
  updatedAt,
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt,
  updatedAt,
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt,
  updatedAt,
});

/**
 * @core
 * Application-wide configuration and settings tables.
 */

// Empty for now

/**
 * @relations
 * Defines foreign key and relational mappings between tables.
 */

// Empty for now

/**
 * @type_export
 * Exports TypeScript types used across the application.
 */
export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
