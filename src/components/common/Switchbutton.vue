<template>
    <transition name="koi-switch-button">
        <div class="koi-button-switch" :class="[cValue ? 'koi-button-switch-on' : 'koi-button-switch-off']" @click="cValue = cValue == 1 ? 0 : 1">
            <span class="koi-button-slider" :style="{left: cValue ? '25px' : '1px'}"></span>
        </div>
    </transition>
</template>
<script>

export default {
    name: 'koi-switchbutton',
    props: {
        //默认值 0or1
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        cValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
</script>

<style>
.koi-button-switch {
    width: 55px;
    height: 30px;
    background: #4cd964;
    border-radius: 15px;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    position: relative;
    border: 1px solid #4cd964;
}

.koi-button-switch * {
    -webkit-user-select: none;
    -webkit-user-drag: none;
}

.koi-button-switch-off {
    background: #fff;
    border: 1px solid #e4e4e4;
}

.koi-button-switch-on {
    background: #4cd964;
    border: 1px solid #4cd964;
}

.koi-button-switch .koi-button-slider {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background: #fff;
    display: block;
    position: absolute;
    top: 1px;
    box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.5);
    transition: left .5s ease-out;
}
</style>
