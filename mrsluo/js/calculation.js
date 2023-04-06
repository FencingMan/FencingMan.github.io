let startDate = new Date();

var modes = [
    ["addc_2_2", "两位数进位加法", 0],
    ["add_2_2", "两位数不进位加", 0],
    ["subc_2_2", "两位数退位减法", 0],
    ["sub_2_2", "两位数不退位减", 0],
    ["add_1_2", "一位数加两位数", 0],
    ["add_2_1", "两位数加一位数", 0],
    ["sub_2_1", "两位数减一位数", 0],
    ["mul_1_1", "一位数乘一位数", 0],
    ["addmul_2_1_1", "两位数加一位数乘", 0],
    ["muladd_1_1_2", "一位数乘加两位数", 0],
    ["mulsub_1_1_2", "一位数乘减两位数", 0],
    ["submul_2_1_1", "两位数减一位数乘", 0],
    ["sub9", "减数个位为9", 0],
    ["sub012", "减数个位为012", 0],
    ["add012", "加数个位为012", 0],
    ["addn_2_2", "特殊非进位加", 0],
    ["addmul_1_1_1", "一位数加一位数乘", 0],
    ["div_99cfb", "99乘法表除", 0],
    ["(2_sub_2)div_1", "(两位数相减)除以一位数", 0],
    ["2_sub_2_add_2", "两位数相减加两位数", 0],
    ["99cfb_div_mul_1", "表内除法乘以一位数", 0],
    ["99cfb_div_div_1", "表内除法除以一位数", 0],
    ["1_mul_1_div_1", "一位数相乘除以一位数", 0],
    ["2_sub_99cfb_div", "两位数减表内除法", 0],
    ["(2_sub_2)mul_1", "（两位数相减>3）乘以一位数", 0],
    ["1", "（两位数相减）除以一位数", 0],
    ["2", "两位数➗（一位数相减）", 0],
    ["3", "两位数➗（一位数相加）", 0],
    ["4", "两位数-（两位数相减）", 0],
    ["5", "一位数×（一位数相加）", 0],
    ["6", "有余数的表内除法", 0],
];

layui.use(['form', 'layedit', 'laydate', 'element', 'laytpl'], function () {
    let element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    let laydate = layui.laydate;

    let laytpl = layui.laytpl;

    let form = layui.form;
    //监听导航点击
    element.on('nav(demo)', function (elem) {
        let text = elem.text();
        if (text === '列选') {
            document.getElementById("mix").style.display = 'none';
            document.getElementById("liexuan").style.display = 'block';
            current_mode = 0;
        } else {
            document.getElementById("mix").style.display = 'block';
            document.getElementById("liexuan").style.display = 'none';
            current_mode = 1;
        }

    });

    //执行一个laydate实例
    laydate.render({
        elem: '#dateSelect'
        , value: new Date()
        , done: function (value, date, endDate) {
            startDate = new Date(value);
        }
    });

    form.on('switch(answerSwitch)', function (data) {
        show_issues();
    });

    //列选表单构建
    let getTpl = liexuanTpl.innerHTML;
    let lxForm = document.getElementById("liexuan");
    laytpl(getTpl).render(modes, function (html) {
        lxForm.querySelectorAll("select").forEach(item => {
            item.innerHTML = html;
        });
    });
    //混合表单构建
    getTpl = mixTpl.innerHTML;
    let mixForm = document.getElementById("mix");
    laytpl(getTpl).render(modes, function (html) {
        mixForm.querySelector("div").innerHTML = html;
    });
    current_mode = 1;

    //份数下拉生成
    for (let i = 1; i <= 20; i++) {
        laytpl('<option value="{{ d }}">{{ d }}</option>').render(i, function (string) {
            document.getElementById("pages").innerHTML += string;
        });
    }

    form.render();


});

/* randomly generate one issue of give type */
function generate_issue(type) {
    let i, j, k, l, m;

    var issue = new Object();

    // default 1 operator
    issue.op_n = 1;
    issue.op = new Array();
    issue.opr = new Array();

    do {
        switch (type) {
            case 'add_1_1':
                i = rand(1, 9);
                j = rand(1, 9);
                issue.opr[0] = i;
                issue.op[0] = '+';
                issue.opr[1] = j;
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'addc_2_2':
                i = rand(1, 7);
                j = rand(1, 9);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '+';
                issue.opr[1] = rand(1, 8 - i) * 10 + rand(10 - j, 9);
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'add_2_2':
                i = rand(1, 8);
                j = rand(0, 9);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '+';
                issue.opr[1] = rand(1, 9 - i) * 10 + rand(0, 9 - j);
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'subc_2_2':
                i = rand(2, 9);
                j = rand(0, 8);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '-';
                issue.opr[1] = rand(1, i - 1) * 10 + rand(j + 1, 9);
                issue.result = issue.opr[0] - issue.opr[1];
                break;
            case 'sub_2_2':
                i = rand(1, 9);
                j = rand(0, 9);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '-';
                issue.opr[1] = rand(1, i) * 10 + rand(0, j);
                issue.result = issue.opr[0] - issue.opr[1];
                break;
            case 'add_2_1':
                i = rand(1, 9);
                j = rand(0, 9);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '+';
                issue.opr[1] = (i < 9) ? rand(0, 9) : rand(0, 9 - j);
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'add_1_2':
                i = rand(1, 9);
                j = rand(1, 9);
                issue.opr[0] = i;
                issue.op[0] = '+';
                issue.opr[1] = (j == 9) ? j * 10 + rand(0, 9 - i) : j * 10 + rand(0, 9);
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'sub_2_1':
                i = rand(1, 9);
                j = rand(0, 9);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '-';
                issue.opr[1] = rand(0, 9);
                issue.result = issue.opr[0] - issue.opr[1];
                break;
            case 'mul_1_1':
                i = rand(1, 9);
                j = rand(1, 9);
                issue.opr[0] = i;
                issue.op[0] = '×';
                issue.opr[1] = j;
                issue.result = issue.opr[0] * issue.opr[1];
                break;
            case 'addmul_2_1_1':
                i = rand(1, 99);
                j = rand(1, 9);
                k = rand(1, 9);
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '+';
                issue.opr[1] = j;
                issue.op[1] = '×';
                issue.opr[2] = k;
                issue.result = issue.opr[0] + issue.opr[1] * issue.opr[2];
                break;
            case 'addmul_1_1_1':
                i = rand(1, 9);
                j = rand(1, 9);
                k = rand(1, 9);
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '+';
                issue.opr[1] = j;
                issue.op[1] = '×';
                issue.opr[2] = k;
                issue.result = issue.opr[0] + issue.opr[1] * issue.opr[2];
                break;
            case 'submul_2_1_1':
                j = rand(1, 9);
                k = rand(1, 9);
                i = rand(j * k, 100);
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '-';
                issue.opr[1] = j;
                issue.op[1] = '×';
                issue.opr[2] = k;
                issue.result = issue.opr[0] - issue.opr[1] * issue.opr[2];
                break;
            case 'muladd_1_1_2':
                i = rand(1, 9);
                j = rand(1, 9);
                k = rand(1, 99);
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '×';
                issue.opr[1] = j;
                issue.op[1] = '+';
                issue.opr[2] = k;
                issue.result = issue.opr[0] * issue.opr[1] + issue.opr[2];
                break;
            case 'mulsub_1_1_2':
                i = rand(4, 9);
                j = rand(4, 9);
                k = rand(1, i * j);
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '×';
                issue.opr[1] = j;
                issue.op[1] = '-';
                issue.opr[2] = k;
                issue.result = issue.opr[0] * issue.opr[1] - issue.opr[2];
                break;
            case 'sub9':
                j = rand(1, 8);
                i = rand(j + 1, 9);
                issue.opr[0] = i * 10 + rand(0, 9);
                issue.op[0] = '-';
                issue.opr[1] = j * 10 + 9;
                issue.result = issue.opr[0] - issue.opr[1];
                break;
            case 'sub012':
                i = rand(2, 9);
                j = rand(0, 2);
                issue.opr[0] = i * 10 + rand(5, 9);
                issue.op[0] = '-';
                issue.opr[1] = rand(0, i - 1) * 10 + j;
                issue.result = issue.opr[0] - issue.opr[1];
                break;
            case 'add012':
                i = rand(1, 8);
                j = rand(1, 9 - i);
                k = rand(0, 2);
                issue.opr[0] = i * 10 + rand(0, 9 - k);
                issue.op[0] = '+';
                issue.opr[1] = j * 10 + k;
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'mix_2_1':
                i = rand(0, 4) * 2;
                j = (i + 10) / 2;
                issue.opr[0] = j * 10 + i;
                issue.op[0] = '+';
                issue.opr[1] = rand(1, (9 - j)) * 10 + j;
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case 'addn_2_2':
                /* add with no carry but at least a[2] + b[1] >= 10
                   or a[1] + b[2] >= 10 to test whether it will confuse her*/
                do {
                    i = rand(1, 8);
                    j = rand(0, 9);
                    k = rand(0, 9 - j);
                    l = rand(1, 9 - i);
                } while (i + k < 10 && j + l < 10);
                issue.opr[0] = i * 10 + j;
                issue.op[0] = '+';
                issue.opr[1] = l * 10 + k;
                issue.result = issue.opr[0] + issue.opr[1];
                break;
            case "div_99cfb":
                i = rand(1, 9);
                j = rand(1, 9);
                k = i * j;
                issue.opr[0] = k;
                issue.op[0] = '÷';
                issue.opr[1] = j;
                issue.result = i;
                break;
            case "(2_sub_2)div_1":
                m = 0;
                l = 0;
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = i * j;
                    l = rand(10, 99);
                    m = k + l;
                } while (m >= 100 || k < 10)
                issue.op_n = 2;
                issue.opr[0] = '(' + m;
                issue.op[0] = '-';
                issue.opr[1] = l + ')'
                issue.op[1] = '÷';
                issue.opr[2] = j;
                issue.result = i;
                break;
            case "2_sub_2_add_2":
                do {
                    i = rand(10, 99);
                    j = rand(10, 99);
                    k = i - j;
                    l = rand(10, 99);
                    m = k + l;
                } while (k <= 0 || m > 100)
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '-';
                issue.opr[1] = j
                issue.op[1] = '+';
                issue.opr[2] = l;
                issue.result = m;
                break;
            //表内除法乘以一位数
            case "99cfb_div_mul_1":
                i = rand(1, 9);
                j = rand(1, 9);
                k = i * j;
                l = rand(1, 9);
                issue.op_n = 2;
                issue.opr[0] = k;
                issue.op[0] = '÷';
                issue.opr[1] = j
                issue.op[1] = '×';
                issue.opr[2] = l;
                issue.result = i * l;
                break;
            //表内除法除以一位数
            case "99cfb_div_div_1":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = i * j;
                    l = rand(1, 9);
                } while (i % l != 0)
                issue.op_n = 2;
                issue.opr[0] = k;
                issue.op[0] = '÷';
                issue.opr[1] = j
                issue.op[1] = '÷';
                issue.opr[2] = l;
                issue.result = i / l;
                break;
            //一位数相乘除以一位数
            case "1_mul_1_div_1":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = i * j;
                    l = rand(1, 9);
                    m = k / l;
                } while (k % l != 0 || l == i || l == j || m >= 10)
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '×';
                issue.opr[1] = j
                issue.op[1] = '÷';
                issue.opr[2] = l;
                issue.result = k / l;
                break;
            //两位数减表内除法
            case "2_sub_99cfb_div":
                i = rand(1, 9);
                j = rand(1, 9);
                k = i * j;
                l = rand(10, 99);
                m = l - i;
                issue.op_n = 2;
                issue.opr[0] = l;
                issue.op[0] = '-';
                issue.opr[1] = k
                issue.op[1] = '÷';
                issue.opr[2] = j;
                issue.result = m;
                break;
            //（两位数相减>3）乘以一位数
            case "(2_sub_2)mul_1":
                do {
                    i = rand(10, 99);
                    j = rand(10, 99);
                    k = j - i;
                    l = rand(1, 9);
                    m = k * l;
                } while (k < 3 || k > 9)
                issue.op_n = 2;
                issue.opr[0] = '(' + j;
                issue.op[0] = '-';
                issue.opr[1] = i + ')'
                issue.op[1] = '×';
                issue.opr[2] = l;
                issue.result = m;
                break;
            //（两位数相减）除以一位数
            case "1":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(11, 99);
                    m = k + l;
                } while (m > 99)
                issue.op_n = 2;
                issue.opr[0] = '(' + m;
                issue.op[0] = '-';
                issue.opr[1] = l + ')'
                issue.op[1] = '÷';
                issue.opr[2] = j;
                issue.result = i;
                break;
            // 两位数➗（一位数相减）
            case "2":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(1, 9);
                    m = l + i;
                } while (k < 10 || m > 9);
                issue.op_n = 2;
                issue.opr[0] = k
                issue.op[0] = '÷'
                issue.opr[1] = '(' + m
                issue.op[1] = '-'
                issue.opr[2] = l + ')'
                issue.result = j
                break;
            // 两位数➗（一位数相加）
            case "3":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(1, 9);
                    m = i - l;
                } while (k < 10 || m < 1);
                issue.op_n = 2;
                issue.opr[0] = k
                issue.op[0] = '÷'
                issue.opr[1] = '(' + m
                issue.op[1] = '+'
                issue.opr[2] = l + ')'
                issue.result = j
                break;
            // 两位数-（两位数相减）
            case "4":
                do {
                    i = rand(11, 99);
                    j = rand(11, 99);
                    k = j - i;
                    l = rand(11, 99);
                    m = l - k;
                } while (k < 0 || m < 0);
                issue.op_n = 2;
                issue.opr[0] = l
                issue.op[0] = '-'
                issue.opr[1] = '(' + j
                issue.op[1] = '-'
                issue.opr[2] = i + ')'
                issue.result = m
                break;
            // 一位数×（一位数相加）
            case "5":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(1, 9);
                    m = i - l;
                } while (m < 1);
                issue.op_n = 2;
                issue.opr[0] = j
                issue.op[0] = '×'
                issue.opr[1] = '(' + m
                issue.op[1] = '+'
                issue.opr[2] = l + ')'
                issue.result = k
                break;
            // 有余数的表内除法
            case "6":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(1, j-1);
                    m = k + l;
                } while (l < 1);
                issue.opr[0] = m
                issue.op[0] = '÷'
                issue.opr[1] = j
                issue.result = i + '...' + l
                break;


            default:
                alert("unknown type=" + type);
        }
    } while (issuesMap.get(type).has(JSON.stringify(issue)))
    issuesMap.get(type).add(JSON.stringify(issue));


    return issue;
}



