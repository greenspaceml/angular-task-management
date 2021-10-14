import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    loginForm: FormGroup;
    socialUser: SocialUser;
    isLoggedin: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private socialAuthService: SocialAuthService
    ) {
    }

    ngOnInit(): void {
        this.signInForm = this.formBuilder.group({
            username: [],
            password: [],
            isGoogleSignUp: [false]
        });
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = (user != null);
            const userInfo = {
                username: this.socialUser.email,
                password: 'N0PasswordProvied',
                isGoogleSignUp: true
            }
            this.onSignInWithSocial(userInfo);
        });
    }

    onSubmit() {
        this.loginService.signIn(this.signInForm.value).subscribe(res => {
            if (res.accessToken) {
                localStorage.setItem('token', res.accessToken);
                this.router.navigate(['/dashboard']);
            }
        });
    }

    onSignInWithSocial(value): void {
        this.loginService.signIn(value).subscribe(res => {
            if (res.accessToken) {
                localStorage.setItem('token', res.accessToken);
                this.router.navigate(['/dashboard']);
            }
        });
    }

    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    logOut(): void {
        this.socialAuthService.signOut();
    }

}
