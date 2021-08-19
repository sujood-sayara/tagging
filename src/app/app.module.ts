import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from '.././app/helper/basic-auth.interceptor';
import { ErrorInterceptor } from '.././app/helper/error.interceptor';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './helper/auth.guard';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { MainPageComponent } from './landing_page/main-page/main-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { TagComponent } from './landing_page/tag/tag.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { AddDialog } from './landing_page/tag/tag.component';
import { EffectsModule } from '@ngrx/effects';
import { reducertag } from './reducers/tag.reducer';
import { tagEffects } from './effects/tag.effect';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { imageEffects } from './effects/image.effect';
import { reducerimage } from './reducers/image.reducer';
import { AddImageDialog } from './landing_page/main-page/addImageDialog';
import { UpdateTagDialog } from './landing_page/main-page/updateImageDialog';
import {MatSelectModule} from '@angular/material/select';
import {CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md'
import { ButtonsModule, CardsModule } from 'angular-bootstrap-md'
import { updateDialog } from './landing_page/tag/updateTag_dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmationDialog } from './shared/header/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    HeaderComponent,
    TagComponent,
    AddDialog,
    AddImageDialog,
    UpdateTagDialog,
    updateDialog,
    ConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatFormFieldModule, // it's redundant here since MatInputModule already exports it
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ tag: reducertag, image: reducerimage }),
    EffectsModule.forRoot([tagEffects, imageEffects]),
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule, 
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    WavesModule.forRoot(),
    ButtonsModule, 
    CardsModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
