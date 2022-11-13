import { Injectable } from '@angular/core';
import { TaskDetail } from '../models/task-details';

@Injectable()
export class TaskServiceService {

  constructor() { }

  /**
   * 
   * @returns Task Array saved in localStorage
   */

  getAllTaskList(): TaskDetail[] {
    return JSON.parse(localStorage.getItem("TASK_LIST") || '[]');
  }

  /**
   * 
   * @param Save taskDetail array in localstorage 
   */

  saveTaskDetailsList(taskDetail: TaskDetail[]) {
    localStorage.setItem('TASK_LIST', JSON.stringify(taskDetail));
  }

  /**
   * 
   * @param taskDetail 
   * @param isRemove 
   * add/update/delete manage by this method
   */

  saveUpdateTaskDetail(taskDetail: TaskDetail, isRemove: boolean) {
    let taskDetailsList = this.getAllTaskList();
    const index = taskDetailsList.findIndex(x => x.id == taskDetail.id);
    if (index != -1) {
      isRemove ? taskDetailsList.splice(index, 1) : taskDetailsList[index] = taskDetail;
    } else {
      taskDetailsList.push(taskDetail);
    }
    console.log(isRemove);
    console.log("1====================")
    console.log("Task Details :: "+taskDetail);
    console.log("2========================")
    console.log(taskDetailsList);
    this.saveTaskDetailsList(taskDetailsList);
  }
}
