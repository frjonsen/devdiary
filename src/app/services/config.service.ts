import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public address: string = "https://localhost:8080";

  constructor() { }

}
