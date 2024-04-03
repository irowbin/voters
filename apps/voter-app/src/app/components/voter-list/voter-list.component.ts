import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Person } from '../../models'
import { FormsModule } from '@angular/forms'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { Subject, combineLatest, takeUntil, filter } from 'rxjs'

@Component({
  selector: 'app-voter-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voter-list.component.html',
  styleUrl: './voter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoterListComponent {

  @ViewChild('entityNameInput')
  public entityNameInput: ElementRef<HTMLInputElement>

  @Input()
  public dataType: 'voter' | 'candidate' = 'voter'

  @Input()
  public heading = ''

  @Input()
  public data: Person[] = []

  @Input()
  public fieldName: [string, string] = ['', '']

  @Output()
  public readonly add = new EventEmitter<string>()

  public showInput = false

  public name = ''


  public newEntry(): void {
    this.showInput = !this.showInput
    this.#focusInput()
  }

  public addEntry(): void {
    if (!this.name?.trim()) return

    this.add.emit(this.name)

    this.name = ''
    this.showInput = false
  }

  #focusInput() {
    if (!this.showInput) return
    setTimeout(() => this.entityNameInput.nativeElement.focus(), 100)
  }
}
