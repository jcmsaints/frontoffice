const authGuard = require("../services/authGuard");
const Expense = require("../dtos/expense");
const getRequest = require("../services/getRequest");
module.exports = function(app, passport, users) {
  app.get("/", authGuard.checkAuthenticated, (req, res) => {
    function resolveExpense(data) {
      let expenseList = [];
      let totalExpense = 0;
      let expenseChartMap = new Map();
      let expenseChart = [];
      for (item in data) {
        expenseList.push(new Expense(data[item]));
      }
      for (expense in expenseList) {
        totalExpense += Number(expenseList[expense].value);
        if (expenseChartMap.get(expenseList[expense].categoryName)) {
          expenseChartMap.set(
            expenseList[expense].categoryName,
            expenseList[expense].value +
              expenseChartMap.get(expenseList[expense].categoryName)
          );
        } else {
          expenseChartMap.set(
            expenseList[expense].categoryName,
            Number(expenseList[expense].value)
          );
        }
      }

      expenseChartMap.forEach(function(value, key) {
        expenseChart.push({ label: key, sum: value });
      }, expenseChartMap);
      if (expenseChart.length == 0) {
        expenseChart.push({ label: "Sem Despesas", sum: 100 });
      }
      res.render("home", {
        totalExpense: totalExpense,
        expenseChart: expenseChart
      });
    }
    function rejectExpense(data) {
      console.log(data);
    }

    getRequest.findAll(
      `expenses?user=${req.user.email}`,
      "",
      resolveExpense,
      rejectExpense
    );
  });

  app.get("/creditos", (req, res) => {
    res.render("credits");
  });
};
