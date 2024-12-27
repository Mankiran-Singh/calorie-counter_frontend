import { Component } from '@angular/core';
import { LogEntryComponent } from './components/log-entry/log-entry.component';
import { ViewEntriesComponent } from './components/view-entries/view-entries.component';
import { EntryService } from './services/entry.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[LogEntryComponent, ViewEntriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[EntryService]
})
export class AppComponent {
  title = 'calorieCounter';
}
