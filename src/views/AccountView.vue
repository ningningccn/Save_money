<template>
  <div class="container col-md-8">
    <div class="d-flex justify-content-between">
      <div class="head-l w-25 text-start mt-2">
        <!-- <export-excel
            :data   = "startData"
            name= "123.xls">
            Download Data
            <img src="download_icon.png">
            >
        </export-excel> -->
        <div class="title"><i class="bi bi-coin"></i> 帳目明細</div>
        <div>{{ toDay }}</div>
      </div>
      <div class="text-end fw-bolder d-flex flex-column header-right text-blue p-2">
        <div class="d-flex justify-content-end border-bottom-blue">
          <div>
            <div>總收入 :</div>
            <div>總支出 :</div>
          </div>
          <div>
            <div class="text-green">+ ${{ income }}</div>
            <div  class="text-red">- ${{ pay }}</div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
            <div>餘額 : </div>
            <div>${{ balances }}</div>
        </div>
      </div>
    </div>
    <div class="px-5 py-3 ">
      <DatePicker is-expanded v-model="datePick" :attributes="attributes" :theme-styles='themeStyles'></DatePicker>
    </div>
    <div class="d-flex justify-content-around">
      <button type="button" class="btn btn-success fw-bolder" data-bs-toggle="modal" data-bs-target="#incomeModal">
        收入
      </button>
      <button type="button" class="btn btn-danger fw-bolder" data-bs-toggle="modal" data-bs-target="#payModal">
        支出
      </button>

      <!-- Modal Income-->
      <div class="modal fade text-blue bolder" id="incomeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header ">
              <h5 class="modal-title" id="exampleModalLabel">收入</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit="addIncome">
                <span>日期: </span>
                <input type="date" class="w-75 my-2 " v-model="incomeRecords.date"/>
                <div>
                  <span>種類: </span>
                  <select class="w-75 my-2" v-model="incomeRecords.category">
                    <option value="工資">工資</option>
                    <option value="獎金">獎金</option>
                    <option value="理財投資">理財投資</option>
                    <option value="兼職">兼職</option>
                  </select>
                </div>
                <div>
                  <span>金額: </span
                  ><input
                    type="number"
                    class="w-75 my-2"
                    v-model="incomeRecords.money"
                  />
                </div>
                <div>
                  <span>備註: </span
                  ><input
                    type="text"
                    class="w-75 my-2 text-blue fw-bolder"
                    v-model="incomeRecords.remark"
                  />
                </div>
                <div class="d-flex justify-content-end pe-5 py-5">
                  <button
                    type="button"
                    class="btn btn-secondary me-5"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal pay -->
      <div
        class="modal fade text-blue fw-bolder"
        id="payModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">支出</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="addPay">
              <span>日期: </span>
              <input type="date" class="w-75 my-2" v-model="payRecords.date" />
              <div>
                <span>種類: </span>
                <select class="w-75 my-2" v-model="payRecords.category">
                  <option value="飲食">飲食</option>
                  <option value="日用">日用</option>
                  <option value="交通">交通</option>
                  <option value="社交">社交</option>
                  <option value="娛樂">娛樂</option>
                  <option value="美容">美容</option>
                  <option value="醫療">醫療</option>
                  <option value="教育">教育</option>
                  <option value="寵物">寵物</option>
                  <option value="旅行">旅行</option>
                  <option value="住屋">住屋</option>
                  <option value="通訊">通訊</option>
                  <option value="服飾">服飾</option>
                </select>
              </div>
              <div>
                <span>金額: </span>
                <input type="number" class="w-75 my-2" v-model.number="payRecords.money"/>
              </div>
              <div>
                <span>備註: </span><input type="text" class="w-75 my-2" v-model="payRecords.remark"/>
              </div>
              <div class="d-flex justify-content-end pe-5 py-5">
                {{ payRecords.money }}
                <button type="button" class="btn btn-secondary me-5" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="border-radius mt-3">
      <table class="table fw-bolder table-striped p-5"
        v-if="dataReverse.length>0">
        <thead class="text-blue">
          <tr>
            <th scope="col">日期</th>
            <th scope="col">分類</th>
            <th scope="col">金額</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody class="text-blue">
          <tr v-for="item in dataReverse" :key="item.id">
            <td class="col-5 col-md-3">
              <span v-if="item.type=='income'" class="text-green">
                <i class="bi bi-arrow-up"></i>
              </span>
              <span v-else class="text-red">
                <i class="bi bi-arrow-down"></i>
              </span>
              {{ item.date }}
            </td>
            <td class="col-2 col-md-3">{{ item.category }}</td>
            <td class="col-2 col-md-3">${{ item.money }}</td>
            <td class="col-3 col-md-3">{{ item.remark }}</td>
            <td class="col-1">
              <button
                type="button"
                class="btn-close text-blue"
                @click="deleteData(item)"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center p-5 text-blue fw-bolder" v-if="dataReverse.length == 0">
        沒有資料
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { DatePicker } from "v-calendar";
import { useStore } from "vuex"
export default {
  components: { DatePicker },
  setup() {
    const store = useStore();
    const attributes = reactive([
      {
        dot: "red",
        dates: [], // dates:[new Date(2022, 0, 10),new Date(2022, 0, 15),new Date(2022, 0, 20)]
      },
      {
        dot: "green",
        dates: [],
      }
    ]);
    const selectedDate = ref("");
    const datePick = ref(new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10));
    const toDay = new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 10);
    const startData = ref([]); // 啟動時資料會存在這
    const selectedData = ref([]);
    const income = computed(() => {
      let money = 0
      startData.value.forEach((item) => {
        if(item.type == "income"){
          money += item.money;
        }
      })
      return money
    });
    const pay = computed(() => {
      let money = 0
      startData.value.forEach((item) => {
        if(item.type == "pay"){
          money += item.money;
        }
      })
      return money
    });
    const balances = computed(() => {
      return income.value - pay.value
    });

    // !=============================================收入
    const incomeRecords = reactive({
      id: 0,
      type: "income",
      date: toDay,
      category: "工資",
      money: 0,
      remark: "",
    });
    function addIncome() {
      if (incomeRecords.money <= 0) {
        alert("請輸入正確金額");
        return;
      }
      if (!localStorage.getItem("data")) {
        const tempArr = [];
        incomeRecords.id = Date.now();
        tempArr.push(incomeRecords);
        localStorage.setItem("data", JSON.stringify(tempArr));
        getLocalStorageData();
      } else {
        const tempStr = JSON.parse(localStorage.getItem("data"));
        incomeRecords.id = Date.now();
        tempStr.push(incomeRecords);
        localStorage.setItem("data", JSON.stringify(tempStr));
        getLocalStorageData();
      }
    }
    // !======================支出
    const payRecords = reactive({
      id: 0,
      type: "pay",
      date: toDay,
      category: "飲食",
      money: 0,
      remark: "",
    });
    function addPay() {
      if (payRecords.money <= 0) {
        alert("請輸入正確金額");
        return;
      }
      if (!localStorage.getItem("data")) {
        const tempArr = [];
        payRecords.id = Date.now();
        tempArr.push(payRecords);
        console.log("tempData: 158", tempArr);
        localStorage.setItem("data", JSON.stringify(tempArr));
        getLocalStorageData();
      } else {
        const tempArr = JSON.parse(localStorage.getItem("data"));
        payRecords.id = Date.now();
        tempArr.push(payRecords);
        localStorage.setItem("data", JSON.stringify(tempArr));
        getLocalStorageData();
      }
    }
    function deleteData(item) {
      console.log(item.id);
      const temp = JSON.parse(localStorage.getItem("data"));
      const delId = temp.filter((data) => data.id !== item.id); // 刪除指定的array
      localStorage.setItem("data", JSON.stringify(delId));
      getLocalStorageData();
    }
    //================================================================
    // 更新畫面
    function getLocalStorageData() {
      if (localStorage.getItem('data') === null) {
        localStorage.setItem("data", JSON.stringify([]));
      }
      if (startData.value) {
        startData.value = JSON.parse(localStorage.getItem("data"));
        console.log("startData update");
      }
      dotShow(); //顯示紅點
    }
    function dotShow() {
      if (attributes[0].dates) {
        attributes[0].dates = [];
      }
      if (startData.value !== null) {
        const income = [];
        const incomeTempArr = [];
        const incomeDotArr = startData.value.filter(item => item.type === "income");
        incomeDotArr.forEach((item) => {
          incomeTempArr.includes(item.date) ? "" : incomeTempArr.push(item.date);
        });
        incomeTempArr.forEach((item) => {
          income.push(item.replace(/-/g, ","));
        });
        income.forEach((item) => {
          attributes[1].dates.push(new Date(item));
        });

        const pay = [];
        const payTempArr = [];
        const payDotArr = startData.value.filter(item => item.type === "pay");
        payDotArr.forEach((item) => {
          payTempArr.includes(item.date) ? "" : payTempArr.push(item.date);
        });
        payTempArr.forEach((item) => {
          pay.push(item.replace(/-/g, ","));
        });
        pay.forEach((item) => {
          attributes[0].dates.push(new Date(item));
        });
      }
    }
    //顯示倒轉
    const dataReverse = computed(() => {
      if (startData.value === null) {
        return;
      }
      if (startData.value.length > 0) {
        if (selectedData.value.length > 0) {
          return selectedData.value.slice(0).reverse();
        } else if (selectedDate.value != "") {
          //沒有pick時，
          return [];
        }
      }
      return startData.value.filter((item) => item.date == toDay).slice(0).reverse();
    });
    watch(datePick, () => {
      if (datePick.value != null) {
        selectedDate.value = datePick.value.toISOString().slice(0, 10);
        selectedData.value = startData.value.filter(
          (item) => item.date == selectedDate.value
        );
      }
    }),
    watch(startData, () => {
        if (startData.value) {
          selectedData.value = startData.value.filter(
            (item) => item.date == selectedDate.value
          );
        }
      });
    onMounted(() => getLocalStorageData());
    onMounted(() => dotShow());
    return {
      store,
      pay,
      income,
      balances,
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
    };
  },
};
</script>

<style>
.btn-success{
  color: #fff !important;;
  border-color: #81BE63 !important;
  background-color:#81BE63 !important;
}
.btn-danger{
  color: #fff !important;
  border-color: #ED6D70 !important;
  background-color:#ED6D70 !important;
}
.text-green{
  color: #81BE63;
}
.text-red{
  color: #ED6D70;
}
.text-blue{
  color: #5C8EAD
}
.table{
  /* border-bottom-color: #5C8EAD !important */
  --bs-table-striped-color: #5C8EAD !important;
  --bs-table-striped-bg: #D0EBFA !important;
}
.border-radius{
  border: 2px solid #5C8EAD;
  border-radius: 20px;
}

.border-bottom-blue{
  border-bottom: 2px solid #5C8EAD;
}
.header-right{
  border-radius: 10px;
  border: 2px solid #5C8EAD;
}

form input,select {
  border: 2px solid #5C8EAD;
  border-radius: 10px;
  padding: 10px;
  color: #5C8EAD;
  font-weight: bolder;
}
</style>
