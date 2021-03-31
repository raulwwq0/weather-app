<template>
    <div id="info">
        <FiveDaysWeather/>
        <TodayHighlights />
        <span id="creator">created by <a href="https://raul-aguilar.herokuapp.com/" target="_blank">Raúl Aguilar (@raulwwq0)</a>  - devChallenges.io</span>
    </div>
</template>

<script>
import FiveDaysWeather from "./FiveDaysWeather";
import TodayHighlights from "./TodayHighlights";

export default {
    name: 'Info',
    components: {
        FiveDaysWeather,
        TodayHighlights
    }
}
</script>