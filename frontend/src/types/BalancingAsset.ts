export interface BalancingAsset {
    id?: number;
    balancing_id?: number;
    asset_type: string;
    current_value: number;
    current_percentage: number;
    desired_percentage: number;
    updated_value: number;
  }
  