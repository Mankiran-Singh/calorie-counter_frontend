import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryService } from '../../services/entry.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-log-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.scss'],
  providers: [EntryService],
})
export class LogEntryComponent {
  logEntryForm: FormGroup;

  constructor(private fb: FormBuilder, private entryService: EntryService) {
    this.logEntryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required]],
      food: ['', [Validators.required, Validators.maxLength(50)]],
      calories: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5000)],
      ],
    });
  }

  get name() {
    return this.logEntryForm.get('name');
  }

  get date() {
    return this.logEntryForm.get('date');
  }

  get food() {
    return this.logEntryForm.get('food');
  }

  get calories() {
    return this.logEntryForm.get('calories');
  }

  logEntry() {
    if (this.logEntryForm.valid) {
      const formData = { ...this.logEntryForm.value };
    
      const selectedDate = formData.date;
      const formattedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      ).toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
  
      formData.date = formattedDate;
  
      this.entryService.addEntry(formData).subscribe((response) => {
        console.log('Entry added:', response);
        this.logEntryForm.reset();
      });
    }
  }
  
}
