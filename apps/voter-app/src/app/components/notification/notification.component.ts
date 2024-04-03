import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { AppNotification } from '../../models'
import { Subject, takeUntil } from 'rxjs'
import { fadeInOut } from '../../utils/animation.utils'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
})
export class NotificationComponent implements OnInit, OnDestroy {
  public readonly toDestroy$ = new Subject<void>()

  public notifications = signal<AppNotification[]>([])

  private readonly appStoreFacade = inject(AppStoreFacade)

  public ngOnInit(): void {
    this.#selectNotifications()
  }

  public ngOnDestroy(): void {
    this.toDestroy$.next()
    this.toDestroy$.complete()
  }

  public removeNotification(message: string): void {
    this.appStoreFacade.removeNotification(message)
  }

  public trackNotification(_: number, notification: AppNotification): string {
    return notification.message
  }

  #removeAfterTimer() {
    this.notifications()?.forEach((notification) => {
      setTimeout(() => {
        this.appStoreFacade.removeNotification(notification.message)
      }, notification.hideAfter)
    })
  }

  #selectNotifications() {
    this.appStoreFacade.selectNotification$
      .pipe(takeUntil(this.toDestroy$))
      .subscribe((notifications) => {
        this.notifications.set(notifications)
        this.#removeAfterTimer()
      })
  }
}
