import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from './domain/file/service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public filesHolder$: Observable<
    { file: File; progress$: Observable<number> }[]
  > = this.fileService.filesHolder$.asObservable();
  @ViewChild('fileinput', { static: true })
  fileinput: ElementRef<HTMLInputElement>;
  public over: boolean = false;

  constructor(private fileService: FileService) {}

  openFile() {
    this.fileinput.nativeElement.click();
  }

  addFiles($event) {
    const files = $event.target.files;
    this.fileService.addFiles(files);
  }

  removeFile(index: number) {
    this.fileService.removeFile(index);
  }

  dropFile($event) {
    if ($event.dataTransfer) {
      const files = $event.dataTransfer.files;
      this.fileService.addFiles(files);
    }
  }
}
