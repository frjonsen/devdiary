import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LoginService } from './login.service';
import { ConfigService } from './config.service';
import { async } from '@angular/core/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService, ConfigService]
    });
  });

  it('should be defined', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should login sucessfully', async(inject([LoginService], (service: LoginService, done: Function) => {
    let creds = {
      username: "someuse",
      password: "adecentpassword"
    };
    service.login(creds.username, creds.password).subscribe(() => {}, console.log);
  })));
});
