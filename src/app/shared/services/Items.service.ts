import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Item, ItemState} from '../models/items.model';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    currentItem = null;
    searchInItemsKeyWord = new BehaviorSubject('');
    searchByTag = new BehaviorSubject('');
    searchTextApiUrl = 'https://tmclassanalysis-staging.herokuapp.com/classification-search/search-database/internal/api';


    constructor(public db: AngularFirestore, public toastrService: ToastrService, public httpClient: HttpClient) {
    }

    getItems() {
        return this.db.collection<Item>('items').snapshotChanges()
            .pipe(map(x => x.map(y => {
                return {id: y.payload.doc.id, ...y.payload.doc.data()};
            })));
    }

    getUserItems(userId: string) {
        return this.db.collection<Item>('items', ref => ref.where('user.email', '==', userId)).snapshotChanges()
            .pipe(map(x => x.map(y => {
                return {id: y.payload.doc.id, ...y.payload.doc.data()};
            })));
    }

    getOthersPendingItems(userId: string) {
        return this.db.collection<Item>('items', ref => ref.where('user.email', '<', userId)
            .where('user.email', '>', userId)
            .where('state', '==', 2)).snapshotChanges()
            .pipe(map(x => x.map(y => {
                return {id: y.payload.doc.id, ...y.payload.doc.data()};
            })));
    }

    createItem(item: Item) {
        Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {});
        Object.keys(item.user).forEach(key => item.user[key] === undefined ? delete item.user[key] : {});
        Object.keys(item.keywords).forEach(key => item.keywords[key] === undefined ? delete item.keywords[key] : {});
        const o = {user: {}, keywords: []};
        Object.keys(item).map(key => {
            if (key === 'user') {
                o['user'] = {...item.user};
            } else if (key === 'keywords') {
                o['keywords'] = item.keywords.map(keyword => {
                    return {...keyword};
                });
            } else {
                o[key] = item[key];
            }
        });
        this.db.collection('items').add(o).then(res => {
            this.toastrService.success('Item Added.');
        });
    }

    updateCurrentItem() {
        const item: Item = this.currentItem;
        localStorage.setItem('currentItem', JSON.stringify(item));
        Object.keys(item).forEach(key => item[key] === undefined ? delete item[key] : {});
        Object.keys(item.user).forEach(key => item.user[key] === undefined ? delete item.user[key] : {});
        Object.keys(item.keywords).forEach(key => item.keywords[key] === undefined ? delete item.keywords[key] : {});
        const o = {user: {}, keywords: []};
        Object.keys(item).map(key => {
            if (key === 'user') {
                o['user'] = {...item.user};
            } else if (key === 'keywords') {
                o['keywords'] = item.keywords.map(keyword => {
                    return {...keyword};
                });
            } else {
                o[key] = item[key];
            }
        });
        return this.db.doc('items/' + item.id).set(o).then((res) => {
            this.toastrService.success('Item Updated.');
        });
    }

    deleteItem(itemId: string) {
        this.db.doc('items/' + itemId).delete();
    }


    search(searchText) {
        const token = localStorage.getItem('token');
        return this.httpClient.get(`${this.searchTextApiUrl}?class-txt=&search-txt=${encodeURIComponent(searchText)}`
            , {headers: {Authorization: `Token ${token}`}});
    }
}
