import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageRef = firebase.app().storage().ref();

  constructor() {}

  async uploadImg(name: string, imgBase64: any) {
    try {
      let resp = await this.storageRef
        .child('tests/' + name)
        .putString(imgBase64, 'data_url');
      return await resp.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
