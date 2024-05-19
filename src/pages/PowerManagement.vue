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
                        <p class="text-white">{{ powerData.Voltage.Battery_Voltage + " " + powerData.Voltage.UnitVoltage
                            }}</p>
                    </div>
                    <div class="bg-blue-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                        <p class="text-white text-xl">PSU</p>
                        <p class="text-white">{{ powerData.Voltage.PSU_Voltage + " " + powerData.Voltage.UnitVoltage }}
                        </p>
                    </div>
                    <div class="bg-purple-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                        <p class="text-white text-xl">Output</p>
                        <p class="text-white">{{ powerData.Voltage.Output_Voltage + " " + powerData.Voltage.UnitVoltage
                            }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
                <h1 class="text-white text-2xl w-full">Temperature</h1>
                <div class="flex flex-col sm:flex-row justify-between gap-5 items-center mb-2">
                    <div class="bg-green-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                        <p class="text-white text-xl">Battery</p>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                            <p class="text-dark">{{ powerData.Temperature.Battery_Temperature + " " +
                                powerData.Temperature.UnitTemperature }}</p>
                        </div>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                            <p class="text-dark">{{ powerData.Temperature.Battery_TemperatureF + " " +
                                powerData.Temperature.UnitTemperatureF }}</p>
                        </div>
                    </div>
                    <div class="bg-blue-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                        <p class="text-white text-xl">PSU</p>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                            <p class="text-dark">{{ powerData.Temperature.PSU_Temperature + " " +
                                powerData.Temperature.UnitTemperature }}</p>
                        </div>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                            <p class="text-dark">{{ powerData.Temperature.PSU_TemperatureF + " " +
                                powerData.Temperature.UnitTemperatureF }}</p>
                        </div>
                    </div>
                    <div class="bg-purple-900 p-5 rounded-lg shadow-md mt-5 w-full sm:w-1/3">
                        <p class="text-white text-xl">Box</p>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                            <p class="text-dark">{{ powerData.Temperature.Box_Temperature + " " +
                                powerData.Temperature.UnitTemperature }}</p>
                        </div>
                        <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                            <p class="text-dark">{{ powerData.Temperature.Box_Humidity + " " +
                                powerData.Temperature.UnitHumidity }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-950 p-5 rounded-lg shadow-md mt-5 w-full">
    <h1 class="text-white text-2xl w-full">Fan</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
        <div class="bg-yellow-900 p-5 rounded-lg shadow-md mt-5 w-full">
            <p class="text-white text-xl">Fan 1</p>
            <div class="flex flex-col sm:flex-row justify-between gap-5 items-center">
                <div class="bg-gray-50/50 p-5 rounded-lg shadow-md mt-3 w-full sm:w-1/2">
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                        <p class="text-dark">{{ "Speed" + ": " + powerData.Fan_1.Speed + " " + powerData.Fan_1.UnitSpeed }}</p>
                    </div>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                        <p class="text-dark">{{ "PWM Analog" + ": " + powerData.Fan_1.Analog }}</p>
                    </div>
                </div>
                <div class="fan-container bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full sm:w-1/2">
                    <div v-if="!powerData.Fan_1.isTurnOn" class="text-red-500 blink text-xl">Off</div>
                    <div class="fan" :style="fanStyle(powerData.Fan_1.Speed, powerData.Fan_1.isTurnOn)"></div>
                </div>
            </div>
        </div>
        <div class="bg-yellow-900 p-5 rounded-lg shadow-md mt-5 w-full">
            <p class="text-white text-xl">Fan 2</p>
            <div class="flex flex-col sm:flex-row justify-between gap-5 items-center">
                <div class="bg-gray-50/50 p-5 rounded-lg shadow-md mt-3 w-full sm:w-1/2">
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full">
                        <p class="text-dark">{{ "Speed" + ": " + powerData.Fan_2.Speed + " " + powerData.Fan_2.UnitSpeed }}</p>
                    </div>
                    <div class="bg-gray-50/50 p-3 rounded-lg shadow-md mt-2 w-full">
                        <p class="text-dark">{{ "PWM Analog" + ": " + powerData.Fan_2.Analog }}</p>
                    </div>
                </div>
                <div class="fan-container bg-gray-50/50 p-3 rounded-lg shadow-md mt-3 w-full sm:w-1/2">
                    <div v-if="!powerData.Fan_2.isTurnOn" class="text-red-500 blink text-xl">Off</div>
                    <div class="fan" :style="fanStyle(powerData.Fan_2.Speed, powerData.Fan_2.isTurnOn)"></div>
                </div>
            </div>
        </div>
    </div>
</div>

        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<style scoped>
.fan-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.fan {
    width: 100px;
    height: 100px;
    background-image: url('../assets/propeller.png');
    /* Replace with the path to your fan image */
    background-size: cover;
    border-radius: 50%;
    animation: spin linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.blink {
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
}

@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}

@-webkit-keyframes blink-animation {
    to {
        visibility: hidden;
    }
}
</style>


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
                const powerData = response.data;
                this.powerData = powerData;
                console.log('Power data:', powerData);
            } catch (error) {
                console.error('Error fetching locker data:', error);
            }
        },
        fanStyle(speed, on) {
            if (!on) {
                return {
                    animationDuration: '0s'
                };
            } else if(speed == 0) {
                return {
                    animationDuration: '0s'
                };
            }
            const duration = 30 / Math.max(speed, 1); // Ensure the speed is at least 1 to avoid division by zero
            return {
                animationDuration: `${duration}s`
            };
        }
    },
    created() {
        this.fetchpowerData();
        setInterval(this.fetchpowerData, 1000); // Fetch data every second
    }
}
</script>
