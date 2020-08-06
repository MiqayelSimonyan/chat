export interface IActionCreator<T = undefined> {
  type: string;
  payload?: T;
};

export type ActionCreatorFunction<T = undefined> = (data?: T) => IActionCreator<T>;
