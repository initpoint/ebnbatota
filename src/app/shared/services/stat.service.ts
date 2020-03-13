import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from './auth.service';
import {Stat} from '../models/stats.model';
import * as firebase from 'firebase';
import {AngularFireAnalytics} from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(public db: AngularFirestore, private toastrService: ToastrService,
              public authService: AuthService, public analytics: AngularFireAnalytics) {
  }

  missingFeature(tag: string) {
    this.toastrService.warning('Ops, this feature isn\'t here yet!! But since you want it we\'ll do it faster.');
    this.analytics.logEvent(tag);

    this.db.collection<Stat>('stats').doc(tag).get().subscribe(doc => {
      if (doc.exists) {
        this.db.collection('stats').doc(tag).update({
          dates: firebase.firestore.FieldValue.arrayUnion(Date.now()),
          users: firebase.firestore.FieldValue.arrayUnion(this.authService.currentUser),
          tag,
          count: firebase.firestore.FieldValue.increment(1)
        });
      } else {
        const stat: Stat = {
          dates: [Date.now()], users: [this.authService.currentUser],
          tag, count: 1
        };
        this.db.collection('stats').doc(tag).set(stat);
      }
    });

  }

}
