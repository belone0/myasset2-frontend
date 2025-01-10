<template>
  <aside
    :class="[
      'bg-white dark:bg-gray-900 border-r dark:border-gray-800 py-6 px-2 space-y-2 transition-all duration-300',
      collapsed ? 'w-20' : 'w-64'
    ]"
    class="flex-shrink-0"
  >
    <nav>
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-3 py-3 transition-colors"
        >
          <router-link
            :to="item.to"
            class="flex items-center space-x-2"
            :class="collapsed ? 'justify-center' : ''"
          >
            <i :class="['pi', item.icon, 'text-xl']"></i>
            <span v-if="!collapsed" class="text-sm">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface MenuItem {
  label: string;
  icon: string;
  to: string;
}

const props = defineProps<{
  collapsed: boolean;
  menuItems: MenuItem[];
}>();
</script>
