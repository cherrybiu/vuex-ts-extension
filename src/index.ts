import {
    Store as _Store,
    StoreOptions,
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex';
  
  import {
    Mutation,
    GetStringKey,
    GetModule,
    GetValue,
    GetOnlyState,
    GetOnlyGetters,
    GetOnlyActions,
    GetOnlyMutations,
    UnionToIntersection,
    GetNameSpaceKeys,
    GetNonamedModule,
    GetNameSpaceObject,
    PromiseAction
  } from './type';
  
  export class StoreExtension<S, T extends StoreOptions<S>> {
    store: _Store<S>;
  
    constructor(s: T) {
      this.store = new _Store<S>(s);
    }
  
    // mapState<K extends GetStringKey<GetState<T>>, Map extends Record<string, K>>(
    //   map: Map
    // ): {[key in keyof Map]: () => GetState<T>[Map[key]]};
  
    // 支持...map([])类型提示，数组内的类型根据state和modules里不支持namespaced的模块类型值决定,如果state不为as any时放开
    // mapState<K extends (GetStringKey<GetState<T>> | GetStringKey<UnionToIntersection<GetValue<GetOnlyState<GetNonamedModule<T>>>>>)>(
    //   k: K[]
    // ): K extends GetStringKey<GetState<T>> ? {[key in K]: () => GetState<T>[key]} :
    //   K extends GetStringKey<UnionToIntersection<GetValue<GetOnlyState<GetNonamedModule<T>>>>> ?
    //   {[key in K]: () => UnionToIntersection<GetValue<GetOnlyState<GetNonamedModule<T>>>>[key]} : never;
  
    /** mapState方法类型 */
    // ...mapState(['']), 不支持namespaced的值
    mapState<K extends GetStringKey<UnionToIntersection<GetValue<GetOnlyState<GetNonamedModule<T>>>>>>(
      k: K[]
    ): {[key in K]: () => UnionToIntersection<GetValue<GetOnlyState<GetNonamedModule<T>>>>[key]}
  
    // ...mapState('app', {a: 'keepAliveList'})形式
    mapState<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'state'>,
      Map extends Record<string, K>,
    >(
      module: Module,
      map: Map
    ): {
      [key in keyof Map]: () => GetNameSpaceObject<T, Module, 'state'>[Map[key]];
    };
  
    // 支持...mapState(module, [])类型提示，第一个参数为模块名，数组类为改模块下所有state键名
    mapState<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'state'>
   >(
     module: Module,
     k: K[]
   ): { [key in K]: () => GetNameSpaceObject<T, Module, 'state'>[key] };
  
    mapState(k: any, u?: any) {
      return mapState(k, u);
    }
  
    /**
     * mapGetters 类型支持
     */
    // ...mapGetters(['']), 不支持namespaced的值
    mapGetters<K extends GetStringKey<UnionToIntersection<GetValue<GetOnlyGetters<GetNonamedModule<T>>>>>>(
      k: K[]
    ): {[key in K]: () => UnionToIntersection<GetValue<GetOnlyGetters<GetNonamedModule<T>>>>[key] extends (...args: any) => any ?
      ReturnType<UnionToIntersection<GetValue<GetOnlyGetters<GetNonamedModule<T>>>>[key]>
      : never
    };
  
    // ...mapGetters('newCustomer', {a: 'customerName'})形式
    mapGetters<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'getters'>,
      Map extends Record<string, K>,
    >(
      module: Module,
      map: Map
    ): {
      [key in keyof Map]: () => ReturnType<GetNameSpaceObject<T, Module, 'getters'>[Map[key]]>;
    };
  
    // 支持...mapGetters(module, [])类型提示，第一个参数为模块名，数组类为改模块下所有getters键名
    mapGetters<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'getters'>
    >(
      module: Module,
      k: K[]
    ): { [key in K]: () => ReturnType<GetNameSpaceObject<T, Module, 'getters'>[key]> };
  
    mapGetters(k: any, u?: any) {
      return mapGetters(k, u);
    }
  
    /**
     * mapActions 类型支持
     */
    // ...mapActions(['']), 不支持namespaced的值
    mapActions<K extends GetStringKey<UnionToIntersection<GetValue<GetOnlyActions<GetNonamedModule<T>>>>>>(
      k: K[]
    ): { [key in K]: PromiseAction<UnionToIntersection<GetValue<GetOnlyActions<GetNonamedModule<T>>>>[key]>};
  
    // ..mapActions('newCustomer', {a: 'fetchCustomerDetail'})形式
    mapActions<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'actions'>,
      Map extends Record<string, K>,
    >(
      module: Module,
      map: Map
    ): {
      [k in keyof Map]: PromiseAction<GetNameSpaceObject<T, Module, 'actions'>[Map[k]]>;
    };
  
    // 支持...mapActions(module, [])类型提示，第一个参数为模块名，数组类为改模块下所有actions键名
    mapActions<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'actions'>
    >(
      module: Module,
      k: K[]
    ): { [key in K]: PromiseAction<GetNameSpaceObject<T, Module, 'actions'>[key]> };
  
    mapActions(k: any, u?: any) {
      return mapActions(k, u);
    }
  
    /**
     * mapMutations 类型提示
     */
    // ...mapMutations(['']), 不支持namespaced的值
    mapMutations<K extends GetStringKey<UnionToIntersection<GetValue<GetOnlyMutations<GetNonamedModule<T>>>>>>(
      k: K[]
    ): { [key in K]: Mutation<UnionToIntersection<GetValue<GetOnlyMutations<GetNonamedModule<T>>>>[key]>};
  
    // ...mapMutations('app', {a: 'updateKeepAliveList'})形式
    mapMutations<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'mutations'>,
      Map extends Record<string, K>,
    >(
      module: Module,
      map: Map
    ): {
      [key in keyof Map]: Mutation<GetNameSpaceObject<T, Module, 'mutations'>[Map[key]]>;
    };
  
    // 支持...mapMutations(module, [])类型提示，第一个参数为模块名，数组类为改模块下所有getters键名
    mapMutations<
      Module extends GetStringKey<GetModule<T>>,
      K extends GetNameSpaceKeys<T, Module, 'mutations'>
    >(
      module: Module,
      k: K[]
    ): { [key in K]: Mutation<GetNameSpaceObject<T, Module, 'mutations'>[key]> };
  
    mapMutations(k: any, u?: any) {
      return mapMutations(k, u);
    }
  }
