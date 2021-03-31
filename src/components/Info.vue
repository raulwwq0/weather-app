<template>
    <div id="info">
        <FiveDaysWeather/>
    </div>
</template>

<script>
import FiveDaysWeather from "./FiveDaysWeather"

export default {
    name: 'Info',
    components: {
        FiveDaysWeather,
    }
}
</script>