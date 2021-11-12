import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalRelativeInterceptor } from './interceptors/universal-relative.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalRelativeInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
