<template>
  <div id="app">
    <header class="bg-gray-800 text-white">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <div class="text-xl font-bold">NatsLock</div>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="hover:text-gray-400" active-class="font-bold border-b-2 border-white">Home</router-link>
          </li>
          <li>
            <router-link to="/control" class="hover:text-gray-400" active-class="font-bold border-b-2 border-white">Control</router-link>
          </li>
            <li>
            <router-link to="/monitoring" class="hover:text-gray-400" active-class="font-bold border-b-2 border-white">Monitoring</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global styles can be added here or in a separate CSS file */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
nav li {
  margin-right: 1rem;
}
nav a {
  color: white;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
main {
  flex: 1;
  padding: 1rem;
}
</style>
