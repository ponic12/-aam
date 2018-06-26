import { NgModule, ModuleWithProviders } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { CommonModule } from '@angular/common'
import { CoreModule } from '../shared/core/core.module'


import { HoursComponent } from './components/hours/hours.component'
import { ToolsBarComponent } from './components/tools-bar/tools-bar.component'

import { ApplicationService } from './services/application.service'
import { GlobalService } from './services/global.service'
// import { FirebaseStorage } from 'firebase/storage'
import 'firebase/storage'; 
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

@NgModule({
   imports: [
      CommonModule,
      IonicModule,
      IonicStorageModule.forRoot(),
      CoreModule
   ],
   declarations: [
      HoursComponent,
      ToolsBarComponent
   ],
   exports: [
      HoursComponent,
      ToolsBarComponent
   ]
})
export class SharedModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: SharedModule,
         providers: [
            GlobalService,
            ApplicationService
            //   AngularFireAuth,
            //   AngularFireDatabase
         ]
      };
   }
}
