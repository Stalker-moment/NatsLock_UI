<template>
    <div class="bg-gray-900 p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-white">Locker {{ lockerNumber }}</h1>
      <div v-if="lockerData">
        <div class="flex justify-between items-center mb-2">
          <div>
            <p class="text-white">Status: {{ lockerData.Status }}</p>
            <p class="text-white">Open: {{ lockerData.sensOpen ? 'Yes' : 'No' }}</p>
            <p class="text-white">Online: {{ lockerData.isOnline ? 'Yes' : 'No' }}</p>
            <p class="text-white">Last Online: {{ lockerData.LastOnlineAgo }}</p>
            <p class="text-white">Solenoid: {{ lockerData.Solenoid }}</p>
          </div>
          <!-- Bulat berukuran besar untuk menunjukkan status lampu -->
          <div :class="{ 'bg-red-500': lockerData.PilotLamp_Red === 'On', 'bg-green-500': lockerData.PilotLamp_Red === 'Off' }"
               class="h-10 w-10 rounded-full"></div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
  
      <!-- Container baru untuk grafik -->
      <div v-if="chartInitialized" class="mt-8">
        <div class="bg-gray-900 p-6 rounded-lg shadow-md">
          <div class="text-white mb-4">
            <h2 class="text-lg font-bold mb-2">Temperature</h2>
            <line-chart :data="temperatureData" :options="chartOptions"></line-chart>
          </div>
        </div>
        <div class="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
          <div class="text-white">
            <h2 class="text-lg font-bold mb-2">Humidity</h2>
            <line-chart :data="humidityData" :options="chartOptions"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </template>  
  
  <script>
  import axios from 'axios';
  import LineChart from './LineChart.vue'; // Import LineChart component
  
  export default {
    name: 'LockerComponent',
    components: {
      LineChart // Register LineChart component
    },
    data() {
      return {
        lockerData: null,
        temperatureData: {
          labels: [],
          datasets: [{
            label: 'Temperature (°C)',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: []
          }]
        },
        humidityData: {
          labels: [],
          datasets: [{
            label: 'Humidity (%)',
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: []
          }]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
        chartInitialized: false // Flag untuk menandai apakah grafik sudah dibuat atau belum
      };
    },
    computed: {
      lockerNumber() {
        return this.$route.hash.substring(1).replace('locker', '');
      }
    },
    methods: {
      async fetchLockerData() {
        try {
          const response = await axios.get('https://natslock.my.id/api/systemdb/all');
          const lockers = response.data.Locker;
          console.log(lockers);
          const lockerNumber = parseInt(this.lockerNumber) - 1;
          this.lockerData = lockers[lockerNumber];
          this.updateCharts(); // Panggil fungsi untuk mengupdate grafik
        } catch (error) {
          console.error('Error fetching locker data:', error);
        }
      },
      updateCharts() {
        // Pastikan data locker tersedia sebelum membuat grafik
        if (this.lockerData) {
          // Ambil data grafik temperatur dan kelembaban
          const temperature = this.lockerData.Temperature;
          const humidity = this.lockerData.Humidity;
  
          // Tambahkan data temperatur dan kelembaban ke dataset
          this.temperatureData.datasets[0].data.push(temperature);
          this.humidityData.datasets[0].data.push(humidity);
  
          // Ambil timestamp
          const timestamp = new Date().toLocaleTimeString();
  
          // Tambahkan timestamp sebagai label
          this.temperatureData.labels.push(timestamp);
          this.humidityData.labels.push(timestamp);
  
          // Hapus data terlama jika lebih dari 10 data
          if (this.temperatureData.labels.length > 10) {
            this.temperatureData.labels.shift();
            this.temperatureData.datasets[0].data.shift();
          }
          if (this.humidityData.labels.length > 10) {
            this.humidityData.labels.shift();
            this.humidityData.datasets[0].data.shift();
          }
  
          // Perbarui grafik jika _chart telah terdefinisi
          if (!this.chartInitialized) {
            this.chartInitialized = true;
          }
        }
      }
    },
    created() {
      this.fetchLockerData();
      setInterval(this.fetchLockerData, 1000); // Ambil data setiap detik
    }
  };
  </script>
  
  <style scoped>
  /* Tidak perlu menambahkan style di sini */
  </style>
