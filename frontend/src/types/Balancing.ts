import type { BalancingAsset } from "./BalancingAsset";

export interface Balancing {
    id: number;
    user_id: number;
    total_value: number;
    created_at?: string;
    updated_at?: string;
    assets?: BalancingAsset[];
  }