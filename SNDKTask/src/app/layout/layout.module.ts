import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { TaskDetailComponent } from './modules/task-detail/task-detail.component';
import { TaskServiceService } from './services/task-service.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailFormComponent } from './modules/task-detail/task-detail-form/task-detail-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    TaskDetailComponent,
    TaskDetailFormComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    TaskServiceService
  ]
})
export class LayoutModule { }
