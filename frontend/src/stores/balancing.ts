import { defineStore } from 'pinia';
import apiClient from '@/utils/axios';
import type { Balancing } from '@/types/Balancing';
import type { BalancingAsset } from '@/types/BalancingAsset';

export const useBalancingStore = defineStore('balancing', {
    state: () => ({
        balancings: [] as Balancing[],
        balancing_assets: [] as BalancingAsset[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchBalancings() {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get('/balancings');
                this.balancings = response.data;
            } catch (e: any) {
                this.error = 'Failed to load Balancings';
            } finally {
                this.loading = false;
            }
        },
        async createBalancingWithAssets(totalValue: number, assets: Partial<BalancingAsset>[]) {
            this.loading = true;
            this.error = null;

            try {
                const response = await apiClient.post('/balancings', {
                    balancing: { total_value: totalValue, balancing_assets_attributes: assets },
                });
                const createdBalancing = response.data;
                this.balancings.push(createdBalancing);
                alert('created')
                return createdBalancing;
            } catch (err: any) {
                this.error = 'Failed to create Balancing with assets';
                console.error(err);
            } finally {
                this.loading = false;
            }

        },
        async createBalancing(newBal: Partial<Balancing>) {
            this.error = null;
            try {
                const response = await apiClient.post('/balancings', { balancing: newBal });
                const created = response.data;
                this.balancings.push(created);
                return created; 
            } catch (e: any) {
                this.error = 'Failed to create Balancing';
            }
        },
        async deleteBalancing(id: number) {
            this.error = null;
            try {
                await apiClient.delete(`/balancings/${id}`);
                this.balancings = this.balancings.filter((bal) => bal.id !== id);
            } catch (e: any) {
                this.error = 'Failed to delete Balancing';
            }
        },
    },
});
