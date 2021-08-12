import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public filesHolder$: BehaviorSubject<
    {
      file: File;
      progress$: Observable<number>;
    }[]
  > = new BehaviorSubject([]);

  public removeSubscription : Subscription;

  constructor(private http: HttpClient) {}
  public addFiles(files) {
    this.filesHolder$.next([
      ...this.filesHolder$.value,
      ...Array.from(files).map((f: File) => {
        const formData = new FormData();
        formData.append('f', f);
        const request = new HttpRequest('POST', '/api/files', formData, {
          reportProgress: true,
        });
        return {
          file: f,
          progress$: this.http.request(request).pipe(
            map((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent: {
                  return 0;
                }
                case HttpEventType.UploadProgress: {
                  return Math.round((event.loaded / event.total) * 100);
                }
                case HttpEventType.Response: {
                  return 100;
                }
                default: {
                  return 0;
                }
              }
            })
          ),
        };
      }),
    ]);
  }

  public removeFile(index: number) {
    const f = Array.from(this.filesHolder$.value)[index].file;
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe()
    }
    this.removeSubscription =
    this.http.delete(`/api/files/${f.name}`).pipe(
      tap(() => {
        const files = this.filesHolder$.value;
        files.splice(index, 1)
        this.filesHolder$.next(files);
      }),
      catchError((err) => of(err))
      ).subscribe();
  }
}
