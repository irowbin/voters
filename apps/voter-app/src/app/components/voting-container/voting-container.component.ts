import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VoterComponent } from '../voters/voter.component'
import { VoteFormComponent } from '../vote-form/vote-form.component'
import { CandidateComponent } from '../candidates/candidate.component'
import { NotificationComponent } from '../notification/notification.component'
import { GuidanceComponent } from '../guidance/guidance.component'

@Component({
  selector: 'app-voting-container',
  standalone: true,
  imports: [
    CommonModule,
    VoterComponent,
    VoteFormComponent,
    CandidateComponent,
    NotificationComponent,
    GuidanceComponent,
  ],
  templateUrl: './voting-container.component.html',
  styleUrl: './voting-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingContainerComponent {}
