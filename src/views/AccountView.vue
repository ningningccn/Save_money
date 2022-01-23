<template>
  <div class="container border">
    <div class="d-flex justify-content-between">
      <div class="head-l w-25 text-start mt-2">
        <div class="title"><i class="bi bi-coin"></i> 帳目明細</div>
        <div class="date">{{ toDay }}</div>
      </div>
      <div class="head-r w-50 text-end">
        <div>總收入 : <span class="text-success">${{ income }}</span></div>
        <div>總支出 : <span class="text-danger">${{ pay }}</span></div>
        <div>餘額 : <span>${{ balances }}</span></div>
      </div>
    </div>
    <div>
      <DatePicker is-expanded v-model="toDayTest" mode="date"/>
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
                <span>日期: </span><input type="date" class="w-75 my-2" v-model="incomeData.date">
                <div>
                  <span>種類: </span>
                  <select class="w-75 my-2" v-model="incomeData.category">
                    <option value="salary">工資</option>
                    <option value="bonus">獎金</option>
                    <option value="investment">理財投資</option>
                    <option value="partTime">兼職</option>
                  </select>
                </div>
                <div>
                  <span>金額: </span><input type="number" class="w-75 my-2" v-model="incomeData.money">
                </div>
                <div>
                  <span>備註: </span><input type="text" class="w-75 my-2" v-model="incomeData.remark">
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
            <form @submit="addPay">
              <span>日期: </span><input type="date" class="w-75 my-2" v-model="payData.date">
              <div>
                <span>種類: </span>
                <select class="w-75 my-2" v-model="payData.category">
                  <option value="salary">工資</option>
                  <option value="bonus">獎金</option>
                  <option value="investment">理財投資</option>
                  <option value="partTime">兼職</option>
                </select>
              </div>
              <div>
                <span>金額: </span><input type="number" class="w-75 my-2" v-model.number="payData.money">
              </div>
              <div>
                <span>備註: </span><input type="text" class="w-75 my-2" v-model="payData.remark">
              </div>
              <div class="d-flex justify-content-end pe-5 py-5">
                {{ payData.money }} {{ payData.today}}
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
            <th scope="col"></th>
            <th scope="col">時間</th>
            <th scope="col">分類</th>
            <th scope="col">金額</th>
            <th colspan="2">備註</th>
            <!-- <th scope="col"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataReverse" :key="item">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.money }}</td>
            <td>{{ item.remark }}</td>
            <td><button type="button" class="btn-close" @click="deleteData(index)"></button></td>
          </tr>
        </tbody>
      </table>
      <div class="text-center p-5" v-if="!moneyData">沒有資料</div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue"
import {  DatePicker } from 'v-calendar';
export default{
  components: {DatePicker },
  setup(){
// 總數
    const toDayTest = ref(new Date());
    const income = ref(0);
    const pay = ref(0);
    const balances = ref(0);
    const toDay = new Date().toISOString().slice(0,10)
    const tempData = ref([]); //
    const moneyData = ref([]); // 啟動時資料會存在這
    // 收入
    const incomeData = reactive({
      date: toDay,
      category: '',
      money: 0,
      remark: '',
    });
    function addIncome() {
      if(incomeData.money <=0){
        alert('請輸入正確金額');
        return
      }
      if(!localStorage.getItem('data')){
        tempData.value.push(incomeData)
        localStorage.setItem('data', JSON.stringify(tempData.value))
        tempData.value = [];
        update()
      }else{
        const temp = JSON.parse(localStorage.getItem('data'));
        temp.push(incomeData);
        localStorage.setItem('data', JSON.stringify(temp));
        update();
      }
    }
    // 支出
    const payData = reactive({
      date: toDay,
      category: '',
      money: 0,
      remark: '',
    });
    function addPay() {
      if(payData.money <=0){
        alert('請輸入正確金額');
        return
      }
      if(!localStorage.getItem('data')){
        tempData.value.push(payData);
        console.log('tempData: 158', tempData);
        localStorage.setItem('data', JSON.stringify(tempData.value));
        tempData.value = []; //清空陣列
        console.log('111111')
        update();
      }else{
        const temp = JSON.parse(localStorage.getItem('data'));
        console.log(temp , 'else的temp')
        temp.push(payData);
        localStorage.setItem('data', JSON.stringify(temp));
        console.log(localStorage.getItem('data'));
        console.log('2222222')
        update();
      }
    }
    // 更新畫面
    function deleteData(index) {
      const temp = JSON.parse(localStorage.getItem('data'));
      console.log( temp , index)
      temp.splice(index);
      localStorage.setItem('data', JSON.stringify(temp));
      update();
    }
    function update() {
      moneyData.value= JSON.parse(localStorage.getItem('data'));
    }
    //顯示倒轉
    const dataReverse = computed(() => {
      if(moneyData.value != null) {
        return  moneyData.value.slice(0).reverse()
      }else {
        return [];
      }
    })

    onMounted(() => update())
    return {
      toDay,
      pay,income,balances,
      tempData,
      incomeData,
      addIncome,
      payData,
      addPay,
      moneyData,
      update,
      toDayTest,
      dataReverse,
      deleteData
    }
  }
}
</script>

<style>
</style>
