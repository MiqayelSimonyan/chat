import { Map } from 'immutable';

export interface SetMapTypeAllowedData<Y> extends Map<any, any> {
  get<K extends keyof Y>(key: K): Y[K];
  set<K extends keyof Y, V extends Y[K]>(key: K, value: V): this;
  setIn<K1 extends keyof Y>(keys: [K1, Y[K1] | number | string], val: any): this;
}
