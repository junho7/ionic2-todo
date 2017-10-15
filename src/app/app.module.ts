import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { Storage } from '@ionic/storage';
import { IonicStorageModule } from "@ionic/storage";
import { Data } from '../providers/data';
import { AddtodoPage } from '../pages/addtodo/addtodo';

// export function provideStorage() { return new Storage(); }
@Injectable()
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        AddtodoPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule,
        IonicStorageModule.forRoot({
            name: 'MyApp',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        AddtodoPage
    ],
    providers: [StatusBar,
        SplashScreen, Data, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {
}
