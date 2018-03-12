import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { EmailComponent } from './email/email';
import { SignupComponent } from './signup/signup';
import { MembersComponent } from './members/members';
@NgModule({
	declarations: [LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent],
	imports: [],
	exports: [LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent]
})
export class ComponentsModule {}
