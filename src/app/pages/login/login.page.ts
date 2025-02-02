import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

interface LoginForm {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonRouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {

  }

  public formGroup: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.nullValidator] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(7), Validators.nullValidator] })
  });

  async login() {
    const loader = await this.loadingController.create({ message: 'Please wait...'});
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
