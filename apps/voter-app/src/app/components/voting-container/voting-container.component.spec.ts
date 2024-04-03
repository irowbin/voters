import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VotingContainerComponent } from './voting-container.component'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { provideMockStore } from '@ngrx/store/testing'

describe('VotingContainerComponent', () => {
  let component: VotingContainerComponent
  let fixture: ComponentFixture<VotingContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingContainerComponent],
      providers: [AppStoreFacade, provideMockStore({})],
    }).compileComponents()

    fixture = TestBed.createComponent(VotingContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
