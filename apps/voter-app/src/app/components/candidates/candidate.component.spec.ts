import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CandidateComponent } from './candidate.component'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { provideMockStore } from '@ngrx/store/testing'

describe('CandidateComponent', () => {
  let component: CandidateComponent
  let fixture: ComponentFixture<CandidateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateComponent],
      providers: [AppStoreFacade, provideMockStore({})],
    }).compileComponents()

    fixture = TestBed.createComponent(CandidateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
