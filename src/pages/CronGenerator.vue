<template>
  <el-dialog
    title="Cron表达式生成器"
    :visible.sync="dialogVisible"
    width="700px"
    @closed="handleClose"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="秒" name="second">
        <div class="time-unit-config">
          <el-radio-group v-model="second.type" @change="updateCronExpression">
            <el-radio label="every">每秒</el-radio>
            <el-radio label="specific">指定秒数</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
          </el-radio-group>
          
          <div v-if="second.type === 'specific'" class="config-item">
            <el-select
              v-model="second.value"
              multiple
              placeholder="请选择具体的秒数"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`second-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="second.type === 'range'" class="config-item">
            <el-select
              v-model="second.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`second-start-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="second.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`second-end-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="second.type === 'interval'" class="config-item">
            <span>从</span>
            <el-input-number
              v-model="second.start"
              :min="0"
              :max="59"
              @change="updateCronExpression"
            />
            <span>秒开始，每</span>
            <el-input-number
              v-model="second.interval"
              :min="1"
              :max="59"
              @change="updateCronExpression"
            />
            <span>秒执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="分" name="minute">
        <div class="time-unit-config">
          <el-radio-group v-model="minute.type" @change="updateCronExpression">
            <el-radio label="every">每分钟</el-radio>
            <el-radio label="specific">指定分钟</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
          </el-radio-group>
          
          <div v-if="minute.type === 'specific'" class="config-item">
            <el-select
              v-model="minute.value"
              multiple
              placeholder="请选择具体的分钟"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`minute-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="minute.type === 'range'" class="config-item">
            <el-select
              v-model="minute.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`minute-start-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="minute.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 60"
                :key="`minute-end-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="minute.type === 'interval'" class="config-item">
            <span>从</span>
            <el-input-number
              v-model="minute.start"
              :min="0"
              :max="59"
              @change="updateCronExpression"
            />
            <span>分钟开始，每</span>
            <el-input-number
              v-model="minute.interval"
              :min="1"
              :max="59"
              @change="updateCronExpression"
            />
            <span>分钟执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="时" name="hour">
        <div class="time-unit-config">
          <el-radio-group v-model="hour.type" @change="updateCronExpression">
            <el-radio label="every">每小时</el-radio>
            <el-radio label="specific">指定小时</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
          </el-radio-group>
          
          <div v-if="hour.type === 'specific'" class="config-item">
            <el-select
              v-model="hour.value"
              multiple
              placeholder="请选择具体的小时"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 24"
                :key="`hour-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="hour.type === 'range'" class="config-item">
            <el-select
              v-model="hour.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 24"
                :key="`hour-start-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="hour.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 24"
                :key="`hour-end-${i-1}`"
                :label="i - 1"
                :value="i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="hour.type === 'interval'" class="config-item">
            <span>从</span>
            <el-input-number
              v-model="hour.start"
              :min="0"
              :max="23"
              @change="updateCronExpression"
            />
            <span>时开始，每</span>
            <el-input-number
              v-model="hour.interval"
              :min="1"
              :max="23"
              @change="updateCronExpression"
            />
            <span>小时执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="日" name="day">
        <div class="time-unit-config">
          <el-radio-group v-model="day.type" @change="dayTypeChanged">
            <el-radio label="every">每日</el-radio>
            <el-radio label="specific">指定日期</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
            <el-radio label="notSpecify">不指定</el-radio>
          </el-radio-group>
          
          <div v-if="day.type === 'specific'" class="config-item">
            <el-select
              v-model="day.value"
              multiple
              placeholder="请选择具体的日期"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 31"
                :key="`day-${i}`"
                :label="i"
                :value="i"
              />
            </el-select>
          </div>
          
          <div v-if="day.type === 'range'" class="config-item">
            <el-select
              v-model="day.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 31"
                :key="`day-start-${i}`"
                :label="i"
                :value="i"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="day.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 31"
                :key="`day-end-${i}`"
                :label="i"
                :value="i"
              />
            </el-select>
          </div>
          
          <div v-if="day.type === 'interval'" class="config-item">
            <span>从</span>
            <el-input-number
              v-model="day.start"
              :min="1"
              :max="31"
              @change="updateCronExpression"
            />
            <span>日开始，每</span>
            <el-input-number
              v-model="day.interval"
              :min="1"
              :max="31"
              @change="updateCronExpression"
            />
            <span>天执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="月" name="month">
        <div class="time-unit-config">
          <el-radio-group v-model="month.type" @change="updateCronExpression">
            <el-radio label="every">每月</el-radio>
            <el-radio label="specific">指定月份</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
          </el-radio-group>
          
          <div v-if="month.type === 'specific'" class="config-item">
            <el-select
              v-model="month.value"
              multiple
              placeholder="请选择具体的月份"
              @change="updateCronExpression"
            >
              <el-option
                v-for="(item, index) in monthOptions"
                :key="`month-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          
          <div v-if="month.type === 'range'" class="config-item">
            <el-select
              v-model="month.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in monthOptions"
                :key="`month-start-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="month.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in monthOptions"
                :key="`month-end-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          
          <div v-if="month.type === 'interval'" class="config-item">
            <span>从</span>
            <el-select
              v-model="month.start"
              placeholder="起始月份"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in monthOptions"
                :key="`month-interval-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span>开始，每</span>
            <el-input-number
              v-model="month.interval"
              :min="1"
              :max="12"
              @change="updateCronExpression"
            />
            <span>月执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="周" name="week">
        <div class="time-unit-config">
          <el-radio-group v-model="week.type" @change="weekTypeChanged">
            <el-radio label="every">每周</el-radio>
            <el-radio label="specific">指定星期</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
            <el-radio label="notSpecify">不指定</el-radio>
          </el-radio-group>
          
          <div v-if="week.type === 'specific'" class="config-item">
            <el-select
              v-model="week.value"
              multiple
              placeholder="请选择具体的星期"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in weekOptions"
                :key="`week-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          
          <div v-if="week.type === 'range'" class="config-item">
            <el-select
              v-model="week.start"
              placeholder="起始值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in weekOptions"
                :key="`week-start-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span class="separator">-</span>
            <el-select
              v-model="week.end"
              placeholder="结束值"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in weekOptions"
                :key="`week-end-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          
          <div v-if="week.type === 'interval'" class="config-item">
            <span>从</span>
            <el-select
              v-model="week.start"
              placeholder="起始星期"
              @change="updateCronExpression"
            >
              <el-option
                v-for="item in weekOptions"
                :key="`week-interval-${item.value}`"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span>开始，每</span>
            <el-input-number
              v-model="week.interval"
              :min="1"
              :max="7"
              @change="updateCronExpression"
            />
            <span>周执行一次</span>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="年" name="year">
        <div class="time-unit-config">
          <el-radio-group v-model="year.type" @change="updateCronExpression">
            <el-radio label="every">每年</el-radio>
            <el-radio label="specific">指定年份</el-radio>
            <el-radio label="range">区间</el-radio>
            <el-radio label="interval">循环</el-radio>
          </el-radio-group>
          
          <div v-if="year.type === 'specific'" class="config-item">
            <el-select
              v-model="year.value"
              multiple
              placeholder="请选择具体的年份"
              @change="updateCronExpression"
            >
              <el-option
                v-for="i in 10"
                :key="`year-${currentYear + i - 1}`"
                :label="currentYear + i - 1"
                :value="currentYear + i - 1"
              />
            </el-select>
          </div>
          
          <div v-if="year.type === 'range'" class="config-item">
            <el-input-number
              v-model="year.start"
              :min="currentYear"
              :max="currentYear + 100"
              @change="updateCronExpression"
            />
            <span class="separator">-</span>
            <el-input-number
              v-model="year.end"
              :min="currentYear"
              :max="currentYear + 100"
              @change="updateCronExpression"
            />
          </div>
          
          <div v-if="year.type === 'interval'" class="config-item">
            <span>从</span>
            <el-input-number
              v-model="year.start"
              :min="currentYear"
              :max="currentYear + 100"
              @change="updateCronExpression"
            />
            <span>年开始，每</span>
            <el-input-number
              v-model="year.interval"
              :min="1"
              :max="100"
              @change="updateCronExpression"
            />
            <span>年执行一次</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    
    <div class="cron-preview">
      <el-input v-model="cronExpression" readonly>
        <template slot="prepend">表达式值</template>
      </el-input>
    </div>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CronExpressionGenerator',
  props: {
    value: {
      type: String,
      default: '* * * * * ? *'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      activeTab: 'second',
      cronExpression: this.value || '* * * * * ? *',
      currentYear: new Date().getFullYear(),
      
      // 各时间单位的值
      second: { type: 'every', value: [], start: 0, end: 59, interval: 1 },
      minute: { type: 'every', value: [], start: 0, end: 59, interval: 1 },
      hour: { type: 'every', value: [], start: 0, end: 23, interval: 1 },
      day: { type: 'every', value: [], start: 1, end: 31, interval: 1 },
      month: { type: 'every', value: [], start: 1, end: 12, interval: 1 },
      week: { type: 'notSpecify', value: [], start: 1, end: 7, interval: 1 },
      year: { type: 'every', value: [], start: new Date().getFullYear(), end: new Date().getFullYear() + 10, interval: 1 },
      
      // 月份选项
      monthOptions: [
        { label: '1月', value: 1 },
        { label: '2月', value: 2 },
        { label: '3月', value: 3 },
        { label: '4月', value: 4 },
        { label: '5月', value: 5 },
        { label: '6月', value: 6 },
        { label: '7月', value: 7 },
        { label: '8月', value: 8 },
        { label: '9月', value: 9 },
        { label: '10月', value: 10 },
        { label: '11月', value: 11 },
        { label: '12月', value: 12 }
      ],
      
      // 星期选项
      weekOptions: [
        { label: '周日', value: 1 },
        { label: '周一', value: 2 },
        { label: '周二', value: 3 },
        { label: '周三', value: 4 },
        { label: '周四', value: 5 },
        { label: '周五', value: 6 },
        { label: '周六', value: 7 }
      ]
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
      if (val) {
        this.parseCronExpression(this.value)
      }
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    },
    value(val) {
      if (val) {
        this.cronExpression = val
        this.parseCronExpression(val)
      }
    }
  },
  created() {
    this.parseCronExpression(this.value)
  },
  methods: {
    updateCronExpression() {
      // 生成cron表达式
      this.cronExpression = [
        this.getPartExpression('second'),
        this.getPartExpression('minute'),
        this.getPartExpression('hour'),
        this.getPartExpression('day'),
        this.getPartExpression('month'),
        this.getPartExpression('week'),
        this.getPartExpression('year')
      ].join(' ')
    },
    
    getPartExpression(field) {
      const config = this[field]
      
      // 处理周和日的互斥关系
      if (field === 'week' && config.type === 'notSpecify') {
        return '?'
      }
      
      if (field === 'day' && config.type === 'notSpecify') {
        return '?'
      }
      
      // 处理普通情况
      switch (config.type) {
        case 'every':
          return '*'
        case 'specific':
          if (!config.value.length) {
            return '*'
          }
          return config.value.join(',')
        case 'range':
          if (config.start === undefined || config.end === undefined) {
            return '*'
          }
          return `${config.start}-${config.end}`
        case 'interval':
          const start = field === 'second' || field === 'minute' || field === 'hour' ? config.start : 
                       (field === 'day' || field === 'month' || field === 'week' ? config.start : config.start);
          return `${start}/${config.interval}`
        default:
          return '*'
      }
    },
    
    dayTypeChanged() {
      // 当日期类型改变时，如果选择了具体日期类型（非不指定），则周应设为不指定
      if (this.day.type !== 'notSpecify') {
        this.week.type = 'notSpecify'
      }
      this.updateCronExpression()
    },
    
    weekTypeChanged() {
      // 当周类型改变时，如果选择了具体周类型（非不指定），则日期应设为不指定
      if (this.week.type !== 'notSpecify') {
        this.day.type = 'notSpecify'
      }
      this.updateCronExpression()
    },
    
    parseCronExpression(expression) {
      if (!expression) return
      
      const parts = expression.split(' ')
      if (parts.length !== 7) return
      
      this.parseExpressionPart('second', parts[0])
      this.parseExpressionPart('minute', parts[1])
      this.parseExpressionPart('hour', parts[2])
      this.parseExpressionPart('day', parts[3])
      this.parseExpressionPart('month', parts[4])
      this.parseExpressionPart('week', parts[5])
      this.parseExpressionPart('year', parts[6])
      
      this.cronExpression = expression
    },
    
    parseExpressionPart(field, part) {
      // 重置该字段的配置
      this[field] = {
        type: 'every',
        value: [],
        start: this.getDefaultStart(field),
        end: this.getDefaultEnd(field),
        interval: 1
      }
      
      if (part === '*') {
        this[field].type = 'every'
      } else if (part === '?') {
        this[field].type = 'notSpecify'
      } else if (part.includes(',')) {
        this[field].type = 'specific'
        this[field].value = part.split(',').map(v => parseInt(v, 10))
      } else if (part.includes('-')) {
        this[field].type = 'range'
        const [start, end] = part.split('-')
        this[field].start = parseInt(start, 10)
        this[field].end = parseInt(end, 10)
      } else if (part.includes('/')) {
        this[field].type = 'interval'
        const [start, interval] = part.split('/')
        if (start === '*') {
          this[field].start = this.getDefaultStart(field)
        } else {
          this[field].start = parseInt(start, 10)
        }
        this[field].interval = parseInt(interval, 10)
      } else if (!isNaN(parseInt(part, 10))) {
        this[field].type = 'specific'
        this[field].value = [parseInt(part, 10)]
      }
    },
    
    getDefaultStart(field) {
      switch (field) {
        case 'second':
        case 'minute':
        case 'hour':
          return 0
        case 'day':
        case 'month':
        case 'week':
          return 1
        case 'year':
          return this.currentYear
        default:
          return 0
      }
    },
    
    getDefaultEnd(field) {
      switch (field) {
        case 'second':
        case 'minute':
          return 59
        case 'hour':
          return 23
        case 'day':
          return 31
        case 'month':
          return 12
        case 'week':
          return 7
        case 'year':
          return this.currentYear + 10
        default:
          return 59
      }
    },
    
    handleConfirm() {
      this.$emit('input', this.cronExpression)
      this.dialogVisible = false
    },
    
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.time-unit-config {
  margin-bottom: 15px;
}

.config-item {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.separator {
  margin: 0 10px;
}

.cron-preview {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-radio-group {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}

.el-radio {
  margin-right: 15px;
  margin-bottom: 10px;
}

.config-item span {
  margin: 0 5px;
}

.el-select {
  width: 200px;
}
</style>