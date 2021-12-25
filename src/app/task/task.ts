let nextID: number = 1;
export class Task {
  private _id: number;
  private _title: string;
  private _description: string;
  private _date: Date;

  constructor(title?: string, description?: string, date?: Date, id?: number) {
    this._id = (id) ? id : nextID++;
    this._title = (title) ? title : '';
    this._description = (description) ? description : '';
    this._date = (date) ? date : new Date();
    let oneHour: number = (60*60*1000)
    this._date.setTime(this.date.getTime() + oneHour);
  }

  /**
   * Makes a new instance and copies the parameter's properties.
   * Returns the new instance.
   * @param task
   */
  static fromSelfCopy(task: Task) {
    const copy = new Task();
    copy._id = task._id;
    copy._title = task._title;
    copy._description = task._description;
    copy._date = task._date;
    return copy;
  }

  /**
   * Copies the parameter's properties to the instance
   * that called the method.
   * @param task
   */
  fromOther(task: Task) {
    this._id = task._id;
    this._title = task._title;
    this._description = task._description;
    this._date = task._date;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
