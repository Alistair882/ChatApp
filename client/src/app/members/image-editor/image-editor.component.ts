import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountsService } from '../../_services/accounts.service';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { ProfilePicture } from '../../_models/ProfilePictures';

@Component({
  selector: 'app-image-editor',
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.scss'
})
export class ImageEditorComponent implements OnInit {

  private accounteService = inject(AccountsService);
  private memberService = inject(MembersService)
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseURL = environment.apiUrl
  memberChange = output<Member>();

  ngOnInit(): void {
    this.iniatilizeUploader();
    for (const image of this.member().profilePicture) {
      console.log(image);
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
    }

    iniatilizeUploader() {
      this.uploader = new FileUploader({
        url: this.baseURL + 'users/add-image',
        authToken: 'bearer ' + this.accounteService.currentUser()?.token,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024 //10 mb
      });

      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false
      }

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        const image = JSON.parse(response);
        const updatedMember = {...this.member()}

        updatedMember.profilePicture.push(image);
        this.memberChange.emit(updatedMember);
      }
    }

    deleteProfilePicture(image: ProfilePicture) {
      this.memberService.deleteImage(image, this.member().id).subscribe({
        next: _ => {
          const updatedMember = {...this.member()}
          updatedMember.profilePicture = updatedMember.profilePicture.filter(i => i.id !== image.id);
          this.memberChange.emit(updatedMember);
        }
      })
    }

    setProfilePicture(image: ProfilePicture) {
      this.memberService.setProfilePicture(image).subscribe({
        next: _ => {
          const user = this.accounteService.currentUser();
          if (user) {
            user.userProfilePicUrl = image.url;
            this.accounteService.setCurrentUser(user);
          }
          const updatedMember = {...this.member()}
          updatedMember.photoUrl = image.url;
          updatedMember.profilePicture.forEach(i => {
            if(i.currentProfilePicture) i.currentProfilePicture = false;
            if(i.id === image.id) i.currentProfilePicture = true;
          });
          this.memberChange.emit(updatedMember);
        }
      });
    }
}
