import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskDetail } from '../../models/task-details';
import { TaskServiceService } from '../../services/task-service.service';
import { TaskDetailFormComponent } from './task-detail-form/task-detail-form.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  allTaskList: TaskDetail[] = [];
  completedTaskList: TaskDetail[] = [];
  pendingTaskList: TaskDetail[] = [];

  displayedColumns = ['name', 'edit', 'remove'];
  dataSource!: MatTableDataSource<TaskDetail>;
  dataSource2!: MatTableDataSource<TaskDetail>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private taskService: TaskServiceService, private dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
    this.setPaginatorData();
  }

  ngOnInit(): void {
    this.refreshData();
  }
  /**
   * To refresh Information whenever change detected or happen in application.
   */
  refreshData() {
    this.allTaskList = this.taskService.getAllTaskList();
    if (this.allTaskList.length > 0) {
      this.completedTaskList = this.allTaskList.filter(x => x.status === 'Completed');
      this.pendingTaskList = this.allTaskList.filter(x => x.status === 'Pending');
      this.dataSource = new MatTableDataSource(this.pendingTaskList);
      this.dataSource2 = new MatTableDataSource(this.completedTaskList);
    }
    this.setPaginatorData();
  }

  /**
   * 
   * @param event 
   * To perform drag and drop from pending to completed and vicevers.
   */

  drop(event: CdkDragDrop<TaskDetail[]>) {
    if (event.previousContainer !== event.container) {
      let element: TaskDetail = event.item.data;
      element.status = element.status === 'Pending' ? 'Completed' : 'Pending';
      this.taskService.saveUpdateTaskDetail(element, false);
      this.refreshData();
    }
  }

  /**
   * 
   * @param event 
   * Filtering Data in Mat Table for Pending Task List
   */

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * 
   * @param event 
   * Filtering Data in Mat Table for completed Task List
   */

  applyFilterForCompleted(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }
  /* 
    This function will update paginator information on data adding, removing operation or filter
    operation.
  */
  setPaginatorData() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator.toArray()[0];
    }
    if (this.dataSource2) {
      this.dataSource2.paginator = this.paginator.toArray()[1];
    }
  }

  /**
   * 
   * @param TaskDetail
   * This method is reponsible for Adding and update operation of TaskData.
   */

  addTask(element?: TaskDetail) {
    if (!element) {
      element = new TaskDetail();
    }
    let modelRef = this.dialog.open(TaskDetailFormComponent, {
      width: '45%',
      data: {
        taskDetail: element
      }
    })
    modelRef.afterClosed().subscribe(res => {
      if (res) {
        this.taskService.saveUpdateTaskDetail(res, false);
        this.refreshData();
      }
    })
  }

  /**
   * 
   * @param taskDetail
   * This method is responsible for removing Task detail from list.
   */

  removeTask(element: TaskDetail) {
    this.taskService.saveUpdateTaskDetail(element, true);
    this.refreshData();
  }

}
