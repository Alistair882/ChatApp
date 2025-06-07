import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
import { ProfilePicture } from '../_models/ProfilePictures';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);
  

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: members => this.members.set(members),
    });
  }

  getMember(username: string) {
    const member = this.members().find(x => x.username === username);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl+ 'users', member).pipe(
      tap(() => {
        this.members.update(members => members.map(x => x.username === member.username ? member : x));
      })
    );
  }

  setProfilePicture(image: ProfilePicture) {
    return this.http.put(this.baseUrl + 'users/set-main-image/' + image.id, {}).pipe(
      tap(() => this.members.update(members => members.map(x => {
        if (x.profilePicture.includes(image)) {
          x.photoUrl = image.url;
        }
        return x;
      })))
    );
  }

  deleteImage(image: ProfilePicture) {
    return this.http.delete(this.baseUrl + 'users/delete-image/' + image.id).pipe(
      tap(() => {
        this.members.update(members => members.map(x => {
          if (x.profilePicture.includes(image)) {
            x.profilePicture = x.profilePicture.filter(p => p.id !== image.id);
          }
          return x;
        }));
      })
    );
  }

}