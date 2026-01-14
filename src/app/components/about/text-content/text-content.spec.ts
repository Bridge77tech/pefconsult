import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextContent } from './text-content';

describe('TextContent', () => {
  let component: TextContent;
  let fixture: ComponentFixture<TextContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
