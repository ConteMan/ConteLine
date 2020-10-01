<template>
  <div class="container">
    <div class="after-line">
      <div class="column"></div>
    </div>
    <template v-for="item in list">
      <div v-if="item.showDate" :key="'date_' + item.id" class="date-ymd">
        {{ item.showDate }}
      </div>
      <div :key="'item_' + item.id" class="item">
        <div class="left">
          <div class="date-time">
            {{ $dayjs(item.created_at).format('HH:mm') }}
          </div>
          <div class="line-container">
            <div class="row"></div>
            <div class="column"></div>
          </div>
        </div>
        <div class="right">
          <div class="content-container">
            <div class="header">
              <div class="auth">{{ item.type }}</div>
              <div class="from">from {{ item.type }}</div>
            </div>
            <div class="content">
              <div class="title">
                <a target="_blank" :href="item.url">{{ item.title ? item.title : item.content }}</a>
              </div>
              <div v-if="item.title" class="des">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      list: [],
      listDate: '',
    }
  },
  async created() {
    const data = { offset: 0, limit: 10}
    const res = await this.$api.worldline.worldline(data)
    let listRes = res.data
    let lastDate = ''
    for(let i = 0; i < listRes.length; i++) {
      let currentDate = this.$dayjs(listRes[i].created_at).format('YYYY-MM-DD')
      if(lastDate !== currentDate) {
        lastDate = currentDate
        listRes[i].showDate = currentDate
      } else {
        listRes[i].showDate = ''
      }
    }
    this.list = listRes
  },
}
</script>

<style lang="less" scoped>
  @dateYmdColor: #000000;
  @lineColor: #C4C4C4;

  .container {
    text-align: left;
    padding: 10px;
    .after-line {
      width: 100px;
      height: 50px;
      .column {
        position: relative;
        background-color: @lineColor;
        height: 100%;
        width: 5px;
        margin-left: 67px;
      }
    }
    .date-ymd {
      padding: 30px;
      font-size: 14px;
      line-height: 16px;
      color: @dateYmdColor;
    }
    .item {
      display: flex;
      .left {
        display: flex;
        width: 100px;
        .date-time {
          margin-top: 10px;
          padding-left: 10px;
          width: 50px;
        }
        .line-container {
          position: relative;
          width: 50px;
          min-height: 150px;
          .row {
            float: left;
            background-color: @lineColor;
            height: 1px;
            width: 60%;
            margin-top: 20px;
          }
          .column {
            position: relative;
            background-color: @lineColor;
            height: 100%;
            width: 5px;
            margin-left: calc(50% - 8px);
          }
        }
      }
    }
  }
</style>
