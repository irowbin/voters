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
import { Person } from '../../models'
import { AppStoreFacade } from '../../+state/app-store.facade'

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, VoterListComponent],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>()

  private appStoreFacade = inject(AppStoreFacade)

  public candidates = signal<Person[]>([])

  public fieldNames: [string, string] = ['name', 'votes']

  public ngOnInit(): void {
    this.#selectCandidates()
  }

  public ngOnDestroy(): void {
    this.toDestroy$.next()
    this.toDestroy$.complete()
  }

  public addCandidate(name: string): void {
    this.appStoreFacade.addCandidate({ name, votes: 0 } as Person)
  }

  #selectCandidates(): void {
    this.appStoreFacade.selectCandidate$
      .pipe(
        filter((data) => Boolean(data)),
        takeUntil(this.toDestroy$)
      )
      .subscribe((candidates) => {
        this.candidates.set(candidates)
      })
  }
}
