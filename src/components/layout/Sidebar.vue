<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';

interface MenuItem {
  label: string;
  icon: string;
  to: string;
}

const props = defineProps<{
  collapsed: boolean;
  menuItems: MenuItem[];
}>();

const route = useRoute();

function isActive(path: string) {
  return route.path === path;
}
</script>

<template>
  <aside :class="[
    'bg-white dark:bg-gray-900 border-r dark:border-gray-800 py-3 px-2 space-y-2 transition-all duration-300',
    collapsed ? 'w-16' : 'w-52'
  ]" class="flex-shrink-0">
    <nav>
      <ul>
        <li v-for="(item, index) in menuItems" :key="index" class="transition-colors rounded px-3 py-3
                 text-gray-600 dark:text-gray-400
                 hover:bg-gray-100 dark:hover:bg-gray-800">
          <router-link :to="item.to" class="flex items-center space-x-2" :class="[
            collapsed ? 'justify-center' : '',
            isActive(item.to) ? 'text-purple-500 ' : ''
          ]">
            <i :class="['pi', item.icon, 'text-xl']"></i>
            <span v-if="!collapsed" class="text-sm">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>