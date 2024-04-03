import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-guidance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guidance.component.html',
  styleUrl: './guidance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidanceComponent {

  public guidanceMessages = [
    `To include a new candidate or voter, click the plus icon, input a name, and press enter or click the check icon to generate a new record.`,
    'To place a vote, choose options from both dropdown menus and press submit. After submitting, the "Voted" column for the voter will show "Yes," and the candidate\'s vote count will increase.',
  ]

}
