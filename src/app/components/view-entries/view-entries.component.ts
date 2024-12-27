import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-view-entries',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.scss'],
  providers: [EntryService],
})
export class ViewEntriesComponent implements OnInit {
  date: Date | null = null; // Changed from string to Date type
  displayedColumns: string[] = ['name', 'food', 'calories'];
  entries: any;
  totalEntries = 0;
  pageSize = 10;
  currentPage = 0;
  isLoading = false;

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    // this.fetchAllEntries(); 
  }

  fetchEntries(): void {
    if (!this.date) {
      alert('Please select a date!');
      return;
    }

    const formattedDate = this.date.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'

    this.isLoading = true;
    this.entryService.getEntriesByDate(formattedDate, this.pageSize, this.currentPage).subscribe(
      (response) => {
        console.log(response);
        this.entries = response.entries;
        this.totalEntries = response.totalEntries;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching entries:', error);
        this.isLoading = false;
        alert('Failed to load entries. Please try again later.');
      }
    );
  }

  fetchAllEntries(): void {
    this.isLoading = true;
    this.entryService.getAllEntries().subscribe(
      (response) => {
        this.entries = response.entries;
        this.totalEntries = response.totalEntries;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching all entries:', error);
        this.isLoading = false;
        alert('Failed to load entries. Please try again later.');
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.date) {
      this.fetchEntries();
    } else {
      this.fetchAllEntries();
    }
  }
}
