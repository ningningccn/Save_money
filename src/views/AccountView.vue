<template>
  <div class="container border">
    <div class="d-flex justify-content-between">
      <div class="head-l w-25 text-start mt-2">
        <div class="title"><i class="bi bi-coin"></i> 帳目明細</div>
        <div class="date">{{ toDay }}</div>
        <div>總數：{{ startData.length }}</div>
      </div>
      <div class="head-r w-50 text-end">
        <div>總收入 : <span class="text-success">${{ income }}</span></div>
        <div>總支出 : <span class="text-danger">${{ pay }}</span></div>
        <div>餘額 : <span>${{ balances }}</span></div>
      </div>
    </div>
    <div>
      <DatePicker is-expanded v-model="datePick"
        :attributes="attributes"/>
    </div>
    <div class="d-flex justify-content-around">
      <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#incomeModal">收入</button>
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#payModal">支出</button>

      <!-- Modal Income-->
      <div class="modal fade" id="incomeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">收入</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit="addIncome">
                <span>日期: </span><input type="date" class="w-75 my-2" v-model="incomeRecords.date">
                <div>
                  <span>種類: </span>
                  <select class="w-75 my-2" v-model="incomeRecords.category">
                    <option value="salary">工資</option>
                    <option value="bonus">獎金</option>
                    <option value="investment">理財投資</option>
                    <option value="partTime">兼職</option>
                  </select>
                </div>
                <div>
                  <span>金額: </span><input type="number" class="w-75 my-2" v-model="incomeRecords.money">
                </div>
                <div>
                  <span>備註: </span><input type="text" class="w-75 my-2" v-model="incomeRecords.remark">
                </div>
                <div class="d-flex justify-content-end pe-5 py-5">
                  <button type="button" class="btn btn-secondary me-5" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal pay -->
      <div class="modal fade" id="payModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">支出</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="addPay">
              <span>日期: </span><input type="date" class="w-75 my-2" v-model="payRecords.date">
              <div>
                <span>種類: </span>
                <select class="w-75 my-2" v-model="payRecords.category">
                  <option value="salary">工資</option>
                  <option value="bonus">獎金</option>
                  <option value="investment">理財投資</option>
                  <option value="partTime">兼職</option>
                </select>
              </div>
              <div>
                <span>金額: </span><input type="number" class="w-75 my-2" v-model.number="payRecords.money">
              </div>
              <div>
                <span>備註: </span><input type="text" class="w-75 my-2" v-model="payRecords.remark">
              </div>
              <div class="d-flex justify-content-end pe-5 py-5">
                {{ payRecords.money }} {{ payRecords.today}}
                <button type="button" class="btn btn-secondary me-5" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="border mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">時間</th>
            <th scope="col">分類</th>
            <th scope="col">金額</th>
            <!-- <th colspan="2">備註</th> -->
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in dataReverse" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.money }}</td>
            <td>{{ item.remark }}</td>
            <td><button type="button" class="btn-close" @click="deleteData(item)"></button></td>
          </tr>
        </tbody>
      </table>
      <div class="text-center p-5" v-if="!startData || startData==undefined">沒有資料</div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed ,watch} from "vue"
import {  DatePicker } from 'v-calendar';
export default{
  components: { DatePicker },
  setup(){
// 總數
    const income = ref(0);
    const pay = ref(0);
    const balances = ref(0);
    const attributes = reactive(
      [
        {
          dot: 'red',
          dates: [] // dates:[new Date(2022, 0, 10),new Date(2022, 0, 15),new Date(2022, 0, 20)]
        }
      ]);
    const selectedDate = ref('')
    const datePick = ref(new Date());
    const toDay = new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0,10)
    // const tempData = ref([]); //
    const startData = ref([]); // 啟動時資料會存在這
    const selectedData = ref([]);
    const dotShowArr = reactive([]);
    // 收入
    const incomeRecords = reactive({
      id: Date.now(),
      date: toDay,
      category: '',
      money: 0,
      remark: '',
    });
    function addIncome() {
      if(incomeRecords.money <=0){
        alert('請輸入正確金額');
        return
      }
      if(!localStorage.getItem('data')){
        const tempArr  = [];
        tempArr.push(incomeRecords)
        localStorage.setItem('data', JSON.stringify(tempArr))
        getLocalStorageData()
      }else{
        const tempStr  = JSON.parse(localStorage.getItem('data'));
        tempStr.push(incomeRecords);
        localStorage.setItem('data', JSON.stringify(tempStr));
        getLocalStorageData();
      }
    }
    // !------------------------------支出
    const payRecords = reactive({
      id: Date.now(),
      date: toDay,
      category: '',
      money: 0,
      remark: '',
    });
    function addPay() {
      if(payRecords.money <=0){
        alert('請輸入正確金額');
        return;
      }
      if(!localStorage.getItem('data')){
        const tempArr = []
        tempArr.push(payRecords);
        console.log('tempData: 158', tempArr);
        localStorage.setItem('data', JSON.stringify(tempArr));
        getLocalStorageData();
      }else{
        const tempArr = JSON.parse(localStorage.getItem('data'));
        tempArr.push(payRecords);
        localStorage.setItem('data', JSON.stringify(tempArr));
        getLocalStorageData()
      }
    }
    function deleteData(item) {
      console.log(item.id);
      const temp = JSON.parse(localStorage.getItem('data'));
      console.log(temp);
      temp.splice(temp.indexOf(item.id),1);
      console.log(temp);
      localStorage.setItem('data', JSON.stringify(temp));
      console.log(startData.value ,'已經delete')
      getLocalStorageData();
      console.log(startData.value ,'已經delete2')
    }
    //================================================================
      // 更新畫面
    function getLocalStorageData() {
      console.log(1);
      startData.value = JSON.parse(localStorage.getItem('data'));
      console.log('startData update' )
      // dotShow(); //顯示紅點
    }
    function dotShow() {
      // const tempArr = []
      // moneyData.value.forEach((item) => {
      //   tempArr.includes(item.date)? '' : tempArr.push(item.date)
      // })
      // const a = [];
      // tempArr.forEach((item ) => {
      //   a.push(item.replace(/-/g,','))
      // })
      // a.forEach((item) => {
      //   attributes[0].dates.push(new Date(item))
      // })
    }
    //顯示倒轉
    const dataReverse = computed(() => {
      if(startData.value.length >0) {
        if (selectedData.value.length>0){
          return  selectedData.value.slice(0).reverse()
        }else if(selectedDate.value != ''){ //沒有pick時，
          return [];
        }
      }
      return startData.value.filter(item => item.date == toDay)
    })
    // const testShowData = computed(() => {
    // })
    watch(datePick,() => {
      if(datePick.value != null){
        selectedDate.value = datePick.value.toISOString().slice(0,10);
        selectedData.value = startData.value.filter(item => item.date == selectedDate.value)
      }
    }),
    watch(startData,() => {
      selectedData.value = startData.value.filter(item => item.date == selectedDate.value)
    })
    onMounted(() => getLocalStorageData())
    onMounted(() => dotShow())
    return {
      pay,income,balances,
      toDay,
      incomeRecords,
      addIncome,
      payRecords,
      addPay,
      startData,
      selectedData,
      getLocalStorageData,
      datePick,
      dataReverse,
      deleteData,
      selectedDate,
      attributes,
      dotShow,
      dotShowArr
    }
  }
}
</script>

<style>
</style>
