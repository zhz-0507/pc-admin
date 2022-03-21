<template>
  <div id="app">   
      <router-link to="/"></router-link>
      <!-- <router-link to="/about"></router-link> -->
    <router-view/>
  </div>
</template>

<script>
export default {

  watch: {
     $route(to, from) {
       console.log(to);
       if(to.name === 'Home') {
        let count = 0;
        let timer
        timer = setTimeout(() => {
          window.location.reload(true);
            
          count ++;
          console.log('count',count)
          sessionStorage.setItem('timer',count)
         
        },200)

        if(sessionStorage.getItem('timer')){
          clearTimeout(timer)
        }
       }
     }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
