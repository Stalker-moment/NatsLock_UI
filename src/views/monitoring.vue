<template>
    <div>
      <!-- Navbar for desktop -->
      <nav class="bg-gray-800 p-4 md:block hidden rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white text-xl">Monitoring</div>
          <ul class="md:flex md:items-center md:gap-4 list-none p-0 m-0">
            <li><a href="#pm" @click="setActiveTab('pm')" :class="getLinkClass('pm')">PM</a></li>
            <li><a href="#locker1" @click="setActiveTab('locker1')" :class="getLinkClass('locker1')">L1</a></li>
            <li><a href="#locker2" @click="setActiveTab('locker2')" :class="getLinkClass('locker2')">L2</a></li>
            <li><a href="#locker3" @click="setActiveTab('locker3')" :class="getLinkClass('locker3')">L3</a></li>
            <li><a href="#locker4" @click="setActiveTab('locker4')" :class="getLinkClass('locker4')">L4</a></li>
            <li><a href="#locker5" @click="setActiveTab('locker5')" :class="getLinkClass('locker5')">L5</a></li>
            <li><a href="#locker6" @click="setActiveTab('locker6')" :class="getLinkClass('locker6')">L6</a></li>
            <li><a href="#locker7" @click="setActiveTab('locker7')" :class="getLinkClass('locker7')">L7</a></li>
            <li><a href="#locker8" @click="setActiveTab('locker8')" :class="getLinkClass('locker8')">L8</a></li>
            <li><a href="#locker9" @click="setActiveTab('locker9')" :class="getLinkClass('locker9')">L9</a></li>
            <li><a href="#locker10" @click="setActiveTab('locker10')" :class="getLinkClass('locker10')">L10</a></li>
          </ul>
        </div>
      </nav>
  
      <!-- Navbar for mobile -->
      <nav class="bg-gray-800 p-4 md:hidden rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white text-xl">Monitoring</div>
          <button 
            class="text-white focus:outline-none" 
            @click="isOpen = !isOpen"
          >
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div :class="{'block': isOpen, 'hidden': !isOpen}" class="md:hidden">
          <ul class="text-sm text-gray-300 mt-2">
            <li><a href="#pm" @click="setActiveTab('pm')" :class="getLinkClass('pm')">PM</a></li>
            <li><a href="#locker1" @click="setActiveTab('locker1')" :class="getLinkClass('locker1')">L1</a></li>
            <li><a href="#locker2" @click="setActiveTab('locker2')" :class="getLinkClass('locker2')">L2</a></li>
            <li><a href="#locker3" @click="setActiveTab('locker3')" :class="getLinkClass('locker3')">L3</a></li>
            <li><a href="#locker4" @click="setActiveTab('locker4')" :class="getLinkClass('locker4')">L4</a></li>
          </ul>
          <ul class="text-sm text-gray-300 mt-2">
            <li><a href="#locker5" @click="setActiveTab('locker5')" :class="getLinkClass('locker5')">L5</a></li>
            <li><a href="#locker6" @click="setActiveTab('locker6')" :class="getLinkClass('locker6')">L6</a></li>
            <li><a href="#locker7" @click="setActiveTab('locker7')" :class="getLinkClass('locker7')">L7</a></li>
            <li><a href="#locker8" @click="setActiveTab('locker8')" :class="getLinkClass('locker8')">L8</a></li>
            <li><a href="#locker9" @click="setActiveTab('locker9')" :class="getLinkClass('locker9')">L9</a></li>
            <li><a href="#locker10" @click="setActiveTab('locker10')" :class="getLinkClass('locker10')">L10</a></li>
          </ul>
        </div>
      </nav>
      <div class="container mx-auto mt-4">
        <component :is="activeComponent"></component>
      </div>
    </div>
  </template>
  
<script>
import PowerManagement from '../pages/PowerManagement.vue';
import Locker from '../pages/Locker.vue';
export default {
  data() {
    return {
      isOpen: false,
      activeTab: ''
    };
  },
  computed: {
    activeComponent() {
      if (this.activeTab === 'pm') {
        return PowerManagement;
      } else {
        return Locker;
      }
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.isOpen = false; // close the menu on mobile after selection
    },
    getLinkClass(tab) {
      return this.activeTab === tab 
        ? 'bg-blue-500 text-white rounded-lg px-4 py-2' 
        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-2';
    },
    checkActiveTabFromURL() {
      const hash = window.location.hash.substring(1); // Get the hash without the '#'
      this.activeTab = hash || 'pm'; // Default to 'pm' if no hash is present
    }
  },
  mounted() {
    this.checkActiveTabFromURL();
    window.addEventListener('hashchange', this.checkActiveTabFromURL);
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.checkActiveTabFromURL);
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>

  