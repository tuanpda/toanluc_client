<template>
    <div class="timeline">
        <div v-for="week in 52" class="timeline-item" :key="week">
            {{ week }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Timeline',
    props: {
        year: {
            type: Number,
            required: true
        }
    }
}
</script>
