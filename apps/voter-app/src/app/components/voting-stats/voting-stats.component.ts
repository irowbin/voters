import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { combineLatest, filter, Subject, takeUntil } from 'rxjs'
import { Person } from '../../models'
import { AppStoreFacade } from '../../+state/app-store.facade'

@Component({
  selector: 'app-voting-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting-stats.component.html',
  styleUrl: './voting-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingStatsComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>()

  public totalVotes = signal(0)

  public currentWinning = signal<Person>(undefined)

  public competingCandidates = signal<string>('')

  private appStoreFacade = inject(AppStoreFacade)

  public ngOnInit(): void {
    this.#selectVotingStatistics()
  }

  public ngOnDestroy(): void {
    this.toDestroy$.next()
    this.toDestroy$.complete()
  }
  #selectVotingStatistics() {
    combineLatest([
      this.appStoreFacade.selectTotalVote$,
      this.appStoreFacade.selectCurrentWinning$,
      this.appStoreFacade.selectCompetingCandidate$,
    ])
      .pipe(takeUntil(this.toDestroy$))
      .subscribe(([totalVotes, currentWinning, competingCandidates]) => {
        this.totalVotes.set(totalVotes)
        this.currentWinning.set(currentWinning)
        this.competingCandidates.set(
          competingCandidates
            .map((c) => `${c.name}: ${c.votes}`)
            .join(',\n ')
        )
      })
  }
}
