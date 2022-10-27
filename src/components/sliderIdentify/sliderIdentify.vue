<template>
  <div class="sliderIdentify" ref="sliderIdentify">
    <div class="bg">请滑动完成验证</div>
    <div class="mask" ref="mask"></div>
    <div class="slider" ref="slider">
      <svg
        t="1666872581075"
        class="icon"
        viewBox="0 0 1198 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7528"
        width="200"
        height="200"
      >
        <path
          d="M97.46 1024.012l463.494-515.362-463.494-514.257 81.663-73.936 529.707 588.196-529.706 589.298-81.663-73.936z"
          p-id="7529"
        ></path>
        <path
          d="M492.534 1024.012l462.391-515.362-462.391-514.257 81.663-73.936 529.707 588.196-529.706 589.298-81.663-73.936z"
          p-id="7530"
        ></path>
      </svg>
    </div>
    <div class="success" ref="success">验证成功</div>
  </div>
</template>

<script setup>
// const slider = document.querySelector('.slider')
//     const Icode = document.querySelector('.identifying-code')
//     const mask = document.querySelector('.mask')
//     const success = document.querySelector('.success')

import { ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'

const sliderIdentify = ref()
const mask = ref()
const slider = ref()
const success = ref()

nextTick(() => {
  createSliderIdentify()
  watch(
    () => props.codeStatus,
    (v) => {
      if (!v) {
        createSliderIdentify()
      }
    }
  )
})
const emit = defineEmits(['status'])
const createSliderIdentify = () => {
  const IcodeX = sliderIdentify.value.getBoundingClientRect().left
  const IcodeW = sliderIdentify.value.offsetWidth
  const sliderW = slider.value.offsetWidth
  slider.value.style.left = 0
  mask.value.style.width = 0
  success.value.style.display = 'none'
  slider.value.onmousedown = (e) => {
    slider.value.style.transition = null
    mask.value.style.transition = null
    document.onmousemove = (e) => {
      slider.value.style.left = e.pageX - IcodeX + 'px'
      if (e.pageX - IcodeX <= 0) {
        slider.value.style.left = 0
      } else if (e.pageX - IcodeX >= IcodeW - sliderW) {
        slider.value.style.left = IcodeW - sliderW + 'px'
        success.value.style.display = 'block'
        emit('status', true)
      }
      mask.value.style.width = slider.value.style.left
    }
  }
  document.onmouseup = () => {
    if (slider.value.offsetLeft < IcodeW - sliderW) {
      slider.value.style.transition = 'left 0.4s'
      slider.value.style.left = 0
      mask.value.style.transition = 'width .4s'
      mask.value.style.width = 0
    }
    document.onmousemove = null
  }
}

const props = defineProps({
  codeStatus: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="stylus" scoped>
@import './sliderIdentify.styl';
</style>
