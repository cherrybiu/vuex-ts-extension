import {
    StoreOptions,
    ActionHandler,
    ActionObject
  } from 'vuex';
  
  interface ModuleTree {
    [k: string]: {
      state: any;
      mutations: { [k: string]: (...args: any[]) => any };
      getters?: any;
      actions?: { [k: string]: (...args: any[]) => Promise<any> };
      modules?: ModuleTree,
      namespaced?: boolean
    }
  }
  
  // 获取对象值类型
  export type GetValue<T> = T[keyof T];
  
  // 联合类型转交叉类型
  export type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
  
  // 排除未配置namespaced的模块
  type ExcludeNonameModule<T extends ModuleTree> = {
      [K in keyof T]: T[K]['namespaced'] extends boolean ? K : never
  }[keyof T]
  
  // 排除配置了namespaced的模块
  export type ExcludeModule<T extends ModuleTree> = {
      [K in keyof T]: T[K]['namespaced'] extends boolean ? never : K
  }[keyof T]
  
  // 获取模块内的state类型集合到一个模块
  export type GetOnlyState<M extends ModuleTree> = {
    [K in keyof M]: M[K]['state'];
  }
  
  // 获取模块内的getters类型集合到一个模块
  export type GetOnlyGetters<M extends ModuleTree> = {
    // getters 可能为空，所以会导致类型取never，所以如果为空的话，需要给个默认类型能兼容的
    [K in keyof M]: M[K]['getters'] extends { [k: string]: (...args: any[]) => any } ? M[K]['getters'] : {(): void};
  }
  
  // 获取模块内的actions类型集合到一个模块
  export type GetOnlyActions<M extends ModuleTree> = {
    // actions 可能为空，所以会导致类型取never，所以如果为空的话，需要给个默认类型能兼容的
    [K in keyof M]: M[K]['actions'] extends { [k: string]: (...args: any[]) => any } ? M[K]['actions'] : {(): void};
  }
  
  // 获取模块内的mutations类型集合到一个模块
  export type GetOnlyMutations<M extends ModuleTree> = {
    [K in keyof M]: M[K]['mutations']
  }
  
  // 获取对象的键值集合
  export type GetStringKey<T> = keyof T & string;
  
  export type GetState<T extends StoreOptions<any>> = T['state'];
  // 获取配置了namespaced的模块
  export type GetModule<T extends StoreOptions<any>> = T['modules'] extends ModuleTree ?
      Pick<T['modules'], ExcludeNonameModule<T['modules']>> : never;
  // 获取未配置namespaced的模块
  export type GetNonamedModule<T extends StoreOptions<any>> = T['modules'] extends ModuleTree ?
  Pick<T['modules'], ExcludeModule<T['modules']>> : never;
  
  type AnyFunction = (...a: any) => any
  
  export type Payload<T extends AnyFunction> = T extends (
    ...arg: [any, ...infer P]
  ) => any ? P : never;
  
  type GetPayloadAndChangeReturn<T extends AnyFunction, NewReturn> = (...arg: Payload<T>) => NewReturn
  
  export type PromiseAction<T> = T extends ActionHandler<any, any>
    ? GetPayloadAndChangeReturn<T, Promise<ReturnType<T>>>
    : T extends ActionObject<any, any>
    ? GetPayloadAndChangeReturn<T['handler'], Promise<ReturnType<T['handler']>>>
    : never;
  
  export type Mutation<T> = T extends (...args: any[]) => void ? GetPayloadAndChangeReturn<T, void> : never
  
  export type GetNameSpaceKeys<
    T extends StoreOptions<any>,
    E,
    K
  > = E extends GetStringKey<GetModule<T>>
    ? K extends GetStringKey<GetModule<T>[E]>
      ? GetStringKey<GetModule<T>[E][K]>
      : never
    : never;
  
  export type GetNameSpaceObject<
    T extends StoreOptions<any>,
    E,
    K
  > = E extends GetStringKey<GetModule<T>>
    ? K extends GetStringKey<GetModule<T>[E]>
      ? GetModule<T>[E][K]
      : never
    : never;
  