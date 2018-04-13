/*

  eval.ts

  @author Emery Berger <emery@cs.umass.edu> http://www.emeryberger.com

*/
/// <reference path="./jquery.d.ts" />
;
;
var EmpiricalEval = /** @class */ (function () {
    function EmpiricalEval() {
        EmpiricalEval.theInstance = this;
        jQuery.getJSON("eval.json", function (json) {
            var s = "";
            s += "<h1>" + json.title + "</h1>";
            s += "<h3>" + json.credits + "</h3>";
            s += "<h4>" + json.date + "</h4>";
            var g = json.groups;
            s += "<table width='500'>";
            for (var _i = 0, g_1 = g; _i < g_1.length; _i++) {
                var i = g_1[_i];
                s += "<tr>";
                s += "<td style='color:";
                // Ad hoc: black text for light background colors.
                if (i.color === "PaleGreen") {
                    s += "black";
                }
                else {
                    s += "white";
                }
                s += ";' bgcolor='"
                    + i.color
                    + "' colspan='2'><font size='+1'><input type='checkbox'>&nbsp;"
                    + i.name + "<br />&nbsp;<br /></font></td></tr>";
                var items = i.items;
                for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
                    var item = items_1[_a];
                    if (item.include === "yes") {
                        s += "<tr style='background-color:" + i.color + ";'>";
                        s += "<td>";
                        s += "<img align='middle' height='100' width='100' src='" + item.figure + "'>";
                        s += "</td><td>";
                        s += "<b>" + item.name + "</b><br />";
                        s += item.desc + "<br /><br />";
                        s += "</td></tr>";
                    }
                }
                s += "<tr><td>&nbsp;</td></tr>";
            }
            // s += "<tr><td><button onClick='alert(\"STRONG REJECT\");' type='button'>Submit</button></td></tr>";
            s += "</table>";
            jQuery("#checklist").html(s);
        });
    }
    return EmpiricalEval;
}());
var ev = new EmpiricalEval();
