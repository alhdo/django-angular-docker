import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class SettingProvider {
  constructor(private api: ApiService) { }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.get('/setting-provider', {}).pipe(
        map((response: any) => response.data)
      ).toPromise().catch(() => {
        // just ignore
      }).then((settings) => {
        sessionStorage.setItem('settings', JSON.stringify(settings));
      }).finally(() => {
        resolve(true);
      });
    });
  }
}
