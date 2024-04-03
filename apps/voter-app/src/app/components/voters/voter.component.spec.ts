import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VoterComponent } from './voter.component'
import { AppStoreFacade } from '../../+state/app-store.facade'
import { provideMockStore } from '@ngrx/store/testing'

describe('VoterComponent', () => {
  let component: VoterComponent
  let fixture: ComponentFixture<VoterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterComponent],
      providers: [AppStoreFacade, provideMockStore({})],
    }).compileComponents()

    fixture = TestBed.createComponent(VoterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
