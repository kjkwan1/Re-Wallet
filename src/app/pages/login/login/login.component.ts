import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonButtons,
  IonToolbar,
  IonInput,
  IonCardSubtitle
} from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import { ToastService } from '@shared/services/toast/toast.service';
import { LoginForm } from '../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonCard,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonButtons,
    IonToolbar,
    IonInput,
    IonCardSubtitle,
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {

  }

  public formGroup: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl('', { validators: [Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(7)] })
  });

  async login() {
    const loader = await this.loadingController.create({ message: 'Please wait...' });
    await loader.present();

    const email = this.formGroup.get('email')!;
    const password = this.formGroup.get('password')!;

    if (!email.value || !password.value || typeof email.value !== 'string' || typeof password.value !== 'string') {
      this.toastService.toast({ message: 'Please complete the form to continue', color: 'warning' });
      await loader.dismiss();
      return;
    }

    if (!this.formGroup.valid) {
      let message = 'email and password invalid';
      if (!email.valid && password.valid) {
        message = 'Please enter valid email';
      } else if (!password.valid && email.valid) {
        message = 'Please enter valid password';
      }

      this.toastService.toast({ message, color: 'warning' });
      await loader.dismiss();
      return;
    }

    console.log('submit with: ', email.value, password.value);
    const result = await this.authenticationService.authenticate(email.value, password.value);
    loader.blur();
    await loader.dismiss();

    if (result) {
      this.toastService.toast({ message: 'Success!', color: 'success' });
      await this.navigationService.navigateHome();
    }
  }
}
