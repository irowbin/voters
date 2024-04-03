import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { combineLatest, Subject, takeUntil } from 'rxjs'
import { Person } from '../../models'

@Component({
  selector: 'app-vote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vote-form.component.html',
  styleUrl: './vote-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteFormComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>()
  private appStoreFacade = inject(AppStoreFacade)
  public selectedVoter: Person
  public selectedCandidate: Person
  public voters = signal<Person[]>([])
  public candidates = signal<Person[]>([])

  public ngOnInit(): void {
    this.#selectVotersCandidate()
  }

  public ngOnDestroy(): void {
    this.toDestroy$.next()
    this.toDestroy$.complete()
  }

  public castVote(): void {
    if (!this.selectedVoter || !this.selectedCandidate) return

    this.appStoreFacade.submitVote(
      this.selectedVoter.id,
      this.selectedCandidate.id
    )
  }

  #selectVotersCandidate(): void {
    combineLatest([
      this.appStoreFacade.selectVoter$,
      this.appStoreFacade.selectCandidate$,
    ])
      .pipe(takeUntil(this.toDestroy$))
      .subscribe(([voters, candidates]) => {
        this.voters.set(voters)
        this.candidates.set(candidates)
      })
  }
}
