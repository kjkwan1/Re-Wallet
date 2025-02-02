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
  PaymentHoldStatu: a.enum(['ACTIVE', 'RELEASED', 'CONVERTED', 'FAILED']),
  User: a.model({
    id: a.id().required(),
    email: a.email().required().default(),
    firstName: a.string().required(),
    lastName: a.string().required(),
    phoneNumber: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
    role: a.belongsTo('Role', 'id'),
    customCategories: a.hasMany('CustomCategory', 'id'),
    carts: a.hasMany('Cart', 'id'),
    purchases: a.hasMany('Purchase', 'id'),
    paymentMethods: a.hasMany('PaymentMethod', 'id')
  }),
  Role: a.model({
    id: a.id().required(),
    name: a.string().required(),
    permissions: a.string().array().required(),
    user: a.belongsTo('User', 'id')
  }),
  Preference: a.model({
    id: a.id().required(),
    theme: a.string().required(),
    defaultCurrency: a.string().required(),
    defaultHoldPeriod: a.integer().required(),
    notificationsEnabled: a.boolean().required(),
    smsNotifications: a.boolean().required(),
    user: a.belongsTo('User', 'id')
  }),
  Category: a.model({
    id: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    icon: a.string(),
    purchases: a.hasMany('Purchase', 'id'),
  }),
  CustomCategory: a.model({
    id: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    icon: a.string(),
    purchases: a.hasMany('Purchase', 'id'),
    user: a.belongsTo('User', 'id').authorization(({ owner }) => owner())
  }).authorization((allow) => allow.owner()),
  Cart: a.model({
    id: a.id().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
    confirmationDay: a.datetime(),
    total: a.float().required(),
    currency: a.string().required(),
    status: a.belongsTo('CartStatus', 'id'),
    purchases: a.hasMany('Purchase', 'id'),
    user: a.belongsTo('User', 'id').authorization(({ owner }) => owner())
  }),
  CartStatus: a.model({
    id: a.id().required(),
    type: a.ref('CartStatusType').required(),
    cart: a.belongsTo('Cart', 'id'),
    updatedAt: a.datetime().required()
  }),
  Purchase: a.model({
    id: a.id().required(),
    description: a.string(),
    price: a.float().required(),
    currency: a.string().required(),
    quantity: a.integer().required(),
    url: a.string(),
    imageUrl: a.string(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
    cart: a.belongsTo('Cart', 'id'),
    user: a.belongsTo('User', 'id').authorization(({ owner }) => owner()),
    status: a.belongsTo('PurchaseStatus', 'id'),
    category: a.belongsTo('Category', 'id'),
    customCategory: a.belongsTo('CustomCategory', 'id'),
    paymentHolds: a.hasMany('PaymentHold', 'id'),
  }),
  PurchaseStatus: a.model({
    id: a.id().required(),
    purchase: a.belongsTo('Purchase', 'id'),
    updatedAt: a.datetime().required(),
    user: a.belongsTo('User', 'id').authorization(({ owner }) => owner())
  }),
  PaymentMethod: a.model({
    id: a.id().required(),
    type: a.ref('PaymentMethodType').required(),
    lastFour: a.string().required(),
    expiryMonth: a.integer(),
    expiryYear: a.integer(),
    isDefault: a.boolean(),
    stripePaymentMethodId: a.string().required(),
    user: a.belongsTo('User', 'id').authorization(({ owner }) => owner()),
    paymentHolds: a.hasMany('PaymentHold', 'id')
  }),
  PaymentHold: a.model({
    id: a.id().required(),
    currency: a.string().required(),
    status: a.ref('PaymentHoldStatus').required(),
    stripeHoldId: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
    releaseDate: a.datetime(),
    purchase: a.belongsTo('Purchase', 'id'),
    paymentMethod: a.belongsTo('PaymentMethod', 'id')
  }),
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
