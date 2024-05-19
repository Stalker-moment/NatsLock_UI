<template>
    <div class="bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-white">Power Management</h1>
        <div v-if="powerData">
            <div class="flex justify-between items-center mb-2">
                <div>
                    <p class="text-white">Online: {{ powerData.isOnline ? 'Yes' : 'No' }}</p>
                    <p class="text-white">Last Online: {{ powerData.LastOnlineAgo }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>

    <div class="bg-gray-900 p-6 rounded-lg shadow-md mt-5">
    <div v-if="powerData">
        <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
            <h1 class="text-white text-2xl w-full">State</h1>
            <div class="flex flex-col sm:flex-row justify-between gap-5 items-center mb-2">
                <div class="bg-green-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Battery</p>
                    <p class="text-white">{{ powerData.State.Battery }}</p>
                </div>
                <div class="bg-blue-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">PSU</p>
                    <p class="text-white">{{ powerData.State.PSU }}</p>
                </div>
                <div class="bg-purple-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Output</p>
                    <p class="text-white">{{ powerData.State.Output }}</p>
                </div>
            </div>
        </div>
        <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
            <h1 class="text-white text-2xl w-full">Voltage</h1>
            <div class="flex flex-col sm:flex-row justify-between gap-5 items-center mb-2">
                <div class="bg-green-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Battery</p>
                    <p class="text-white">{{ powerData.Voltage.Battery_Voltage + " " + powerData.Voltage.UnitVoltage }}</p>
                </div>
                <div class="bg-blue-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">PSU</p>
                    <p class="text-white">{{ powerData.Voltage.PSU_Voltage + " " + powerData.Voltage.UnitVoltage }}</p>
                </div>
                <div class="bg-purple-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Output</p>
                    <p class="text-white">{{ powerData.Voltage.Output_Voltage + " " + powerData.Voltage.UnitVoltage }}</p>
                </div>
            </div>
        </div>
        <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
            <h1 class="text-white text-2xl w-full">Temperature</h1>
            <div class="flex flex-col sm:flex-row justify-between gap-5 items-center mb-2">
                <div class="bg-green-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Battery</p>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                        <p class="text-dark">{{ powerData.Temperature.Battery_Temperature + " " + powerData.Temperature.UnitTemperature }}</p>
                    </div>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                        <p class="text-dark">{{ powerData.Temperature.Battery_TemperatureF + " " + powerData.Temperature.UnitTemperatureF }}</p>
                    </div>
                </div>
                <div class="bg-blue-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">PSU</p>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                        <p class="text-dark">{{ powerData.Temperature.PSU_Temperature + " " + powerData.Temperature.UnitTemperature }}</p>
                    </div>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                        <p class="text-dark">{{ powerData.Temperature.PSU_TemperatureF + " " + powerData.Temperature.UnitTemperatureF }}</p>
                    </div>
                </div>
                <div class="bg-purple-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                    <p class="text-white text-xl">Box</p>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                        <p class="text-dark">{{ powerData.Temperature.Box_Temperature + " " + powerData.Temperature.UnitTemperature }}</p>
                    </div>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                        <p class="text-dark">{{ powerData.Temperature.Box_Humidity + " " + powerData.Temperature.UnitHumidity }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
            <h1 class="text-white text-2xl w-full">Fan</h1>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'PowerManagement',
    data() {
        return {
            powerData: null,
        }
    },
    methods: {
        async fetchpowerData() {
            try {
                const response = await axios.get('https://natslock.my.id/api/systemdb/power');
                const powerData = response.data
                this.powerData = powerData;
                console.log('Power data:', powerData);
            } catch (error) {
                console.error('Error fetching locker data:', error);
            }
        }
    },
    created() {
        this.fetchpowerData();
        setInterval(this.fetchpowerData, 1000); // Ambil data setiap detik
    }
}
</script>
