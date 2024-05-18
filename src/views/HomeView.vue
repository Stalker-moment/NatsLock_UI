<template>
  <div class="container">
    <h1 class="title">NatsLock</h1>
    <div class="grid-container">
      <div 
        v-for="(status, index) in lockerStatuses" 
        :key="index" 
        class="card" 
        :style="{ backgroundColor: status.colorCard, color: status.colorText }"
      >
        <div class="text-3xl">Locker {{ index + 1 }}</div>
        <div class="status">{{ status.customText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const lockerStatuses = ref(Array(10).fill({ customText: "Loading...", colorCard: "#479FBF", colorText: "#ffffff" }));

async function getCode(LockNum) {
  const url = `https://natslock.my.id/api/lockerdb/${LockNum}`;
  const AllData = await axios.get(url);
  return AllData.data;
}

async function updateLockerStatus(lockerNum, index) {
  const lockerData = await getCode(lockerNum);
  const { OnGoing, state, NeedRestart, justOpen, codeOpen } = lockerData;
  const { stats, code, timeLeft } = OnGoing;

  let customText, colorCard, colorText;
  if (NeedRestart) {
    customText = `Locker ${index + 1} is restarting...`;
    colorCard = `#5036b0`;
    colorText = `#ffffff`;
  } else if (stats && state) {
    customText = `RENT LOCKER\nValid Until : ${timeLeft}\nPlease enter code ${code}`;
    colorCard = `#3dbf9c`;
    colorText = `#ffffff`;
  } else if (stats && !state) {
    if (code.length == 2) {
      customText = `OPEN LOCKER\nPlease enter code ${code}\nValid : ${timeLeft} left`;
      colorCard = `#3dbf9c`;
      colorText = `#ffffff`;
    } else {
      customText = `UNRENT LOCKER\nPlease enter code ${code}\nValid : ${timeLeft} left`;
      colorCard = `#3dbf9c`;
      colorText = `#ffffff`;
    }
  } else {
    if (state) {
      if (justOpen) {
        if (codeOpen == 1) {
          customText = `Locker Rent Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        } else if (codeOpen == 2) {
          customText = `Locker Open Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        } else if (codeOpen == 3) {
          customText = `Locker Unrent Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        }
      } else {
        customText = `Locker ${index + 1} is available`;
        colorCard = `#479FBF`;
        colorText = `#ffffff`;
      }
    } else {
      if (justOpen) {
        if (codeOpen == 1) {
          customText = `Locker Rent Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        } else if (codeOpen == 2) {
          customText = `Locker Open Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        } else if (codeOpen == 3) {
          customText = `Locker Unrent Success\nDon't forget to close the locker`;
          colorCard = `#36b05f`;
          colorText = `#ffffff`;
        }
      } else {
        customText = `Locker ${index + 1} is unavailable`;
        colorCard = `#bf453d`;
        colorText = `#ffffff`;
      }
    }
  }

  lockerStatuses.value[index] = { customText, colorCard, colorText };
}

async function updateAllLockers() {
  const lockerNums = ["005551", "005552", "005553", "005554", "005555", "005556", "005557", "005558", "005559", "005560"];
  for (let i = 0; i < lockerNums.length; i++) {
    await updateLockerStatus(lockerNums[i], i);
  }
}

onMounted(() => {
  updateAllLockers();
  setInterval(updateAllLockers, 1000);
});
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000102;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  grid-template-rows: repeat(2, auto); /* 2 rows */
  gap: 10px;
  justify-items: center;
}

.card {
  font-size: 1.5rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center;
  white-space: pre-line;
  width: 100%; /* Ensure cards take full width */
}

.card:hover {
  transform: scale(1.05);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* 1 column on smaller screens */
    grid-template-rows: auto; /* Auto rows */
  }
}
</style>