type AnyFunction = (...args: Array<any>) => any;
type ChangeCallback<T> = (nextValue: T) => void;

export interface QuickSettingsPanel<M = object> {
  destroy(): void;
  getValueAsJSON(asString: true): string;
  getValueAsJSON(asString: false): M;
  getValueAsJSON(): M;
  setValuesFromJSON(json: M | string): this;
  saveInLocalStorage(name: string): this;
  clearLocalStorage(name: string): this;
  setPosition(x: number, y: number): this;
  setSize(w: number, h: number): this;
  setWidth(w: number): this;
  setHeight(h: number): this;
  setDraggable(draggable: boolean): this;
  setGlobalChangeHandler(handler: ChangeCallback<object>): this;
  hide(): this;
  show(): this;
  toggleVisibility(): this;
  setCollapsible(collapsible: boolean): this;
  collapse(): this;
  expand(): this;
  toggleCollapsed(): this;
  setKey(char: string): this;
  removeControl(title: string): this;
  enableControl(title: string): this;
  disableControl(title: string): this;
  hideControl(title: string): this;
  showControl(title: string): this;
  overrideStyle(title: string, style: string, value: any): this;
  hideTitle(title: string): this;
  showTitle(title: string): this;
  hideAllTitles(): this;
  showAllTitles(): this;
  getValue(title: string): any;
  setValue(title: string, value: any): this;
  addBoolean(
    title: string,
    value: boolean,
    callback?: ChangeCallback<boolean>
  ): this;
  bindBoolean(
    title: string,
    value: boolean,
    object: object
  ): this;
  addButton(title: string, callback: () => void): this;
  addColor(
    title: string,
    color: string,
    callback: ChangeCallback<string>
  ): this;
  bindColor(title: string, color: string, object: object): this;
  addDate(
    title: string,
    date: string | Date,
    callback?: ChangeCallback<string | Date>
  ): this;
  bindDate(title: string, date: string | Date, object: object): this;
  addDropDown(
    title: string,
    items: Array<string | number | { label: string; value: string | number }>,
    callback?: ChangeCallback<{ index: number; value: any; label: string }>
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
    callback?: ChangeCallback<File>
  ): this;
  addHTML(title: string, html: string): this;
  addImage(
    title: string,
    imageUrl: string,
    callback?: ChangeCallback<string>
  ): this;
  addRange(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    callback?: ChangeCallback<number>
  ): this;
  addNumber(
    title: string,
    min: number,
    max: number,
    value: number,
    step: number,
    callback?: ChangeCallback<number>
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
    callback?: ChangeCallback<string>
  ): this;
  bindPassword(title: string, text: string, object: object): this;
  addProgressBar(
    title: string,
    max: number,
    value: number,
    valueDisplay: string
  ): this;
  setProgressMax(title: string, max: number): this;
  addText(title: string, text: string, callback: ChangeCallback<string>): this;
  bindText(title: string, text: string, object: object): this;
  addTextArea(
    title: string,
    text: string,
    callback: ChangeCallback<string>
  ): this;
  setTextAreaRows(title: string, rows: number): this;
  bindTextArea(title: string, text: string, object: object): this;
  addTime(
    title: string,
    time: string | Date,
    callback?: ChangeCallback<string | Date>
  ): this;
  bindTime(title: string, time: string | Date, object: object): this;
}

interface QuickSettings {
  create(
    x?: number,
    y?: number,
    panelTitle?: string,
    parent?: HTMLElement
  ): QuickSettingsPanel;
  useExtStyleSheet(): void;
}

declare var quickSettings: QuickSettings;
export default quickSettings;
