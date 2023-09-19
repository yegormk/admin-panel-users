import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}
