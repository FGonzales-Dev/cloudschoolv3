"use strict";
$(document).ready(function () {
    function a(a) {
        var b = a.replace(/[A-Z]/g, " $&").trim();
        $(".report-title").html(jsLang(b)),
            $(".filter-data").hide(),
            $("#report_name").attr("disabled", "disabled"),
            $("input").val(""),
            $("." + a).show(),
            ("CustomerImageReport" == a || "CustomerWordReport" == a || "CustomerTransactionReport" == a) && $(".date-picker-field").show(),
            $("#report-module").html(""),
            $(".search-btn").attr("disabled", !0),
            $.ajax({
                type: "get",
                dataType: "html",
                beforeSend: function () {
                    $("#report-module").html(
                        '<div class="placeholder wave p-0" style="height: 16px">\n                <div class="square"></div>\n                </div><div class="placeholder wave p-0" style="height: 16px">\n                <div class="square"></div>\n                </div>'
                    ),
                        $("#loader").show(),
                        $(".search-btn").text(jsLang("Filtering")).append(`<div class="spinner-border spinner-border-sm ml-2" role="status"></div>`);
                },
                url: SITE_URL + "/reports",
                data: { type: a },
                success: function (a) {
                    if (a) {
                        let b = JSON.parse(a);
                        $("#report-module").append(b.list),
                            $("#loader").hide(),
                            $(".placeholder").hide(),
                            $(".spinner-border").remove(),
                            $(".search-btn").text(jsLang("Filter")),
                            $(".search-btn").attr("disabled", !1),
                            $("#report_name").removeAttr("disabled");
                    }
                },
            });
    }
    $(".date-range").daterangepicker(daterangeConfig(startDate, endDate), cbRange),
        cbRange(startDate, endDate),
        $('input[name="start_date"]').daterangepicker(dateSingleConfig($('input[name="start_date"]').val())),
        $('input[name="end_date"]').daterangepicker(dateSingleConfig($('input[name="end_date"]').val())),
        a("SubscriptionReport");
    $(document).on("change", "#report_name", function () {
        a($(this).val());
    }),
        $(document).on("click", ".search-btn", function (a) {
            a.preventDefault(),
                $(".search-btn").attr("disabled", !0),
                $("#report-module").html(""),
                $.ajax({
                    type: "get",
                    dataType: "html",
                    beforeSend: function () {
                        $("#report-module").html(
                            '<div class="placeholder wave p-0" style="height: 16px">\n                <div class="square"></div>\n                </div><div class="placeholder wave p-0" style="height: 16px">\n                <div class="square"></div>\n                </div>'
                        ),
                            $("#loader").show(),
                            $(".search-btn").text(jsLang("Filtering")).append(`<div class="spinner-border spinner-border-sm ml-2" role="status"></div>`);
                    },
                    url: SITE_URL + "/reports",
                    data: {
                        type: $("#report_name").val(),
                        from: $("#startfrom").val(),
                        to: $("#endto").val(),
                        subscriptionCode: $("#subscription-code").val(),
                        customerName: $("#customer-name").val(),
                        customerEmail: $("#customer-email").val(),
                    },
                    success: function (a) {
                        if (a) {
                            let b = JSON.parse(a);
                            $("#report-module").append(b.list), $("#loader").hide(), $(".placeholder").hide(), $(".spinner-border").remove(), $(".search-btn").text(jsLang("Filter")), $(".search-btn").attr("disabled", !1);
                        }
                    },
                });
        });
});
