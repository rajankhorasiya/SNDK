import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDetail } from 'src/app/layout/models/task-details';

@Component({
  selector: 'app-task-detail-form',
  templateUrl: './task-detail-form.component.html',
  styleUrls: ['./task-detail-form.component.scss']
})
export class TaskDetailFormComponent implements OnInit {

  form!: FormGroup;
  taskDetail!: TaskDetail;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TaskDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.taskDetail = data.taskDetail;
    this.createForm();
  }

  ngOnInit(): void {
    this.setValue();
  }
  /**
   * Creating Form insatnce with field details.
   */
  createForm() {
    this.form = this.fb.group({
      name: [{ value: '' }, [Validators.required]],
      status: [{ value: '' }, [Validators.required]]
    });
  }

  /**
   * Patching value to fields.
   */

  setValue() {
    this.form.patchValue({
      name: this.taskDetail.name,
      status: this.taskDetail.status,
    })
  }

  /**
   * Closing dialog box.
   */

  close() {
    this.dialogRef.close(false);
  }

  /**
   * 
   * @returns TaskDetail.
   * This method will check validation and returns taskdetail object with submitted values.
   */

  submit() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    if (!this.taskDetail.id) {
      this.taskDetail.id = this.getRandomId();
    }
    this.taskDetail.name = this.form.controls.name.value;
    this.taskDetail.status = this.form.controls.status.value;
    this.dialogRef.close(this.taskDetail);
  }

  /**
   * 
   * @returns Generate Unique Id for tracking Task Information
   */

  getRandomId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

}
