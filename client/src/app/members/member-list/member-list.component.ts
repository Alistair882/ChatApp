import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MembersCardComponent } from '../members-card/members-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MembersCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);

  ngOnInit(): void {
    if (this.memberService.members().length === 0) this.loadMembers();
  }

  loadMembers()
  {
      this.memberService.getMembers();
  }
}
