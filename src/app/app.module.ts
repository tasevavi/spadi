import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics'
//import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getPerformance } from 'firebase/performance';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { DonateComponent } from './donate/donate.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonateComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireModule, 
    AngularFireAnalyticsModule, 
    BrowserAnimationsModule, 
    CoreModule, 
    UserModule,
    FormsModule, 
    SharedModule,
    MatProgressSpinnerModule, 
    MatCardModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
