import { defineStore } from 'pinia';
import apiClient from '@/utils/axios';
import type { Balancing } from '@/types/Balancing';
import type { BalancingAsset } from '@/types/BalancingAsset';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useBalancingStore = defineStore('balancing', {
    state: () => ({
        balancings: [] as Balancing[],
        loading: false,
        error: null as string | null,
    }),
    getters: {
        getBalancings: (state) => state.balancings,
    },
    actions: {
        async fetchBalancings() {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get('/balancings');
                this.setBalancings(response.data);
            } catch (e: any) {
                this.error = 'Failed to load Balancings';
            } finally {
                this.loading = false;
            }
        },
        async fetchBalancingById(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get(`/balancings/${id}`);
                return response.data;
            } catch (e: any) {
                this.error = 'Failed to load Balancing';
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

                this.pushToBalancings(createdBalancing);
                toast.success('Balancing created successfully');
                return createdBalancing;
            } catch (err: any) {
                this.error = 'Failed to create Balancing with assets';
                toast.error('Error deleting balancing');
            } finally {
                this.loading = false;
            }
        },
        async deleteBalancing(id: number) {
            this.error = null;
            try {
                await apiClient.delete(`/balancings/${id}`);
                this.removeFromBalancings(id);
                toast.info('Balancing deleted successfully');
            } catch (e: any) {
                toast.error('Error deleting balancing');
                this.error = 'Failed to delete Balancing';
            }
        },
        async setBalancings(balancings: Balancing[]) {
            this.balancings = balancings;
        },
        async pushToBalancings(balancing: Balancing) {
            this.balancings.push(balancing);
        },
        async removeFromBalancings(id: number) {
            this.balancings = this.balancings.filter((bal) => bal.id !== id);
        }
    },
});
