// TypeScript Version: 3.7
type AnyFunction = (...args: any[]) => any;

export type ChangeHandler<T> = (value: T) => void;
export type AnyValue = any;

export type AnyModel = Record<string, AnyValue>;

type KeyWhereType<M, V> = {
  [K in keyof M]: M[K] extends V ? K : never;
}[keyof M];

export interface DropDownOption<T> {
  label: string;
  value: T;
}

export interface DropDownSelection<T> {
  index: number;
  label: string;
  value: T;
}

export type DropDownItems<T> = Array<(T & (string | number)) | DropDownOption<T>>;

type NonLiteral<T> = T extends number ? T | number : T extends string ? T | string : T;

export interface QuickSettingsPanel<M = AnyModel> {
  destroy(): void;
  getValuesAsJSON(asString: true): string;
  getValuesAsJSON(asString?: false): M;
  setValuesFromJSON(json: M | string): this;
  saveInLocalStorage(name: string): this;
  clearLocalStorage(name: string): this;
  setPosition(x: number, y: number): this;
  setSize(w: number, h: number): this;
  setWidth(w: number): this;
  setHeight(h: number): this;
  setDraggable(draggable: boolean): this;
  setGlobalChangeHandler(handler: ChangeHandler<M>): this;
  hide(): this;
  show(): this;
  toggleVisibility(): this;
  setCollapsible(collapsible: boolean): this;
  collapse(): this;
  expand(): this;
  toggleCollapsed(): this;
  setKey(char: string): this;
  removeControl(title: keyof M): this;
  enableControl(title: keyof M): this;
  disableControl(title: keyof M): this;
  hideControl(title: keyof M): this;
  showControl(title: keyof M): this;
  overrideStyle(title: keyof M, style: string, value: any): this;
  hideTitle(title: keyof M): this;
  showTitle(title: keyof M): this;
  hideAllTitles(): this;
  showAllTitles(): this;

  getValue<K extends keyof M>(title: K): M[K];
  setValue<K extends keyof M>(title: K, value: M[K]): this;

  addBoolean(title: KeyWhereType<M, boolean>, value: boolean, callback?: ChangeHandler<boolean>): this;
  bindBoolean<K extends KeyWhereType<M, boolean>>(title: K, value: boolean, object: Record<K, boolean>): this;

  addButton(title: string, callback: () => void): this;

  addColor(title: KeyWhereType<M, string>, color: string, callback: ChangeHandler<string>): this;
  bindColor<K extends KeyWhereType<M, string>>(title: K, color: string, object: Record<K, string>): this;

  addDate<K extends KeyWhereType<M, string | Date>, V extends M[K]>(title: K, date: V, callback?: ChangeHandler<V>): this;

  bindDate<K extends KeyWhereType<M, string | Date>, V extends M[K]>(title: K, date: V, object: Record<K, V>): this;

  addDropDown<K extends keyof M>(title: K, items: DropDownItems<M[K]>, callback?: ChangeHandler<DropDownSelection<M[K]>>): this;
  bindDropDown<K extends keyof M>(title: K, items: DropDownItems<M[K]>, object: Pick<M, K>): this;

  addElement(title: string, element: HTMLElement): this;

  addFileChooser(title: string, labelStr: string, filter: string, callback?: ChangeHandler<File>): this;
  addHTML(title: string, html: string): this;
  addImage(title: string, imageUrl: string, callback?: ChangeHandler<string>): this;
  addRange(title: string, min: number, max: number, value: number, step: number, callback?: ChangeHandler<number>): this;
  addNumber(title: string, min: number, max: number, value: number, step: number, callback?: ChangeHandler<number>): this;
  bindRange(title: string, min: number, max: number, value: number, step: number, object: object): this;
  bindNumber(title: string, min: number, max: number, value: number, step: number, object: object): this;
  setRangeParameters(title: string, min: number, max: number, step: number): this;
  setNumberParameters(title: string, min: number, max: number, step: number): this;
  addPassword(title: string, text: string, callback?: ChangeHandler<string>): this;
  bindPassword(title: string, text: string, object: object): this;
  addProgressBar(title: string, max: number, value: number, valueDisplay: string): this;
  setProgressMax(title: string, max: number): this;

  addText(title: KeyWhereType<M, string>, text: string, callback?: ChangeHandler<string>): this;
  bindText<K extends KeyWhereType<M, string>>(title: K, text: string, object: Record<K, string>): this;

  addTextArea(title: string, text: string, callback: ChangeHandler<string>): this;
  setTextAreaRows(title: string, rows: number): this;
  bindTextArea(title: string, text: string, object: object): this;
  addTime(title: string, time: string | Date, callback?: ChangeHandler<string | Date>): this;
  bindTime(title: string, time: string | Date, object: object): this;
}

interface QuickSettings {
  // tslint:disable-next-line no-unnecessary-generics
  create<M = AnyModel>(x?: number, y?: number, panelTitle?: string, parent?: HTMLElement): QuickSettingsPanel<M>;
  useExtStyleSheet(): void;
}

declare var quickSettings: QuickSettings;
export default quickSettings;
