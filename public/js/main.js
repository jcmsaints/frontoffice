function addDatePicker(selector) {
  $(selector).datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ]
  });
  $(selector).datepicker("setDate", "-0d");
}
function addDataTable(selector) {
  $(document).ready(function() {
    $(selector).DataTable({
      scrollY: "300px",
      sScrollX: "100%",
      sScrollXInner: "100%",
      bScrollCollapse: true,
      scrollCollapse: true,
      paging: false,
      language: {
        search: "Pesquisa:",
        infoEmpty: "Sem resultados",
        info: "Total de _MAX_ Resultados",
        infoFiltered: "(filtrado de _MAX_ total)"
      }
    });
  });
}
