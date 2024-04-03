import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VoteFormComponent } from './vote-form.component'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { provideMockStore } from '@ngrx/store/testing'

describe('VoteFormComponent', () => {
  let component: VoteFormComponent
  let fixture: ComponentFixture<VoteFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteFormComponent],
      providers: [AppStoreFacade, provideMockStore({})],
    }).compileComponents()

    fixture = TestBed.createComponent(VoteFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
