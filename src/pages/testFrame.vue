<template>
    <div>
        <!-- <iframe :src="src" style="width: 1000px; height: 640px; position: absolute; top: 0px; left: 0px;"  frameborder="0"  allow="accelerometer *; ambient-light-sensor *; autoplay *; camera *; clipboard-read *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; screen-wake-lock *; speaker *; sync-xhr *; usb *; web-share *; vibrate *; vr *" ></iframe> -->
        <iframe :src="src2" style="width: 1000px; height: 640px; position: absolute; top: 0px; left: 0px;"  frameborder="0"  allow="accelerometer *; ambient-light-sensor *; autoplay *; camera *; clipboard-read *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; screen-wake-lock *; speaker *; sync-xhr *; usb *; web-share *; vibrate *; vr *" ></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://play.famobi.com/wrapper/fashion-battle/A1000-10',
            src2: 'https://play.famobi.com/wrapper/tm-jennifer1/A1000-10',
        }
    }
}
</script>