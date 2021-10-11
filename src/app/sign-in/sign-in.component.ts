import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.signInForm = this.fb.group({
            username: [],
            password: [],
        })
    }

    onSubmit() {
        this.loginService.signIn(this.signInForm.value).subscribe(res => {

            if (res.accessToken) {
                localStorage.setItem('token', res.accessToken);
                this.router.navigate(['/dashboard']);
            }
        })
    }

    onSignIn(googleUser): void {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

}
