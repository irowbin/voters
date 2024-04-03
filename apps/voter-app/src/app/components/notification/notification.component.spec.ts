import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NotificationComponent } from './notification.component'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { provideMockStore } from '@ngrx/store/testing'

describe('NotificationComponent', () => {
  let component: NotificationComponent
  let fixture: ComponentFixture<NotificationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [AppStoreFacade, provideMockStore({})],
    }).compileComponents()

    fixture = TestBed.createComponent(NotificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
