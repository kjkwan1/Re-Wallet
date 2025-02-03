import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  CartStatusType: a.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']),
  PurchaseStatusType: a.enum(['PENDING', 'HELD', 'COMPLETED', 'REFUNDED', 'CANCELLED']),
  PaymentMethodType: a.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_ACCOUNT']),
  PaymentHoldStatusType: a.enum(['ACTIVE', 'RELEASED', 'CONVERTED', 'FAILED']),
  Role: a.enum(['USER', 'ADMIN', 'SUPPORT']),

  User: a.model({
    id: a.id().required(),
    email: a.email().required(),
    firstName: a.string().required(),
    lastName: a.string().required(),
    phoneNumber: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
    role: a.ref('Role').required(),
    preferences: a.hasOne('Preference', 'userId'),
    // customCategories: a.hasMany('CustomCategory', 'userId'),
    // carts: a.hasMany('Cart', 'userId'),
    // purchases: a.hasMany('Purchase', 'userId'),
    // paymentMethods: a.hasMany('PaymentMethod', 'userId')
  }).authorization((allow) => allow.owner()),

  Preference: a.model({
    id: a.id().required(),
    theme: a.string().required(),
    defaultCurrency: a.string().required(),
    defaultHoldPeriod: a.integer().required(),
    notificationsEnabled: a.boolean().required(),
    smsNotifications: a.boolean().required(),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId')
  }).authorization((allow) => allow.ownerDefinedIn('userId')),

  // Category: a.model({
  //   id: a.id().required(),
  //   name: a.string().required(),
  //   description: a.string(),
  //   icon: a.string(),
  //   purchases: a.hasMany('Purchase', 'categoryId'),
  // }).authorization((allow) => allow.owner()),

  // CustomCategory: a.model({
  //   id: a.id().required(),
  //   name: a.string().required(),
  //   description: a.string(),
  //   icon: a.string(),
  //   purchases: a.hasMany('Purchase', 'customCategoryId'),
  //   userId: a.string().required(),
  //   user: a.belongsTo('User', 'userId')
  // }).authorization((allow) => allow.ownerDefinedIn('user')),

  // Cart: a.model({
  //   id: a.id().required(),
  //   createdAt: a.datetime().required(),
  //   updatedAt: a.datetime().required(),
  //   confirmationDay: a.datetime(),
  //   total: a.float().required(),
  //   currency: a.string().required(),
  //   status: a.ref('CartStatusType'),
  //   purchases: a.hasMany('Purchase', 'cartId'),
  //   userId: a.string().required(),
  //   user: a.belongsTo('User', 'userId')
  // }).authorization((allow) => allow.ownerDefinedIn('user')),

  // Purchase: a.model({
  //   id: a.id().required(),
  //   description: a.string(),
  //   price: a.float().required(),
  //   currency: a.string().required(),
  //   quantity: a.integer().required(),
  //   url: a.string(),
  //   imageUrl: a.string(),
  //   createdAt: a.datetime().required(),
  //   updatedAt: a.datetime().required(),
  //   cartId: a.string().required(),
  //   cart: a.belongsTo('Cart', 'cartId'),
  //   userId: a.string().required(),
  //   user: a.belongsTo('User', 'userId'),
  //   status: a.ref('PurchaseStatusType').required(),
  //   categoryId: a.string().required(),
  //   category: a.belongsTo('Category', 'categoryId'),
  //   customCategoryId: a.string().required(),
  //   customCategory: a.belongsTo('CustomCategory', 'customCategoryId'),
  //   paymentHolds: a.hasMany('PaymentHold', 'purchaseId'),
  // }).authorization((allow) => allow.ownerDefinedIn('user')),

  // PaymentMethod: a.model({
  //   id: a.id().required(),
  //   type: a.ref('PaymentMethodType').required(),
  //   lastFour: a.string().required(),
  //   expiryMonth: a.integer(),
  //   expiryYear: a.integer(),
  //   isDefault: a.boolean(),
  //   stripePaymentMethodId: a.string().required(),
  //   userId: a.string().required(),
  //   user: a.belongsTo('User', 'userId'),
  //   paymentHolds: a.hasMany('PaymentHold', 'paymentMethodId'),
  // }).authorization((allow) => allow.ownerDefinedIn('user')),

  // PaymentHold: a.model({
  //   id: a.id().required(),
  //   currency: a.string().required(),
  //   status: a.ref('PaymentHoldStatusType').required(),
  //   stripeHoldId: a.string().required(),
  //   createdAt: a.datetime().required(),
  //   updatedAt: a.datetime().required(),
  //   releaseDate: a.datetime(),
  //   purchaseId: a.string().required(),
  //   purchase: a.belongsTo('Purchase', 'purchaseId'),
  //   paymentMethodId: a.string().required(),
  //   paymentMethod: a.belongsTo('PaymentMethod', 'paymentMethodId')
  // }).authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
