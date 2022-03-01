<template>
  <div
    class="welcome"
    v-loading="loading"
  >
    <div
      ref="chart"
      class="chart"
    ></div>
  </div>
</template>

<script setup >
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core';
import * as echarts from 'echarts';
const loading = ref(false)

const { proxy } = getCurrentInstance()

onMounted(async () => {
  loading.value = true
  const { data: res } = await proxy.$axios.get('/adminApi/info')
  if (res.meta.status) {
    const chartDom = proxy.$refs.chart
    const myChart = echarts.init(chartDom)
    let option = {
      title: {
        text: '网站数据汇总',
        subtext: '各项总数',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '总数',
          type: 'pie',
          radius: '50%',
          data: res.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
    loading.value = false

  }

})



</script>

<style lang="stylus" scoped>
.chart {
  width 500px
  height 500px
  margin 0 auto
}
</style>
