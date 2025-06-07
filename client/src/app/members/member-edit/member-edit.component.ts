import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountsService } from '../../_services/accounts.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageEditorComponent } from "../image-editor/image-editor.component";

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule, ImageEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  member?: Member;

  private accountService = inject(AccountsService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;

    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.editForm?.reset(this.member);
        this.toastr.success('Profile updated successfully');
      }
    })
  }

  onMemberChange(event: Member) {
    this.member = event;
  }
}
