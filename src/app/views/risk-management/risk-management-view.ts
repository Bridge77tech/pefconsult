import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiskManagementPage } from '../../components/risk-management/risk-management-page/risk-management-page';
import { RiskManagementContentService } from '../../services/general/risk-management-content.service';
import type { RiskManagementContent } from '../../shared/risk-management/risk-management-content.interface';

@Component({
  selector: 'app-risk-management-view',
  standalone: true,
  imports: [RiskManagementPage],
  template: '<app-risk-management-page [content]="content"></app-risk-management-page>',
})
export class RiskManagementView {
  private route = inject(ActivatedRoute);
  private contentService = inject(RiskManagementContentService);

  content: RiskManagementContent = this.contentService.getContent(
    this.route.snapshot.data['contentId']
  );
}
