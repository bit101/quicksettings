type AnyFunction = (...args: Array<any>) => any;
type ChangeHandler<T> = (nextValue: T) => void;

export type AnyValue = string | number | boolean | Date;
export type AnyModel = Record<string, AnyValue>;

export interface QuickSettingsPanel<M = AnyModel> {
  destroy(): void;
  getValuesAsJSON(asString: true): string;
  getValuesAsJSON(asString: false): M;
  getValuesAsJSON(): M;
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

  addBoolean(
    title: string,
    value: boolean,
    callback?: ChangeHandler<boolean>
  ): this;
  bindBoolean(title: string, value: boolean, object: object): this;
  addButton(title: string, callback: () => void): this;
  addColor(title: string, color: string, callback: ChangeHandler<string>): this;
  bindColor(title: string, color: string, object: object): this;
  addDate(
    title: string,
    date: string | Date,
    callback?: ChangeHandler<string | Date>
  ): this;
  bindDate(title: string, date: string | Date, object: object): this;
  addDropDown(
    title: string,
    items: Array<string | number | { label: string; value: string | number }>,
    callback?: ChangeHandler<{ index: number; value: any; label: string }>
  ): this;
  bindDropDown(
    title: string,
    items: Array<string | number | { label: string; value: string | number }>,
    object: object
  ): this;
  addElement(title: string, element: HTMLElement): this;
  addFileChooser(
    title: string,
    labelStr: string,
    filter: string,
    callback?: ChangeHandler<File>
  ): this;
  addHTML(title: string, html: string): this;
  addImage(
    title: string,
    imageUrl: string,
    callback?: ChangeHandler<string>
  ): this;
  addRange(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    callback?: ChangeHandler<number>
  ): this;
  addNumber(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    callback?: ChangeHandler<number>
  ): this;
  bindRange(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    object: object
  ): this;
  bindNumber(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    object: object
  ): this;
  setRangeParameters(
    title: string,
    min: number,
    max: number,
    step: number
  ): this;
  setNumberParameters(
    title: string,
    min: number,
    max: number,
    step: number
  ): this;
  addPassword(
    title: string,
    text: string,
    callback?: ChangeHandler<string>
  ): this;
  bindPassword(title: string, text: string, object: object): this;
  addProgressBar(
    title: string,
    max: number,
    value: number,
    valueDisplay: string
  ): this;
  setProgressMax(title: string, max: number): this;
  addText(title: string, text: string, callback: ChangeHandler<string>): this;
  bindText(title: string, text: string, object: object): this;
  addTextArea(
    title: string,
    text: string,
    callback: ChangeHandler<string>
  ): this;
  setTextAreaRows(title: string, rows: number): this;
  bindTextArea(title: string, text: string, object: object): this;
  addTime(
    title: string,
    time: string | Date,
    callback?: ChangeHandler<string | Date>
  ): this;
  bindTime(title: string, time: string | Date, object: object): this;
}

interface QuickSettings {
  create<M = AnyModel>(
    x?: number,
    y?: number,
    panelTitle?: string,
    parent?: HTMLElement
  ): QuickSettingsPanel<M>;
  useExtStyleSheet(): void;
}

declare var quickSettings: QuickSettings;
export default quickSettings;
