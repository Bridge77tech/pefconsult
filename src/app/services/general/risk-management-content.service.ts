import { Injectable } from '@angular/core';
import type { RiskManagementContent } from '../../shared/risk-management/risk-management-content.interface';
import { RISK_MANAGEMENT_CONTENT } from '../../shared/risk-management/risk-management-content.data';

@Injectable({
  providedIn: 'root',
})
export class RiskManagementContentService {
  getContent(key: string): RiskManagementContent {
    const content = RISK_MANAGEMENT_CONTENT[key];
    if (!content) {
      throw new Error(`[RiskManagementContentService] No content found for key: "${key}"`);
    }
    return content;
  }
}
