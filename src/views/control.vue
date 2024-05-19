<template>
    <div class="fan-control about bg-gray-900 text-white p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-6">Fan Control Panel</h1>
        <div class="space-y-10">
            <div class="switch-control space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Fan 1</h2>
                    <label class="switch">
                        <input type="checkbox" v-model="fan1Status" @change="toggleFan(1, fan1Status)">
                        <span class="slider round"></span>
                    </label>
                </div>
                <p class="text-gray-400">Status: <span class="font-semibold">{{ fan1Status ? 'On' : 'Off' }}</span></p>
                <p class="text-gray-400">Speed: <span class="font-semibold">{{ fan1Speed }}%</span></p>
                <input type="range" min="0" max="100" v-model="fan1Speed" @change="setFanSpeed(1, fan1Speed)"
                    class="comslider">
            </div>
            <div class="switch-control space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Fan 2</h2>
                    <label class="switch">
                        <input type="checkbox" v-model="fan2Status" @change="toggleFan(2, fan2Status)">
                        <span class="slider round"></span>
                    </label>
                </div>
                <p class="text-gray-400">Status: <span class="font-semibold">{{ fan2Status ? 'On' : 'Off' }}</span></p>
                <p class="text-gray-400">Speed: <span class="font-semibold">{{ fan2Speed }}%</span></p>
                <input type="range" min="0" max="100" v-model="fan2Speed" @change="setFanSpeed(2, fan2Speed)"
                    class="comslider">
            </div>
        </div>
    </div>

    <div class="restart-control about bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-5">
    <h1 class="text-2xl font-bold mb-6">Restart Control Panel</h1>
    <div class="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(locker, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="index">
        <div :class="{ 'bg-blue-500': this['online_' + locker], 'bg-pink-500': !this['online_' + locker] }" class="card text-white rounded-lg p-4">
          <h2 class="text-xl font-semibold">Locker {{ locker }}</h2>
          <p>Status: <span class="font-semibold">{{ this['online_' + locker] ? 'Online' : 'Offline' }}</span></p>
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2" @click="restartLocker(locker)">Restart</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    name: 'FanControl',
  data() {
    return {
      fan1Speed: 0,
      fan1Status: false,
      fan2Speed: 0,
      fan2Status: false,
      // Properti-properti untuk menentukan status online/offline dari masing-masing locker
      online_1: false,
      online_2: false,
      online_3: false,
      online_4: false,
      online_5: false,
      online_6: false,
      online_7: false,
      online_8: false,
      online_9: false,
      online_10: false,
    };
  },
  mounted() {
    this.fetchFanData();
    this.fetchRestartData();
    // Fetch data every 2 seconds
    setInterval(() => {
      this.fetchFanData();
      this.fetchRestartData();
    }, 2000);
  },
    methods: {
        fetchFanData() {
            fetch('https://natslock.my.id/api/systemdb/power')
                .then(response => response.json())
                .then(data => {
                    this.fan1Speed = data.Fan_1.Speed;
                    this.fan1Status = data.Fan_1.isTurnOn;
                    this.fan2Speed = data.Fan_2.Speed;
                    this.fan2Status = data.Fan_2.isTurnOn;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        fetchRestartData() {
            fetch('https://natslock.my.id/api/systemdb/all')
                .then(response => response.json())
                .then(data => {
                    this.online_1 = data.Locker[0].isOnline;
                    this.online_2 = data.Locker[1].isOnline;
                    this.online_3 = data.Locker[2].isOnline;
                    this.online_4 = data.Locker[3].isOnline;
                    this.online_5 = data.Locker[4].isOnline;
                    this.online_6 = data.Locker[5].isOnline;
                    this.online_7 = data.Locker[6].isOnline;
                    this.online_8 = data.Locker[7].isOnline;
                    this.online_9 = data.Locker[8].isOnline;
                    this.online_10 = data.Locker[9].isOnline;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        restartLocker(locker) {
            //post request to restart locker data : {locker: locker}
            const lockerString = locker.toString();
            fetch('https://natslock.my.id/api/locker/restart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lockers: lockerString, users: "test@gmail.com" }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        toggleFan(type, status) {
            fetch(`https://natslock.my.id/api/system/locker/fan/state/${type}/${status ? 'on' : 'off'}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        setFanSpeed(type, speed) {
            fetch(`https://natslock.my.id/api/system/locker/fan/speed/${type}/${speed}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
};
</script>

<style>
/* Switch styles */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

/* Custom styling */
.bg-gray-900 {
    background-color: #111827;
    /* Dark background color */
}

.comslider {
    width: 50%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    position: relative;
}
</style>