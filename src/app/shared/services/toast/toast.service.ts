import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  public toast(config: Parameters<typeof this.toastController.create>[0], timeout: number = 1200): void {
    let ref: HTMLIonToastElement;

    this.toastController.create(config)
      .then((toast) => {
        ref = toast;
        return toast.present();
      })
      .then(() => new Promise((resolve) => setTimeout(resolve, timeout)))
      .then(() => {
        ref.blur();
        ref.dismiss();
      });
  }
}
