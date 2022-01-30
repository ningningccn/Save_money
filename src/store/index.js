import { createStore } from "vuex";


export default createStore({
  state: {
    toDay: new Date(+new Date() + 8 * 3600 * 1000).toISOString().slice(0, 10),
    startData: [],
    seletedReportDate: {
      year: '',
      month: '',
      day: '',
    },
    ShowReportContext:{
      showReportDate: '',
      incomeReport: [],
      payReport: [],
    },
  },
  mutations: {
    STARTDATA(state, val){
      state.startData =  val;
    },
    SELETED_REPORT_DATE(state, val) {
      state.seletedReportDate.year = val.year;
      state.seletedReportDate.month = val.month;
      state.seletedReportDate.day = val.day;
    },
    SHOW_REPORT_CONTEXT(state, val){
      console.log(val)
      state.ShowReportContext.showReportDate = val.showReportDate;
      state.ShowReportContext.incomeReport = val.incomeArr;
      state.ShowReportContext.payReport = val.payArr;
    }
  },
  actions: {
    getLocalStorageData(context) {
      console.log(123)
      if (this.state.startData.value === null) {
        context.commit('STARTDATA',localStorage.setItem("data", JSON.stringify([])))
      }
      if (this.state.startData) {
        context.commit('STARTDATA',JSON.parse(localStorage.getItem("data")))
      }
    },
    seletedReportDate(context, val){
      console.log(val)
      const date = {
        year: val.slice(0,4),
        month: val.slice(5,7),
        day: val.slice(8,10),
      }
      context.commit('SELETED_REPORT_DATE', date)
    },
    getReportData(context,num) {
      let moreList = new Set();
      let reportObj = {
        incomeReport: [],
        payReport: [],
      }
      let incomeList = context.state.startData.filter(item => item.type === "income"); //將income type分類
      // console.log('incomeList: ', incomeList);
      let showReportDate = "";
      if(num === 1 ){
        showReportDate= context.state.seletedReportDate.year;
        incomeList = incomeList.filter(item => item.date.slice(0,4) === context.state.seletedReportDate.year);
      }
      if(num === 2){
        const mixText = `${context.state.seletedReportDate.year}-${context.state.seletedReportDate.month}`
        incomeList = incomeList.filter(item => item.date.slice(0,7) === mixText);
        showReportDate = mixText;
      }
      if(num === 3){
        const mixText = `${context.state.seletedReportDate.year}-${context.state.seletedReportDate.month}-${context.state.seletedReportDate.day}`
        // console.log('mixText: ', mixText);
        incomeList = incomeList.filter(item => item.date.slice(0,10) == mixText);
        showReportDate = mixText;
      }
      console.log('incomeList: ', incomeList);
      let incomeCount = 0;
      let incomeOnlyList = new Set();
      // 判斷incomeList 獨一的值
      incomeList.forEach(item => {
        if(incomeOnlyList.has(item.category)){
          moreList.add(item.category)
        }else {
          incomeOnlyList.add(item.category)
        }
      })
      // 計算money
      incomeOnlyList.forEach(itemA => {
        context.state.startData.forEach(itemB => {
          if(itemA === itemB.category){
            incomeCount += itemB.money
          }
        })
        reportObj.incomeReport.push({category: itemA, money: incomeCount})
        incomeCount = 0;
      })
      let payList = context.state.startData.filter(item => item.type === "pay")
      if(num === 1) {
        payList = payList.filter(item => item.date.slice(0,4) === showReportDate)
      }
      if(num === 2) {
        payList = payList.filter(item => item.date.slice(0,7) === showReportDate)
      }
      if(num === 3) {
        payList = payList.filter(item => item.date.slice(0,10) === showReportDate)
      }
      let payCount = 0;
      let payOnlyList = new Set();
      payList.forEach(item => {
        if(payOnlyList.has(item.category)){
          moreList.add(item.category)
        }else {
          payOnlyList.add(item.category)
        }
      })
      payOnlyList.forEach(itemA => {
        context.state.startData.forEach(itemB => {
          if(itemA === itemB.category){
            payCount += itemB.money
          }
        })
        reportObj.payReport.push({category: itemA, money: payCount})
        payCount = 0;
      })
      // console.log('reportData: ', reportObj,incomeList,payList);
      // 將reportObj 轉Datepicker 的格式
      let incomeArr = [];
      incomeArr.push(["Category","Money"])
      reportObj.incomeReport.forEach(item => incomeArr.push([item.category,item.money]))

      let payArr = [];
      payArr.push(["Category","Money"]);
      reportObj.payReport.forEach(item => payArr.push([item.category,item.money]))
      context.commit("SHOW_REPORT_CONTEXT", {incomeArr, payArr,showReportDate})
      console.log(payArr)
    },
  },
  getters: {
    toDay: (state) => state.toDay,
    seletedReportDate: (state) => state.seletedReportDate,
    ShowReportContext: (state) => state.ShowReportContext
  }
  // modules: { auth, table },
});