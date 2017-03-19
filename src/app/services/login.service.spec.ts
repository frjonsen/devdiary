import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { LoginService } from './login.service';
import { ConfigService } from './config.service';
import { async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService, ConfigService, {
        provide: XHRBackend, useClass: MockBackend
      }],
    });
  });

  it('should be defined', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should login sucessfully',
  async(inject([LoginService, XHRBackend], (service: LoginService, mockBackend: MockBackend) => {

    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 204
      })));
    })

    const creds = {
      username: 'someuse',
      password: 'adecentpassword'
    };
    service.login(creds.username, creds.password).subscribe((res) => {
      expect(res).toBeTruthy(); },
      () => expect(false).toBeTruthy()
      );
  })));

  it('should fail to login',
  async(inject([LoginService, XHRBackend], (service: LoginService, mockBackend: MockBackend) => {

    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 422,
        body: 'Incorrect username or password'
      })));
    });

    service.login('someuser', 'anincorrect password').subscribe(
      (res) => { expect(false).toBeTruthy() },
      (err: Error) => expect(err.message).toEqual('Incorrect username or password')
    );
  })));

  it('should throw error for missing parameter',
  async(inject([LoginService, XHRBackend], (service: LoginService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 400,
        body: 'Missing parameter "username" or "password"'
      })));
    });

    service.login('someuser', 'anincorrectpassword').subscribe(
      (res) => { expect(res).toBeTruthy(); },
      (err: Error) => expect(err.message).toEqual('Missing parameter "username" or "password"'));
  })));
});
