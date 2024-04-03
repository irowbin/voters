import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { VoterListComponent } from '../voter-list/voter-list.component'
import { filter, Subject, takeUntil } from 'rxjs'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { Person } from '../../models'

@Component({
  selector: 'app-voter',
  standalone: true,
  imports: [CommonModule, VoterListComponent],
  templateUrl: './voter.component.html',
  styleUrl: './voter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoterComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>()

  private appStoreFacade = inject(AppStoreFacade)

  public voters = signal<Person[]>([])

  public fieldNames: [string, string] = ['name', 'voted']

  public ngOnInit(): void {
    this.#selectVoters()
  }

  public ngOnDestroy(): void {
    this.toDestroy$.next()
    this.toDestroy$.complete()
  }

  public addVoter(name: string): void {
    this.appStoreFacade.addVoter({ name, voted: false } as Person)
  }

  #selectVoters(): void {
    this.appStoreFacade.selectVoter$
      .pipe(
        filter((data) => Boolean(data)),
        takeUntil(this.toDestroy$)
      )
      .subscribe((voters) => {
        this.voters.set(voters)
      })
  }
}
