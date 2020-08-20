<template>
  <div class="home">
    <Navbar />
    <MainContent />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import MainContent from '../components/_base/MainContent'

export default {
  name: 'Home',
  components: {
    Navbar,
    MainContent
  }
}
</script>
