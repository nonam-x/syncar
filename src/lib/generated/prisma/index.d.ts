
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Email
 * 
 */
export type Email = $Result.DefaultSelection<Prisma.$EmailPayload>
/**
 * Model EmailDraft
 * 
 */
export type EmailDraft = $Result.DefaultSelection<Prisma.$EmailDraftPayload>
/**
 * Model CalendarEvent
 * 
 */
export type CalendarEvent = $Result.DefaultSelection<Prisma.$CalendarEventPayload>
/**
 * Model AIConversation
 * 
 */
export type AIConversation = $Result.DefaultSelection<Prisma.$AIConversationPayload>
/**
 * Model AIMessage
 * 
 */
export type AIMessage = $Result.DefaultSelection<Prisma.$AIMessagePayload>
/**
 * Model WebhookEvent
 * 
 */
export type WebhookEvent = $Result.DefaultSelection<Prisma.$WebhookEventPayload>
/**
 * Model CorsairIntegration
 * 
 */
export type CorsairIntegration = $Result.DefaultSelection<Prisma.$CorsairIntegrationPayload>
/**
 * Model CorsairAccount
 * 
 */
export type CorsairAccount = $Result.DefaultSelection<Prisma.$CorsairAccountPayload>
/**
 * Model CorsairEntity
 * 
 */
export type CorsairEntity = $Result.DefaultSelection<Prisma.$CorsairEntityPayload>
/**
 * Model CorsairEvent
 * 
 */
export type CorsairEvent = $Result.DefaultSelection<Prisma.$CorsairEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmailPriority: {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

export type EmailPriority = (typeof EmailPriority)[keyof typeof EmailPriority]

}

export type EmailPriority = $Enums.EmailPriority

export const EmailPriority: typeof $Enums.EmailPriority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.email`: Exposes CRUD operations for the **Email** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emails
    * const emails = await prisma.email.findMany()
    * ```
    */
  get email(): Prisma.EmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailDraft`: Exposes CRUD operations for the **EmailDraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailDrafts
    * const emailDrafts = await prisma.emailDraft.findMany()
    * ```
    */
  get emailDraft(): Prisma.EmailDraftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calendarEvent`: Exposes CRUD operations for the **CalendarEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CalendarEvents
    * const calendarEvents = await prisma.calendarEvent.findMany()
    * ```
    */
  get calendarEvent(): Prisma.CalendarEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIConversation`: Exposes CRUD operations for the **AIConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIConversations
    * const aIConversations = await prisma.aIConversation.findMany()
    * ```
    */
  get aIConversation(): Prisma.AIConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIMessage`: Exposes CRUD operations for the **AIMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIMessages
    * const aIMessages = await prisma.aIMessage.findMany()
    * ```
    */
  get aIMessage(): Prisma.AIMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEvents
    * const webhookEvents = await prisma.webhookEvent.findMany()
    * ```
    */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corsairIntegration`: Exposes CRUD operations for the **CorsairIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorsairIntegrations
    * const corsairIntegrations = await prisma.corsairIntegration.findMany()
    * ```
    */
  get corsairIntegration(): Prisma.CorsairIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corsairAccount`: Exposes CRUD operations for the **CorsairAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorsairAccounts
    * const corsairAccounts = await prisma.corsairAccount.findMany()
    * ```
    */
  get corsairAccount(): Prisma.CorsairAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corsairEntity`: Exposes CRUD operations for the **CorsairEntity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorsairEntities
    * const corsairEntities = await prisma.corsairEntity.findMany()
    * ```
    */
  get corsairEntity(): Prisma.CorsairEntityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corsairEvent`: Exposes CRUD operations for the **CorsairEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorsairEvents
    * const corsairEvents = await prisma.corsairEvent.findMany()
    * ```
    */
  get corsairEvent(): Prisma.CorsairEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Email: 'Email',
    EmailDraft: 'EmailDraft',
    CalendarEvent: 'CalendarEvent',
    AIConversation: 'AIConversation',
    AIMessage: 'AIMessage',
    WebhookEvent: 'WebhookEvent',
    CorsairIntegration: 'CorsairIntegration',
    CorsairAccount: 'CorsairAccount',
    CorsairEntity: 'CorsairEntity',
    CorsairEvent: 'CorsairEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "email" | "emailDraft" | "calendarEvent" | "aIConversation" | "aIMessage" | "webhookEvent" | "corsairIntegration" | "corsairAccount" | "corsairEntity" | "corsairEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Email: {
        payload: Prisma.$EmailPayload<ExtArgs>
        fields: Prisma.EmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findFirst: {
            args: Prisma.EmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findMany: {
            args: Prisma.EmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          create: {
            args: Prisma.EmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          createMany: {
            args: Prisma.EmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          delete: {
            args: Prisma.EmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          update: {
            args: Prisma.EmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          deleteMany: {
            args: Prisma.EmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          upsert: {
            args: Prisma.EmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          aggregate: {
            args: Prisma.EmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmail>
          }
          groupBy: {
            args: Prisma.EmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailCountArgs<ExtArgs>
            result: $Utils.Optional<EmailCountAggregateOutputType> | number
          }
        }
      }
      EmailDraft: {
        payload: Prisma.$EmailDraftPayload<ExtArgs>
        fields: Prisma.EmailDraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailDraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailDraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          findFirst: {
            args: Prisma.EmailDraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailDraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          findMany: {
            args: Prisma.EmailDraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>[]
          }
          create: {
            args: Prisma.EmailDraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          createMany: {
            args: Prisma.EmailDraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailDraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>[]
          }
          delete: {
            args: Prisma.EmailDraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          update: {
            args: Prisma.EmailDraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          deleteMany: {
            args: Prisma.EmailDraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailDraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailDraftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>[]
          }
          upsert: {
            args: Prisma.EmailDraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailDraftPayload>
          }
          aggregate: {
            args: Prisma.EmailDraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailDraft>
          }
          groupBy: {
            args: Prisma.EmailDraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailDraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailDraftCountArgs<ExtArgs>
            result: $Utils.Optional<EmailDraftCountAggregateOutputType> | number
          }
        }
      }
      CalendarEvent: {
        payload: Prisma.$CalendarEventPayload<ExtArgs>
        fields: Prisma.CalendarEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalendarEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalendarEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findFirst: {
            args: Prisma.CalendarEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalendarEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findMany: {
            args: Prisma.CalendarEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          create: {
            args: Prisma.CalendarEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          createMany: {
            args: Prisma.CalendarEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalendarEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          delete: {
            args: Prisma.CalendarEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          update: {
            args: Prisma.CalendarEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          deleteMany: {
            args: Prisma.CalendarEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalendarEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalendarEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          upsert: {
            args: Prisma.CalendarEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          aggregate: {
            args: Prisma.CalendarEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalendarEvent>
          }
          groupBy: {
            args: Prisma.CalendarEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalendarEventCountArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventCountAggregateOutputType> | number
          }
        }
      }
      AIConversation: {
        payload: Prisma.$AIConversationPayload<ExtArgs>
        fields: Prisma.AIConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          findFirst: {
            args: Prisma.AIConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          findMany: {
            args: Prisma.AIConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>[]
          }
          create: {
            args: Prisma.AIConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          createMany: {
            args: Prisma.AIConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>[]
          }
          delete: {
            args: Prisma.AIConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          update: {
            args: Prisma.AIConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          deleteMany: {
            args: Prisma.AIConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>[]
          }
          upsert: {
            args: Prisma.AIConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIConversationPayload>
          }
          aggregate: {
            args: Prisma.AIConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIConversation>
          }
          groupBy: {
            args: Prisma.AIConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIConversationCountArgs<ExtArgs>
            result: $Utils.Optional<AIConversationCountAggregateOutputType> | number
          }
        }
      }
      AIMessage: {
        payload: Prisma.$AIMessagePayload<ExtArgs>
        fields: Prisma.AIMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          findFirst: {
            args: Prisma.AIMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          findMany: {
            args: Prisma.AIMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>[]
          }
          create: {
            args: Prisma.AIMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          createMany: {
            args: Prisma.AIMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>[]
          }
          delete: {
            args: Prisma.AIMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          update: {
            args: Prisma.AIMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          deleteMany: {
            args: Prisma.AIMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>[]
          }
          upsert: {
            args: Prisma.AIMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          aggregate: {
            args: Prisma.AIMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIMessage>
          }
          groupBy: {
            args: Prisma.AIMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIMessageCountArgs<ExtArgs>
            result: $Utils.Optional<AIMessageCountAggregateOutputType> | number
          }
        }
      }
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>
        fields: Prisma.WebhookEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEvent>
          }
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventCountAggregateOutputType> | number
          }
        }
      }
      CorsairIntegration: {
        payload: Prisma.$CorsairIntegrationPayload<ExtArgs>
        fields: Prisma.CorsairIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorsairIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorsairIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          findFirst: {
            args: Prisma.CorsairIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorsairIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          findMany: {
            args: Prisma.CorsairIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>[]
          }
          create: {
            args: Prisma.CorsairIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          createMany: {
            args: Prisma.CorsairIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorsairIntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>[]
          }
          delete: {
            args: Prisma.CorsairIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          update: {
            args: Prisma.CorsairIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.CorsairIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorsairIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorsairIntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>[]
          }
          upsert: {
            args: Prisma.CorsairIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairIntegrationPayload>
          }
          aggregate: {
            args: Prisma.CorsairIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorsairIntegration>
          }
          groupBy: {
            args: Prisma.CorsairIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorsairIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorsairIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<CorsairIntegrationCountAggregateOutputType> | number
          }
        }
      }
      CorsairAccount: {
        payload: Prisma.$CorsairAccountPayload<ExtArgs>
        fields: Prisma.CorsairAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorsairAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorsairAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          findFirst: {
            args: Prisma.CorsairAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorsairAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          findMany: {
            args: Prisma.CorsairAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>[]
          }
          create: {
            args: Prisma.CorsairAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          createMany: {
            args: Prisma.CorsairAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorsairAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>[]
          }
          delete: {
            args: Prisma.CorsairAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          update: {
            args: Prisma.CorsairAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          deleteMany: {
            args: Prisma.CorsairAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorsairAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorsairAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>[]
          }
          upsert: {
            args: Prisma.CorsairAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairAccountPayload>
          }
          aggregate: {
            args: Prisma.CorsairAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorsairAccount>
          }
          groupBy: {
            args: Prisma.CorsairAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorsairAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorsairAccountCountArgs<ExtArgs>
            result: $Utils.Optional<CorsairAccountCountAggregateOutputType> | number
          }
        }
      }
      CorsairEntity: {
        payload: Prisma.$CorsairEntityPayload<ExtArgs>
        fields: Prisma.CorsairEntityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorsairEntityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorsairEntityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          findFirst: {
            args: Prisma.CorsairEntityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorsairEntityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          findMany: {
            args: Prisma.CorsairEntityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>[]
          }
          create: {
            args: Prisma.CorsairEntityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          createMany: {
            args: Prisma.CorsairEntityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorsairEntityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>[]
          }
          delete: {
            args: Prisma.CorsairEntityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          update: {
            args: Prisma.CorsairEntityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          deleteMany: {
            args: Prisma.CorsairEntityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorsairEntityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorsairEntityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>[]
          }
          upsert: {
            args: Prisma.CorsairEntityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEntityPayload>
          }
          aggregate: {
            args: Prisma.CorsairEntityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorsairEntity>
          }
          groupBy: {
            args: Prisma.CorsairEntityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorsairEntityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorsairEntityCountArgs<ExtArgs>
            result: $Utils.Optional<CorsairEntityCountAggregateOutputType> | number
          }
        }
      }
      CorsairEvent: {
        payload: Prisma.$CorsairEventPayload<ExtArgs>
        fields: Prisma.CorsairEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorsairEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorsairEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          findFirst: {
            args: Prisma.CorsairEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorsairEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          findMany: {
            args: Prisma.CorsairEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>[]
          }
          create: {
            args: Prisma.CorsairEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          createMany: {
            args: Prisma.CorsairEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorsairEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>[]
          }
          delete: {
            args: Prisma.CorsairEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          update: {
            args: Prisma.CorsairEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          deleteMany: {
            args: Prisma.CorsairEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorsairEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorsairEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>[]
          }
          upsert: {
            args: Prisma.CorsairEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorsairEventPayload>
          }
          aggregate: {
            args: Prisma.CorsairEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorsairEvent>
          }
          groupBy: {
            args: Prisma.CorsairEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorsairEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorsairEventCountArgs<ExtArgs>
            result: $Utils.Optional<CorsairEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    email?: EmailOmit
    emailDraft?: EmailDraftOmit
    calendarEvent?: CalendarEventOmit
    aIConversation?: AIConversationOmit
    aIMessage?: AIMessageOmit
    webhookEvent?: WebhookEventOmit
    corsairIntegration?: CorsairIntegrationOmit
    corsairAccount?: CorsairAccountOmit
    corsairEntity?: CorsairEntityOmit
    corsairEvent?: CorsairEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    emails: number
    emailDrafts: number
    calendarEvents: number
    aiConversations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | UserCountOutputTypeCountEmailsArgs
    emailDrafts?: boolean | UserCountOutputTypeCountEmailDraftsArgs
    calendarEvents?: boolean | UserCountOutputTypeCountCalendarEventsArgs
    aiConversations?: boolean | UserCountOutputTypeCountAiConversationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailDraftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailDraftWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCalendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIConversationWhereInput
  }


  /**
   * Count Type AIConversationCountOutputType
   */

  export type AIConversationCountOutputType = {
    messages: number
  }

  export type AIConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | AIConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * AIConversationCountOutputType without action
   */
  export type AIConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversationCountOutputType
     */
    select?: AIConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIConversationCountOutputType without action
   */
  export type AIConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMessageWhereInput
  }


  /**
   * Count Type CorsairIntegrationCountOutputType
   */

  export type CorsairIntegrationCountOutputType = {
    accounts: number
  }

  export type CorsairIntegrationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | CorsairIntegrationCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * CorsairIntegrationCountOutputType without action
   */
  export type CorsairIntegrationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegrationCountOutputType
     */
    select?: CorsairIntegrationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CorsairIntegrationCountOutputType without action
   */
  export type CorsairIntegrationCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairAccountWhereInput
  }


  /**
   * Count Type CorsairAccountCountOutputType
   */

  export type CorsairAccountCountOutputType = {
    entities: number
    events: number
  }

  export type CorsairAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entities?: boolean | CorsairAccountCountOutputTypeCountEntitiesArgs
    events?: boolean | CorsairAccountCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * CorsairAccountCountOutputType without action
   */
  export type CorsairAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccountCountOutputType
     */
    select?: CorsairAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CorsairAccountCountOutputType without action
   */
  export type CorsairAccountCountOutputTypeCountEntitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairEntityWhereInput
  }

  /**
   * CorsairAccountCountOutputType without action
   */
  export type CorsairAccountCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emails?: boolean | User$emailsArgs<ExtArgs>
    emailDrafts?: boolean | User$emailDraftsArgs<ExtArgs>
    calendarEvents?: boolean | User$calendarEventsArgs<ExtArgs>
    aiConversations?: boolean | User$aiConversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | User$emailsArgs<ExtArgs>
    emailDrafts?: boolean | User$emailDraftsArgs<ExtArgs>
    calendarEvents?: boolean | User$calendarEventsArgs<ExtArgs>
    aiConversations?: boolean | User$aiConversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      emails: Prisma.$EmailPayload<ExtArgs>[]
      emailDrafts: Prisma.$EmailDraftPayload<ExtArgs>[]
      calendarEvents: Prisma.$CalendarEventPayload<ExtArgs>[]
      aiConversations: Prisma.$AIConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string | null
      lastName: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emails<T extends User$emailsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emailDrafts<T extends User$emailDraftsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailDraftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calendarEvents<T extends User$calendarEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$calendarEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiConversations<T extends User$aiConversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$aiConversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.emails
   */
  export type User$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * User.emailDrafts
   */
  export type User$emailDraftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    where?: EmailDraftWhereInput
    orderBy?: EmailDraftOrderByWithRelationInput | EmailDraftOrderByWithRelationInput[]
    cursor?: EmailDraftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailDraftScalarFieldEnum | EmailDraftScalarFieldEnum[]
  }

  /**
   * User.calendarEvents
   */
  export type User$calendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    cursor?: CalendarEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * User.aiConversations
   */
  export type User$aiConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    where?: AIConversationWhereInput
    orderBy?: AIConversationOrderByWithRelationInput | AIConversationOrderByWithRelationInput[]
    cursor?: AIConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIConversationScalarFieldEnum | AIConversationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Email
   */

  export type AggregateEmail = {
    _count: EmailCountAggregateOutputType | null
    _avg: EmailAvgAggregateOutputType | null
    _sum: EmailSumAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  export type EmailAvgAggregateOutputType = {
    confidence: number | null
  }

  export type EmailSumAggregateOutputType = {
    confidence: number | null
  }

  export type EmailMinAggregateOutputType = {
    id: string | null
    threadId: string | null
    userId: string | null
    subject: string | null
    snippet: string | null
    body: string | null
    bodyHtml: string | null
    isRead: boolean | null
    isStarred: boolean | null
    priority: $Enums.EmailPriority | null
    confidence: number | null
    reasoning: string | null
    receivedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailMaxAggregateOutputType = {
    id: string | null
    threadId: string | null
    userId: string | null
    subject: string | null
    snippet: string | null
    body: string | null
    bodyHtml: string | null
    isRead: boolean | null
    isStarred: boolean | null
    priority: $Enums.EmailPriority | null
    confidence: number | null
    reasoning: string | null
    receivedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailCountAggregateOutputType = {
    id: number
    threadId: number
    userId: number
    from: number
    to: number
    cc: number
    bcc: number
    subject: number
    snippet: number
    body: number
    bodyHtml: number
    labelIds: number
    isRead: number
    isStarred: number
    priority: number
    confidence: number
    reasoning: number
    receivedAt: number
    attachments: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailAvgAggregateInputType = {
    confidence?: true
  }

  export type EmailSumAggregateInputType = {
    confidence?: true
  }

  export type EmailMinAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    subject?: true
    snippet?: true
    body?: true
    bodyHtml?: true
    isRead?: true
    isStarred?: true
    priority?: true
    confidence?: true
    reasoning?: true
    receivedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailMaxAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    subject?: true
    snippet?: true
    body?: true
    bodyHtml?: true
    isRead?: true
    isStarred?: true
    priority?: true
    confidence?: true
    reasoning?: true
    receivedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailCountAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    from?: true
    to?: true
    cc?: true
    bcc?: true
    subject?: true
    snippet?: true
    body?: true
    bodyHtml?: true
    labelIds?: true
    isRead?: true
    isStarred?: true
    priority?: true
    confidence?: true
    reasoning?: true
    receivedAt?: true
    attachments?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Email to aggregate.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emails
    **/
    _count?: true | EmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailMaxAggregateInputType
  }

  export type GetEmailAggregateType<T extends EmailAggregateArgs> = {
        [P in keyof T & keyof AggregateEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmail[P]>
      : GetScalarType<T[P], AggregateEmail[P]>
  }




  export type EmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithAggregationInput | EmailOrderByWithAggregationInput[]
    by: EmailScalarFieldEnum[] | EmailScalarFieldEnum
    having?: EmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailCountAggregateInputType | true
    _avg?: EmailAvgAggregateInputType
    _sum?: EmailSumAggregateInputType
    _min?: EmailMinAggregateInputType
    _max?: EmailMaxAggregateInputType
  }

  export type EmailGroupByOutputType = {
    id: string
    threadId: string
    userId: string
    from: JsonValue
    to: JsonValue
    cc: JsonValue | null
    bcc: JsonValue | null
    subject: string
    snippet: string
    body: string
    bodyHtml: string | null
    labelIds: string[]
    isRead: boolean
    isStarred: boolean
    priority: $Enums.EmailPriority
    confidence: number | null
    reasoning: string | null
    receivedAt: Date
    attachments: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: EmailCountAggregateOutputType | null
    _avg: EmailAvgAggregateOutputType | null
    _sum: EmailSumAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  type GetEmailGroupByPayload<T extends EmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailGroupByOutputType[P]>
            : GetScalarType<T[P], EmailGroupByOutputType[P]>
        }
      >
    >


  export type EmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    snippet?: boolean
    body?: boolean
    bodyHtml?: boolean
    labelIds?: boolean
    isRead?: boolean
    isStarred?: boolean
    priority?: boolean
    confidence?: boolean
    reasoning?: boolean
    receivedAt?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    snippet?: boolean
    body?: boolean
    bodyHtml?: boolean
    labelIds?: boolean
    isRead?: boolean
    isStarred?: boolean
    priority?: boolean
    confidence?: boolean
    reasoning?: boolean
    receivedAt?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    snippet?: boolean
    body?: boolean
    bodyHtml?: boolean
    labelIds?: boolean
    isRead?: boolean
    isStarred?: boolean
    priority?: boolean
    confidence?: boolean
    reasoning?: boolean
    receivedAt?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectScalar = {
    id?: boolean
    threadId?: boolean
    userId?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    snippet?: boolean
    body?: boolean
    bodyHtml?: boolean
    labelIds?: boolean
    isRead?: boolean
    isStarred?: boolean
    priority?: boolean
    confidence?: boolean
    reasoning?: boolean
    receivedAt?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "userId" | "from" | "to" | "cc" | "bcc" | "subject" | "snippet" | "body" | "bodyHtml" | "labelIds" | "isRead" | "isStarred" | "priority" | "confidence" | "reasoning" | "receivedAt" | "attachments" | "createdAt" | "updatedAt", ExtArgs["result"]["email"]>
  export type EmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Email"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      threadId: string
      userId: string
      from: Prisma.JsonValue
      to: Prisma.JsonValue
      cc: Prisma.JsonValue | null
      bcc: Prisma.JsonValue | null
      subject: string
      snippet: string
      body: string
      bodyHtml: string | null
      labelIds: string[]
      isRead: boolean
      isStarred: boolean
      priority: $Enums.EmailPriority
      confidence: number | null
      reasoning: string | null
      receivedAt: Date
      attachments: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["email"]>
    composites: {}
  }

  type EmailGetPayload<S extends boolean | null | undefined | EmailDefaultArgs> = $Result.GetResult<Prisma.$EmailPayload, S>

  type EmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailCountAggregateInputType | true
    }

  export interface EmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Email'], meta: { name: 'Email' } }
    /**
     * Find zero or one Email that matches the filter.
     * @param {EmailFindUniqueArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailFindUniqueArgs>(args: SelectSubset<T, EmailFindUniqueArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Email that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailFindUniqueOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailFindFirstArgs>(args?: SelectSubset<T, EmailFindFirstArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emails
     * const emails = await prisma.email.findMany()
     * 
     * // Get first 10 Emails
     * const emails = await prisma.email.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailWithIdOnly = await prisma.email.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailFindManyArgs>(args?: SelectSubset<T, EmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Email.
     * @param {EmailCreateArgs} args - Arguments to create a Email.
     * @example
     * // Create one Email
     * const Email = await prisma.email.create({
     *   data: {
     *     // ... data to create a Email
     *   }
     * })
     * 
     */
    create<T extends EmailCreateArgs>(args: SelectSubset<T, EmailCreateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emails.
     * @param {EmailCreateManyArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailCreateManyArgs>(args?: SelectSubset<T, EmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Emails and returns the data saved in the database.
     * @param {EmailCreateManyAndReturnArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Email.
     * @param {EmailDeleteArgs} args - Arguments to delete one Email.
     * @example
     * // Delete one Email
     * const Email = await prisma.email.delete({
     *   where: {
     *     // ... filter to delete one Email
     *   }
     * })
     * 
     */
    delete<T extends EmailDeleteArgs>(args: SelectSubset<T, EmailDeleteArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Email.
     * @param {EmailUpdateArgs} args - Arguments to update one Email.
     * @example
     * // Update one Email
     * const email = await prisma.email.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailUpdateArgs>(args: SelectSubset<T, EmailUpdateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emails.
     * @param {EmailDeleteManyArgs} args - Arguments to filter Emails to delete.
     * @example
     * // Delete a few Emails
     * const { count } = await prisma.email.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailDeleteManyArgs>(args?: SelectSubset<T, EmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailUpdateManyArgs>(args: SelectSubset<T, EmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails and returns the data updated in the database.
     * @param {EmailUpdateManyAndReturnArgs} args - Arguments to update many Emails.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Email.
     * @param {EmailUpsertArgs} args - Arguments to update or create a Email.
     * @example
     * // Update or create a Email
     * const email = await prisma.email.upsert({
     *   create: {
     *     // ... data to create a Email
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Email we want to update
     *   }
     * })
     */
    upsert<T extends EmailUpsertArgs>(args: SelectSubset<T, EmailUpsertArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCountArgs} args - Arguments to filter Emails to count.
     * @example
     * // Count the number of Emails
     * const count = await prisma.email.count({
     *   where: {
     *     // ... the filter for the Emails we want to count
     *   }
     * })
    **/
    count<T extends EmailCountArgs>(
      args?: Subset<T, EmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailAggregateArgs>(args: Subset<T, EmailAggregateArgs>): Prisma.PrismaPromise<GetEmailAggregateType<T>>

    /**
     * Group by Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailGroupByArgs['orderBy'] }
        : { orderBy?: EmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Email model
   */
  readonly fields: EmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Email.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Email model
   */
  interface EmailFieldRefs {
    readonly id: FieldRef<"Email", 'String'>
    readonly threadId: FieldRef<"Email", 'String'>
    readonly userId: FieldRef<"Email", 'String'>
    readonly from: FieldRef<"Email", 'Json'>
    readonly to: FieldRef<"Email", 'Json'>
    readonly cc: FieldRef<"Email", 'Json'>
    readonly bcc: FieldRef<"Email", 'Json'>
    readonly subject: FieldRef<"Email", 'String'>
    readonly snippet: FieldRef<"Email", 'String'>
    readonly body: FieldRef<"Email", 'String'>
    readonly bodyHtml: FieldRef<"Email", 'String'>
    readonly labelIds: FieldRef<"Email", 'String[]'>
    readonly isRead: FieldRef<"Email", 'Boolean'>
    readonly isStarred: FieldRef<"Email", 'Boolean'>
    readonly priority: FieldRef<"Email", 'EmailPriority'>
    readonly confidence: FieldRef<"Email", 'Float'>
    readonly reasoning: FieldRef<"Email", 'String'>
    readonly receivedAt: FieldRef<"Email", 'DateTime'>
    readonly attachments: FieldRef<"Email", 'Json'>
    readonly createdAt: FieldRef<"Email", 'DateTime'>
    readonly updatedAt: FieldRef<"Email", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Email findUnique
   */
  export type EmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findUniqueOrThrow
   */
  export type EmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findFirst
   */
  export type EmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findFirstOrThrow
   */
  export type EmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findMany
   */
  export type EmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Emails to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email create
   */
  export type EmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to create a Email.
     */
    data: XOR<EmailCreateInput, EmailUncheckedCreateInput>
  }

  /**
   * Email createMany
   */
  export type EmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Email createManyAndReturn
   */
  export type EmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email update
   */
  export type EmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to update a Email.
     */
    data: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
    /**
     * Choose, which Email to update.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email updateMany
   */
  export type EmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
  }

  /**
   * Email updateManyAndReturn
   */
  export type EmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email upsert
   */
  export type EmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The filter to search for the Email to update in case it exists.
     */
    where: EmailWhereUniqueInput
    /**
     * In case the Email found by the `where` argument doesn't exist, create a new Email with this data.
     */
    create: XOR<EmailCreateInput, EmailUncheckedCreateInput>
    /**
     * In case the Email was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
  }

  /**
   * Email delete
   */
  export type EmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter which Email to delete.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email deleteMany
   */
  export type EmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emails to delete
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to delete.
     */
    limit?: number
  }

  /**
   * Email without action
   */
  export type EmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
  }


  /**
   * Model EmailDraft
   */

  export type AggregateEmailDraft = {
    _count: EmailDraftCountAggregateOutputType | null
    _min: EmailDraftMinAggregateOutputType | null
    _max: EmailDraftMaxAggregateOutputType | null
  }

  export type EmailDraftMinAggregateOutputType = {
    id: string | null
    userId: string | null
    subject: string | null
    body: string | null
    bodyHtml: string | null
    replyToEmailId: string | null
    corsairDraftId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailDraftMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    subject: string | null
    body: string | null
    bodyHtml: string | null
    replyToEmailId: string | null
    corsairDraftId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailDraftCountAggregateOutputType = {
    id: number
    userId: number
    to: number
    cc: number
    bcc: number
    subject: number
    body: number
    bodyHtml: number
    replyToEmailId: number
    corsairDraftId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailDraftMinAggregateInputType = {
    id?: true
    userId?: true
    subject?: true
    body?: true
    bodyHtml?: true
    replyToEmailId?: true
    corsairDraftId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailDraftMaxAggregateInputType = {
    id?: true
    userId?: true
    subject?: true
    body?: true
    bodyHtml?: true
    replyToEmailId?: true
    corsairDraftId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailDraftCountAggregateInputType = {
    id?: true
    userId?: true
    to?: true
    cc?: true
    bcc?: true
    subject?: true
    body?: true
    bodyHtml?: true
    replyToEmailId?: true
    corsairDraftId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailDraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailDraft to aggregate.
     */
    where?: EmailDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailDrafts to fetch.
     */
    orderBy?: EmailDraftOrderByWithRelationInput | EmailDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailDrafts
    **/
    _count?: true | EmailDraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailDraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailDraftMaxAggregateInputType
  }

  export type GetEmailDraftAggregateType<T extends EmailDraftAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailDraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailDraft[P]>
      : GetScalarType<T[P], AggregateEmailDraft[P]>
  }




  export type EmailDraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailDraftWhereInput
    orderBy?: EmailDraftOrderByWithAggregationInput | EmailDraftOrderByWithAggregationInput[]
    by: EmailDraftScalarFieldEnum[] | EmailDraftScalarFieldEnum
    having?: EmailDraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailDraftCountAggregateInputType | true
    _min?: EmailDraftMinAggregateInputType
    _max?: EmailDraftMaxAggregateInputType
  }

  export type EmailDraftGroupByOutputType = {
    id: string
    userId: string
    to: JsonValue
    cc: JsonValue | null
    bcc: JsonValue | null
    subject: string
    body: string
    bodyHtml: string | null
    replyToEmailId: string | null
    corsairDraftId: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmailDraftCountAggregateOutputType | null
    _min: EmailDraftMinAggregateOutputType | null
    _max: EmailDraftMaxAggregateOutputType | null
  }

  type GetEmailDraftGroupByPayload<T extends EmailDraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailDraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailDraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailDraftGroupByOutputType[P]>
            : GetScalarType<T[P], EmailDraftGroupByOutputType[P]>
        }
      >
    >


  export type EmailDraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    bodyHtml?: boolean
    replyToEmailId?: boolean
    corsairDraftId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailDraft"]>

  export type EmailDraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    bodyHtml?: boolean
    replyToEmailId?: boolean
    corsairDraftId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailDraft"]>

  export type EmailDraftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    bodyHtml?: boolean
    replyToEmailId?: boolean
    corsairDraftId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailDraft"]>

  export type EmailDraftSelectScalar = {
    id?: boolean
    userId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    bodyHtml?: boolean
    replyToEmailId?: boolean
    corsairDraftId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailDraftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "to" | "cc" | "bcc" | "subject" | "body" | "bodyHtml" | "replyToEmailId" | "corsairDraftId" | "createdAt" | "updatedAt", ExtArgs["result"]["emailDraft"]>
  export type EmailDraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailDraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailDraftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailDraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailDraft"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      to: Prisma.JsonValue
      cc: Prisma.JsonValue | null
      bcc: Prisma.JsonValue | null
      subject: string
      body: string
      bodyHtml: string | null
      replyToEmailId: string | null
      corsairDraftId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailDraft"]>
    composites: {}
  }

  type EmailDraftGetPayload<S extends boolean | null | undefined | EmailDraftDefaultArgs> = $Result.GetResult<Prisma.$EmailDraftPayload, S>

  type EmailDraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailDraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailDraftCountAggregateInputType | true
    }

  export interface EmailDraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailDraft'], meta: { name: 'EmailDraft' } }
    /**
     * Find zero or one EmailDraft that matches the filter.
     * @param {EmailDraftFindUniqueArgs} args - Arguments to find a EmailDraft
     * @example
     * // Get one EmailDraft
     * const emailDraft = await prisma.emailDraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailDraftFindUniqueArgs>(args: SelectSubset<T, EmailDraftFindUniqueArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailDraft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailDraftFindUniqueOrThrowArgs} args - Arguments to find a EmailDraft
     * @example
     * // Get one EmailDraft
     * const emailDraft = await prisma.emailDraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailDraftFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailDraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailDraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftFindFirstArgs} args - Arguments to find a EmailDraft
     * @example
     * // Get one EmailDraft
     * const emailDraft = await prisma.emailDraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailDraftFindFirstArgs>(args?: SelectSubset<T, EmailDraftFindFirstArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailDraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftFindFirstOrThrowArgs} args - Arguments to find a EmailDraft
     * @example
     * // Get one EmailDraft
     * const emailDraft = await prisma.emailDraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailDraftFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailDraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailDrafts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailDrafts
     * const emailDrafts = await prisma.emailDraft.findMany()
     * 
     * // Get first 10 EmailDrafts
     * const emailDrafts = await prisma.emailDraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailDraftWithIdOnly = await prisma.emailDraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailDraftFindManyArgs>(args?: SelectSubset<T, EmailDraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailDraft.
     * @param {EmailDraftCreateArgs} args - Arguments to create a EmailDraft.
     * @example
     * // Create one EmailDraft
     * const EmailDraft = await prisma.emailDraft.create({
     *   data: {
     *     // ... data to create a EmailDraft
     *   }
     * })
     * 
     */
    create<T extends EmailDraftCreateArgs>(args: SelectSubset<T, EmailDraftCreateArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailDrafts.
     * @param {EmailDraftCreateManyArgs} args - Arguments to create many EmailDrafts.
     * @example
     * // Create many EmailDrafts
     * const emailDraft = await prisma.emailDraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailDraftCreateManyArgs>(args?: SelectSubset<T, EmailDraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailDrafts and returns the data saved in the database.
     * @param {EmailDraftCreateManyAndReturnArgs} args - Arguments to create many EmailDrafts.
     * @example
     * // Create many EmailDrafts
     * const emailDraft = await prisma.emailDraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailDrafts and only return the `id`
     * const emailDraftWithIdOnly = await prisma.emailDraft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailDraftCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailDraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailDraft.
     * @param {EmailDraftDeleteArgs} args - Arguments to delete one EmailDraft.
     * @example
     * // Delete one EmailDraft
     * const EmailDraft = await prisma.emailDraft.delete({
     *   where: {
     *     // ... filter to delete one EmailDraft
     *   }
     * })
     * 
     */
    delete<T extends EmailDraftDeleteArgs>(args: SelectSubset<T, EmailDraftDeleteArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailDraft.
     * @param {EmailDraftUpdateArgs} args - Arguments to update one EmailDraft.
     * @example
     * // Update one EmailDraft
     * const emailDraft = await prisma.emailDraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailDraftUpdateArgs>(args: SelectSubset<T, EmailDraftUpdateArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailDrafts.
     * @param {EmailDraftDeleteManyArgs} args - Arguments to filter EmailDrafts to delete.
     * @example
     * // Delete a few EmailDrafts
     * const { count } = await prisma.emailDraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailDraftDeleteManyArgs>(args?: SelectSubset<T, EmailDraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailDrafts
     * const emailDraft = await prisma.emailDraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailDraftUpdateManyArgs>(args: SelectSubset<T, EmailDraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailDrafts and returns the data updated in the database.
     * @param {EmailDraftUpdateManyAndReturnArgs} args - Arguments to update many EmailDrafts.
     * @example
     * // Update many EmailDrafts
     * const emailDraft = await prisma.emailDraft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailDrafts and only return the `id`
     * const emailDraftWithIdOnly = await prisma.emailDraft.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailDraftUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailDraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailDraft.
     * @param {EmailDraftUpsertArgs} args - Arguments to update or create a EmailDraft.
     * @example
     * // Update or create a EmailDraft
     * const emailDraft = await prisma.emailDraft.upsert({
     *   create: {
     *     // ... data to create a EmailDraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailDraft we want to update
     *   }
     * })
     */
    upsert<T extends EmailDraftUpsertArgs>(args: SelectSubset<T, EmailDraftUpsertArgs<ExtArgs>>): Prisma__EmailDraftClient<$Result.GetResult<Prisma.$EmailDraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftCountArgs} args - Arguments to filter EmailDrafts to count.
     * @example
     * // Count the number of EmailDrafts
     * const count = await prisma.emailDraft.count({
     *   where: {
     *     // ... the filter for the EmailDrafts we want to count
     *   }
     * })
    **/
    count<T extends EmailDraftCountArgs>(
      args?: Subset<T, EmailDraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailDraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailDraftAggregateArgs>(args: Subset<T, EmailDraftAggregateArgs>): Prisma.PrismaPromise<GetEmailDraftAggregateType<T>>

    /**
     * Group by EmailDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailDraftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailDraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailDraftGroupByArgs['orderBy'] }
        : { orderBy?: EmailDraftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailDraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailDraft model
   */
  readonly fields: EmailDraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailDraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailDraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailDraft model
   */
  interface EmailDraftFieldRefs {
    readonly id: FieldRef<"EmailDraft", 'String'>
    readonly userId: FieldRef<"EmailDraft", 'String'>
    readonly to: FieldRef<"EmailDraft", 'Json'>
    readonly cc: FieldRef<"EmailDraft", 'Json'>
    readonly bcc: FieldRef<"EmailDraft", 'Json'>
    readonly subject: FieldRef<"EmailDraft", 'String'>
    readonly body: FieldRef<"EmailDraft", 'String'>
    readonly bodyHtml: FieldRef<"EmailDraft", 'String'>
    readonly replyToEmailId: FieldRef<"EmailDraft", 'String'>
    readonly corsairDraftId: FieldRef<"EmailDraft", 'String'>
    readonly createdAt: FieldRef<"EmailDraft", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailDraft", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailDraft findUnique
   */
  export type EmailDraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter, which EmailDraft to fetch.
     */
    where: EmailDraftWhereUniqueInput
  }

  /**
   * EmailDraft findUniqueOrThrow
   */
  export type EmailDraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter, which EmailDraft to fetch.
     */
    where: EmailDraftWhereUniqueInput
  }

  /**
   * EmailDraft findFirst
   */
  export type EmailDraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter, which EmailDraft to fetch.
     */
    where?: EmailDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailDrafts to fetch.
     */
    orderBy?: EmailDraftOrderByWithRelationInput | EmailDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailDrafts.
     */
    cursor?: EmailDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailDrafts.
     */
    distinct?: EmailDraftScalarFieldEnum | EmailDraftScalarFieldEnum[]
  }

  /**
   * EmailDraft findFirstOrThrow
   */
  export type EmailDraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter, which EmailDraft to fetch.
     */
    where?: EmailDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailDrafts to fetch.
     */
    orderBy?: EmailDraftOrderByWithRelationInput | EmailDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailDrafts.
     */
    cursor?: EmailDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailDrafts.
     */
    distinct?: EmailDraftScalarFieldEnum | EmailDraftScalarFieldEnum[]
  }

  /**
   * EmailDraft findMany
   */
  export type EmailDraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter, which EmailDrafts to fetch.
     */
    where?: EmailDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailDrafts to fetch.
     */
    orderBy?: EmailDraftOrderByWithRelationInput | EmailDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailDrafts.
     */
    cursor?: EmailDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailDrafts.
     */
    distinct?: EmailDraftScalarFieldEnum | EmailDraftScalarFieldEnum[]
  }

  /**
   * EmailDraft create
   */
  export type EmailDraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailDraft.
     */
    data: XOR<EmailDraftCreateInput, EmailDraftUncheckedCreateInput>
  }

  /**
   * EmailDraft createMany
   */
  export type EmailDraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailDrafts.
     */
    data: EmailDraftCreateManyInput | EmailDraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailDraft createManyAndReturn
   */
  export type EmailDraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * The data used to create many EmailDrafts.
     */
    data: EmailDraftCreateManyInput | EmailDraftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailDraft update
   */
  export type EmailDraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailDraft.
     */
    data: XOR<EmailDraftUpdateInput, EmailDraftUncheckedUpdateInput>
    /**
     * Choose, which EmailDraft to update.
     */
    where: EmailDraftWhereUniqueInput
  }

  /**
   * EmailDraft updateMany
   */
  export type EmailDraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailDrafts.
     */
    data: XOR<EmailDraftUpdateManyMutationInput, EmailDraftUncheckedUpdateManyInput>
    /**
     * Filter which EmailDrafts to update
     */
    where?: EmailDraftWhereInput
    /**
     * Limit how many EmailDrafts to update.
     */
    limit?: number
  }

  /**
   * EmailDraft updateManyAndReturn
   */
  export type EmailDraftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * The data used to update EmailDrafts.
     */
    data: XOR<EmailDraftUpdateManyMutationInput, EmailDraftUncheckedUpdateManyInput>
    /**
     * Filter which EmailDrafts to update
     */
    where?: EmailDraftWhereInput
    /**
     * Limit how many EmailDrafts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailDraft upsert
   */
  export type EmailDraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailDraft to update in case it exists.
     */
    where: EmailDraftWhereUniqueInput
    /**
     * In case the EmailDraft found by the `where` argument doesn't exist, create a new EmailDraft with this data.
     */
    create: XOR<EmailDraftCreateInput, EmailDraftUncheckedCreateInput>
    /**
     * In case the EmailDraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailDraftUpdateInput, EmailDraftUncheckedUpdateInput>
  }

  /**
   * EmailDraft delete
   */
  export type EmailDraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
    /**
     * Filter which EmailDraft to delete.
     */
    where: EmailDraftWhereUniqueInput
  }

  /**
   * EmailDraft deleteMany
   */
  export type EmailDraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailDrafts to delete
     */
    where?: EmailDraftWhereInput
    /**
     * Limit how many EmailDrafts to delete.
     */
    limit?: number
  }

  /**
   * EmailDraft without action
   */
  export type EmailDraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailDraft
     */
    select?: EmailDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailDraft
     */
    omit?: EmailDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailDraftInclude<ExtArgs> | null
  }


  /**
   * Model CalendarEvent
   */

  export type AggregateCalendarEvent = {
    _count: CalendarEventCountAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  export type CalendarEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    calendarId: string | null
    summary: string | null
    description: string | null
    location: string | null
    status: string | null
    visibility: string | null
    recurringEventId: string | null
    htmlLink: string | null
    hangoutLink: string | null
    colorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalendarEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    calendarId: string | null
    summary: string | null
    description: string | null
    location: string | null
    status: string | null
    visibility: string | null
    recurringEventId: string | null
    htmlLink: string | null
    hangoutLink: string | null
    colorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalendarEventCountAggregateOutputType = {
    id: number
    userId: number
    calendarId: number
    summary: number
    description: number
    location: number
    start: number
    end: number
    status: number
    visibility: number
    attendees: number
    recurrence: number
    recurringEventId: number
    htmlLink: number
    hangoutLink: number
    colorId: number
    reminders: number
    creator: number
    organizer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CalendarEventMinAggregateInputType = {
    id?: true
    userId?: true
    calendarId?: true
    summary?: true
    description?: true
    location?: true
    status?: true
    visibility?: true
    recurringEventId?: true
    htmlLink?: true
    hangoutLink?: true
    colorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalendarEventMaxAggregateInputType = {
    id?: true
    userId?: true
    calendarId?: true
    summary?: true
    description?: true
    location?: true
    status?: true
    visibility?: true
    recurringEventId?: true
    htmlLink?: true
    hangoutLink?: true
    colorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalendarEventCountAggregateInputType = {
    id?: true
    userId?: true
    calendarId?: true
    summary?: true
    description?: true
    location?: true
    start?: true
    end?: true
    status?: true
    visibility?: true
    attendees?: true
    recurrence?: true
    recurringEventId?: true
    htmlLink?: true
    hangoutLink?: true
    colorId?: true
    reminders?: true
    creator?: true
    organizer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CalendarEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvent to aggregate.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CalendarEvents
    **/
    _count?: true | CalendarEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalendarEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalendarEventMaxAggregateInputType
  }

  export type GetCalendarEventAggregateType<T extends CalendarEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCalendarEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalendarEvent[P]>
      : GetScalarType<T[P], AggregateCalendarEvent[P]>
  }




  export type CalendarEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithAggregationInput | CalendarEventOrderByWithAggregationInput[]
    by: CalendarEventScalarFieldEnum[] | CalendarEventScalarFieldEnum
    having?: CalendarEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalendarEventCountAggregateInputType | true
    _min?: CalendarEventMinAggregateInputType
    _max?: CalendarEventMaxAggregateInputType
  }

  export type CalendarEventGroupByOutputType = {
    id: string
    userId: string
    calendarId: string
    summary: string
    description: string | null
    location: string | null
    start: JsonValue
    end: JsonValue
    status: string
    visibility: string | null
    attendees: JsonValue
    recurrence: string[]
    recurringEventId: string | null
    htmlLink: string | null
    hangoutLink: string | null
    colorId: string | null
    reminders: JsonValue | null
    creator: JsonValue | null
    organizer: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CalendarEventCountAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  type GetCalendarEventGroupByPayload<T extends CalendarEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalendarEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalendarEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
            : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
        }
      >
    >


  export type CalendarEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    calendarId?: boolean
    summary?: boolean
    description?: boolean
    location?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
    visibility?: boolean
    attendees?: boolean
    recurrence?: boolean
    recurringEventId?: boolean
    htmlLink?: boolean
    hangoutLink?: boolean
    colorId?: boolean
    reminders?: boolean
    creator?: boolean
    organizer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    calendarId?: boolean
    summary?: boolean
    description?: boolean
    location?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
    visibility?: boolean
    attendees?: boolean
    recurrence?: boolean
    recurringEventId?: boolean
    htmlLink?: boolean
    hangoutLink?: boolean
    colorId?: boolean
    reminders?: boolean
    creator?: boolean
    organizer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    calendarId?: boolean
    summary?: boolean
    description?: boolean
    location?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
    visibility?: boolean
    attendees?: boolean
    recurrence?: boolean
    recurringEventId?: boolean
    htmlLink?: boolean
    hangoutLink?: boolean
    colorId?: boolean
    reminders?: boolean
    creator?: boolean
    organizer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectScalar = {
    id?: boolean
    userId?: boolean
    calendarId?: boolean
    summary?: boolean
    description?: boolean
    location?: boolean
    start?: boolean
    end?: boolean
    status?: boolean
    visibility?: boolean
    attendees?: boolean
    recurrence?: boolean
    recurringEventId?: boolean
    htmlLink?: boolean
    hangoutLink?: boolean
    colorId?: boolean
    reminders?: boolean
    creator?: boolean
    organizer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CalendarEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "calendarId" | "summary" | "description" | "location" | "start" | "end" | "status" | "visibility" | "attendees" | "recurrence" | "recurringEventId" | "htmlLink" | "hangoutLink" | "colorId" | "reminders" | "creator" | "organizer" | "createdAt" | "updatedAt", ExtArgs["result"]["calendarEvent"]>
  export type CalendarEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CalendarEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CalendarEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CalendarEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CalendarEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      calendarId: string
      summary: string
      description: string | null
      location: string | null
      start: Prisma.JsonValue
      end: Prisma.JsonValue
      status: string
      visibility: string | null
      attendees: Prisma.JsonValue
      recurrence: string[]
      recurringEventId: string | null
      htmlLink: string | null
      hangoutLink: string | null
      colorId: string | null
      reminders: Prisma.JsonValue | null
      creator: Prisma.JsonValue | null
      organizer: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["calendarEvent"]>
    composites: {}
  }

  type CalendarEventGetPayload<S extends boolean | null | undefined | CalendarEventDefaultArgs> = $Result.GetResult<Prisma.$CalendarEventPayload, S>

  type CalendarEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalendarEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalendarEventCountAggregateInputType | true
    }

  export interface CalendarEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CalendarEvent'], meta: { name: 'CalendarEvent' } }
    /**
     * Find zero or one CalendarEvent that matches the filter.
     * @param {CalendarEventFindUniqueArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalendarEventFindUniqueArgs>(args: SelectSubset<T, CalendarEventFindUniqueArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CalendarEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalendarEventFindUniqueOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalendarEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CalendarEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalendarEventFindFirstArgs>(args?: SelectSubset<T, CalendarEventFindFirstArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalendarEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CalendarEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CalendarEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany()
     * 
     * // Get first 10 CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalendarEventFindManyArgs>(args?: SelectSubset<T, CalendarEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CalendarEvent.
     * @param {CalendarEventCreateArgs} args - Arguments to create a CalendarEvent.
     * @example
     * // Create one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.create({
     *   data: {
     *     // ... data to create a CalendarEvent
     *   }
     * })
     * 
     */
    create<T extends CalendarEventCreateArgs>(args: SelectSubset<T, CalendarEventCreateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CalendarEvents.
     * @param {CalendarEventCreateManyArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalendarEventCreateManyArgs>(args?: SelectSubset<T, CalendarEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CalendarEvents and returns the data saved in the database.
     * @param {CalendarEventCreateManyAndReturnArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CalendarEvents and only return the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalendarEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CalendarEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CalendarEvent.
     * @param {CalendarEventDeleteArgs} args - Arguments to delete one CalendarEvent.
     * @example
     * // Delete one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.delete({
     *   where: {
     *     // ... filter to delete one CalendarEvent
     *   }
     * })
     * 
     */
    delete<T extends CalendarEventDeleteArgs>(args: SelectSubset<T, CalendarEventDeleteArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CalendarEvent.
     * @param {CalendarEventUpdateArgs} args - Arguments to update one CalendarEvent.
     * @example
     * // Update one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalendarEventUpdateArgs>(args: SelectSubset<T, CalendarEventUpdateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CalendarEvents.
     * @param {CalendarEventDeleteManyArgs} args - Arguments to filter CalendarEvents to delete.
     * @example
     * // Delete a few CalendarEvents
     * const { count } = await prisma.calendarEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalendarEventDeleteManyArgs>(args?: SelectSubset<T, CalendarEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalendarEventUpdateManyArgs>(args: SelectSubset<T, CalendarEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents and returns the data updated in the database.
     * @param {CalendarEventUpdateManyAndReturnArgs} args - Arguments to update many CalendarEvents.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CalendarEvents and only return the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CalendarEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CalendarEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CalendarEvent.
     * @param {CalendarEventUpsertArgs} args - Arguments to update or create a CalendarEvent.
     * @example
     * // Update or create a CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.upsert({
     *   create: {
     *     // ... data to create a CalendarEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CalendarEvent we want to update
     *   }
     * })
     */
    upsert<T extends CalendarEventUpsertArgs>(args: SelectSubset<T, CalendarEventUpsertArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventCountArgs} args - Arguments to filter CalendarEvents to count.
     * @example
     * // Count the number of CalendarEvents
     * const count = await prisma.calendarEvent.count({
     *   where: {
     *     // ... the filter for the CalendarEvents we want to count
     *   }
     * })
    **/
    count<T extends CalendarEventCountArgs>(
      args?: Subset<T, CalendarEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalendarEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CalendarEventAggregateArgs>(args: Subset<T, CalendarEventAggregateArgs>): Prisma.PrismaPromise<GetCalendarEventAggregateType<T>>

    /**
     * Group by CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CalendarEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalendarEventGroupByArgs['orderBy'] }
        : { orderBy?: CalendarEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CalendarEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CalendarEvent model
   */
  readonly fields: CalendarEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CalendarEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalendarEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CalendarEvent model
   */
  interface CalendarEventFieldRefs {
    readonly id: FieldRef<"CalendarEvent", 'String'>
    readonly userId: FieldRef<"CalendarEvent", 'String'>
    readonly calendarId: FieldRef<"CalendarEvent", 'String'>
    readonly summary: FieldRef<"CalendarEvent", 'String'>
    readonly description: FieldRef<"CalendarEvent", 'String'>
    readonly location: FieldRef<"CalendarEvent", 'String'>
    readonly start: FieldRef<"CalendarEvent", 'Json'>
    readonly end: FieldRef<"CalendarEvent", 'Json'>
    readonly status: FieldRef<"CalendarEvent", 'String'>
    readonly visibility: FieldRef<"CalendarEvent", 'String'>
    readonly attendees: FieldRef<"CalendarEvent", 'Json'>
    readonly recurrence: FieldRef<"CalendarEvent", 'String[]'>
    readonly recurringEventId: FieldRef<"CalendarEvent", 'String'>
    readonly htmlLink: FieldRef<"CalendarEvent", 'String'>
    readonly hangoutLink: FieldRef<"CalendarEvent", 'String'>
    readonly colorId: FieldRef<"CalendarEvent", 'String'>
    readonly reminders: FieldRef<"CalendarEvent", 'Json'>
    readonly creator: FieldRef<"CalendarEvent", 'Json'>
    readonly organizer: FieldRef<"CalendarEvent", 'Json'>
    readonly createdAt: FieldRef<"CalendarEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CalendarEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CalendarEvent findUnique
   */
  export type CalendarEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findUniqueOrThrow
   */
  export type CalendarEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findFirst
   */
  export type CalendarEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findFirstOrThrow
   */
  export type CalendarEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findMany
   */
  export type CalendarEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvents to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent create
   */
  export type CalendarEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CalendarEvent.
     */
    data: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
  }

  /**
   * CalendarEvent createMany
   */
  export type CalendarEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CalendarEvent createManyAndReturn
   */
  export type CalendarEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarEvent update
   */
  export type CalendarEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CalendarEvent.
     */
    data: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
    /**
     * Choose, which CalendarEvent to update.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent updateMany
   */
  export type CalendarEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
  }

  /**
   * CalendarEvent updateManyAndReturn
   */
  export type CalendarEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarEvent upsert
   */
  export type CalendarEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CalendarEvent to update in case it exists.
     */
    where: CalendarEventWhereUniqueInput
    /**
     * In case the CalendarEvent found by the `where` argument doesn't exist, create a new CalendarEvent with this data.
     */
    create: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
    /**
     * In case the CalendarEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
  }

  /**
   * CalendarEvent delete
   */
  export type CalendarEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter which CalendarEvent to delete.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent deleteMany
   */
  export type CalendarEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvents to delete
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to delete.
     */
    limit?: number
  }

  /**
   * CalendarEvent without action
   */
  export type CalendarEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
  }


  /**
   * Model AIConversation
   */

  export type AggregateAIConversation = {
    _count: AIConversationCountAggregateOutputType | null
    _min: AIConversationMinAggregateOutputType | null
    _max: AIConversationMaxAggregateOutputType | null
  }

  export type AIConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIConversationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIConversationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIConversationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIConversation to aggregate.
     */
    where?: AIConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIConversations to fetch.
     */
    orderBy?: AIConversationOrderByWithRelationInput | AIConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIConversations
    **/
    _count?: true | AIConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIConversationMaxAggregateInputType
  }

  export type GetAIConversationAggregateType<T extends AIConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateAIConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIConversation[P]>
      : GetScalarType<T[P], AggregateAIConversation[P]>
  }




  export type AIConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIConversationWhereInput
    orderBy?: AIConversationOrderByWithAggregationInput | AIConversationOrderByWithAggregationInput[]
    by: AIConversationScalarFieldEnum[] | AIConversationScalarFieldEnum
    having?: AIConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIConversationCountAggregateInputType | true
    _min?: AIConversationMinAggregateInputType
    _max?: AIConversationMaxAggregateInputType
  }

  export type AIConversationGroupByOutputType = {
    id: string
    userId: string
    title: string | null
    createdAt: Date
    updatedAt: Date
    _count: AIConversationCountAggregateOutputType | null
    _min: AIConversationMinAggregateOutputType | null
    _max: AIConversationMaxAggregateOutputType | null
  }

  type GetAIConversationGroupByPayload<T extends AIConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIConversationGroupByOutputType[P]>
            : GetScalarType<T[P], AIConversationGroupByOutputType[P]>
        }
      >
    >


  export type AIConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | AIConversation$messagesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | AIConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIConversation"]>

  export type AIConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIConversation"]>

  export type AIConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIConversation"]>

  export type AIConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "createdAt" | "updatedAt", ExtArgs["result"]["aIConversation"]>
  export type AIConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | AIConversation$messagesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | AIConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AIConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AIConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIConversation"
    objects: {
      messages: Prisma.$AIMessagePayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIConversation"]>
    composites: {}
  }

  type AIConversationGetPayload<S extends boolean | null | undefined | AIConversationDefaultArgs> = $Result.GetResult<Prisma.$AIConversationPayload, S>

  type AIConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIConversationCountAggregateInputType | true
    }

  export interface AIConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIConversation'], meta: { name: 'AIConversation' } }
    /**
     * Find zero or one AIConversation that matches the filter.
     * @param {AIConversationFindUniqueArgs} args - Arguments to find a AIConversation
     * @example
     * // Get one AIConversation
     * const aIConversation = await prisma.aIConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIConversationFindUniqueArgs>(args: SelectSubset<T, AIConversationFindUniqueArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIConversationFindUniqueOrThrowArgs} args - Arguments to find a AIConversation
     * @example
     * // Get one AIConversation
     * const aIConversation = await prisma.aIConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, AIConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationFindFirstArgs} args - Arguments to find a AIConversation
     * @example
     * // Get one AIConversation
     * const aIConversation = await prisma.aIConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIConversationFindFirstArgs>(args?: SelectSubset<T, AIConversationFindFirstArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationFindFirstOrThrowArgs} args - Arguments to find a AIConversation
     * @example
     * // Get one AIConversation
     * const aIConversation = await prisma.aIConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, AIConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIConversations
     * const aIConversations = await prisma.aIConversation.findMany()
     * 
     * // Get first 10 AIConversations
     * const aIConversations = await prisma.aIConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIConversationWithIdOnly = await prisma.aIConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIConversationFindManyArgs>(args?: SelectSubset<T, AIConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIConversation.
     * @param {AIConversationCreateArgs} args - Arguments to create a AIConversation.
     * @example
     * // Create one AIConversation
     * const AIConversation = await prisma.aIConversation.create({
     *   data: {
     *     // ... data to create a AIConversation
     *   }
     * })
     * 
     */
    create<T extends AIConversationCreateArgs>(args: SelectSubset<T, AIConversationCreateArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIConversations.
     * @param {AIConversationCreateManyArgs} args - Arguments to create many AIConversations.
     * @example
     * // Create many AIConversations
     * const aIConversation = await prisma.aIConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIConversationCreateManyArgs>(args?: SelectSubset<T, AIConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIConversations and returns the data saved in the database.
     * @param {AIConversationCreateManyAndReturnArgs} args - Arguments to create many AIConversations.
     * @example
     * // Create many AIConversations
     * const aIConversation = await prisma.aIConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIConversations and only return the `id`
     * const aIConversationWithIdOnly = await prisma.aIConversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, AIConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIConversation.
     * @param {AIConversationDeleteArgs} args - Arguments to delete one AIConversation.
     * @example
     * // Delete one AIConversation
     * const AIConversation = await prisma.aIConversation.delete({
     *   where: {
     *     // ... filter to delete one AIConversation
     *   }
     * })
     * 
     */
    delete<T extends AIConversationDeleteArgs>(args: SelectSubset<T, AIConversationDeleteArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIConversation.
     * @param {AIConversationUpdateArgs} args - Arguments to update one AIConversation.
     * @example
     * // Update one AIConversation
     * const aIConversation = await prisma.aIConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIConversationUpdateArgs>(args: SelectSubset<T, AIConversationUpdateArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIConversations.
     * @param {AIConversationDeleteManyArgs} args - Arguments to filter AIConversations to delete.
     * @example
     * // Delete a few AIConversations
     * const { count } = await prisma.aIConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIConversationDeleteManyArgs>(args?: SelectSubset<T, AIConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIConversations
     * const aIConversation = await prisma.aIConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIConversationUpdateManyArgs>(args: SelectSubset<T, AIConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIConversations and returns the data updated in the database.
     * @param {AIConversationUpdateManyAndReturnArgs} args - Arguments to update many AIConversations.
     * @example
     * // Update many AIConversations
     * const aIConversation = await prisma.aIConversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIConversations and only return the `id`
     * const aIConversationWithIdOnly = await prisma.aIConversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, AIConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIConversation.
     * @param {AIConversationUpsertArgs} args - Arguments to update or create a AIConversation.
     * @example
     * // Update or create a AIConversation
     * const aIConversation = await prisma.aIConversation.upsert({
     *   create: {
     *     // ... data to create a AIConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIConversation we want to update
     *   }
     * })
     */
    upsert<T extends AIConversationUpsertArgs>(args: SelectSubset<T, AIConversationUpsertArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationCountArgs} args - Arguments to filter AIConversations to count.
     * @example
     * // Count the number of AIConversations
     * const count = await prisma.aIConversation.count({
     *   where: {
     *     // ... the filter for the AIConversations we want to count
     *   }
     * })
    **/
    count<T extends AIConversationCountArgs>(
      args?: Subset<T, AIConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIConversationAggregateArgs>(args: Subset<T, AIConversationAggregateArgs>): Prisma.PrismaPromise<GetAIConversationAggregateType<T>>

    /**
     * Group by AIConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIConversationGroupByArgs['orderBy'] }
        : { orderBy?: AIConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIConversation model
   */
  readonly fields: AIConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends AIConversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, AIConversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIConversation model
   */
  interface AIConversationFieldRefs {
    readonly id: FieldRef<"AIConversation", 'String'>
    readonly userId: FieldRef<"AIConversation", 'String'>
    readonly title: FieldRef<"AIConversation", 'String'>
    readonly createdAt: FieldRef<"AIConversation", 'DateTime'>
    readonly updatedAt: FieldRef<"AIConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIConversation findUnique
   */
  export type AIConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter, which AIConversation to fetch.
     */
    where: AIConversationWhereUniqueInput
  }

  /**
   * AIConversation findUniqueOrThrow
   */
  export type AIConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter, which AIConversation to fetch.
     */
    where: AIConversationWhereUniqueInput
  }

  /**
   * AIConversation findFirst
   */
  export type AIConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter, which AIConversation to fetch.
     */
    where?: AIConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIConversations to fetch.
     */
    orderBy?: AIConversationOrderByWithRelationInput | AIConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIConversations.
     */
    cursor?: AIConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIConversations.
     */
    distinct?: AIConversationScalarFieldEnum | AIConversationScalarFieldEnum[]
  }

  /**
   * AIConversation findFirstOrThrow
   */
  export type AIConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter, which AIConversation to fetch.
     */
    where?: AIConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIConversations to fetch.
     */
    orderBy?: AIConversationOrderByWithRelationInput | AIConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIConversations.
     */
    cursor?: AIConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIConversations.
     */
    distinct?: AIConversationScalarFieldEnum | AIConversationScalarFieldEnum[]
  }

  /**
   * AIConversation findMany
   */
  export type AIConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter, which AIConversations to fetch.
     */
    where?: AIConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIConversations to fetch.
     */
    orderBy?: AIConversationOrderByWithRelationInput | AIConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIConversations.
     */
    cursor?: AIConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIConversations.
     */
    distinct?: AIConversationScalarFieldEnum | AIConversationScalarFieldEnum[]
  }

  /**
   * AIConversation create
   */
  export type AIConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a AIConversation.
     */
    data: XOR<AIConversationCreateInput, AIConversationUncheckedCreateInput>
  }

  /**
   * AIConversation createMany
   */
  export type AIConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIConversations.
     */
    data: AIConversationCreateManyInput | AIConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIConversation createManyAndReturn
   */
  export type AIConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * The data used to create many AIConversations.
     */
    data: AIConversationCreateManyInput | AIConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIConversation update
   */
  export type AIConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a AIConversation.
     */
    data: XOR<AIConversationUpdateInput, AIConversationUncheckedUpdateInput>
    /**
     * Choose, which AIConversation to update.
     */
    where: AIConversationWhereUniqueInput
  }

  /**
   * AIConversation updateMany
   */
  export type AIConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIConversations.
     */
    data: XOR<AIConversationUpdateManyMutationInput, AIConversationUncheckedUpdateManyInput>
    /**
     * Filter which AIConversations to update
     */
    where?: AIConversationWhereInput
    /**
     * Limit how many AIConversations to update.
     */
    limit?: number
  }

  /**
   * AIConversation updateManyAndReturn
   */
  export type AIConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * The data used to update AIConversations.
     */
    data: XOR<AIConversationUpdateManyMutationInput, AIConversationUncheckedUpdateManyInput>
    /**
     * Filter which AIConversations to update
     */
    where?: AIConversationWhereInput
    /**
     * Limit how many AIConversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIConversation upsert
   */
  export type AIConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the AIConversation to update in case it exists.
     */
    where: AIConversationWhereUniqueInput
    /**
     * In case the AIConversation found by the `where` argument doesn't exist, create a new AIConversation with this data.
     */
    create: XOR<AIConversationCreateInput, AIConversationUncheckedCreateInput>
    /**
     * In case the AIConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIConversationUpdateInput, AIConversationUncheckedUpdateInput>
  }

  /**
   * AIConversation delete
   */
  export type AIConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
    /**
     * Filter which AIConversation to delete.
     */
    where: AIConversationWhereUniqueInput
  }

  /**
   * AIConversation deleteMany
   */
  export type AIConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIConversations to delete
     */
    where?: AIConversationWhereInput
    /**
     * Limit how many AIConversations to delete.
     */
    limit?: number
  }

  /**
   * AIConversation.messages
   */
  export type AIConversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    where?: AIMessageWhereInput
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    cursor?: AIMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIConversation without action
   */
  export type AIConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIConversation
     */
    select?: AIConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIConversation
     */
    omit?: AIConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIConversationInclude<ExtArgs> | null
  }


  /**
   * Model AIMessage
   */

  export type AggregateAIMessage = {
    _count: AIMessageCountAggregateOutputType | null
    _min: AIMessageMinAggregateOutputType | null
    _max: AIMessageMaxAggregateOutputType | null
  }

  export type AIMessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AIMessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AIMessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    toolCalls: number
    toolResults: number
    createdAt: number
    _all: number
  }


  export type AIMessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AIMessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AIMessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    toolCalls?: true
    toolResults?: true
    createdAt?: true
    _all?: true
  }

  export type AIMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMessage to aggregate.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIMessages
    **/
    _count?: true | AIMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIMessageMaxAggregateInputType
  }

  export type GetAIMessageAggregateType<T extends AIMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateAIMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIMessage[P]>
      : GetScalarType<T[P], AggregateAIMessage[P]>
  }




  export type AIMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMessageWhereInput
    orderBy?: AIMessageOrderByWithAggregationInput | AIMessageOrderByWithAggregationInput[]
    by: AIMessageScalarFieldEnum[] | AIMessageScalarFieldEnum
    having?: AIMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIMessageCountAggregateInputType | true
    _min?: AIMessageMinAggregateInputType
    _max?: AIMessageMaxAggregateInputType
  }

  export type AIMessageGroupByOutputType = {
    id: string
    conversationId: string
    role: string
    content: string
    toolCalls: JsonValue | null
    toolResults: JsonValue | null
    createdAt: Date
    _count: AIMessageCountAggregateOutputType | null
    _min: AIMessageMinAggregateOutputType | null
    _max: AIMessageMaxAggregateOutputType | null
  }

  type GetAIMessageGroupByPayload<T extends AIMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIMessageGroupByOutputType[P]>
            : GetScalarType<T[P], AIMessageGroupByOutputType[P]>
        }
      >
    >


  export type AIMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCalls?: boolean
    toolResults?: boolean
    createdAt?: boolean
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIMessage"]>

  export type AIMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCalls?: boolean
    toolResults?: boolean
    createdAt?: boolean
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIMessage"]>

  export type AIMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCalls?: boolean
    toolResults?: boolean
    createdAt?: boolean
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIMessage"]>

  export type AIMessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCalls?: boolean
    toolResults?: boolean
    createdAt?: boolean
  }

  export type AIMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "role" | "content" | "toolCalls" | "toolResults" | "createdAt", ExtArgs["result"]["aIMessage"]>
  export type AIMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }
  export type AIMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }
  export type AIMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | AIConversationDefaultArgs<ExtArgs>
  }

  export type $AIMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIMessage"
    objects: {
      conversation: Prisma.$AIConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      role: string
      content: string
      toolCalls: Prisma.JsonValue | null
      toolResults: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["aIMessage"]>
    composites: {}
  }

  type AIMessageGetPayload<S extends boolean | null | undefined | AIMessageDefaultArgs> = $Result.GetResult<Prisma.$AIMessagePayload, S>

  type AIMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIMessageCountAggregateInputType | true
    }

  export interface AIMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIMessage'], meta: { name: 'AIMessage' } }
    /**
     * Find zero or one AIMessage that matches the filter.
     * @param {AIMessageFindUniqueArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIMessageFindUniqueArgs>(args: SelectSubset<T, AIMessageFindUniqueArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIMessageFindUniqueOrThrowArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, AIMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindFirstArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIMessageFindFirstArgs>(args?: SelectSubset<T, AIMessageFindFirstArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindFirstOrThrowArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, AIMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIMessages
     * const aIMessages = await prisma.aIMessage.findMany()
     * 
     * // Get first 10 AIMessages
     * const aIMessages = await prisma.aIMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIMessageWithIdOnly = await prisma.aIMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIMessageFindManyArgs>(args?: SelectSubset<T, AIMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIMessage.
     * @param {AIMessageCreateArgs} args - Arguments to create a AIMessage.
     * @example
     * // Create one AIMessage
     * const AIMessage = await prisma.aIMessage.create({
     *   data: {
     *     // ... data to create a AIMessage
     *   }
     * })
     * 
     */
    create<T extends AIMessageCreateArgs>(args: SelectSubset<T, AIMessageCreateArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIMessages.
     * @param {AIMessageCreateManyArgs} args - Arguments to create many AIMessages.
     * @example
     * // Create many AIMessages
     * const aIMessage = await prisma.aIMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIMessageCreateManyArgs>(args?: SelectSubset<T, AIMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIMessages and returns the data saved in the database.
     * @param {AIMessageCreateManyAndReturnArgs} args - Arguments to create many AIMessages.
     * @example
     * // Create many AIMessages
     * const aIMessage = await prisma.aIMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIMessages and only return the `id`
     * const aIMessageWithIdOnly = await prisma.aIMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, AIMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIMessage.
     * @param {AIMessageDeleteArgs} args - Arguments to delete one AIMessage.
     * @example
     * // Delete one AIMessage
     * const AIMessage = await prisma.aIMessage.delete({
     *   where: {
     *     // ... filter to delete one AIMessage
     *   }
     * })
     * 
     */
    delete<T extends AIMessageDeleteArgs>(args: SelectSubset<T, AIMessageDeleteArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIMessage.
     * @param {AIMessageUpdateArgs} args - Arguments to update one AIMessage.
     * @example
     * // Update one AIMessage
     * const aIMessage = await prisma.aIMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIMessageUpdateArgs>(args: SelectSubset<T, AIMessageUpdateArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIMessages.
     * @param {AIMessageDeleteManyArgs} args - Arguments to filter AIMessages to delete.
     * @example
     * // Delete a few AIMessages
     * const { count } = await prisma.aIMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIMessageDeleteManyArgs>(args?: SelectSubset<T, AIMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIMessages
     * const aIMessage = await prisma.aIMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIMessageUpdateManyArgs>(args: SelectSubset<T, AIMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMessages and returns the data updated in the database.
     * @param {AIMessageUpdateManyAndReturnArgs} args - Arguments to update many AIMessages.
     * @example
     * // Update many AIMessages
     * const aIMessage = await prisma.aIMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIMessages and only return the `id`
     * const aIMessageWithIdOnly = await prisma.aIMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, AIMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIMessage.
     * @param {AIMessageUpsertArgs} args - Arguments to update or create a AIMessage.
     * @example
     * // Update or create a AIMessage
     * const aIMessage = await prisma.aIMessage.upsert({
     *   create: {
     *     // ... data to create a AIMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIMessage we want to update
     *   }
     * })
     */
    upsert<T extends AIMessageUpsertArgs>(args: SelectSubset<T, AIMessageUpsertArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageCountArgs} args - Arguments to filter AIMessages to count.
     * @example
     * // Count the number of AIMessages
     * const count = await prisma.aIMessage.count({
     *   where: {
     *     // ... the filter for the AIMessages we want to count
     *   }
     * })
    **/
    count<T extends AIMessageCountArgs>(
      args?: Subset<T, AIMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIMessageAggregateArgs>(args: Subset<T, AIMessageAggregateArgs>): Prisma.PrismaPromise<GetAIMessageAggregateType<T>>

    /**
     * Group by AIMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIMessageGroupByArgs['orderBy'] }
        : { orderBy?: AIMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIMessage model
   */
  readonly fields: AIMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends AIConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIConversationDefaultArgs<ExtArgs>>): Prisma__AIConversationClient<$Result.GetResult<Prisma.$AIConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIMessage model
   */
  interface AIMessageFieldRefs {
    readonly id: FieldRef<"AIMessage", 'String'>
    readonly conversationId: FieldRef<"AIMessage", 'String'>
    readonly role: FieldRef<"AIMessage", 'String'>
    readonly content: FieldRef<"AIMessage", 'String'>
    readonly toolCalls: FieldRef<"AIMessage", 'Json'>
    readonly toolResults: FieldRef<"AIMessage", 'Json'>
    readonly createdAt: FieldRef<"AIMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIMessage findUnique
   */
  export type AIMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage findUniqueOrThrow
   */
  export type AIMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage findFirst
   */
  export type AIMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMessages.
     */
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage findFirstOrThrow
   */
  export type AIMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMessages.
     */
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage findMany
   */
  export type AIMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessages to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMessages.
     */
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage create
   */
  export type AIMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a AIMessage.
     */
    data: XOR<AIMessageCreateInput, AIMessageUncheckedCreateInput>
  }

  /**
   * AIMessage createMany
   */
  export type AIMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIMessages.
     */
    data: AIMessageCreateManyInput | AIMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMessage createManyAndReturn
   */
  export type AIMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * The data used to create many AIMessages.
     */
    data: AIMessageCreateManyInput | AIMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIMessage update
   */
  export type AIMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a AIMessage.
     */
    data: XOR<AIMessageUpdateInput, AIMessageUncheckedUpdateInput>
    /**
     * Choose, which AIMessage to update.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage updateMany
   */
  export type AIMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIMessages.
     */
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyInput>
    /**
     * Filter which AIMessages to update
     */
    where?: AIMessageWhereInput
    /**
     * Limit how many AIMessages to update.
     */
    limit?: number
  }

  /**
   * AIMessage updateManyAndReturn
   */
  export type AIMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * The data used to update AIMessages.
     */
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyInput>
    /**
     * Filter which AIMessages to update
     */
    where?: AIMessageWhereInput
    /**
     * Limit how many AIMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIMessage upsert
   */
  export type AIMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the AIMessage to update in case it exists.
     */
    where: AIMessageWhereUniqueInput
    /**
     * In case the AIMessage found by the `where` argument doesn't exist, create a new AIMessage with this data.
     */
    create: XOR<AIMessageCreateInput, AIMessageUncheckedCreateInput>
    /**
     * In case the AIMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIMessageUpdateInput, AIMessageUncheckedUpdateInput>
  }

  /**
   * AIMessage delete
   */
  export type AIMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter which AIMessage to delete.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage deleteMany
   */
  export type AIMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMessages to delete
     */
    where?: AIMessageWhereInput
    /**
     * Limit how many AIMessages to delete.
     */
    limit?: number
  }

  /**
   * AIMessage without action
   */
  export type AIMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMessage
     */
    omit?: AIMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  export type WebhookEventMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    eventType: string | null
    status: string | null
    error: string | null
  }

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    eventType: string | null
    status: string | null
    error: string | null
  }

  export type WebhookEventCountAggregateOutputType = {
    id: number
    createdAt: number
    eventType: number
    payload: number
    status: number
    error: number
    _all: number
  }


  export type WebhookEventMinAggregateInputType = {
    id?: true
    createdAt?: true
    eventType?: true
    status?: true
    error?: true
  }

  export type WebhookEventMaxAggregateInputType = {
    id?: true
    createdAt?: true
    eventType?: true
    status?: true
    error?: true
  }

  export type WebhookEventCountAggregateInputType = {
    id?: true
    createdAt?: true
    eventType?: true
    payload?: true
    status?: true
    error?: true
    _all?: true
  }

  export type WebhookEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEvents
    **/
    _count?: true | WebhookEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventMaxAggregateInputType
  }

  export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>
  }




  export type WebhookEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithAggregationInput | WebhookEventOrderByWithAggregationInput[]
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum
    having?: WebhookEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventCountAggregateInputType | true
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
  }

  export type WebhookEventGroupByOutputType = {
    id: string
    createdAt: Date
    eventType: string
    payload: JsonValue
    status: string
    error: string | null
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    error?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    error?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    error?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectScalar = {
    id?: boolean
    createdAt?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    error?: boolean
  }

  export type WebhookEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "eventType" | "payload" | "status" | "error", ExtArgs["result"]["webhookEvent"]>

  export type $WebhookEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      eventType: string
      payload: Prisma.JsonValue
      status: string
      error: string | null
    }, ExtArgs["result"]["webhookEvent"]>
    composites: {}
  }

  type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventPayload, S>

  type WebhookEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventCountAggregateInputType | true
    }

  export interface WebhookEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     * 
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventFindManyArgs>(args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     * 
     */
    create<T extends WebhookEventCreateArgs>(args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventCreateManyArgs>(args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventDeleteArgs>(args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventUpdateArgs>(args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEventAggregateArgs>(args: Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEvent model
   */
  readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<"WebhookEvent", 'String'>
    readonly createdAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly eventType: FieldRef<"WebhookEvent", 'String'>
    readonly payload: FieldRef<"WebhookEvent", 'Json'>
    readonly status: FieldRef<"WebhookEvent", 'String'>
    readonly error: FieldRef<"WebhookEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
  }

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
  }

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number
  }

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
  }


  /**
   * Model CorsairIntegration
   */

  export type AggregateCorsairIntegration = {
    _count: CorsairIntegrationCountAggregateOutputType | null
    _min: CorsairIntegrationMinAggregateOutputType | null
    _max: CorsairIntegrationMaxAggregateOutputType | null
  }

  export type CorsairIntegrationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    dek: string | null
  }

  export type CorsairIntegrationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    dek: string | null
  }

  export type CorsairIntegrationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    config: number
    dek: number
    _all: number
  }


  export type CorsairIntegrationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    dek?: true
  }

  export type CorsairIntegrationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    dek?: true
  }

  export type CorsairIntegrationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    config?: true
    dek?: true
    _all?: true
  }

  export type CorsairIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairIntegration to aggregate.
     */
    where?: CorsairIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairIntegrations to fetch.
     */
    orderBy?: CorsairIntegrationOrderByWithRelationInput | CorsairIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorsairIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorsairIntegrations
    **/
    _count?: true | CorsairIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorsairIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorsairIntegrationMaxAggregateInputType
  }

  export type GetCorsairIntegrationAggregateType<T extends CorsairIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateCorsairIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorsairIntegration[P]>
      : GetScalarType<T[P], AggregateCorsairIntegration[P]>
  }




  export type CorsairIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairIntegrationWhereInput
    orderBy?: CorsairIntegrationOrderByWithAggregationInput | CorsairIntegrationOrderByWithAggregationInput[]
    by: CorsairIntegrationScalarFieldEnum[] | CorsairIntegrationScalarFieldEnum
    having?: CorsairIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorsairIntegrationCountAggregateInputType | true
    _min?: CorsairIntegrationMinAggregateInputType
    _max?: CorsairIntegrationMaxAggregateInputType
  }

  export type CorsairIntegrationGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    config: JsonValue
    dek: string | null
    _count: CorsairIntegrationCountAggregateOutputType | null
    _min: CorsairIntegrationMinAggregateOutputType | null
    _max: CorsairIntegrationMaxAggregateOutputType | null
  }

  type GetCorsairIntegrationGroupByPayload<T extends CorsairIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorsairIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorsairIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorsairIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], CorsairIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type CorsairIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    config?: boolean
    dek?: boolean
    accounts?: boolean | CorsairIntegration$accountsArgs<ExtArgs>
    _count?: boolean | CorsairIntegrationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairIntegration"]>

  export type CorsairIntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    config?: boolean
    dek?: boolean
  }, ExtArgs["result"]["corsairIntegration"]>

  export type CorsairIntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    config?: boolean
    dek?: boolean
  }, ExtArgs["result"]["corsairIntegration"]>

  export type CorsairIntegrationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    config?: boolean
    dek?: boolean
  }

  export type CorsairIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "config" | "dek", ExtArgs["result"]["corsairIntegration"]>
  export type CorsairIntegrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | CorsairIntegration$accountsArgs<ExtArgs>
    _count?: boolean | CorsairIntegrationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CorsairIntegrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CorsairIntegrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CorsairIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorsairIntegration"
    objects: {
      accounts: Prisma.$CorsairAccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      config: Prisma.JsonValue
      dek: string | null
    }, ExtArgs["result"]["corsairIntegration"]>
    composites: {}
  }

  type CorsairIntegrationGetPayload<S extends boolean | null | undefined | CorsairIntegrationDefaultArgs> = $Result.GetResult<Prisma.$CorsairIntegrationPayload, S>

  type CorsairIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorsairIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorsairIntegrationCountAggregateInputType | true
    }

  export interface CorsairIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorsairIntegration'], meta: { name: 'CorsairIntegration' } }
    /**
     * Find zero or one CorsairIntegration that matches the filter.
     * @param {CorsairIntegrationFindUniqueArgs} args - Arguments to find a CorsairIntegration
     * @example
     * // Get one CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorsairIntegrationFindUniqueArgs>(args: SelectSubset<T, CorsairIntegrationFindUniqueArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorsairIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorsairIntegrationFindUniqueOrThrowArgs} args - Arguments to find a CorsairIntegration
     * @example
     * // Get one CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorsairIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, CorsairIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationFindFirstArgs} args - Arguments to find a CorsairIntegration
     * @example
     * // Get one CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorsairIntegrationFindFirstArgs>(args?: SelectSubset<T, CorsairIntegrationFindFirstArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationFindFirstOrThrowArgs} args - Arguments to find a CorsairIntegration
     * @example
     * // Get one CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorsairIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, CorsairIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorsairIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorsairIntegrations
     * const corsairIntegrations = await prisma.corsairIntegration.findMany()
     * 
     * // Get first 10 CorsairIntegrations
     * const corsairIntegrations = await prisma.corsairIntegration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corsairIntegrationWithIdOnly = await prisma.corsairIntegration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorsairIntegrationFindManyArgs>(args?: SelectSubset<T, CorsairIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorsairIntegration.
     * @param {CorsairIntegrationCreateArgs} args - Arguments to create a CorsairIntegration.
     * @example
     * // Create one CorsairIntegration
     * const CorsairIntegration = await prisma.corsairIntegration.create({
     *   data: {
     *     // ... data to create a CorsairIntegration
     *   }
     * })
     * 
     */
    create<T extends CorsairIntegrationCreateArgs>(args: SelectSubset<T, CorsairIntegrationCreateArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorsairIntegrations.
     * @param {CorsairIntegrationCreateManyArgs} args - Arguments to create many CorsairIntegrations.
     * @example
     * // Create many CorsairIntegrations
     * const corsairIntegration = await prisma.corsairIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorsairIntegrationCreateManyArgs>(args?: SelectSubset<T, CorsairIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorsairIntegrations and returns the data saved in the database.
     * @param {CorsairIntegrationCreateManyAndReturnArgs} args - Arguments to create many CorsairIntegrations.
     * @example
     * // Create many CorsairIntegrations
     * const corsairIntegration = await prisma.corsairIntegration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorsairIntegrations and only return the `id`
     * const corsairIntegrationWithIdOnly = await prisma.corsairIntegration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorsairIntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, CorsairIntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorsairIntegration.
     * @param {CorsairIntegrationDeleteArgs} args - Arguments to delete one CorsairIntegration.
     * @example
     * // Delete one CorsairIntegration
     * const CorsairIntegration = await prisma.corsairIntegration.delete({
     *   where: {
     *     // ... filter to delete one CorsairIntegration
     *   }
     * })
     * 
     */
    delete<T extends CorsairIntegrationDeleteArgs>(args: SelectSubset<T, CorsairIntegrationDeleteArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorsairIntegration.
     * @param {CorsairIntegrationUpdateArgs} args - Arguments to update one CorsairIntegration.
     * @example
     * // Update one CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorsairIntegrationUpdateArgs>(args: SelectSubset<T, CorsairIntegrationUpdateArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorsairIntegrations.
     * @param {CorsairIntegrationDeleteManyArgs} args - Arguments to filter CorsairIntegrations to delete.
     * @example
     * // Delete a few CorsairIntegrations
     * const { count } = await prisma.corsairIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorsairIntegrationDeleteManyArgs>(args?: SelectSubset<T, CorsairIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorsairIntegrations
     * const corsairIntegration = await prisma.corsairIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorsairIntegrationUpdateManyArgs>(args: SelectSubset<T, CorsairIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairIntegrations and returns the data updated in the database.
     * @param {CorsairIntegrationUpdateManyAndReturnArgs} args - Arguments to update many CorsairIntegrations.
     * @example
     * // Update many CorsairIntegrations
     * const corsairIntegration = await prisma.corsairIntegration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorsairIntegrations and only return the `id`
     * const corsairIntegrationWithIdOnly = await prisma.corsairIntegration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorsairIntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, CorsairIntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorsairIntegration.
     * @param {CorsairIntegrationUpsertArgs} args - Arguments to update or create a CorsairIntegration.
     * @example
     * // Update or create a CorsairIntegration
     * const corsairIntegration = await prisma.corsairIntegration.upsert({
     *   create: {
     *     // ... data to create a CorsairIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorsairIntegration we want to update
     *   }
     * })
     */
    upsert<T extends CorsairIntegrationUpsertArgs>(args: SelectSubset<T, CorsairIntegrationUpsertArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorsairIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationCountArgs} args - Arguments to filter CorsairIntegrations to count.
     * @example
     * // Count the number of CorsairIntegrations
     * const count = await prisma.corsairIntegration.count({
     *   where: {
     *     // ... the filter for the CorsairIntegrations we want to count
     *   }
     * })
    **/
    count<T extends CorsairIntegrationCountArgs>(
      args?: Subset<T, CorsairIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorsairIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorsairIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CorsairIntegrationAggregateArgs>(args: Subset<T, CorsairIntegrationAggregateArgs>): Prisma.PrismaPromise<GetCorsairIntegrationAggregateType<T>>

    /**
     * Group by CorsairIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairIntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CorsairIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorsairIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: CorsairIntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CorsairIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorsairIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorsairIntegration model
   */
  readonly fields: CorsairIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorsairIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorsairIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends CorsairIntegration$accountsArgs<ExtArgs> = {}>(args?: Subset<T, CorsairIntegration$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CorsairIntegration model
   */
  interface CorsairIntegrationFieldRefs {
    readonly id: FieldRef<"CorsairIntegration", 'String'>
    readonly createdAt: FieldRef<"CorsairIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"CorsairIntegration", 'DateTime'>
    readonly name: FieldRef<"CorsairIntegration", 'String'>
    readonly config: FieldRef<"CorsairIntegration", 'Json'>
    readonly dek: FieldRef<"CorsairIntegration", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CorsairIntegration findUnique
   */
  export type CorsairIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which CorsairIntegration to fetch.
     */
    where: CorsairIntegrationWhereUniqueInput
  }

  /**
   * CorsairIntegration findUniqueOrThrow
   */
  export type CorsairIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which CorsairIntegration to fetch.
     */
    where: CorsairIntegrationWhereUniqueInput
  }

  /**
   * CorsairIntegration findFirst
   */
  export type CorsairIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which CorsairIntegration to fetch.
     */
    where?: CorsairIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairIntegrations to fetch.
     */
    orderBy?: CorsairIntegrationOrderByWithRelationInput | CorsairIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairIntegrations.
     */
    cursor?: CorsairIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairIntegrations.
     */
    distinct?: CorsairIntegrationScalarFieldEnum | CorsairIntegrationScalarFieldEnum[]
  }

  /**
   * CorsairIntegration findFirstOrThrow
   */
  export type CorsairIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which CorsairIntegration to fetch.
     */
    where?: CorsairIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairIntegrations to fetch.
     */
    orderBy?: CorsairIntegrationOrderByWithRelationInput | CorsairIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairIntegrations.
     */
    cursor?: CorsairIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairIntegrations.
     */
    distinct?: CorsairIntegrationScalarFieldEnum | CorsairIntegrationScalarFieldEnum[]
  }

  /**
   * CorsairIntegration findMany
   */
  export type CorsairIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which CorsairIntegrations to fetch.
     */
    where?: CorsairIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairIntegrations to fetch.
     */
    orderBy?: CorsairIntegrationOrderByWithRelationInput | CorsairIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorsairIntegrations.
     */
    cursor?: CorsairIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairIntegrations.
     */
    distinct?: CorsairIntegrationScalarFieldEnum | CorsairIntegrationScalarFieldEnum[]
  }

  /**
   * CorsairIntegration create
   */
  export type CorsairIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to create a CorsairIntegration.
     */
    data: XOR<CorsairIntegrationCreateInput, CorsairIntegrationUncheckedCreateInput>
  }

  /**
   * CorsairIntegration createMany
   */
  export type CorsairIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorsairIntegrations.
     */
    data: CorsairIntegrationCreateManyInput | CorsairIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorsairIntegration createManyAndReturn
   */
  export type CorsairIntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many CorsairIntegrations.
     */
    data: CorsairIntegrationCreateManyInput | CorsairIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorsairIntegration update
   */
  export type CorsairIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to update a CorsairIntegration.
     */
    data: XOR<CorsairIntegrationUpdateInput, CorsairIntegrationUncheckedUpdateInput>
    /**
     * Choose, which CorsairIntegration to update.
     */
    where: CorsairIntegrationWhereUniqueInput
  }

  /**
   * CorsairIntegration updateMany
   */
  export type CorsairIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorsairIntegrations.
     */
    data: XOR<CorsairIntegrationUpdateManyMutationInput, CorsairIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which CorsairIntegrations to update
     */
    where?: CorsairIntegrationWhereInput
    /**
     * Limit how many CorsairIntegrations to update.
     */
    limit?: number
  }

  /**
   * CorsairIntegration updateManyAndReturn
   */
  export type CorsairIntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * The data used to update CorsairIntegrations.
     */
    data: XOR<CorsairIntegrationUpdateManyMutationInput, CorsairIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which CorsairIntegrations to update
     */
    where?: CorsairIntegrationWhereInput
    /**
     * Limit how many CorsairIntegrations to update.
     */
    limit?: number
  }

  /**
   * CorsairIntegration upsert
   */
  export type CorsairIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * The filter to search for the CorsairIntegration to update in case it exists.
     */
    where: CorsairIntegrationWhereUniqueInput
    /**
     * In case the CorsairIntegration found by the `where` argument doesn't exist, create a new CorsairIntegration with this data.
     */
    create: XOR<CorsairIntegrationCreateInput, CorsairIntegrationUncheckedCreateInput>
    /**
     * In case the CorsairIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorsairIntegrationUpdateInput, CorsairIntegrationUncheckedUpdateInput>
  }

  /**
   * CorsairIntegration delete
   */
  export type CorsairIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
    /**
     * Filter which CorsairIntegration to delete.
     */
    where: CorsairIntegrationWhereUniqueInput
  }

  /**
   * CorsairIntegration deleteMany
   */
  export type CorsairIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairIntegrations to delete
     */
    where?: CorsairIntegrationWhereInput
    /**
     * Limit how many CorsairIntegrations to delete.
     */
    limit?: number
  }

  /**
   * CorsairIntegration.accounts
   */
  export type CorsairIntegration$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    where?: CorsairAccountWhereInput
    orderBy?: CorsairAccountOrderByWithRelationInput | CorsairAccountOrderByWithRelationInput[]
    cursor?: CorsairAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CorsairAccountScalarFieldEnum | CorsairAccountScalarFieldEnum[]
  }

  /**
   * CorsairIntegration without action
   */
  export type CorsairIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairIntegration
     */
    select?: CorsairIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairIntegration
     */
    omit?: CorsairIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairIntegrationInclude<ExtArgs> | null
  }


  /**
   * Model CorsairAccount
   */

  export type AggregateCorsairAccount = {
    _count: CorsairAccountCountAggregateOutputType | null
    _min: CorsairAccountMinAggregateOutputType | null
    _max: CorsairAccountMaxAggregateOutputType | null
  }

  export type CorsairAccountMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: string | null
    integrationId: string | null
    dek: string | null
  }

  export type CorsairAccountMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: string | null
    integrationId: string | null
    dek: string | null
  }

  export type CorsairAccountCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    tenantId: number
    integrationId: number
    config: number
    dek: number
    _all: number
  }


  export type CorsairAccountMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    integrationId?: true
    dek?: true
  }

  export type CorsairAccountMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    integrationId?: true
    dek?: true
  }

  export type CorsairAccountCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
    integrationId?: true
    config?: true
    dek?: true
    _all?: true
  }

  export type CorsairAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairAccount to aggregate.
     */
    where?: CorsairAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairAccounts to fetch.
     */
    orderBy?: CorsairAccountOrderByWithRelationInput | CorsairAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorsairAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorsairAccounts
    **/
    _count?: true | CorsairAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorsairAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorsairAccountMaxAggregateInputType
  }

  export type GetCorsairAccountAggregateType<T extends CorsairAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateCorsairAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorsairAccount[P]>
      : GetScalarType<T[P], AggregateCorsairAccount[P]>
  }




  export type CorsairAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairAccountWhereInput
    orderBy?: CorsairAccountOrderByWithAggregationInput | CorsairAccountOrderByWithAggregationInput[]
    by: CorsairAccountScalarFieldEnum[] | CorsairAccountScalarFieldEnum
    having?: CorsairAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorsairAccountCountAggregateInputType | true
    _min?: CorsairAccountMinAggregateInputType
    _max?: CorsairAccountMaxAggregateInputType
  }

  export type CorsairAccountGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    tenantId: string
    integrationId: string
    config: JsonValue
    dek: string | null
    _count: CorsairAccountCountAggregateOutputType | null
    _min: CorsairAccountMinAggregateOutputType | null
    _max: CorsairAccountMaxAggregateOutputType | null
  }

  type GetCorsairAccountGroupByPayload<T extends CorsairAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorsairAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorsairAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorsairAccountGroupByOutputType[P]>
            : GetScalarType<T[P], CorsairAccountGroupByOutputType[P]>
        }
      >
    >


  export type CorsairAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    integrationId?: boolean
    config?: boolean
    dek?: boolean
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
    entities?: boolean | CorsairAccount$entitiesArgs<ExtArgs>
    events?: boolean | CorsairAccount$eventsArgs<ExtArgs>
    _count?: boolean | CorsairAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairAccount"]>

  export type CorsairAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    integrationId?: boolean
    config?: boolean
    dek?: boolean
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairAccount"]>

  export type CorsairAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    integrationId?: boolean
    config?: boolean
    dek?: boolean
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairAccount"]>

  export type CorsairAccountSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
    integrationId?: boolean
    config?: boolean
    dek?: boolean
  }

  export type CorsairAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "tenantId" | "integrationId" | "config" | "dek", ExtArgs["result"]["corsairAccount"]>
  export type CorsairAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
    entities?: boolean | CorsairAccount$entitiesArgs<ExtArgs>
    events?: boolean | CorsairAccount$eventsArgs<ExtArgs>
    _count?: boolean | CorsairAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CorsairAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
  }
  export type CorsairAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | CorsairIntegrationDefaultArgs<ExtArgs>
  }

  export type $CorsairAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorsairAccount"
    objects: {
      integration: Prisma.$CorsairIntegrationPayload<ExtArgs>
      entities: Prisma.$CorsairEntityPayload<ExtArgs>[]
      events: Prisma.$CorsairEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      tenantId: string
      integrationId: string
      config: Prisma.JsonValue
      dek: string | null
    }, ExtArgs["result"]["corsairAccount"]>
    composites: {}
  }

  type CorsairAccountGetPayload<S extends boolean | null | undefined | CorsairAccountDefaultArgs> = $Result.GetResult<Prisma.$CorsairAccountPayload, S>

  type CorsairAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorsairAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorsairAccountCountAggregateInputType | true
    }

  export interface CorsairAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorsairAccount'], meta: { name: 'CorsairAccount' } }
    /**
     * Find zero or one CorsairAccount that matches the filter.
     * @param {CorsairAccountFindUniqueArgs} args - Arguments to find a CorsairAccount
     * @example
     * // Get one CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorsairAccountFindUniqueArgs>(args: SelectSubset<T, CorsairAccountFindUniqueArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorsairAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorsairAccountFindUniqueOrThrowArgs} args - Arguments to find a CorsairAccount
     * @example
     * // Get one CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorsairAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, CorsairAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountFindFirstArgs} args - Arguments to find a CorsairAccount
     * @example
     * // Get one CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorsairAccountFindFirstArgs>(args?: SelectSubset<T, CorsairAccountFindFirstArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountFindFirstOrThrowArgs} args - Arguments to find a CorsairAccount
     * @example
     * // Get one CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorsairAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, CorsairAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorsairAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorsairAccounts
     * const corsairAccounts = await prisma.corsairAccount.findMany()
     * 
     * // Get first 10 CorsairAccounts
     * const corsairAccounts = await prisma.corsairAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corsairAccountWithIdOnly = await prisma.corsairAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorsairAccountFindManyArgs>(args?: SelectSubset<T, CorsairAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorsairAccount.
     * @param {CorsairAccountCreateArgs} args - Arguments to create a CorsairAccount.
     * @example
     * // Create one CorsairAccount
     * const CorsairAccount = await prisma.corsairAccount.create({
     *   data: {
     *     // ... data to create a CorsairAccount
     *   }
     * })
     * 
     */
    create<T extends CorsairAccountCreateArgs>(args: SelectSubset<T, CorsairAccountCreateArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorsairAccounts.
     * @param {CorsairAccountCreateManyArgs} args - Arguments to create many CorsairAccounts.
     * @example
     * // Create many CorsairAccounts
     * const corsairAccount = await prisma.corsairAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorsairAccountCreateManyArgs>(args?: SelectSubset<T, CorsairAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorsairAccounts and returns the data saved in the database.
     * @param {CorsairAccountCreateManyAndReturnArgs} args - Arguments to create many CorsairAccounts.
     * @example
     * // Create many CorsairAccounts
     * const corsairAccount = await prisma.corsairAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorsairAccounts and only return the `id`
     * const corsairAccountWithIdOnly = await prisma.corsairAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorsairAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, CorsairAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorsairAccount.
     * @param {CorsairAccountDeleteArgs} args - Arguments to delete one CorsairAccount.
     * @example
     * // Delete one CorsairAccount
     * const CorsairAccount = await prisma.corsairAccount.delete({
     *   where: {
     *     // ... filter to delete one CorsairAccount
     *   }
     * })
     * 
     */
    delete<T extends CorsairAccountDeleteArgs>(args: SelectSubset<T, CorsairAccountDeleteArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorsairAccount.
     * @param {CorsairAccountUpdateArgs} args - Arguments to update one CorsairAccount.
     * @example
     * // Update one CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorsairAccountUpdateArgs>(args: SelectSubset<T, CorsairAccountUpdateArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorsairAccounts.
     * @param {CorsairAccountDeleteManyArgs} args - Arguments to filter CorsairAccounts to delete.
     * @example
     * // Delete a few CorsairAccounts
     * const { count } = await prisma.corsairAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorsairAccountDeleteManyArgs>(args?: SelectSubset<T, CorsairAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorsairAccounts
     * const corsairAccount = await prisma.corsairAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorsairAccountUpdateManyArgs>(args: SelectSubset<T, CorsairAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairAccounts and returns the data updated in the database.
     * @param {CorsairAccountUpdateManyAndReturnArgs} args - Arguments to update many CorsairAccounts.
     * @example
     * // Update many CorsairAccounts
     * const corsairAccount = await prisma.corsairAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorsairAccounts and only return the `id`
     * const corsairAccountWithIdOnly = await prisma.corsairAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorsairAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, CorsairAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorsairAccount.
     * @param {CorsairAccountUpsertArgs} args - Arguments to update or create a CorsairAccount.
     * @example
     * // Update or create a CorsairAccount
     * const corsairAccount = await prisma.corsairAccount.upsert({
     *   create: {
     *     // ... data to create a CorsairAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorsairAccount we want to update
     *   }
     * })
     */
    upsert<T extends CorsairAccountUpsertArgs>(args: SelectSubset<T, CorsairAccountUpsertArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorsairAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountCountArgs} args - Arguments to filter CorsairAccounts to count.
     * @example
     * // Count the number of CorsairAccounts
     * const count = await prisma.corsairAccount.count({
     *   where: {
     *     // ... the filter for the CorsairAccounts we want to count
     *   }
     * })
    **/
    count<T extends CorsairAccountCountArgs>(
      args?: Subset<T, CorsairAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorsairAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorsairAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CorsairAccountAggregateArgs>(args: Subset<T, CorsairAccountAggregateArgs>): Prisma.PrismaPromise<GetCorsairAccountAggregateType<T>>

    /**
     * Group by CorsairAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CorsairAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorsairAccountGroupByArgs['orderBy'] }
        : { orderBy?: CorsairAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CorsairAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorsairAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorsairAccount model
   */
  readonly fields: CorsairAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorsairAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorsairAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    integration<T extends CorsairIntegrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CorsairIntegrationDefaultArgs<ExtArgs>>): Prisma__CorsairIntegrationClient<$Result.GetResult<Prisma.$CorsairIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    entities<T extends CorsairAccount$entitiesArgs<ExtArgs> = {}>(args?: Subset<T, CorsairAccount$entitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends CorsairAccount$eventsArgs<ExtArgs> = {}>(args?: Subset<T, CorsairAccount$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CorsairAccount model
   */
  interface CorsairAccountFieldRefs {
    readonly id: FieldRef<"CorsairAccount", 'String'>
    readonly createdAt: FieldRef<"CorsairAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"CorsairAccount", 'DateTime'>
    readonly tenantId: FieldRef<"CorsairAccount", 'String'>
    readonly integrationId: FieldRef<"CorsairAccount", 'String'>
    readonly config: FieldRef<"CorsairAccount", 'Json'>
    readonly dek: FieldRef<"CorsairAccount", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CorsairAccount findUnique
   */
  export type CorsairAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter, which CorsairAccount to fetch.
     */
    where: CorsairAccountWhereUniqueInput
  }

  /**
   * CorsairAccount findUniqueOrThrow
   */
  export type CorsairAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter, which CorsairAccount to fetch.
     */
    where: CorsairAccountWhereUniqueInput
  }

  /**
   * CorsairAccount findFirst
   */
  export type CorsairAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter, which CorsairAccount to fetch.
     */
    where?: CorsairAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairAccounts to fetch.
     */
    orderBy?: CorsairAccountOrderByWithRelationInput | CorsairAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairAccounts.
     */
    cursor?: CorsairAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairAccounts.
     */
    distinct?: CorsairAccountScalarFieldEnum | CorsairAccountScalarFieldEnum[]
  }

  /**
   * CorsairAccount findFirstOrThrow
   */
  export type CorsairAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter, which CorsairAccount to fetch.
     */
    where?: CorsairAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairAccounts to fetch.
     */
    orderBy?: CorsairAccountOrderByWithRelationInput | CorsairAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairAccounts.
     */
    cursor?: CorsairAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairAccounts.
     */
    distinct?: CorsairAccountScalarFieldEnum | CorsairAccountScalarFieldEnum[]
  }

  /**
   * CorsairAccount findMany
   */
  export type CorsairAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter, which CorsairAccounts to fetch.
     */
    where?: CorsairAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairAccounts to fetch.
     */
    orderBy?: CorsairAccountOrderByWithRelationInput | CorsairAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorsairAccounts.
     */
    cursor?: CorsairAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairAccounts.
     */
    distinct?: CorsairAccountScalarFieldEnum | CorsairAccountScalarFieldEnum[]
  }

  /**
   * CorsairAccount create
   */
  export type CorsairAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a CorsairAccount.
     */
    data: XOR<CorsairAccountCreateInput, CorsairAccountUncheckedCreateInput>
  }

  /**
   * CorsairAccount createMany
   */
  export type CorsairAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorsairAccounts.
     */
    data: CorsairAccountCreateManyInput | CorsairAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorsairAccount createManyAndReturn
   */
  export type CorsairAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * The data used to create many CorsairAccounts.
     */
    data: CorsairAccountCreateManyInput | CorsairAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairAccount update
   */
  export type CorsairAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a CorsairAccount.
     */
    data: XOR<CorsairAccountUpdateInput, CorsairAccountUncheckedUpdateInput>
    /**
     * Choose, which CorsairAccount to update.
     */
    where: CorsairAccountWhereUniqueInput
  }

  /**
   * CorsairAccount updateMany
   */
  export type CorsairAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorsairAccounts.
     */
    data: XOR<CorsairAccountUpdateManyMutationInput, CorsairAccountUncheckedUpdateManyInput>
    /**
     * Filter which CorsairAccounts to update
     */
    where?: CorsairAccountWhereInput
    /**
     * Limit how many CorsairAccounts to update.
     */
    limit?: number
  }

  /**
   * CorsairAccount updateManyAndReturn
   */
  export type CorsairAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * The data used to update CorsairAccounts.
     */
    data: XOR<CorsairAccountUpdateManyMutationInput, CorsairAccountUncheckedUpdateManyInput>
    /**
     * Filter which CorsairAccounts to update
     */
    where?: CorsairAccountWhereInput
    /**
     * Limit how many CorsairAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairAccount upsert
   */
  export type CorsairAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the CorsairAccount to update in case it exists.
     */
    where: CorsairAccountWhereUniqueInput
    /**
     * In case the CorsairAccount found by the `where` argument doesn't exist, create a new CorsairAccount with this data.
     */
    create: XOR<CorsairAccountCreateInput, CorsairAccountUncheckedCreateInput>
    /**
     * In case the CorsairAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorsairAccountUpdateInput, CorsairAccountUncheckedUpdateInput>
  }

  /**
   * CorsairAccount delete
   */
  export type CorsairAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
    /**
     * Filter which CorsairAccount to delete.
     */
    where: CorsairAccountWhereUniqueInput
  }

  /**
   * CorsairAccount deleteMany
   */
  export type CorsairAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairAccounts to delete
     */
    where?: CorsairAccountWhereInput
    /**
     * Limit how many CorsairAccounts to delete.
     */
    limit?: number
  }

  /**
   * CorsairAccount.entities
   */
  export type CorsairAccount$entitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    where?: CorsairEntityWhereInput
    orderBy?: CorsairEntityOrderByWithRelationInput | CorsairEntityOrderByWithRelationInput[]
    cursor?: CorsairEntityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CorsairEntityScalarFieldEnum | CorsairEntityScalarFieldEnum[]
  }

  /**
   * CorsairAccount.events
   */
  export type CorsairAccount$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    where?: CorsairEventWhereInput
    orderBy?: CorsairEventOrderByWithRelationInput | CorsairEventOrderByWithRelationInput[]
    cursor?: CorsairEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CorsairEventScalarFieldEnum | CorsairEventScalarFieldEnum[]
  }

  /**
   * CorsairAccount without action
   */
  export type CorsairAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairAccount
     */
    select?: CorsairAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairAccount
     */
    omit?: CorsairAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairAccountInclude<ExtArgs> | null
  }


  /**
   * Model CorsairEntity
   */

  export type AggregateCorsairEntity = {
    _count: CorsairEntityCountAggregateOutputType | null
    _min: CorsairEntityMinAggregateOutputType | null
    _max: CorsairEntityMaxAggregateOutputType | null
  }

  export type CorsairEntityMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: string | null
    entityId: string | null
    entityType: string | null
    version: string | null
  }

  export type CorsairEntityMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: string | null
    entityId: string | null
    entityType: string | null
    version: string | null
  }

  export type CorsairEntityCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    accountId: number
    entityId: number
    entityType: number
    version: number
    data: number
    _all: number
  }


  export type CorsairEntityMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    entityId?: true
    entityType?: true
    version?: true
  }

  export type CorsairEntityMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    entityId?: true
    entityType?: true
    version?: true
  }

  export type CorsairEntityCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    entityId?: true
    entityType?: true
    version?: true
    data?: true
    _all?: true
  }

  export type CorsairEntityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairEntity to aggregate.
     */
    where?: CorsairEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEntities to fetch.
     */
    orderBy?: CorsairEntityOrderByWithRelationInput | CorsairEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorsairEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorsairEntities
    **/
    _count?: true | CorsairEntityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorsairEntityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorsairEntityMaxAggregateInputType
  }

  export type GetCorsairEntityAggregateType<T extends CorsairEntityAggregateArgs> = {
        [P in keyof T & keyof AggregateCorsairEntity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorsairEntity[P]>
      : GetScalarType<T[P], AggregateCorsairEntity[P]>
  }




  export type CorsairEntityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairEntityWhereInput
    orderBy?: CorsairEntityOrderByWithAggregationInput | CorsairEntityOrderByWithAggregationInput[]
    by: CorsairEntityScalarFieldEnum[] | CorsairEntityScalarFieldEnum
    having?: CorsairEntityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorsairEntityCountAggregateInputType | true
    _min?: CorsairEntityMinAggregateInputType
    _max?: CorsairEntityMaxAggregateInputType
  }

  export type CorsairEntityGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    accountId: string
    entityId: string
    entityType: string
    version: string
    data: JsonValue
    _count: CorsairEntityCountAggregateOutputType | null
    _min: CorsairEntityMinAggregateOutputType | null
    _max: CorsairEntityMaxAggregateOutputType | null
  }

  type GetCorsairEntityGroupByPayload<T extends CorsairEntityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorsairEntityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorsairEntityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorsairEntityGroupByOutputType[P]>
            : GetScalarType<T[P], CorsairEntityGroupByOutputType[P]>
        }
      >
    >


  export type CorsairEntitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    entityId?: boolean
    entityType?: boolean
    version?: boolean
    data?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEntity"]>

  export type CorsairEntitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    entityId?: boolean
    entityType?: boolean
    version?: boolean
    data?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEntity"]>

  export type CorsairEntitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    entityId?: boolean
    entityType?: boolean
    version?: boolean
    data?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEntity"]>

  export type CorsairEntitySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    entityId?: boolean
    entityType?: boolean
    version?: boolean
    data?: boolean
  }

  export type CorsairEntityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "accountId" | "entityId" | "entityType" | "version" | "data", ExtArgs["result"]["corsairEntity"]>
  export type CorsairEntityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }
  export type CorsairEntityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }
  export type CorsairEntityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }

  export type $CorsairEntityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorsairEntity"
    objects: {
      account: Prisma.$CorsairAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      accountId: string
      entityId: string
      entityType: string
      version: string
      data: Prisma.JsonValue
    }, ExtArgs["result"]["corsairEntity"]>
    composites: {}
  }

  type CorsairEntityGetPayload<S extends boolean | null | undefined | CorsairEntityDefaultArgs> = $Result.GetResult<Prisma.$CorsairEntityPayload, S>

  type CorsairEntityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorsairEntityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorsairEntityCountAggregateInputType | true
    }

  export interface CorsairEntityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorsairEntity'], meta: { name: 'CorsairEntity' } }
    /**
     * Find zero or one CorsairEntity that matches the filter.
     * @param {CorsairEntityFindUniqueArgs} args - Arguments to find a CorsairEntity
     * @example
     * // Get one CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorsairEntityFindUniqueArgs>(args: SelectSubset<T, CorsairEntityFindUniqueArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorsairEntity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorsairEntityFindUniqueOrThrowArgs} args - Arguments to find a CorsairEntity
     * @example
     * // Get one CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorsairEntityFindUniqueOrThrowArgs>(args: SelectSubset<T, CorsairEntityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairEntity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityFindFirstArgs} args - Arguments to find a CorsairEntity
     * @example
     * // Get one CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorsairEntityFindFirstArgs>(args?: SelectSubset<T, CorsairEntityFindFirstArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairEntity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityFindFirstOrThrowArgs} args - Arguments to find a CorsairEntity
     * @example
     * // Get one CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorsairEntityFindFirstOrThrowArgs>(args?: SelectSubset<T, CorsairEntityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorsairEntities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorsairEntities
     * const corsairEntities = await prisma.corsairEntity.findMany()
     * 
     * // Get first 10 CorsairEntities
     * const corsairEntities = await prisma.corsairEntity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corsairEntityWithIdOnly = await prisma.corsairEntity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorsairEntityFindManyArgs>(args?: SelectSubset<T, CorsairEntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorsairEntity.
     * @param {CorsairEntityCreateArgs} args - Arguments to create a CorsairEntity.
     * @example
     * // Create one CorsairEntity
     * const CorsairEntity = await prisma.corsairEntity.create({
     *   data: {
     *     // ... data to create a CorsairEntity
     *   }
     * })
     * 
     */
    create<T extends CorsairEntityCreateArgs>(args: SelectSubset<T, CorsairEntityCreateArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorsairEntities.
     * @param {CorsairEntityCreateManyArgs} args - Arguments to create many CorsairEntities.
     * @example
     * // Create many CorsairEntities
     * const corsairEntity = await prisma.corsairEntity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorsairEntityCreateManyArgs>(args?: SelectSubset<T, CorsairEntityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorsairEntities and returns the data saved in the database.
     * @param {CorsairEntityCreateManyAndReturnArgs} args - Arguments to create many CorsairEntities.
     * @example
     * // Create many CorsairEntities
     * const corsairEntity = await prisma.corsairEntity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorsairEntities and only return the `id`
     * const corsairEntityWithIdOnly = await prisma.corsairEntity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorsairEntityCreateManyAndReturnArgs>(args?: SelectSubset<T, CorsairEntityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorsairEntity.
     * @param {CorsairEntityDeleteArgs} args - Arguments to delete one CorsairEntity.
     * @example
     * // Delete one CorsairEntity
     * const CorsairEntity = await prisma.corsairEntity.delete({
     *   where: {
     *     // ... filter to delete one CorsairEntity
     *   }
     * })
     * 
     */
    delete<T extends CorsairEntityDeleteArgs>(args: SelectSubset<T, CorsairEntityDeleteArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorsairEntity.
     * @param {CorsairEntityUpdateArgs} args - Arguments to update one CorsairEntity.
     * @example
     * // Update one CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorsairEntityUpdateArgs>(args: SelectSubset<T, CorsairEntityUpdateArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorsairEntities.
     * @param {CorsairEntityDeleteManyArgs} args - Arguments to filter CorsairEntities to delete.
     * @example
     * // Delete a few CorsairEntities
     * const { count } = await prisma.corsairEntity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorsairEntityDeleteManyArgs>(args?: SelectSubset<T, CorsairEntityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairEntities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorsairEntities
     * const corsairEntity = await prisma.corsairEntity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorsairEntityUpdateManyArgs>(args: SelectSubset<T, CorsairEntityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairEntities and returns the data updated in the database.
     * @param {CorsairEntityUpdateManyAndReturnArgs} args - Arguments to update many CorsairEntities.
     * @example
     * // Update many CorsairEntities
     * const corsairEntity = await prisma.corsairEntity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorsairEntities and only return the `id`
     * const corsairEntityWithIdOnly = await prisma.corsairEntity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorsairEntityUpdateManyAndReturnArgs>(args: SelectSubset<T, CorsairEntityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorsairEntity.
     * @param {CorsairEntityUpsertArgs} args - Arguments to update or create a CorsairEntity.
     * @example
     * // Update or create a CorsairEntity
     * const corsairEntity = await prisma.corsairEntity.upsert({
     *   create: {
     *     // ... data to create a CorsairEntity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorsairEntity we want to update
     *   }
     * })
     */
    upsert<T extends CorsairEntityUpsertArgs>(args: SelectSubset<T, CorsairEntityUpsertArgs<ExtArgs>>): Prisma__CorsairEntityClient<$Result.GetResult<Prisma.$CorsairEntityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorsairEntities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityCountArgs} args - Arguments to filter CorsairEntities to count.
     * @example
     * // Count the number of CorsairEntities
     * const count = await prisma.corsairEntity.count({
     *   where: {
     *     // ... the filter for the CorsairEntities we want to count
     *   }
     * })
    **/
    count<T extends CorsairEntityCountArgs>(
      args?: Subset<T, CorsairEntityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorsairEntityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorsairEntity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CorsairEntityAggregateArgs>(args: Subset<T, CorsairEntityAggregateArgs>): Prisma.PrismaPromise<GetCorsairEntityAggregateType<T>>

    /**
     * Group by CorsairEntity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEntityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CorsairEntityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorsairEntityGroupByArgs['orderBy'] }
        : { orderBy?: CorsairEntityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CorsairEntityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorsairEntityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorsairEntity model
   */
  readonly fields: CorsairEntityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorsairEntity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorsairEntityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends CorsairAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CorsairAccountDefaultArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CorsairEntity model
   */
  interface CorsairEntityFieldRefs {
    readonly id: FieldRef<"CorsairEntity", 'String'>
    readonly createdAt: FieldRef<"CorsairEntity", 'DateTime'>
    readonly updatedAt: FieldRef<"CorsairEntity", 'DateTime'>
    readonly accountId: FieldRef<"CorsairEntity", 'String'>
    readonly entityId: FieldRef<"CorsairEntity", 'String'>
    readonly entityType: FieldRef<"CorsairEntity", 'String'>
    readonly version: FieldRef<"CorsairEntity", 'String'>
    readonly data: FieldRef<"CorsairEntity", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * CorsairEntity findUnique
   */
  export type CorsairEntityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEntity to fetch.
     */
    where: CorsairEntityWhereUniqueInput
  }

  /**
   * CorsairEntity findUniqueOrThrow
   */
  export type CorsairEntityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEntity to fetch.
     */
    where: CorsairEntityWhereUniqueInput
  }

  /**
   * CorsairEntity findFirst
   */
  export type CorsairEntityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEntity to fetch.
     */
    where?: CorsairEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEntities to fetch.
     */
    orderBy?: CorsairEntityOrderByWithRelationInput | CorsairEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairEntities.
     */
    cursor?: CorsairEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEntities.
     */
    distinct?: CorsairEntityScalarFieldEnum | CorsairEntityScalarFieldEnum[]
  }

  /**
   * CorsairEntity findFirstOrThrow
   */
  export type CorsairEntityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEntity to fetch.
     */
    where?: CorsairEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEntities to fetch.
     */
    orderBy?: CorsairEntityOrderByWithRelationInput | CorsairEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairEntities.
     */
    cursor?: CorsairEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEntities.
     */
    distinct?: CorsairEntityScalarFieldEnum | CorsairEntityScalarFieldEnum[]
  }

  /**
   * CorsairEntity findMany
   */
  export type CorsairEntityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEntities to fetch.
     */
    where?: CorsairEntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEntities to fetch.
     */
    orderBy?: CorsairEntityOrderByWithRelationInput | CorsairEntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorsairEntities.
     */
    cursor?: CorsairEntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEntities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEntities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEntities.
     */
    distinct?: CorsairEntityScalarFieldEnum | CorsairEntityScalarFieldEnum[]
  }

  /**
   * CorsairEntity create
   */
  export type CorsairEntityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * The data needed to create a CorsairEntity.
     */
    data: XOR<CorsairEntityCreateInput, CorsairEntityUncheckedCreateInput>
  }

  /**
   * CorsairEntity createMany
   */
  export type CorsairEntityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorsairEntities.
     */
    data: CorsairEntityCreateManyInput | CorsairEntityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorsairEntity createManyAndReturn
   */
  export type CorsairEntityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * The data used to create many CorsairEntities.
     */
    data: CorsairEntityCreateManyInput | CorsairEntityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairEntity update
   */
  export type CorsairEntityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * The data needed to update a CorsairEntity.
     */
    data: XOR<CorsairEntityUpdateInput, CorsairEntityUncheckedUpdateInput>
    /**
     * Choose, which CorsairEntity to update.
     */
    where: CorsairEntityWhereUniqueInput
  }

  /**
   * CorsairEntity updateMany
   */
  export type CorsairEntityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorsairEntities.
     */
    data: XOR<CorsairEntityUpdateManyMutationInput, CorsairEntityUncheckedUpdateManyInput>
    /**
     * Filter which CorsairEntities to update
     */
    where?: CorsairEntityWhereInput
    /**
     * Limit how many CorsairEntities to update.
     */
    limit?: number
  }

  /**
   * CorsairEntity updateManyAndReturn
   */
  export type CorsairEntityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * The data used to update CorsairEntities.
     */
    data: XOR<CorsairEntityUpdateManyMutationInput, CorsairEntityUncheckedUpdateManyInput>
    /**
     * Filter which CorsairEntities to update
     */
    where?: CorsairEntityWhereInput
    /**
     * Limit how many CorsairEntities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairEntity upsert
   */
  export type CorsairEntityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * The filter to search for the CorsairEntity to update in case it exists.
     */
    where: CorsairEntityWhereUniqueInput
    /**
     * In case the CorsairEntity found by the `where` argument doesn't exist, create a new CorsairEntity with this data.
     */
    create: XOR<CorsairEntityCreateInput, CorsairEntityUncheckedCreateInput>
    /**
     * In case the CorsairEntity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorsairEntityUpdateInput, CorsairEntityUncheckedUpdateInput>
  }

  /**
   * CorsairEntity delete
   */
  export type CorsairEntityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
    /**
     * Filter which CorsairEntity to delete.
     */
    where: CorsairEntityWhereUniqueInput
  }

  /**
   * CorsairEntity deleteMany
   */
  export type CorsairEntityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairEntities to delete
     */
    where?: CorsairEntityWhereInput
    /**
     * Limit how many CorsairEntities to delete.
     */
    limit?: number
  }

  /**
   * CorsairEntity without action
   */
  export type CorsairEntityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEntity
     */
    select?: CorsairEntitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEntity
     */
    omit?: CorsairEntityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEntityInclude<ExtArgs> | null
  }


  /**
   * Model CorsairEvent
   */

  export type AggregateCorsairEvent = {
    _count: CorsairEventCountAggregateOutputType | null
    _min: CorsairEventMinAggregateOutputType | null
    _max: CorsairEventMaxAggregateOutputType | null
  }

  export type CorsairEventMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: string | null
    eventType: string | null
    status: string | null
  }

  export type CorsairEventMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: string | null
    eventType: string | null
    status: string | null
  }

  export type CorsairEventCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    accountId: number
    eventType: number
    payload: number
    status: number
    _all: number
  }


  export type CorsairEventMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    eventType?: true
    status?: true
  }

  export type CorsairEventMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    eventType?: true
    status?: true
  }

  export type CorsairEventCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    eventType?: true
    payload?: true
    status?: true
    _all?: true
  }

  export type CorsairEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairEvent to aggregate.
     */
    where?: CorsairEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEvents to fetch.
     */
    orderBy?: CorsairEventOrderByWithRelationInput | CorsairEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorsairEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorsairEvents
    **/
    _count?: true | CorsairEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorsairEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorsairEventMaxAggregateInputType
  }

  export type GetCorsairEventAggregateType<T extends CorsairEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCorsairEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorsairEvent[P]>
      : GetScalarType<T[P], AggregateCorsairEvent[P]>
  }




  export type CorsairEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorsairEventWhereInput
    orderBy?: CorsairEventOrderByWithAggregationInput | CorsairEventOrderByWithAggregationInput[]
    by: CorsairEventScalarFieldEnum[] | CorsairEventScalarFieldEnum
    having?: CorsairEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorsairEventCountAggregateInputType | true
    _min?: CorsairEventMinAggregateInputType
    _max?: CorsairEventMaxAggregateInputType
  }

  export type CorsairEventGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    accountId: string
    eventType: string
    payload: JsonValue
    status: string | null
    _count: CorsairEventCountAggregateOutputType | null
    _min: CorsairEventMinAggregateOutputType | null
    _max: CorsairEventMaxAggregateOutputType | null
  }

  type GetCorsairEventGroupByPayload<T extends CorsairEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorsairEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorsairEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorsairEventGroupByOutputType[P]>
            : GetScalarType<T[P], CorsairEventGroupByOutputType[P]>
        }
      >
    >


  export type CorsairEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEvent"]>

  export type CorsairEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEvent"]>

  export type CorsairEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corsairEvent"]>

  export type CorsairEventSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
  }

  export type CorsairEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "accountId" | "eventType" | "payload" | "status", ExtArgs["result"]["corsairEvent"]>
  export type CorsairEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }
  export type CorsairEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }
  export type CorsairEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | CorsairAccountDefaultArgs<ExtArgs>
  }

  export type $CorsairEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorsairEvent"
    objects: {
      account: Prisma.$CorsairAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      accountId: string
      eventType: string
      payload: Prisma.JsonValue
      status: string | null
    }, ExtArgs["result"]["corsairEvent"]>
    composites: {}
  }

  type CorsairEventGetPayload<S extends boolean | null | undefined | CorsairEventDefaultArgs> = $Result.GetResult<Prisma.$CorsairEventPayload, S>

  type CorsairEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorsairEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorsairEventCountAggregateInputType | true
    }

  export interface CorsairEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorsairEvent'], meta: { name: 'CorsairEvent' } }
    /**
     * Find zero or one CorsairEvent that matches the filter.
     * @param {CorsairEventFindUniqueArgs} args - Arguments to find a CorsairEvent
     * @example
     * // Get one CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorsairEventFindUniqueArgs>(args: SelectSubset<T, CorsairEventFindUniqueArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorsairEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorsairEventFindUniqueOrThrowArgs} args - Arguments to find a CorsairEvent
     * @example
     * // Get one CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorsairEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CorsairEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventFindFirstArgs} args - Arguments to find a CorsairEvent
     * @example
     * // Get one CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorsairEventFindFirstArgs>(args?: SelectSubset<T, CorsairEventFindFirstArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorsairEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventFindFirstOrThrowArgs} args - Arguments to find a CorsairEvent
     * @example
     * // Get one CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorsairEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CorsairEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorsairEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorsairEvents
     * const corsairEvents = await prisma.corsairEvent.findMany()
     * 
     * // Get first 10 CorsairEvents
     * const corsairEvents = await prisma.corsairEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corsairEventWithIdOnly = await prisma.corsairEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorsairEventFindManyArgs>(args?: SelectSubset<T, CorsairEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorsairEvent.
     * @param {CorsairEventCreateArgs} args - Arguments to create a CorsairEvent.
     * @example
     * // Create one CorsairEvent
     * const CorsairEvent = await prisma.corsairEvent.create({
     *   data: {
     *     // ... data to create a CorsairEvent
     *   }
     * })
     * 
     */
    create<T extends CorsairEventCreateArgs>(args: SelectSubset<T, CorsairEventCreateArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorsairEvents.
     * @param {CorsairEventCreateManyArgs} args - Arguments to create many CorsairEvents.
     * @example
     * // Create many CorsairEvents
     * const corsairEvent = await prisma.corsairEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorsairEventCreateManyArgs>(args?: SelectSubset<T, CorsairEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorsairEvents and returns the data saved in the database.
     * @param {CorsairEventCreateManyAndReturnArgs} args - Arguments to create many CorsairEvents.
     * @example
     * // Create many CorsairEvents
     * const corsairEvent = await prisma.corsairEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorsairEvents and only return the `id`
     * const corsairEventWithIdOnly = await prisma.corsairEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorsairEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CorsairEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorsairEvent.
     * @param {CorsairEventDeleteArgs} args - Arguments to delete one CorsairEvent.
     * @example
     * // Delete one CorsairEvent
     * const CorsairEvent = await prisma.corsairEvent.delete({
     *   where: {
     *     // ... filter to delete one CorsairEvent
     *   }
     * })
     * 
     */
    delete<T extends CorsairEventDeleteArgs>(args: SelectSubset<T, CorsairEventDeleteArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorsairEvent.
     * @param {CorsairEventUpdateArgs} args - Arguments to update one CorsairEvent.
     * @example
     * // Update one CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorsairEventUpdateArgs>(args: SelectSubset<T, CorsairEventUpdateArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorsairEvents.
     * @param {CorsairEventDeleteManyArgs} args - Arguments to filter CorsairEvents to delete.
     * @example
     * // Delete a few CorsairEvents
     * const { count } = await prisma.corsairEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorsairEventDeleteManyArgs>(args?: SelectSubset<T, CorsairEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorsairEvents
     * const corsairEvent = await prisma.corsairEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorsairEventUpdateManyArgs>(args: SelectSubset<T, CorsairEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorsairEvents and returns the data updated in the database.
     * @param {CorsairEventUpdateManyAndReturnArgs} args - Arguments to update many CorsairEvents.
     * @example
     * // Update many CorsairEvents
     * const corsairEvent = await prisma.corsairEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorsairEvents and only return the `id`
     * const corsairEventWithIdOnly = await prisma.corsairEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorsairEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CorsairEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorsairEvent.
     * @param {CorsairEventUpsertArgs} args - Arguments to update or create a CorsairEvent.
     * @example
     * // Update or create a CorsairEvent
     * const corsairEvent = await prisma.corsairEvent.upsert({
     *   create: {
     *     // ... data to create a CorsairEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorsairEvent we want to update
     *   }
     * })
     */
    upsert<T extends CorsairEventUpsertArgs>(args: SelectSubset<T, CorsairEventUpsertArgs<ExtArgs>>): Prisma__CorsairEventClient<$Result.GetResult<Prisma.$CorsairEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorsairEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventCountArgs} args - Arguments to filter CorsairEvents to count.
     * @example
     * // Count the number of CorsairEvents
     * const count = await prisma.corsairEvent.count({
     *   where: {
     *     // ... the filter for the CorsairEvents we want to count
     *   }
     * })
    **/
    count<T extends CorsairEventCountArgs>(
      args?: Subset<T, CorsairEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorsairEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorsairEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CorsairEventAggregateArgs>(args: Subset<T, CorsairEventAggregateArgs>): Prisma.PrismaPromise<GetCorsairEventAggregateType<T>>

    /**
     * Group by CorsairEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorsairEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CorsairEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorsairEventGroupByArgs['orderBy'] }
        : { orderBy?: CorsairEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CorsairEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorsairEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorsairEvent model
   */
  readonly fields: CorsairEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorsairEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorsairEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends CorsairAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CorsairAccountDefaultArgs<ExtArgs>>): Prisma__CorsairAccountClient<$Result.GetResult<Prisma.$CorsairAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CorsairEvent model
   */
  interface CorsairEventFieldRefs {
    readonly id: FieldRef<"CorsairEvent", 'String'>
    readonly createdAt: FieldRef<"CorsairEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CorsairEvent", 'DateTime'>
    readonly accountId: FieldRef<"CorsairEvent", 'String'>
    readonly eventType: FieldRef<"CorsairEvent", 'String'>
    readonly payload: FieldRef<"CorsairEvent", 'Json'>
    readonly status: FieldRef<"CorsairEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CorsairEvent findUnique
   */
  export type CorsairEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEvent to fetch.
     */
    where: CorsairEventWhereUniqueInput
  }

  /**
   * CorsairEvent findUniqueOrThrow
   */
  export type CorsairEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEvent to fetch.
     */
    where: CorsairEventWhereUniqueInput
  }

  /**
   * CorsairEvent findFirst
   */
  export type CorsairEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEvent to fetch.
     */
    where?: CorsairEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEvents to fetch.
     */
    orderBy?: CorsairEventOrderByWithRelationInput | CorsairEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairEvents.
     */
    cursor?: CorsairEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEvents.
     */
    distinct?: CorsairEventScalarFieldEnum | CorsairEventScalarFieldEnum[]
  }

  /**
   * CorsairEvent findFirstOrThrow
   */
  export type CorsairEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEvent to fetch.
     */
    where?: CorsairEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEvents to fetch.
     */
    orderBy?: CorsairEventOrderByWithRelationInput | CorsairEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorsairEvents.
     */
    cursor?: CorsairEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEvents.
     */
    distinct?: CorsairEventScalarFieldEnum | CorsairEventScalarFieldEnum[]
  }

  /**
   * CorsairEvent findMany
   */
  export type CorsairEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter, which CorsairEvents to fetch.
     */
    where?: CorsairEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorsairEvents to fetch.
     */
    orderBy?: CorsairEventOrderByWithRelationInput | CorsairEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorsairEvents.
     */
    cursor?: CorsairEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorsairEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorsairEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorsairEvents.
     */
    distinct?: CorsairEventScalarFieldEnum | CorsairEventScalarFieldEnum[]
  }

  /**
   * CorsairEvent create
   */
  export type CorsairEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CorsairEvent.
     */
    data: XOR<CorsairEventCreateInput, CorsairEventUncheckedCreateInput>
  }

  /**
   * CorsairEvent createMany
   */
  export type CorsairEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorsairEvents.
     */
    data: CorsairEventCreateManyInput | CorsairEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorsairEvent createManyAndReturn
   */
  export type CorsairEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * The data used to create many CorsairEvents.
     */
    data: CorsairEventCreateManyInput | CorsairEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairEvent update
   */
  export type CorsairEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CorsairEvent.
     */
    data: XOR<CorsairEventUpdateInput, CorsairEventUncheckedUpdateInput>
    /**
     * Choose, which CorsairEvent to update.
     */
    where: CorsairEventWhereUniqueInput
  }

  /**
   * CorsairEvent updateMany
   */
  export type CorsairEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorsairEvents.
     */
    data: XOR<CorsairEventUpdateManyMutationInput, CorsairEventUncheckedUpdateManyInput>
    /**
     * Filter which CorsairEvents to update
     */
    where?: CorsairEventWhereInput
    /**
     * Limit how many CorsairEvents to update.
     */
    limit?: number
  }

  /**
   * CorsairEvent updateManyAndReturn
   */
  export type CorsairEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * The data used to update CorsairEvents.
     */
    data: XOR<CorsairEventUpdateManyMutationInput, CorsairEventUncheckedUpdateManyInput>
    /**
     * Filter which CorsairEvents to update
     */
    where?: CorsairEventWhereInput
    /**
     * Limit how many CorsairEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorsairEvent upsert
   */
  export type CorsairEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CorsairEvent to update in case it exists.
     */
    where: CorsairEventWhereUniqueInput
    /**
     * In case the CorsairEvent found by the `where` argument doesn't exist, create a new CorsairEvent with this data.
     */
    create: XOR<CorsairEventCreateInput, CorsairEventUncheckedCreateInput>
    /**
     * In case the CorsairEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorsairEventUpdateInput, CorsairEventUncheckedUpdateInput>
  }

  /**
   * CorsairEvent delete
   */
  export type CorsairEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
    /**
     * Filter which CorsairEvent to delete.
     */
    where: CorsairEventWhereUniqueInput
  }

  /**
   * CorsairEvent deleteMany
   */
  export type CorsairEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorsairEvents to delete
     */
    where?: CorsairEventWhereInput
    /**
     * Limit how many CorsairEvents to delete.
     */
    limit?: number
  }

  /**
   * CorsairEvent without action
   */
  export type CorsairEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorsairEvent
     */
    select?: CorsairEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorsairEvent
     */
    omit?: CorsairEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorsairEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmailScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    userId: 'userId',
    from: 'from',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    snippet: 'snippet',
    body: 'body',
    bodyHtml: 'bodyHtml',
    labelIds: 'labelIds',
    isRead: 'isRead',
    isStarred: 'isStarred',
    priority: 'priority',
    confidence: 'confidence',
    reasoning: 'reasoning',
    receivedAt: 'receivedAt',
    attachments: 'attachments',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailScalarFieldEnum = (typeof EmailScalarFieldEnum)[keyof typeof EmailScalarFieldEnum]


  export const EmailDraftScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
    bodyHtml: 'bodyHtml',
    replyToEmailId: 'replyToEmailId',
    corsairDraftId: 'corsairDraftId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailDraftScalarFieldEnum = (typeof EmailDraftScalarFieldEnum)[keyof typeof EmailDraftScalarFieldEnum]


  export const CalendarEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    calendarId: 'calendarId',
    summary: 'summary',
    description: 'description',
    location: 'location',
    start: 'start',
    end: 'end',
    status: 'status',
    visibility: 'visibility',
    attendees: 'attendees',
    recurrence: 'recurrence',
    recurringEventId: 'recurringEventId',
    htmlLink: 'htmlLink',
    hangoutLink: 'hangoutLink',
    colorId: 'colorId',
    reminders: 'reminders',
    creator: 'creator',
    organizer: 'organizer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CalendarEventScalarFieldEnum = (typeof CalendarEventScalarFieldEnum)[keyof typeof CalendarEventScalarFieldEnum]


  export const AIConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIConversationScalarFieldEnum = (typeof AIConversationScalarFieldEnum)[keyof typeof AIConversationScalarFieldEnum]


  export const AIMessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    toolCalls: 'toolCalls',
    toolResults: 'toolResults',
    createdAt: 'createdAt'
  };

  export type AIMessageScalarFieldEnum = (typeof AIMessageScalarFieldEnum)[keyof typeof AIMessageScalarFieldEnum]


  export const WebhookEventScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    eventType: 'eventType',
    payload: 'payload',
    status: 'status',
    error: 'error'
  };

  export type WebhookEventScalarFieldEnum = (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum]


  export const CorsairIntegrationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    config: 'config',
    dek: 'dek'
  };

  export type CorsairIntegrationScalarFieldEnum = (typeof CorsairIntegrationScalarFieldEnum)[keyof typeof CorsairIntegrationScalarFieldEnum]


  export const CorsairAccountScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId',
    integrationId: 'integrationId',
    config: 'config',
    dek: 'dek'
  };

  export type CorsairAccountScalarFieldEnum = (typeof CorsairAccountScalarFieldEnum)[keyof typeof CorsairAccountScalarFieldEnum]


  export const CorsairEntityScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accountId: 'accountId',
    entityId: 'entityId',
    entityType: 'entityType',
    version: 'version',
    data: 'data'
  };

  export type CorsairEntityScalarFieldEnum = (typeof CorsairEntityScalarFieldEnum)[keyof typeof CorsairEntityScalarFieldEnum]


  export const CorsairEventScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accountId: 'accountId',
    eventType: 'eventType',
    payload: 'payload',
    status: 'status'
  };

  export type CorsairEventScalarFieldEnum = (typeof CorsairEventScalarFieldEnum)[keyof typeof CorsairEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'EmailPriority'
   */
  export type EnumEmailPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailPriority'>
    


  /**
   * Reference to a field of type 'EmailPriority[]'
   */
  export type ListEnumEmailPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailPriority[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emails?: EmailListRelationFilter
    emailDrafts?: EmailDraftListRelationFilter
    calendarEvents?: CalendarEventListRelationFilter
    aiConversations?: AIConversationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emails?: EmailOrderByRelationAggregateInput
    emailDrafts?: EmailDraftOrderByRelationAggregateInput
    calendarEvents?: CalendarEventOrderByRelationAggregateInput
    aiConversations?: AIConversationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emails?: EmailListRelationFilter
    emailDrafts?: EmailDraftListRelationFilter
    calendarEvents?: CalendarEventListRelationFilter
    aiConversations?: AIConversationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmailWhereInput = {
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    id?: StringFilter<"Email"> | string
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    subject?: StringFilter<"Email"> | string
    snippet?: StringFilter<"Email"> | string
    body?: StringFilter<"Email"> | string
    bodyHtml?: StringNullableFilter<"Email"> | string | null
    labelIds?: StringNullableListFilter<"Email">
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    priority?: EnumEmailPriorityFilter<"Email"> | $Enums.EmailPriority
    confidence?: FloatNullableFilter<"Email"> | number | null
    reasoning?: StringNullableFilter<"Email"> | string | null
    receivedAt?: DateTimeFilter<"Email"> | Date | string
    attachments?: JsonFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrderInput | SortOrder
    labelIds?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    priority?: SortOrder
    confidence?: SortOrderInput | SortOrder
    reasoning?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    attachments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    subject?: StringFilter<"Email"> | string
    snippet?: StringFilter<"Email"> | string
    body?: StringFilter<"Email"> | string
    bodyHtml?: StringNullableFilter<"Email"> | string | null
    labelIds?: StringNullableListFilter<"Email">
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    priority?: EnumEmailPriorityFilter<"Email"> | $Enums.EmailPriority
    confidence?: FloatNullableFilter<"Email"> | number | null
    reasoning?: StringNullableFilter<"Email"> | string | null
    receivedAt?: DateTimeFilter<"Email"> | Date | string
    attachments?: JsonFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EmailOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrderInput | SortOrder
    labelIds?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    priority?: SortOrder
    confidence?: SortOrderInput | SortOrder
    reasoning?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    attachments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailCountOrderByAggregateInput
    _avg?: EmailAvgOrderByAggregateInput
    _max?: EmailMaxOrderByAggregateInput
    _min?: EmailMinOrderByAggregateInput
    _sum?: EmailSumOrderByAggregateInput
  }

  export type EmailScalarWhereWithAggregatesInput = {
    AND?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    OR?: EmailScalarWhereWithAggregatesInput[]
    NOT?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Email"> | string
    threadId?: StringWithAggregatesFilter<"Email"> | string
    userId?: StringWithAggregatesFilter<"Email"> | string
    from?: JsonWithAggregatesFilter<"Email">
    to?: JsonWithAggregatesFilter<"Email">
    cc?: JsonNullableWithAggregatesFilter<"Email">
    bcc?: JsonNullableWithAggregatesFilter<"Email">
    subject?: StringWithAggregatesFilter<"Email"> | string
    snippet?: StringWithAggregatesFilter<"Email"> | string
    body?: StringWithAggregatesFilter<"Email"> | string
    bodyHtml?: StringNullableWithAggregatesFilter<"Email"> | string | null
    labelIds?: StringNullableListFilter<"Email">
    isRead?: BoolWithAggregatesFilter<"Email"> | boolean
    isStarred?: BoolWithAggregatesFilter<"Email"> | boolean
    priority?: EnumEmailPriorityWithAggregatesFilter<"Email"> | $Enums.EmailPriority
    confidence?: FloatNullableWithAggregatesFilter<"Email"> | number | null
    reasoning?: StringNullableWithAggregatesFilter<"Email"> | string | null
    receivedAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    attachments?: JsonWithAggregatesFilter<"Email">
    createdAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
  }

  export type EmailDraftWhereInput = {
    AND?: EmailDraftWhereInput | EmailDraftWhereInput[]
    OR?: EmailDraftWhereInput[]
    NOT?: EmailDraftWhereInput | EmailDraftWhereInput[]
    id?: StringFilter<"EmailDraft"> | string
    userId?: StringFilter<"EmailDraft"> | string
    to?: JsonFilter<"EmailDraft">
    cc?: JsonNullableFilter<"EmailDraft">
    bcc?: JsonNullableFilter<"EmailDraft">
    subject?: StringFilter<"EmailDraft"> | string
    body?: StringFilter<"EmailDraft"> | string
    bodyHtml?: StringNullableFilter<"EmailDraft"> | string | null
    replyToEmailId?: StringNullableFilter<"EmailDraft"> | string | null
    corsairDraftId?: StringNullableFilter<"EmailDraft"> | string | null
    createdAt?: DateTimeFilter<"EmailDraft"> | Date | string
    updatedAt?: DateTimeFilter<"EmailDraft"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailDraftOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrderInput | SortOrder
    replyToEmailId?: SortOrderInput | SortOrder
    corsairDraftId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailDraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailDraftWhereInput | EmailDraftWhereInput[]
    OR?: EmailDraftWhereInput[]
    NOT?: EmailDraftWhereInput | EmailDraftWhereInput[]
    userId?: StringFilter<"EmailDraft"> | string
    to?: JsonFilter<"EmailDraft">
    cc?: JsonNullableFilter<"EmailDraft">
    bcc?: JsonNullableFilter<"EmailDraft">
    subject?: StringFilter<"EmailDraft"> | string
    body?: StringFilter<"EmailDraft"> | string
    bodyHtml?: StringNullableFilter<"EmailDraft"> | string | null
    replyToEmailId?: StringNullableFilter<"EmailDraft"> | string | null
    corsairDraftId?: StringNullableFilter<"EmailDraft"> | string | null
    createdAt?: DateTimeFilter<"EmailDraft"> | Date | string
    updatedAt?: DateTimeFilter<"EmailDraft"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EmailDraftOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrderInput | SortOrder
    replyToEmailId?: SortOrderInput | SortOrder
    corsairDraftId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailDraftCountOrderByAggregateInput
    _max?: EmailDraftMaxOrderByAggregateInput
    _min?: EmailDraftMinOrderByAggregateInput
  }

  export type EmailDraftScalarWhereWithAggregatesInput = {
    AND?: EmailDraftScalarWhereWithAggregatesInput | EmailDraftScalarWhereWithAggregatesInput[]
    OR?: EmailDraftScalarWhereWithAggregatesInput[]
    NOT?: EmailDraftScalarWhereWithAggregatesInput | EmailDraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailDraft"> | string
    userId?: StringWithAggregatesFilter<"EmailDraft"> | string
    to?: JsonWithAggregatesFilter<"EmailDraft">
    cc?: JsonNullableWithAggregatesFilter<"EmailDraft">
    bcc?: JsonNullableWithAggregatesFilter<"EmailDraft">
    subject?: StringWithAggregatesFilter<"EmailDraft"> | string
    body?: StringWithAggregatesFilter<"EmailDraft"> | string
    bodyHtml?: StringNullableWithAggregatesFilter<"EmailDraft"> | string | null
    replyToEmailId?: StringNullableWithAggregatesFilter<"EmailDraft"> | string | null
    corsairDraftId?: StringNullableWithAggregatesFilter<"EmailDraft"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmailDraft"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailDraft"> | Date | string
  }

  export type CalendarEventWhereInput = {
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    id?: StringFilter<"CalendarEvent"> | string
    userId?: StringFilter<"CalendarEvent"> | string
    calendarId?: StringFilter<"CalendarEvent"> | string
    summary?: StringFilter<"CalendarEvent"> | string
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    location?: StringNullableFilter<"CalendarEvent"> | string | null
    start?: JsonFilter<"CalendarEvent">
    end?: JsonFilter<"CalendarEvent">
    status?: StringFilter<"CalendarEvent"> | string
    visibility?: StringNullableFilter<"CalendarEvent"> | string | null
    attendees?: JsonFilter<"CalendarEvent">
    recurrence?: StringNullableListFilter<"CalendarEvent">
    recurringEventId?: StringNullableFilter<"CalendarEvent"> | string | null
    htmlLink?: StringNullableFilter<"CalendarEvent"> | string | null
    hangoutLink?: StringNullableFilter<"CalendarEvent"> | string | null
    colorId?: StringNullableFilter<"CalendarEvent"> | string | null
    reminders?: JsonNullableFilter<"CalendarEvent">
    creator?: JsonNullableFilter<"CalendarEvent">
    organizer?: JsonNullableFilter<"CalendarEvent">
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CalendarEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    calendarId?: SortOrder
    summary?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
    visibility?: SortOrderInput | SortOrder
    attendees?: SortOrder
    recurrence?: SortOrder
    recurringEventId?: SortOrderInput | SortOrder
    htmlLink?: SortOrderInput | SortOrder
    hangoutLink?: SortOrderInput | SortOrder
    colorId?: SortOrderInput | SortOrder
    reminders?: SortOrderInput | SortOrder
    creator?: SortOrderInput | SortOrder
    organizer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CalendarEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    userId?: StringFilter<"CalendarEvent"> | string
    calendarId?: StringFilter<"CalendarEvent"> | string
    summary?: StringFilter<"CalendarEvent"> | string
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    location?: StringNullableFilter<"CalendarEvent"> | string | null
    start?: JsonFilter<"CalendarEvent">
    end?: JsonFilter<"CalendarEvent">
    status?: StringFilter<"CalendarEvent"> | string
    visibility?: StringNullableFilter<"CalendarEvent"> | string | null
    attendees?: JsonFilter<"CalendarEvent">
    recurrence?: StringNullableListFilter<"CalendarEvent">
    recurringEventId?: StringNullableFilter<"CalendarEvent"> | string | null
    htmlLink?: StringNullableFilter<"CalendarEvent"> | string | null
    hangoutLink?: StringNullableFilter<"CalendarEvent"> | string | null
    colorId?: StringNullableFilter<"CalendarEvent"> | string | null
    reminders?: JsonNullableFilter<"CalendarEvent">
    creator?: JsonNullableFilter<"CalendarEvent">
    organizer?: JsonNullableFilter<"CalendarEvent">
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CalendarEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    calendarId?: SortOrder
    summary?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
    visibility?: SortOrderInput | SortOrder
    attendees?: SortOrder
    recurrence?: SortOrder
    recurringEventId?: SortOrderInput | SortOrder
    htmlLink?: SortOrderInput | SortOrder
    hangoutLink?: SortOrderInput | SortOrder
    colorId?: SortOrderInput | SortOrder
    reminders?: SortOrderInput | SortOrder
    creator?: SortOrderInput | SortOrder
    organizer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CalendarEventCountOrderByAggregateInput
    _max?: CalendarEventMaxOrderByAggregateInput
    _min?: CalendarEventMinOrderByAggregateInput
  }

  export type CalendarEventScalarWhereWithAggregatesInput = {
    AND?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    OR?: CalendarEventScalarWhereWithAggregatesInput[]
    NOT?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CalendarEvent"> | string
    userId?: StringWithAggregatesFilter<"CalendarEvent"> | string
    calendarId?: StringWithAggregatesFilter<"CalendarEvent"> | string
    summary?: StringWithAggregatesFilter<"CalendarEvent"> | string
    description?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    location?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    start?: JsonWithAggregatesFilter<"CalendarEvent">
    end?: JsonWithAggregatesFilter<"CalendarEvent">
    status?: StringWithAggregatesFilter<"CalendarEvent"> | string
    visibility?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    attendees?: JsonWithAggregatesFilter<"CalendarEvent">
    recurrence?: StringNullableListFilter<"CalendarEvent">
    recurringEventId?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    htmlLink?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    hangoutLink?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    colorId?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    reminders?: JsonNullableWithAggregatesFilter<"CalendarEvent">
    creator?: JsonNullableWithAggregatesFilter<"CalendarEvent">
    organizer?: JsonNullableWithAggregatesFilter<"CalendarEvent">
    createdAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
  }

  export type AIConversationWhereInput = {
    AND?: AIConversationWhereInput | AIConversationWhereInput[]
    OR?: AIConversationWhereInput[]
    NOT?: AIConversationWhereInput | AIConversationWhereInput[]
    id?: StringFilter<"AIConversation"> | string
    userId?: StringFilter<"AIConversation"> | string
    title?: StringNullableFilter<"AIConversation"> | string | null
    createdAt?: DateTimeFilter<"AIConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AIConversation"> | Date | string
    messages?: AIMessageListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AIConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: AIMessageOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type AIConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIConversationWhereInput | AIConversationWhereInput[]
    OR?: AIConversationWhereInput[]
    NOT?: AIConversationWhereInput | AIConversationWhereInput[]
    userId?: StringFilter<"AIConversation"> | string
    title?: StringNullableFilter<"AIConversation"> | string | null
    createdAt?: DateTimeFilter<"AIConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AIConversation"> | Date | string
    messages?: AIMessageListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AIConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIConversationCountOrderByAggregateInput
    _max?: AIConversationMaxOrderByAggregateInput
    _min?: AIConversationMinOrderByAggregateInput
  }

  export type AIConversationScalarWhereWithAggregatesInput = {
    AND?: AIConversationScalarWhereWithAggregatesInput | AIConversationScalarWhereWithAggregatesInput[]
    OR?: AIConversationScalarWhereWithAggregatesInput[]
    NOT?: AIConversationScalarWhereWithAggregatesInput | AIConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIConversation"> | string
    userId?: StringWithAggregatesFilter<"AIConversation"> | string
    title?: StringNullableWithAggregatesFilter<"AIConversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIConversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIConversation"> | Date | string
  }

  export type AIMessageWhereInput = {
    AND?: AIMessageWhereInput | AIMessageWhereInput[]
    OR?: AIMessageWhereInput[]
    NOT?: AIMessageWhereInput | AIMessageWhereInput[]
    id?: StringFilter<"AIMessage"> | string
    conversationId?: StringFilter<"AIMessage"> | string
    role?: StringFilter<"AIMessage"> | string
    content?: StringFilter<"AIMessage"> | string
    toolCalls?: JsonNullableFilter<"AIMessage">
    toolResults?: JsonNullableFilter<"AIMessage">
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
    conversation?: XOR<AIConversationScalarRelationFilter, AIConversationWhereInput>
  }

  export type AIMessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCalls?: SortOrderInput | SortOrder
    toolResults?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversation?: AIConversationOrderByWithRelationInput
  }

  export type AIMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIMessageWhereInput | AIMessageWhereInput[]
    OR?: AIMessageWhereInput[]
    NOT?: AIMessageWhereInput | AIMessageWhereInput[]
    conversationId?: StringFilter<"AIMessage"> | string
    role?: StringFilter<"AIMessage"> | string
    content?: StringFilter<"AIMessage"> | string
    toolCalls?: JsonNullableFilter<"AIMessage">
    toolResults?: JsonNullableFilter<"AIMessage">
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
    conversation?: XOR<AIConversationScalarRelationFilter, AIConversationWhereInput>
  }, "id">

  export type AIMessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCalls?: SortOrderInput | SortOrder
    toolResults?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AIMessageCountOrderByAggregateInput
    _max?: AIMessageMaxOrderByAggregateInput
    _min?: AIMessageMinOrderByAggregateInput
  }

  export type AIMessageScalarWhereWithAggregatesInput = {
    AND?: AIMessageScalarWhereWithAggregatesInput | AIMessageScalarWhereWithAggregatesInput[]
    OR?: AIMessageScalarWhereWithAggregatesInput[]
    NOT?: AIMessageScalarWhereWithAggregatesInput | AIMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIMessage"> | string
    conversationId?: StringWithAggregatesFilter<"AIMessage"> | string
    role?: StringWithAggregatesFilter<"AIMessage"> | string
    content?: StringWithAggregatesFilter<"AIMessage"> | string
    toolCalls?: JsonNullableWithAggregatesFilter<"AIMessage">
    toolResults?: JsonNullableWithAggregatesFilter<"AIMessage">
    createdAt?: DateTimeWithAggregatesFilter<"AIMessage"> | Date | string
  }

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    createdAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    eventType?: StringFilter<"WebhookEvent"> | string
    payload?: JsonFilter<"WebhookEvent">
    status?: StringFilter<"WebhookEvent"> | string
    error?: StringNullableFilter<"WebhookEvent"> | string | null
  }

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
  }

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    createdAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    eventType?: StringFilter<"WebhookEvent"> | string
    payload?: JsonFilter<"WebhookEvent">
    status?: StringFilter<"WebhookEvent"> | string
    error?: StringNullableFilter<"WebhookEvent"> | string | null
  }, "id">

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    _count?: WebhookEventCountOrderByAggregateInput
    _max?: WebhookEventMaxOrderByAggregateInput
    _min?: WebhookEventMinOrderByAggregateInput
  }

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    OR?: WebhookEventScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
    eventType?: StringWithAggregatesFilter<"WebhookEvent"> | string
    payload?: JsonWithAggregatesFilter<"WebhookEvent">
    status?: StringWithAggregatesFilter<"WebhookEvent"> | string
    error?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
  }

  export type CorsairIntegrationWhereInput = {
    AND?: CorsairIntegrationWhereInput | CorsairIntegrationWhereInput[]
    OR?: CorsairIntegrationWhereInput[]
    NOT?: CorsairIntegrationWhereInput | CorsairIntegrationWhereInput[]
    id?: StringFilter<"CorsairIntegration"> | string
    createdAt?: DateTimeFilter<"CorsairIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairIntegration"> | Date | string
    name?: StringFilter<"CorsairIntegration"> | string
    config?: JsonFilter<"CorsairIntegration">
    dek?: StringNullableFilter<"CorsairIntegration"> | string | null
    accounts?: CorsairAccountListRelationFilter
  }

  export type CorsairIntegrationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    config?: SortOrder
    dek?: SortOrderInput | SortOrder
    accounts?: CorsairAccountOrderByRelationAggregateInput
  }

  export type CorsairIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CorsairIntegrationWhereInput | CorsairIntegrationWhereInput[]
    OR?: CorsairIntegrationWhereInput[]
    NOT?: CorsairIntegrationWhereInput | CorsairIntegrationWhereInput[]
    createdAt?: DateTimeFilter<"CorsairIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairIntegration"> | Date | string
    name?: StringFilter<"CorsairIntegration"> | string
    config?: JsonFilter<"CorsairIntegration">
    dek?: StringNullableFilter<"CorsairIntegration"> | string | null
    accounts?: CorsairAccountListRelationFilter
  }, "id">

  export type CorsairIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    config?: SortOrder
    dek?: SortOrderInput | SortOrder
    _count?: CorsairIntegrationCountOrderByAggregateInput
    _max?: CorsairIntegrationMaxOrderByAggregateInput
    _min?: CorsairIntegrationMinOrderByAggregateInput
  }

  export type CorsairIntegrationScalarWhereWithAggregatesInput = {
    AND?: CorsairIntegrationScalarWhereWithAggregatesInput | CorsairIntegrationScalarWhereWithAggregatesInput[]
    OR?: CorsairIntegrationScalarWhereWithAggregatesInput[]
    NOT?: CorsairIntegrationScalarWhereWithAggregatesInput | CorsairIntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CorsairIntegration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CorsairIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorsairIntegration"> | Date | string
    name?: StringWithAggregatesFilter<"CorsairIntegration"> | string
    config?: JsonWithAggregatesFilter<"CorsairIntegration">
    dek?: StringNullableWithAggregatesFilter<"CorsairIntegration"> | string | null
  }

  export type CorsairAccountWhereInput = {
    AND?: CorsairAccountWhereInput | CorsairAccountWhereInput[]
    OR?: CorsairAccountWhereInput[]
    NOT?: CorsairAccountWhereInput | CorsairAccountWhereInput[]
    id?: StringFilter<"CorsairAccount"> | string
    createdAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    tenantId?: StringFilter<"CorsairAccount"> | string
    integrationId?: StringFilter<"CorsairAccount"> | string
    config?: JsonFilter<"CorsairAccount">
    dek?: StringNullableFilter<"CorsairAccount"> | string | null
    integration?: XOR<CorsairIntegrationScalarRelationFilter, CorsairIntegrationWhereInput>
    entities?: CorsairEntityListRelationFilter
    events?: CorsairEventListRelationFilter
  }

  export type CorsairAccountOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    config?: SortOrder
    dek?: SortOrderInput | SortOrder
    integration?: CorsairIntegrationOrderByWithRelationInput
    entities?: CorsairEntityOrderByRelationAggregateInput
    events?: CorsairEventOrderByRelationAggregateInput
  }

  export type CorsairAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CorsairAccountWhereInput | CorsairAccountWhereInput[]
    OR?: CorsairAccountWhereInput[]
    NOT?: CorsairAccountWhereInput | CorsairAccountWhereInput[]
    createdAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    tenantId?: StringFilter<"CorsairAccount"> | string
    integrationId?: StringFilter<"CorsairAccount"> | string
    config?: JsonFilter<"CorsairAccount">
    dek?: StringNullableFilter<"CorsairAccount"> | string | null
    integration?: XOR<CorsairIntegrationScalarRelationFilter, CorsairIntegrationWhereInput>
    entities?: CorsairEntityListRelationFilter
    events?: CorsairEventListRelationFilter
  }, "id">

  export type CorsairAccountOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    config?: SortOrder
    dek?: SortOrderInput | SortOrder
    _count?: CorsairAccountCountOrderByAggregateInput
    _max?: CorsairAccountMaxOrderByAggregateInput
    _min?: CorsairAccountMinOrderByAggregateInput
  }

  export type CorsairAccountScalarWhereWithAggregatesInput = {
    AND?: CorsairAccountScalarWhereWithAggregatesInput | CorsairAccountScalarWhereWithAggregatesInput[]
    OR?: CorsairAccountScalarWhereWithAggregatesInput[]
    NOT?: CorsairAccountScalarWhereWithAggregatesInput | CorsairAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CorsairAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CorsairAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorsairAccount"> | Date | string
    tenantId?: StringWithAggregatesFilter<"CorsairAccount"> | string
    integrationId?: StringWithAggregatesFilter<"CorsairAccount"> | string
    config?: JsonWithAggregatesFilter<"CorsairAccount">
    dek?: StringNullableWithAggregatesFilter<"CorsairAccount"> | string | null
  }

  export type CorsairEntityWhereInput = {
    AND?: CorsairEntityWhereInput | CorsairEntityWhereInput[]
    OR?: CorsairEntityWhereInput[]
    NOT?: CorsairEntityWhereInput | CorsairEntityWhereInput[]
    id?: StringFilter<"CorsairEntity"> | string
    createdAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    accountId?: StringFilter<"CorsairEntity"> | string
    entityId?: StringFilter<"CorsairEntity"> | string
    entityType?: StringFilter<"CorsairEntity"> | string
    version?: StringFilter<"CorsairEntity"> | string
    data?: JsonFilter<"CorsairEntity">
    account?: XOR<CorsairAccountScalarRelationFilter, CorsairAccountWhereInput>
  }

  export type CorsairEntityOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    entityId?: SortOrder
    entityType?: SortOrder
    version?: SortOrder
    data?: SortOrder
    account?: CorsairAccountOrderByWithRelationInput
  }

  export type CorsairEntityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CorsairEntityWhereInput | CorsairEntityWhereInput[]
    OR?: CorsairEntityWhereInput[]
    NOT?: CorsairEntityWhereInput | CorsairEntityWhereInput[]
    createdAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    accountId?: StringFilter<"CorsairEntity"> | string
    entityId?: StringFilter<"CorsairEntity"> | string
    entityType?: StringFilter<"CorsairEntity"> | string
    version?: StringFilter<"CorsairEntity"> | string
    data?: JsonFilter<"CorsairEntity">
    account?: XOR<CorsairAccountScalarRelationFilter, CorsairAccountWhereInput>
  }, "id">

  export type CorsairEntityOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    entityId?: SortOrder
    entityType?: SortOrder
    version?: SortOrder
    data?: SortOrder
    _count?: CorsairEntityCountOrderByAggregateInput
    _max?: CorsairEntityMaxOrderByAggregateInput
    _min?: CorsairEntityMinOrderByAggregateInput
  }

  export type CorsairEntityScalarWhereWithAggregatesInput = {
    AND?: CorsairEntityScalarWhereWithAggregatesInput | CorsairEntityScalarWhereWithAggregatesInput[]
    OR?: CorsairEntityScalarWhereWithAggregatesInput[]
    NOT?: CorsairEntityScalarWhereWithAggregatesInput | CorsairEntityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CorsairEntity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CorsairEntity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorsairEntity"> | Date | string
    accountId?: StringWithAggregatesFilter<"CorsairEntity"> | string
    entityId?: StringWithAggregatesFilter<"CorsairEntity"> | string
    entityType?: StringWithAggregatesFilter<"CorsairEntity"> | string
    version?: StringWithAggregatesFilter<"CorsairEntity"> | string
    data?: JsonWithAggregatesFilter<"CorsairEntity">
  }

  export type CorsairEventWhereInput = {
    AND?: CorsairEventWhereInput | CorsairEventWhereInput[]
    OR?: CorsairEventWhereInput[]
    NOT?: CorsairEventWhereInput | CorsairEventWhereInput[]
    id?: StringFilter<"CorsairEvent"> | string
    createdAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    accountId?: StringFilter<"CorsairEvent"> | string
    eventType?: StringFilter<"CorsairEvent"> | string
    payload?: JsonFilter<"CorsairEvent">
    status?: StringNullableFilter<"CorsairEvent"> | string | null
    account?: XOR<CorsairAccountScalarRelationFilter, CorsairAccountWhereInput>
  }

  export type CorsairEventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrderInput | SortOrder
    account?: CorsairAccountOrderByWithRelationInput
  }

  export type CorsairEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CorsairEventWhereInput | CorsairEventWhereInput[]
    OR?: CorsairEventWhereInput[]
    NOT?: CorsairEventWhereInput | CorsairEventWhereInput[]
    createdAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    accountId?: StringFilter<"CorsairEvent"> | string
    eventType?: StringFilter<"CorsairEvent"> | string
    payload?: JsonFilter<"CorsairEvent">
    status?: StringNullableFilter<"CorsairEvent"> | string | null
    account?: XOR<CorsairAccountScalarRelationFilter, CorsairAccountWhereInput>
  }, "id">

  export type CorsairEventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrderInput | SortOrder
    _count?: CorsairEventCountOrderByAggregateInput
    _max?: CorsairEventMaxOrderByAggregateInput
    _min?: CorsairEventMinOrderByAggregateInput
  }

  export type CorsairEventScalarWhereWithAggregatesInput = {
    AND?: CorsairEventScalarWhereWithAggregatesInput | CorsairEventScalarWhereWithAggregatesInput[]
    OR?: CorsairEventScalarWhereWithAggregatesInput[]
    NOT?: CorsairEventScalarWhereWithAggregatesInput | CorsairEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CorsairEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CorsairEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorsairEvent"> | Date | string
    accountId?: StringWithAggregatesFilter<"CorsairEvent"> | string
    eventType?: StringWithAggregatesFilter<"CorsairEvent"> | string
    payload?: JsonWithAggregatesFilter<"CorsairEvent">
    status?: StringNullableWithAggregatesFilter<"CorsairEvent"> | string | null
  }

  export type UserCreateInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftUncheckedCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUncheckedUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCreateInput = {
    id: string
    threadId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateInput = {
    id: string
    threadId: string
    userId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCreateManyInput = {
    id: string
    threadId: string
    userId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftCreateInput = {
    id?: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailDraftsInput
  }

  export type EmailDraftUncheckedCreateInput = {
    id?: string
    userId: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailDraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailDraftsNestedInput
  }

  export type EmailDraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftCreateManyInput = {
    id?: string
    userId: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailDraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventCreateInput = {
    id: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCalendarEventsInput
  }

  export type CalendarEventUncheckedCreateInput = {
    id: string
    userId: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCalendarEventsNestedInput
  }

  export type CalendarEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventCreateManyInput = {
    id: string
    userId: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIConversationCreateInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AIMessageCreateNestedManyWithoutConversationInput
    user: UserCreateNestedOneWithoutAiConversationsInput
  }

  export type AIConversationUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AIMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type AIConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AIMessageUpdateManyWithoutConversationNestedInput
    user?: UserUpdateOneRequiredWithoutAiConversationsNestedInput
  }

  export type AIConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AIMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type AIConversationCreateManyInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageCreateInput = {
    id?: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    conversation: AIConversationCreateNestedOneWithoutMessagesInput
  }

  export type AIMessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: AIConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type AIMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageCreateManyInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateInput = {
    id?: string
    createdAt?: Date | string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status: string
    error?: string | null
  }

  export type WebhookEventUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status: string
    error?: string | null
  }

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookEventCreateManyInput = {
    id?: string
    createdAt?: Date | string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status: string
    error?: string | null
  }

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairIntegrationCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    accounts?: CorsairAccountCreateNestedManyWithoutIntegrationInput
  }

  export type CorsairIntegrationUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    accounts?: CorsairAccountUncheckedCreateNestedManyWithoutIntegrationInput
  }

  export type CorsairIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: CorsairAccountUpdateManyWithoutIntegrationNestedInput
  }

  export type CorsairIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: CorsairAccountUncheckedUpdateManyWithoutIntegrationNestedInput
  }

  export type CorsairIntegrationCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
  }

  export type CorsairIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairAccountCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    integration: CorsairIntegrationCreateNestedOneWithoutAccountsInput
    entities?: CorsairEntityCreateNestedManyWithoutAccountInput
    events?: CorsairEventCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    integrationId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    entities?: CorsairEntityUncheckedCreateNestedManyWithoutAccountInput
    events?: CorsairEventUncheckedCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    integration?: CorsairIntegrationUpdateOneRequiredWithoutAccountsNestedInput
    entities?: CorsairEntityUpdateManyWithoutAccountNestedInput
    events?: CorsairEventUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: CorsairEntityUncheckedUpdateManyWithoutAccountNestedInput
    events?: CorsairEventUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    integrationId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
  }

  export type CorsairAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEntityCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
    account: CorsairAccountCreateNestedOneWithoutEntitiesInput
  }

  export type CorsairEntityUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId: string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    account?: CorsairAccountUpdateOneRequiredWithoutEntitiesNestedInput
  }

  export type CorsairEntityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId: string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEventCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
    account: CorsairAccountCreateNestedOneWithoutEventsInput
  }

  export type CorsairEventUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
  }

  export type CorsairEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    account?: CorsairAccountUpdateOneRequiredWithoutEventsNestedInput
  }

  export type CorsairEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEventCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
  }

  export type CorsairEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmailListRelationFilter = {
    every?: EmailWhereInput
    some?: EmailWhereInput
    none?: EmailWhereInput
  }

  export type EmailDraftListRelationFilter = {
    every?: EmailDraftWhereInput
    some?: EmailDraftWhereInput
    none?: EmailDraftWhereInput
  }

  export type CalendarEventListRelationFilter = {
    every?: CalendarEventWhereInput
    some?: CalendarEventWhereInput
    none?: CalendarEventWhereInput
  }

  export type AIConversationListRelationFilter = {
    every?: AIConversationWhereInput
    some?: AIConversationWhereInput
    none?: AIConversationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailDraftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CalendarEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumEmailPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailPriority | EnumEmailPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailPriorityFilter<$PrismaModel> | $Enums.EmailPriority
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmailCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrder
    bcc?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    labelIds?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reasoning?: SortOrder
    receivedAt?: SortOrder
    attachments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EmailMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reasoning?: SortOrder
    receivedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    isRead?: SortOrder
    isStarred?: SortOrder
    priority?: SortOrder
    confidence?: SortOrder
    reasoning?: SortOrder
    receivedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSumOrderByAggregateInput = {
    confidence?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumEmailPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailPriority | EnumEmailPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailPriorityWithAggregatesFilter<$PrismaModel> | $Enums.EmailPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmailPriorityFilter<$PrismaModel>
    _max?: NestedEnumEmailPriorityFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EmailDraftCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    to?: SortOrder
    cc?: SortOrder
    bcc?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    replyToEmailId?: SortOrder
    corsairDraftId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailDraftMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    replyToEmailId?: SortOrder
    corsairDraftId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailDraftMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bodyHtml?: SortOrder
    replyToEmailId?: SortOrder
    corsairDraftId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    calendarId?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start?: SortOrder
    end?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    attendees?: SortOrder
    recurrence?: SortOrder
    recurringEventId?: SortOrder
    htmlLink?: SortOrder
    hangoutLink?: SortOrder
    colorId?: SortOrder
    reminders?: SortOrder
    creator?: SortOrder
    organizer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    calendarId?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    recurringEventId?: SortOrder
    htmlLink?: SortOrder
    hangoutLink?: SortOrder
    colorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    calendarId?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    recurringEventId?: SortOrder
    htmlLink?: SortOrder
    hangoutLink?: SortOrder
    colorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIMessageListRelationFilter = {
    every?: AIMessageWhereInput
    some?: AIMessageWhereInput
    none?: AIMessageWhereInput
  }

  export type AIMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIConversationScalarRelationFilter = {
    is?: AIConversationWhereInput
    isNot?: AIConversationWhereInput
  }

  export type AIMessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCalls?: SortOrder
    toolResults?: SortOrder
    createdAt?: SortOrder
  }

  export type AIMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AIMessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    error?: SortOrder
  }

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    error?: SortOrder
  }

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    error?: SortOrder
  }

  export type CorsairAccountListRelationFilter = {
    every?: CorsairAccountWhereInput
    some?: CorsairAccountWhereInput
    none?: CorsairAccountWhereInput
  }

  export type CorsairAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CorsairIntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    config?: SortOrder
    dek?: SortOrder
  }

  export type CorsairIntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    dek?: SortOrder
  }

  export type CorsairIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    dek?: SortOrder
  }

  export type CorsairIntegrationScalarRelationFilter = {
    is?: CorsairIntegrationWhereInput
    isNot?: CorsairIntegrationWhereInput
  }

  export type CorsairEntityListRelationFilter = {
    every?: CorsairEntityWhereInput
    some?: CorsairEntityWhereInput
    none?: CorsairEntityWhereInput
  }

  export type CorsairEventListRelationFilter = {
    every?: CorsairEventWhereInput
    some?: CorsairEventWhereInput
    none?: CorsairEventWhereInput
  }

  export type CorsairEntityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CorsairEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CorsairAccountCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    config?: SortOrder
    dek?: SortOrder
  }

  export type CorsairAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    dek?: SortOrder
  }

  export type CorsairAccountMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    dek?: SortOrder
  }

  export type CorsairAccountScalarRelationFilter = {
    is?: CorsairAccountWhereInput
    isNot?: CorsairAccountWhereInput
  }

  export type CorsairEntityCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    entityId?: SortOrder
    entityType?: SortOrder
    version?: SortOrder
    data?: SortOrder
  }

  export type CorsairEntityMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    entityId?: SortOrder
    entityType?: SortOrder
    version?: SortOrder
  }

  export type CorsairEntityMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    entityId?: SortOrder
    entityType?: SortOrder
    version?: SortOrder
  }

  export type CorsairEventCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
  }

  export type CorsairEventMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
  }

  export type CorsairEventMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
  }

  export type EmailCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type EmailDraftCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput> | EmailDraftCreateWithoutUserInput[] | EmailDraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailDraftCreateOrConnectWithoutUserInput | EmailDraftCreateOrConnectWithoutUserInput[]
    createMany?: EmailDraftCreateManyUserInputEnvelope
    connect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
  }

  export type CalendarEventCreateNestedManyWithoutUserInput = {
    create?: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput> | CalendarEventCreateWithoutUserInput[] | CalendarEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutUserInput | CalendarEventCreateOrConnectWithoutUserInput[]
    createMany?: CalendarEventCreateManyUserInputEnvelope
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type AIConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput> | AIConversationCreateWithoutUserInput[] | AIConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIConversationCreateOrConnectWithoutUserInput | AIConversationCreateOrConnectWithoutUserInput[]
    createMany?: AIConversationCreateManyUserInputEnvelope
    connect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type EmailDraftUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput> | EmailDraftCreateWithoutUserInput[] | EmailDraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailDraftCreateOrConnectWithoutUserInput | EmailDraftCreateOrConnectWithoutUserInput[]
    createMany?: EmailDraftCreateManyUserInputEnvelope
    connect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
  }

  export type CalendarEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput> | CalendarEventCreateWithoutUserInput[] | CalendarEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutUserInput | CalendarEventCreateOrConnectWithoutUserInput[]
    createMany?: CalendarEventCreateManyUserInputEnvelope
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type AIConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput> | AIConversationCreateWithoutUserInput[] | AIConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIConversationCreateOrConnectWithoutUserInput | AIConversationCreateOrConnectWithoutUserInput[]
    createMany?: AIConversationCreateManyUserInputEnvelope
    connect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmailUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type EmailDraftUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput> | EmailDraftCreateWithoutUserInput[] | EmailDraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailDraftCreateOrConnectWithoutUserInput | EmailDraftCreateOrConnectWithoutUserInput[]
    upsert?: EmailDraftUpsertWithWhereUniqueWithoutUserInput | EmailDraftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailDraftCreateManyUserInputEnvelope
    set?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    disconnect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    delete?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    connect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    update?: EmailDraftUpdateWithWhereUniqueWithoutUserInput | EmailDraftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailDraftUpdateManyWithWhereWithoutUserInput | EmailDraftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailDraftScalarWhereInput | EmailDraftScalarWhereInput[]
  }

  export type CalendarEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput> | CalendarEventCreateWithoutUserInput[] | CalendarEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutUserInput | CalendarEventCreateOrConnectWithoutUserInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutUserInput | CalendarEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CalendarEventCreateManyUserInputEnvelope
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutUserInput | CalendarEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutUserInput | CalendarEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type AIConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput> | AIConversationCreateWithoutUserInput[] | AIConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIConversationCreateOrConnectWithoutUserInput | AIConversationCreateOrConnectWithoutUserInput[]
    upsert?: AIConversationUpsertWithWhereUniqueWithoutUserInput | AIConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIConversationCreateManyUserInputEnvelope
    set?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    disconnect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    delete?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    connect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    update?: AIConversationUpdateWithWhereUniqueWithoutUserInput | AIConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIConversationUpdateManyWithWhereWithoutUserInput | AIConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIConversationScalarWhereInput | AIConversationScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type EmailDraftUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput> | EmailDraftCreateWithoutUserInput[] | EmailDraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailDraftCreateOrConnectWithoutUserInput | EmailDraftCreateOrConnectWithoutUserInput[]
    upsert?: EmailDraftUpsertWithWhereUniqueWithoutUserInput | EmailDraftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailDraftCreateManyUserInputEnvelope
    set?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    disconnect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    delete?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    connect?: EmailDraftWhereUniqueInput | EmailDraftWhereUniqueInput[]
    update?: EmailDraftUpdateWithWhereUniqueWithoutUserInput | EmailDraftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailDraftUpdateManyWithWhereWithoutUserInput | EmailDraftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailDraftScalarWhereInput | EmailDraftScalarWhereInput[]
  }

  export type CalendarEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput> | CalendarEventCreateWithoutUserInput[] | CalendarEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutUserInput | CalendarEventCreateOrConnectWithoutUserInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutUserInput | CalendarEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CalendarEventCreateManyUserInputEnvelope
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutUserInput | CalendarEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutUserInput | CalendarEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type AIConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput> | AIConversationCreateWithoutUserInput[] | AIConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIConversationCreateOrConnectWithoutUserInput | AIConversationCreateOrConnectWithoutUserInput[]
    upsert?: AIConversationUpsertWithWhereUniqueWithoutUserInput | AIConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIConversationCreateManyUserInputEnvelope
    set?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    disconnect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    delete?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    connect?: AIConversationWhereUniqueInput | AIConversationWhereUniqueInput[]
    update?: AIConversationUpdateWithWhereUniqueWithoutUserInput | AIConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIConversationUpdateManyWithWhereWithoutUserInput | AIConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIConversationScalarWhereInput | AIConversationScalarWhereInput[]
  }

  export type EmailCreatelabelIdsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutEmailsInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    connect?: UserWhereUniqueInput
  }

  export type EmailUpdatelabelIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumEmailPriorityFieldUpdateOperationsInput = {
    set?: $Enums.EmailPriority
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    upsert?: UserUpsertWithoutEmailsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailsInput, UserUpdateWithoutEmailsInput>, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type UserCreateNestedOneWithoutEmailDraftsInput = {
    create?: XOR<UserCreateWithoutEmailDraftsInput, UserUncheckedCreateWithoutEmailDraftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailDraftsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmailDraftsNestedInput = {
    create?: XOR<UserCreateWithoutEmailDraftsInput, UserUncheckedCreateWithoutEmailDraftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailDraftsInput
    upsert?: UserUpsertWithoutEmailDraftsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailDraftsInput, UserUpdateWithoutEmailDraftsInput>, UserUncheckedUpdateWithoutEmailDraftsInput>
  }

  export type CalendarEventCreaterecurrenceInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCalendarEventsInput = {
    create?: XOR<UserCreateWithoutCalendarEventsInput, UserUncheckedCreateWithoutCalendarEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalendarEventsInput
    connect?: UserWhereUniqueInput
  }

  export type CalendarEventUpdaterecurrenceInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCalendarEventsNestedInput = {
    create?: XOR<UserCreateWithoutCalendarEventsInput, UserUncheckedCreateWithoutCalendarEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalendarEventsInput
    upsert?: UserUpsertWithoutCalendarEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCalendarEventsInput, UserUpdateWithoutCalendarEventsInput>, UserUncheckedUpdateWithoutCalendarEventsInput>
  }

  export type AIMessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput> | AIMessageCreateWithoutConversationInput[] | AIMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutConversationInput | AIMessageCreateOrConnectWithoutConversationInput[]
    createMany?: AIMessageCreateManyConversationInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAiConversationsInput = {
    create?: XOR<UserCreateWithoutAiConversationsInput, UserUncheckedCreateWithoutAiConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type AIMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput> | AIMessageCreateWithoutConversationInput[] | AIMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutConversationInput | AIMessageCreateOrConnectWithoutConversationInput[]
    createMany?: AIMessageCreateManyConversationInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type AIMessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput> | AIMessageCreateWithoutConversationInput[] | AIMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutConversationInput | AIMessageCreateOrConnectWithoutConversationInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutConversationInput | AIMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AIMessageCreateManyConversationInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutConversationInput | AIMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutConversationInput | AIMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutAiConversationsNestedInput = {
    create?: XOR<UserCreateWithoutAiConversationsInput, UserUncheckedCreateWithoutAiConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiConversationsInput
    upsert?: UserUpsertWithoutAiConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiConversationsInput, UserUpdateWithoutAiConversationsInput>, UserUncheckedUpdateWithoutAiConversationsInput>
  }

  export type AIMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput> | AIMessageCreateWithoutConversationInput[] | AIMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutConversationInput | AIMessageCreateOrConnectWithoutConversationInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutConversationInput | AIMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AIMessageCreateManyConversationInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutConversationInput | AIMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutConversationInput | AIMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type AIConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<AIConversationCreateWithoutMessagesInput, AIConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AIConversationCreateOrConnectWithoutMessagesInput
    connect?: AIConversationWhereUniqueInput
  }

  export type AIConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<AIConversationCreateWithoutMessagesInput, AIConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AIConversationCreateOrConnectWithoutMessagesInput
    upsert?: AIConversationUpsertWithoutMessagesInput
    connect?: AIConversationWhereUniqueInput
    update?: XOR<XOR<AIConversationUpdateToOneWithWhereWithoutMessagesInput, AIConversationUpdateWithoutMessagesInput>, AIConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type CorsairAccountCreateNestedManyWithoutIntegrationInput = {
    create?: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput> | CorsairAccountCreateWithoutIntegrationInput[] | CorsairAccountUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutIntegrationInput | CorsairAccountCreateOrConnectWithoutIntegrationInput[]
    createMany?: CorsairAccountCreateManyIntegrationInputEnvelope
    connect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
  }

  export type CorsairAccountUncheckedCreateNestedManyWithoutIntegrationInput = {
    create?: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput> | CorsairAccountCreateWithoutIntegrationInput[] | CorsairAccountUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutIntegrationInput | CorsairAccountCreateOrConnectWithoutIntegrationInput[]
    createMany?: CorsairAccountCreateManyIntegrationInputEnvelope
    connect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
  }

  export type CorsairAccountUpdateManyWithoutIntegrationNestedInput = {
    create?: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput> | CorsairAccountCreateWithoutIntegrationInput[] | CorsairAccountUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutIntegrationInput | CorsairAccountCreateOrConnectWithoutIntegrationInput[]
    upsert?: CorsairAccountUpsertWithWhereUniqueWithoutIntegrationInput | CorsairAccountUpsertWithWhereUniqueWithoutIntegrationInput[]
    createMany?: CorsairAccountCreateManyIntegrationInputEnvelope
    set?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    disconnect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    delete?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    connect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    update?: CorsairAccountUpdateWithWhereUniqueWithoutIntegrationInput | CorsairAccountUpdateWithWhereUniqueWithoutIntegrationInput[]
    updateMany?: CorsairAccountUpdateManyWithWhereWithoutIntegrationInput | CorsairAccountUpdateManyWithWhereWithoutIntegrationInput[]
    deleteMany?: CorsairAccountScalarWhereInput | CorsairAccountScalarWhereInput[]
  }

  export type CorsairAccountUncheckedUpdateManyWithoutIntegrationNestedInput = {
    create?: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput> | CorsairAccountCreateWithoutIntegrationInput[] | CorsairAccountUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutIntegrationInput | CorsairAccountCreateOrConnectWithoutIntegrationInput[]
    upsert?: CorsairAccountUpsertWithWhereUniqueWithoutIntegrationInput | CorsairAccountUpsertWithWhereUniqueWithoutIntegrationInput[]
    createMany?: CorsairAccountCreateManyIntegrationInputEnvelope
    set?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    disconnect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    delete?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    connect?: CorsairAccountWhereUniqueInput | CorsairAccountWhereUniqueInput[]
    update?: CorsairAccountUpdateWithWhereUniqueWithoutIntegrationInput | CorsairAccountUpdateWithWhereUniqueWithoutIntegrationInput[]
    updateMany?: CorsairAccountUpdateManyWithWhereWithoutIntegrationInput | CorsairAccountUpdateManyWithWhereWithoutIntegrationInput[]
    deleteMany?: CorsairAccountScalarWhereInput | CorsairAccountScalarWhereInput[]
  }

  export type CorsairIntegrationCreateNestedOneWithoutAccountsInput = {
    create?: XOR<CorsairIntegrationCreateWithoutAccountsInput, CorsairIntegrationUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CorsairIntegrationCreateOrConnectWithoutAccountsInput
    connect?: CorsairIntegrationWhereUniqueInput
  }

  export type CorsairEntityCreateNestedManyWithoutAccountInput = {
    create?: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput> | CorsairEntityCreateWithoutAccountInput[] | CorsairEntityUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEntityCreateOrConnectWithoutAccountInput | CorsairEntityCreateOrConnectWithoutAccountInput[]
    createMany?: CorsairEntityCreateManyAccountInputEnvelope
    connect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
  }

  export type CorsairEventCreateNestedManyWithoutAccountInput = {
    create?: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput> | CorsairEventCreateWithoutAccountInput[] | CorsairEventUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEventCreateOrConnectWithoutAccountInput | CorsairEventCreateOrConnectWithoutAccountInput[]
    createMany?: CorsairEventCreateManyAccountInputEnvelope
    connect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
  }

  export type CorsairEntityUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput> | CorsairEntityCreateWithoutAccountInput[] | CorsairEntityUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEntityCreateOrConnectWithoutAccountInput | CorsairEntityCreateOrConnectWithoutAccountInput[]
    createMany?: CorsairEntityCreateManyAccountInputEnvelope
    connect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
  }

  export type CorsairEventUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput> | CorsairEventCreateWithoutAccountInput[] | CorsairEventUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEventCreateOrConnectWithoutAccountInput | CorsairEventCreateOrConnectWithoutAccountInput[]
    createMany?: CorsairEventCreateManyAccountInputEnvelope
    connect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
  }

  export type CorsairIntegrationUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<CorsairIntegrationCreateWithoutAccountsInput, CorsairIntegrationUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CorsairIntegrationCreateOrConnectWithoutAccountsInput
    upsert?: CorsairIntegrationUpsertWithoutAccountsInput
    connect?: CorsairIntegrationWhereUniqueInput
    update?: XOR<XOR<CorsairIntegrationUpdateToOneWithWhereWithoutAccountsInput, CorsairIntegrationUpdateWithoutAccountsInput>, CorsairIntegrationUncheckedUpdateWithoutAccountsInput>
  }

  export type CorsairEntityUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput> | CorsairEntityCreateWithoutAccountInput[] | CorsairEntityUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEntityCreateOrConnectWithoutAccountInput | CorsairEntityCreateOrConnectWithoutAccountInput[]
    upsert?: CorsairEntityUpsertWithWhereUniqueWithoutAccountInput | CorsairEntityUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CorsairEntityCreateManyAccountInputEnvelope
    set?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    disconnect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    delete?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    connect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    update?: CorsairEntityUpdateWithWhereUniqueWithoutAccountInput | CorsairEntityUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CorsairEntityUpdateManyWithWhereWithoutAccountInput | CorsairEntityUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CorsairEntityScalarWhereInput | CorsairEntityScalarWhereInput[]
  }

  export type CorsairEventUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput> | CorsairEventCreateWithoutAccountInput[] | CorsairEventUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEventCreateOrConnectWithoutAccountInput | CorsairEventCreateOrConnectWithoutAccountInput[]
    upsert?: CorsairEventUpsertWithWhereUniqueWithoutAccountInput | CorsairEventUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CorsairEventCreateManyAccountInputEnvelope
    set?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    disconnect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    delete?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    connect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    update?: CorsairEventUpdateWithWhereUniqueWithoutAccountInput | CorsairEventUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CorsairEventUpdateManyWithWhereWithoutAccountInput | CorsairEventUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CorsairEventScalarWhereInput | CorsairEventScalarWhereInput[]
  }

  export type CorsairEntityUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput> | CorsairEntityCreateWithoutAccountInput[] | CorsairEntityUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEntityCreateOrConnectWithoutAccountInput | CorsairEntityCreateOrConnectWithoutAccountInput[]
    upsert?: CorsairEntityUpsertWithWhereUniqueWithoutAccountInput | CorsairEntityUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CorsairEntityCreateManyAccountInputEnvelope
    set?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    disconnect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    delete?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    connect?: CorsairEntityWhereUniqueInput | CorsairEntityWhereUniqueInput[]
    update?: CorsairEntityUpdateWithWhereUniqueWithoutAccountInput | CorsairEntityUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CorsairEntityUpdateManyWithWhereWithoutAccountInput | CorsairEntityUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CorsairEntityScalarWhereInput | CorsairEntityScalarWhereInput[]
  }

  export type CorsairEventUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput> | CorsairEventCreateWithoutAccountInput[] | CorsairEventUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CorsairEventCreateOrConnectWithoutAccountInput | CorsairEventCreateOrConnectWithoutAccountInput[]
    upsert?: CorsairEventUpsertWithWhereUniqueWithoutAccountInput | CorsairEventUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CorsairEventCreateManyAccountInputEnvelope
    set?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    disconnect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    delete?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    connect?: CorsairEventWhereUniqueInput | CorsairEventWhereUniqueInput[]
    update?: CorsairEventUpdateWithWhereUniqueWithoutAccountInput | CorsairEventUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CorsairEventUpdateManyWithWhereWithoutAccountInput | CorsairEventUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CorsairEventScalarWhereInput | CorsairEventScalarWhereInput[]
  }

  export type CorsairAccountCreateNestedOneWithoutEntitiesInput = {
    create?: XOR<CorsairAccountCreateWithoutEntitiesInput, CorsairAccountUncheckedCreateWithoutEntitiesInput>
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutEntitiesInput
    connect?: CorsairAccountWhereUniqueInput
  }

  export type CorsairAccountUpdateOneRequiredWithoutEntitiesNestedInput = {
    create?: XOR<CorsairAccountCreateWithoutEntitiesInput, CorsairAccountUncheckedCreateWithoutEntitiesInput>
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutEntitiesInput
    upsert?: CorsairAccountUpsertWithoutEntitiesInput
    connect?: CorsairAccountWhereUniqueInput
    update?: XOR<XOR<CorsairAccountUpdateToOneWithWhereWithoutEntitiesInput, CorsairAccountUpdateWithoutEntitiesInput>, CorsairAccountUncheckedUpdateWithoutEntitiesInput>
  }

  export type CorsairAccountCreateNestedOneWithoutEventsInput = {
    create?: XOR<CorsairAccountCreateWithoutEventsInput, CorsairAccountUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutEventsInput
    connect?: CorsairAccountWhereUniqueInput
  }

  export type CorsairAccountUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<CorsairAccountCreateWithoutEventsInput, CorsairAccountUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CorsairAccountCreateOrConnectWithoutEventsInput
    upsert?: CorsairAccountUpsertWithoutEventsInput
    connect?: CorsairAccountWhereUniqueInput
    update?: XOR<XOR<CorsairAccountUpdateToOneWithWhereWithoutEventsInput, CorsairAccountUpdateWithoutEventsInput>, CorsairAccountUncheckedUpdateWithoutEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumEmailPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailPriority | EnumEmailPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailPriorityFilter<$PrismaModel> | $Enums.EmailPriority
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumEmailPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailPriority | EnumEmailPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmailPriority[] | ListEnumEmailPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumEmailPriorityWithAggregatesFilter<$PrismaModel> | $Enums.EmailPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmailPriorityFilter<$PrismaModel>
    _max?: NestedEnumEmailPriorityFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EmailCreateWithoutUserInput = {
    id: string
    threadId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUncheckedCreateWithoutUserInput = {
    id: string
    threadId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCreateOrConnectWithoutUserInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailCreateManyUserInputEnvelope = {
    data: EmailCreateManyUserInput | EmailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailDraftCreateWithoutUserInput = {
    id?: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailDraftUncheckedCreateWithoutUserInput = {
    id?: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailDraftCreateOrConnectWithoutUserInput = {
    where: EmailDraftWhereUniqueInput
    create: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput>
  }

  export type EmailDraftCreateManyUserInputEnvelope = {
    data: EmailDraftCreateManyUserInput | EmailDraftCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CalendarEventCreateWithoutUserInput = {
    id: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUncheckedCreateWithoutUserInput = {
    id: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventCreateOrConnectWithoutUserInput = {
    where: CalendarEventWhereUniqueInput
    create: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput>
  }

  export type CalendarEventCreateManyUserInputEnvelope = {
    data: CalendarEventCreateManyUserInput | CalendarEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AIConversationCreateWithoutUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AIMessageCreateNestedManyWithoutConversationInput
  }

  export type AIConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AIMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type AIConversationCreateOrConnectWithoutUserInput = {
    where: AIConversationWhereUniqueInput
    create: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput>
  }

  export type AIConversationCreateManyUserInputEnvelope = {
    data: AIConversationCreateManyUserInput | AIConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
  }

  export type EmailUpdateManyWithWhereWithoutUserInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailScalarWhereInput = {
    AND?: EmailScalarWhereInput | EmailScalarWhereInput[]
    OR?: EmailScalarWhereInput[]
    NOT?: EmailScalarWhereInput | EmailScalarWhereInput[]
    id?: StringFilter<"Email"> | string
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    subject?: StringFilter<"Email"> | string
    snippet?: StringFilter<"Email"> | string
    body?: StringFilter<"Email"> | string
    bodyHtml?: StringNullableFilter<"Email"> | string | null
    labelIds?: StringNullableListFilter<"Email">
    isRead?: BoolFilter<"Email"> | boolean
    isStarred?: BoolFilter<"Email"> | boolean
    priority?: EnumEmailPriorityFilter<"Email"> | $Enums.EmailPriority
    confidence?: FloatNullableFilter<"Email"> | number | null
    reasoning?: StringNullableFilter<"Email"> | string | null
    receivedAt?: DateTimeFilter<"Email"> | Date | string
    attachments?: JsonFilter<"Email">
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
  }

  export type EmailDraftUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailDraftWhereUniqueInput
    update: XOR<EmailDraftUpdateWithoutUserInput, EmailDraftUncheckedUpdateWithoutUserInput>
    create: XOR<EmailDraftCreateWithoutUserInput, EmailDraftUncheckedCreateWithoutUserInput>
  }

  export type EmailDraftUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailDraftWhereUniqueInput
    data: XOR<EmailDraftUpdateWithoutUserInput, EmailDraftUncheckedUpdateWithoutUserInput>
  }

  export type EmailDraftUpdateManyWithWhereWithoutUserInput = {
    where: EmailDraftScalarWhereInput
    data: XOR<EmailDraftUpdateManyMutationInput, EmailDraftUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailDraftScalarWhereInput = {
    AND?: EmailDraftScalarWhereInput | EmailDraftScalarWhereInput[]
    OR?: EmailDraftScalarWhereInput[]
    NOT?: EmailDraftScalarWhereInput | EmailDraftScalarWhereInput[]
    id?: StringFilter<"EmailDraft"> | string
    userId?: StringFilter<"EmailDraft"> | string
    to?: JsonFilter<"EmailDraft">
    cc?: JsonNullableFilter<"EmailDraft">
    bcc?: JsonNullableFilter<"EmailDraft">
    subject?: StringFilter<"EmailDraft"> | string
    body?: StringFilter<"EmailDraft"> | string
    bodyHtml?: StringNullableFilter<"EmailDraft"> | string | null
    replyToEmailId?: StringNullableFilter<"EmailDraft"> | string | null
    corsairDraftId?: StringNullableFilter<"EmailDraft"> | string | null
    createdAt?: DateTimeFilter<"EmailDraft"> | Date | string
    updatedAt?: DateTimeFilter<"EmailDraft"> | Date | string
  }

  export type CalendarEventUpsertWithWhereUniqueWithoutUserInput = {
    where: CalendarEventWhereUniqueInput
    update: XOR<CalendarEventUpdateWithoutUserInput, CalendarEventUncheckedUpdateWithoutUserInput>
    create: XOR<CalendarEventCreateWithoutUserInput, CalendarEventUncheckedCreateWithoutUserInput>
  }

  export type CalendarEventUpdateWithWhereUniqueWithoutUserInput = {
    where: CalendarEventWhereUniqueInput
    data: XOR<CalendarEventUpdateWithoutUserInput, CalendarEventUncheckedUpdateWithoutUserInput>
  }

  export type CalendarEventUpdateManyWithWhereWithoutUserInput = {
    where: CalendarEventScalarWhereInput
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyWithoutUserInput>
  }

  export type CalendarEventScalarWhereInput = {
    AND?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
    OR?: CalendarEventScalarWhereInput[]
    NOT?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
    id?: StringFilter<"CalendarEvent"> | string
    userId?: StringFilter<"CalendarEvent"> | string
    calendarId?: StringFilter<"CalendarEvent"> | string
    summary?: StringFilter<"CalendarEvent"> | string
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    location?: StringNullableFilter<"CalendarEvent"> | string | null
    start?: JsonFilter<"CalendarEvent">
    end?: JsonFilter<"CalendarEvent">
    status?: StringFilter<"CalendarEvent"> | string
    visibility?: StringNullableFilter<"CalendarEvent"> | string | null
    attendees?: JsonFilter<"CalendarEvent">
    recurrence?: StringNullableListFilter<"CalendarEvent">
    recurringEventId?: StringNullableFilter<"CalendarEvent"> | string | null
    htmlLink?: StringNullableFilter<"CalendarEvent"> | string | null
    hangoutLink?: StringNullableFilter<"CalendarEvent"> | string | null
    colorId?: StringNullableFilter<"CalendarEvent"> | string | null
    reminders?: JsonNullableFilter<"CalendarEvent">
    creator?: JsonNullableFilter<"CalendarEvent">
    organizer?: JsonNullableFilter<"CalendarEvent">
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
  }

  export type AIConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: AIConversationWhereUniqueInput
    update: XOR<AIConversationUpdateWithoutUserInput, AIConversationUncheckedUpdateWithoutUserInput>
    create: XOR<AIConversationCreateWithoutUserInput, AIConversationUncheckedCreateWithoutUserInput>
  }

  export type AIConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: AIConversationWhereUniqueInput
    data: XOR<AIConversationUpdateWithoutUserInput, AIConversationUncheckedUpdateWithoutUserInput>
  }

  export type AIConversationUpdateManyWithWhereWithoutUserInput = {
    where: AIConversationScalarWhereInput
    data: XOR<AIConversationUpdateManyMutationInput, AIConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type AIConversationScalarWhereInput = {
    AND?: AIConversationScalarWhereInput | AIConversationScalarWhereInput[]
    OR?: AIConversationScalarWhereInput[]
    NOT?: AIConversationScalarWhereInput | AIConversationScalarWhereInput[]
    id?: StringFilter<"AIConversation"> | string
    userId?: StringFilter<"AIConversation"> | string
    title?: StringNullableFilter<"AIConversation"> | string | null
    createdAt?: DateTimeFilter<"AIConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AIConversation"> | Date | string
  }

  export type UserCreateWithoutEmailsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailDrafts?: EmailDraftCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailDrafts?: EmailDraftUncheckedCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
  }

  export type UserUpsertWithoutEmailsInput = {
    update: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type UserUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailDrafts?: EmailDraftUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailDrafts?: EmailDraftUncheckedUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEmailDraftsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailDraftsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailDraftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailDraftsInput, UserUncheckedCreateWithoutEmailDraftsInput>
  }

  export type UserUpsertWithoutEmailDraftsInput = {
    update: XOR<UserUpdateWithoutEmailDraftsInput, UserUncheckedUpdateWithoutEmailDraftsInput>
    create: XOR<UserCreateWithoutEmailDraftsInput, UserUncheckedCreateWithoutEmailDraftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailDraftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailDraftsInput, UserUncheckedUpdateWithoutEmailDraftsInput>
  }

  export type UserUpdateWithoutEmailDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCalendarEventsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCalendarEventsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftUncheckedCreateNestedManyWithoutUserInput
    aiConversations?: AIConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCalendarEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCalendarEventsInput, UserUncheckedCreateWithoutCalendarEventsInput>
  }

  export type UserUpsertWithoutCalendarEventsInput = {
    update: XOR<UserUpdateWithoutCalendarEventsInput, UserUncheckedUpdateWithoutCalendarEventsInput>
    create: XOR<UserCreateWithoutCalendarEventsInput, UserUncheckedCreateWithoutCalendarEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCalendarEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCalendarEventsInput, UserUncheckedUpdateWithoutCalendarEventsInput>
  }

  export type UserUpdateWithoutCalendarEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCalendarEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUncheckedUpdateManyWithoutUserNestedInput
    aiConversations?: AIConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AIMessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIMessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIMessageCreateOrConnectWithoutConversationInput = {
    where: AIMessageWhereUniqueInput
    create: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput>
  }

  export type AIMessageCreateManyConversationInputEnvelope = {
    data: AIMessageCreateManyConversationInput | AIMessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAiConversationsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiConversationsInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    emailDrafts?: EmailDraftUncheckedCreateNestedManyWithoutUserInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiConversationsInput, UserUncheckedCreateWithoutAiConversationsInput>
  }

  export type AIMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: AIMessageWhereUniqueInput
    update: XOR<AIMessageUpdateWithoutConversationInput, AIMessageUncheckedUpdateWithoutConversationInput>
    create: XOR<AIMessageCreateWithoutConversationInput, AIMessageUncheckedCreateWithoutConversationInput>
  }

  export type AIMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: AIMessageWhereUniqueInput
    data: XOR<AIMessageUpdateWithoutConversationInput, AIMessageUncheckedUpdateWithoutConversationInput>
  }

  export type AIMessageUpdateManyWithWhereWithoutConversationInput = {
    where: AIMessageScalarWhereInput
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type AIMessageScalarWhereInput = {
    AND?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
    OR?: AIMessageScalarWhereInput[]
    NOT?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
    id?: StringFilter<"AIMessage"> | string
    conversationId?: StringFilter<"AIMessage"> | string
    role?: StringFilter<"AIMessage"> | string
    content?: StringFilter<"AIMessage"> | string
    toolCalls?: JsonNullableFilter<"AIMessage">
    toolResults?: JsonNullableFilter<"AIMessage">
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
  }

  export type UserUpsertWithoutAiConversationsInput = {
    update: XOR<UserUpdateWithoutAiConversationsInput, UserUncheckedUpdateWithoutAiConversationsInput>
    create: XOR<UserCreateWithoutAiConversationsInput, UserUncheckedCreateWithoutAiConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiConversationsInput, UserUncheckedUpdateWithoutAiConversationsInput>
  }

  export type UserUpdateWithoutAiConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    emailDrafts?: EmailDraftUncheckedUpdateManyWithoutUserNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AIConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiConversationsInput
  }

  export type AIConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIConversationCreateOrConnectWithoutMessagesInput = {
    where: AIConversationWhereUniqueInput
    create: XOR<AIConversationCreateWithoutMessagesInput, AIConversationUncheckedCreateWithoutMessagesInput>
  }

  export type AIConversationUpsertWithoutMessagesInput = {
    update: XOR<AIConversationUpdateWithoutMessagesInput, AIConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<AIConversationCreateWithoutMessagesInput, AIConversationUncheckedCreateWithoutMessagesInput>
    where?: AIConversationWhereInput
  }

  export type AIConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: AIConversationWhereInput
    data: XOR<AIConversationUpdateWithoutMessagesInput, AIConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type AIConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiConversationsNestedInput
  }

  export type AIConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorsairAccountCreateWithoutIntegrationInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    entities?: CorsairEntityCreateNestedManyWithoutAccountInput
    events?: CorsairEventCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountUncheckedCreateWithoutIntegrationInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    entities?: CorsairEntityUncheckedCreateNestedManyWithoutAccountInput
    events?: CorsairEventUncheckedCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountCreateOrConnectWithoutIntegrationInput = {
    where: CorsairAccountWhereUniqueInput
    create: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput>
  }

  export type CorsairAccountCreateManyIntegrationInputEnvelope = {
    data: CorsairAccountCreateManyIntegrationInput | CorsairAccountCreateManyIntegrationInput[]
    skipDuplicates?: boolean
  }

  export type CorsairAccountUpsertWithWhereUniqueWithoutIntegrationInput = {
    where: CorsairAccountWhereUniqueInput
    update: XOR<CorsairAccountUpdateWithoutIntegrationInput, CorsairAccountUncheckedUpdateWithoutIntegrationInput>
    create: XOR<CorsairAccountCreateWithoutIntegrationInput, CorsairAccountUncheckedCreateWithoutIntegrationInput>
  }

  export type CorsairAccountUpdateWithWhereUniqueWithoutIntegrationInput = {
    where: CorsairAccountWhereUniqueInput
    data: XOR<CorsairAccountUpdateWithoutIntegrationInput, CorsairAccountUncheckedUpdateWithoutIntegrationInput>
  }

  export type CorsairAccountUpdateManyWithWhereWithoutIntegrationInput = {
    where: CorsairAccountScalarWhereInput
    data: XOR<CorsairAccountUpdateManyMutationInput, CorsairAccountUncheckedUpdateManyWithoutIntegrationInput>
  }

  export type CorsairAccountScalarWhereInput = {
    AND?: CorsairAccountScalarWhereInput | CorsairAccountScalarWhereInput[]
    OR?: CorsairAccountScalarWhereInput[]
    NOT?: CorsairAccountScalarWhereInput | CorsairAccountScalarWhereInput[]
    id?: StringFilter<"CorsairAccount"> | string
    createdAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairAccount"> | Date | string
    tenantId?: StringFilter<"CorsairAccount"> | string
    integrationId?: StringFilter<"CorsairAccount"> | string
    config?: JsonFilter<"CorsairAccount">
    dek?: StringNullableFilter<"CorsairAccount"> | string | null
  }

  export type CorsairIntegrationCreateWithoutAccountsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
  }

  export type CorsairIntegrationUncheckedCreateWithoutAccountsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
  }

  export type CorsairIntegrationCreateOrConnectWithoutAccountsInput = {
    where: CorsairIntegrationWhereUniqueInput
    create: XOR<CorsairIntegrationCreateWithoutAccountsInput, CorsairIntegrationUncheckedCreateWithoutAccountsInput>
  }

  export type CorsairEntityCreateWithoutAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUncheckedCreateWithoutAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityCreateOrConnectWithoutAccountInput = {
    where: CorsairEntityWhereUniqueInput
    create: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput>
  }

  export type CorsairEntityCreateManyAccountInputEnvelope = {
    data: CorsairEntityCreateManyAccountInput | CorsairEntityCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type CorsairEventCreateWithoutAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
  }

  export type CorsairEventUncheckedCreateWithoutAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
  }

  export type CorsairEventCreateOrConnectWithoutAccountInput = {
    where: CorsairEventWhereUniqueInput
    create: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput>
  }

  export type CorsairEventCreateManyAccountInputEnvelope = {
    data: CorsairEventCreateManyAccountInput | CorsairEventCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type CorsairIntegrationUpsertWithoutAccountsInput = {
    update: XOR<CorsairIntegrationUpdateWithoutAccountsInput, CorsairIntegrationUncheckedUpdateWithoutAccountsInput>
    create: XOR<CorsairIntegrationCreateWithoutAccountsInput, CorsairIntegrationUncheckedCreateWithoutAccountsInput>
    where?: CorsairIntegrationWhereInput
  }

  export type CorsairIntegrationUpdateToOneWithWhereWithoutAccountsInput = {
    where?: CorsairIntegrationWhereInput
    data: XOR<CorsairIntegrationUpdateWithoutAccountsInput, CorsairIntegrationUncheckedUpdateWithoutAccountsInput>
  }

  export type CorsairIntegrationUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairIntegrationUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEntityUpsertWithWhereUniqueWithoutAccountInput = {
    where: CorsairEntityWhereUniqueInput
    update: XOR<CorsairEntityUpdateWithoutAccountInput, CorsairEntityUncheckedUpdateWithoutAccountInput>
    create: XOR<CorsairEntityCreateWithoutAccountInput, CorsairEntityUncheckedCreateWithoutAccountInput>
  }

  export type CorsairEntityUpdateWithWhereUniqueWithoutAccountInput = {
    where: CorsairEntityWhereUniqueInput
    data: XOR<CorsairEntityUpdateWithoutAccountInput, CorsairEntityUncheckedUpdateWithoutAccountInput>
  }

  export type CorsairEntityUpdateManyWithWhereWithoutAccountInput = {
    where: CorsairEntityScalarWhereInput
    data: XOR<CorsairEntityUpdateManyMutationInput, CorsairEntityUncheckedUpdateManyWithoutAccountInput>
  }

  export type CorsairEntityScalarWhereInput = {
    AND?: CorsairEntityScalarWhereInput | CorsairEntityScalarWhereInput[]
    OR?: CorsairEntityScalarWhereInput[]
    NOT?: CorsairEntityScalarWhereInput | CorsairEntityScalarWhereInput[]
    id?: StringFilter<"CorsairEntity"> | string
    createdAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEntity"> | Date | string
    accountId?: StringFilter<"CorsairEntity"> | string
    entityId?: StringFilter<"CorsairEntity"> | string
    entityType?: StringFilter<"CorsairEntity"> | string
    version?: StringFilter<"CorsairEntity"> | string
    data?: JsonFilter<"CorsairEntity">
  }

  export type CorsairEventUpsertWithWhereUniqueWithoutAccountInput = {
    where: CorsairEventWhereUniqueInput
    update: XOR<CorsairEventUpdateWithoutAccountInput, CorsairEventUncheckedUpdateWithoutAccountInput>
    create: XOR<CorsairEventCreateWithoutAccountInput, CorsairEventUncheckedCreateWithoutAccountInput>
  }

  export type CorsairEventUpdateWithWhereUniqueWithoutAccountInput = {
    where: CorsairEventWhereUniqueInput
    data: XOR<CorsairEventUpdateWithoutAccountInput, CorsairEventUncheckedUpdateWithoutAccountInput>
  }

  export type CorsairEventUpdateManyWithWhereWithoutAccountInput = {
    where: CorsairEventScalarWhereInput
    data: XOR<CorsairEventUpdateManyMutationInput, CorsairEventUncheckedUpdateManyWithoutAccountInput>
  }

  export type CorsairEventScalarWhereInput = {
    AND?: CorsairEventScalarWhereInput | CorsairEventScalarWhereInput[]
    OR?: CorsairEventScalarWhereInput[]
    NOT?: CorsairEventScalarWhereInput | CorsairEventScalarWhereInput[]
    id?: StringFilter<"CorsairEvent"> | string
    createdAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CorsairEvent"> | Date | string
    accountId?: StringFilter<"CorsairEvent"> | string
    eventType?: StringFilter<"CorsairEvent"> | string
    payload?: JsonFilter<"CorsairEvent">
    status?: StringNullableFilter<"CorsairEvent"> | string | null
  }

  export type CorsairAccountCreateWithoutEntitiesInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    integration: CorsairIntegrationCreateNestedOneWithoutAccountsInput
    events?: CorsairEventCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountUncheckedCreateWithoutEntitiesInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    integrationId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    events?: CorsairEventUncheckedCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountCreateOrConnectWithoutEntitiesInput = {
    where: CorsairAccountWhereUniqueInput
    create: XOR<CorsairAccountCreateWithoutEntitiesInput, CorsairAccountUncheckedCreateWithoutEntitiesInput>
  }

  export type CorsairAccountUpsertWithoutEntitiesInput = {
    update: XOR<CorsairAccountUpdateWithoutEntitiesInput, CorsairAccountUncheckedUpdateWithoutEntitiesInput>
    create: XOR<CorsairAccountCreateWithoutEntitiesInput, CorsairAccountUncheckedCreateWithoutEntitiesInput>
    where?: CorsairAccountWhereInput
  }

  export type CorsairAccountUpdateToOneWithWhereWithoutEntitiesInput = {
    where?: CorsairAccountWhereInput
    data: XOR<CorsairAccountUpdateWithoutEntitiesInput, CorsairAccountUncheckedUpdateWithoutEntitiesInput>
  }

  export type CorsairAccountUpdateWithoutEntitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    integration?: CorsairIntegrationUpdateOneRequiredWithoutAccountsNestedInput
    events?: CorsairEventUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountUncheckedUpdateWithoutEntitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    events?: CorsairEventUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountCreateWithoutEventsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    integration: CorsairIntegrationCreateNestedOneWithoutAccountsInput
    entities?: CorsairEntityCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountUncheckedCreateWithoutEventsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    integrationId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
    entities?: CorsairEntityUncheckedCreateNestedManyWithoutAccountInput
  }

  export type CorsairAccountCreateOrConnectWithoutEventsInput = {
    where: CorsairAccountWhereUniqueInput
    create: XOR<CorsairAccountCreateWithoutEventsInput, CorsairAccountUncheckedCreateWithoutEventsInput>
  }

  export type CorsairAccountUpsertWithoutEventsInput = {
    update: XOR<CorsairAccountUpdateWithoutEventsInput, CorsairAccountUncheckedUpdateWithoutEventsInput>
    create: XOR<CorsairAccountCreateWithoutEventsInput, CorsairAccountUncheckedCreateWithoutEventsInput>
    where?: CorsairAccountWhereInput
  }

  export type CorsairAccountUpdateToOneWithWhereWithoutEventsInput = {
    where?: CorsairAccountWhereInput
    data: XOR<CorsairAccountUpdateWithoutEventsInput, CorsairAccountUncheckedUpdateWithoutEventsInput>
  }

  export type CorsairAccountUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    integration?: CorsairIntegrationUpdateOneRequiredWithoutAccountsNestedInput
    entities?: CorsairEntityUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: CorsairEntityUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type EmailCreateManyUserInput = {
    id: string
    threadId: string
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject: string
    snippet: string
    body: string
    bodyHtml?: string | null
    labelIds?: EmailCreatelabelIdsInput | string[]
    isRead?: boolean
    isStarred?: boolean
    priority?: $Enums.EmailPriority
    confidence?: number | null
    reasoning?: string | null
    receivedAt: Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailDraftCreateManyUserInput = {
    id?: string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string
    body?: string
    bodyHtml?: string | null
    replyToEmailId?: string | null
    corsairDraftId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventCreateManyUserInput = {
    id: string
    calendarId: string
    summary: string
    description?: string | null
    location?: string | null
    start: JsonNullValueInput | InputJsonValue
    end: JsonNullValueInput | InputJsonValue
    status: string
    visibility?: string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventCreaterecurrenceInput | string[]
    recurringEventId?: string | null
    htmlLink?: string | null
    hangoutLink?: string | null
    colorId?: string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIConversationCreateManyUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    labelIds?: EmailUpdatelabelIdsInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    priority?: EnumEmailPriorityFieldUpdateOperationsInput | $Enums.EmailPriority
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailDraftUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bodyHtml?: NullableStringFieldUpdateOperationsInput | string | null
    replyToEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    corsairDraftId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    calendarId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start?: JsonNullValueInput | InputJsonValue
    end?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: JsonNullValueInput | InputJsonValue
    recurrence?: CalendarEventUpdaterecurrenceInput | string[]
    recurringEventId?: NullableStringFieldUpdateOperationsInput | string | null
    htmlLink?: NullableStringFieldUpdateOperationsInput | string | null
    hangoutLink?: NullableStringFieldUpdateOperationsInput | string | null
    colorId?: NullableStringFieldUpdateOperationsInput | string | null
    reminders?: NullableJsonNullValueInput | InputJsonValue
    creator?: NullableJsonNullValueInput | InputJsonValue
    organizer?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AIMessageUpdateManyWithoutConversationNestedInput
  }

  export type AIConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AIMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type AIConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIMessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCalls?: NullableJsonNullValueInput | InputJsonValue
    toolResults?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorsairAccountCreateManyIntegrationInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId: string
    config?: JsonNullValueInput | InputJsonValue
    dek?: string | null
  }

  export type CorsairAccountUpdateWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: CorsairEntityUpdateManyWithoutAccountNestedInput
    events?: CorsairEventUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountUncheckedUpdateWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: CorsairEntityUncheckedUpdateManyWithoutAccountNestedInput
    events?: CorsairEventUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type CorsairAccountUncheckedUpdateManyWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    dek?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEntityCreateManyAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entityId: string
    entityType: string
    version: string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEventCreateManyAccountInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    status?: string | null
  }

  export type CorsairEntityUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEntityUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entityId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CorsairEventUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEventUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CorsairEventUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}