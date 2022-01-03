export class Task {
  static nextID: number = 1;
  public username: string;
  public id: number;
  public title: string;
  public description: string;
  public date: number;

  constructor(date?: number, description?: string, id?: number, title?: string, username?: string) {
    this.id = (id) ? id : Task.nextID++;
    this.username = (username) ? username : '';
    this.title = (title) ? title : '';
    this.description = (description) ? description : '';
    if (date) {
      this.date = date;
    } else {
      let oneHour: number = (60*60*1000)
      this.date = new Date().getTime() + oneHour;
    }
  }

  /**
   * Makes a new instance and copies the parameter's properties.
   * Returns the new instance.
   * @param task
   */
  static fromSelfCopy(task: Task) {
    const copy = new Task();
    copy.id = task.id;
    copy.username = task.username;
    copy.title = task.title;
    copy.description = task.description;
    copy.date = task.date;
    return copy;
  }

  /**
   * Copies the parameter's properties to the instance
   * that called the method.
   * @param task
   */
  fromOther(task: Task) {
    this.id = task.id;
    this.username = task.username;
    this.title = task.title;
    this.description = task.description;
    this.date = task.date;
  }

  /**
   * Decrements task id since task could not be saved to the database
   */
  static taskNotSaved() {
    this.nextID--;
  }
}
