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
    ["7", "两位数加表内除法", 0],
    ["14", "千百➕千百", 0],
    ["9", "千百➕百", 0],
    ["8", "千➕百", 0],
    ["15", "百十➕百十", 0],
    ["10", "百十➕十", 0],
    ["16", "千百➖千百", 0],
    ["12", "千百➖百", 0],
    ["11", "千➖千", 0],
    ["17", "百十➖百十", 0],
    ["13", "百十➖十", 0],
    ["18", "两➕两[估算]", 0],
    ["19", "三➕三", 0],
    ["20", "三➖三", 0],
    ["21", "三➕两", 0],
    ["22", "三➖两", 0],
    ["23", "两✖️一", 0],
    ["25", "三➕三➕三", 0],
    ["26", "三➖三➕三", 0],
    ["27", "三➕三➖三", 0],
    ["28", "三➕三✖️一", 0],
    ["29", "(三➖三)✖️一", 0],
    ["30", "(三➖三)➗️一[表内无余]", 0],
    ["24", "三✖️一", 0],
    ["33", "三✖️一[中间为0]", 0],
    ["31", "一✖️三", 0],
    ["32", "一✖️三➖三", 0],
    ["38", "两➗一（各位可被整除）", 0],
    ["41", "两➗一（各位不可被整除）", 0],
    ["34", "整十➗一", 0],
    ["35", "整百➗一", 0],
    ["36", "整千➗一", 0],
    ["37", "百十➗一", 0],
    ["39", "两➗一 有余数", 0],
    ["42", "三➗一 无余数", 0],
    ["40", "三➗一 有余数", 0],
    ["43", "三➗一 商中间有0 无余数", 0],
    ["44", "三➗一 商中间有0 有余数", 0],
    ["45", "三➗一 商末尾有0 无余数", 0],
    ["46", "三➗一 商末尾有0 有余数", 0],
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

/**
 * 根据入参num获取乘积结果为单个数字的另一个乘数
 * @param num 已知的乘数
 * @param isZero 结果是否可以为0
 * @returns {number} 乘积结果为单个数字的另一个乘数
 */
function getSingleNumProduct(num, isZero) {
    let randNumStart;
    if (isZero) {
        randNumStart = 0;
    } else {
        randNumStart = 1;
    }
    if (num >= 5) {
        return rand(randNumStart, 1);
    } else {
        switch (num) {
            case 1:
                return rand(randNumStart, 9);
            case 2:
                return rand(randNumStart, 4);
            case 3:
                return rand(randNumStart, 3);
            case 4:
                return rand(randNumStart, 2);
        }
    }
}

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
                do {
                    i = rand(1, 99);
                    j = rand(1, 9);
                    k = rand(1, 9);
                    l = j * k;
                    m = l + i
                } while (m > 99)
                issue.op_n = 2;
                issue.opr[0] = i;
                issue.op[0] = '+';
                issue.opr[1] = j;
                issue.op[1] = '×';
                issue.opr[2] = k;
                issue.result = m;
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
                do {
                    i = rand(1, 99);
                    j = rand(1, 9);
                    k = rand(1, 9);
                    l = j * k;
                    m = l + i
                } while (m > 99)
                issue.op_n = 2;
                issue.opr[0] = j;
                issue.op[0] = '×';
                issue.opr[1] = k;
                issue.op[1] = '+';
                issue.opr[2] = i;
                issue.result = m;
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
                    l = rand(1, j - 1);
                    m = k + l;
                } while (l < 1);
                issue.opr[0] = m
                issue.op[0] = '÷'
                issue.opr[1] = j
                issue.result = i + '...' + l
                break;
            // 两位数加表内除法
            case "7":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = j * i;
                    l = rand(11, 99);
                    m = i + l;
                } while (m > 99);
                issue.op_n = 2;
                issue.opr[0] = l
                issue.op[0] = '+'
                issue.opr[1] = k
                issue.op[1] = '÷'
                issue.opr[2] = j
                issue.result = m
                break;
            // 千➕百
            case "8":
                i = rand(1, 9) * 1000;
                j = rand(1, 9) * 100;
                k = j + i;
                issue.opr[0] = i
                issue.op[0] = '+'
                issue.opr[1] = j
                issue.result = k
                break;
            // 千百➕百
            case "9":
                do {
                    i = rand(11, 99);
                    j = rand(1, 9) * 100;
                    k = i * 100;
                    l = k + j;
                } while (i % 10 == 0 || l > 10000);
                issue.opr[0] = k
                issue.op[0] = '+'
                issue.opr[1] = j
                issue.result = l
                break;
            // 百十➕十
            case "10":
                // do {
                i = rand(11, 99);
                j = rand(1, 9) * 10;
                k = 10 * i;
                l = k + j;
                // } while (i % 10 == 0);
                issue.opr[0] = k
                issue.op[0] = '+'
                issue.opr[1] = j
                issue.result = l
                break;
            // 千➖千
            case "11":
                do {
                    i = rand(1, 9);
                    j = rand(1, 9);
                    k = i - j;
                } while (k < 0);
                issue.opr[0] = i * 1000
                issue.op[0] = '-'
                issue.opr[1] = j * 1000
                issue.result = k * 1000
                break;
            // 千百➖百
            case "12":
                // do {
                i = rand(11, 99);
                j = rand(1, 9) * 100;
                k = 100 * i;
                l = k - j;
                // } while (i % 10 == 0);
                issue.opr[0] = k
                issue.op[0] = '-'
                issue.opr[1] = j
                issue.result = l
                break;
            // 百十➖十
            case "13":
                // do {
                i = rand(11, 99);
                j = rand(1, 9) * 10;
                k = 10 * i;
                l = k - j;
                // } while (i % 10 == 0);
                issue.opr[0] = k
                issue.op[0] = '-'
                issue.opr[1] = j
                issue.result = l
                break;
            // 千百➕千百
            case "14":
                do {
                    i = rand(10, 99);
                    j = rand(10, 99);
                    l = i + j;
                } while (l > 100);
                issue.opr[0] = i * 100
                issue.op[0] = '+'
                issue.opr[1] = j * 100
                issue.result = l * 100
                break;
            // 百十➕百十
            case "15":
                do {
                    i = rand(10, 99);
                    j = rand(10, 99);
                    l = i + j;
                } while (l >= 100 || i % 10 == 0 || j % 10 == 0);
                issue.opr[0] = i * 10
                issue.op[0] = '+'
                issue.opr[1] = j * 10
                issue.result = l * 10
                break;
            // 千百➖千百
            case "16":
                i = rand(10, 99);
                j = rand(10, 99);
                if (i < j) {
                    k = i;
                    i = j;
                    j = k;
                }
                l = i - j;
                issue.opr[0] = i * 100
                issue.op[0] = '-'
                issue.opr[1] = j * 100
                issue.result = l * 100
                break;
            // 百十➖百十
            case "17":
                i = rand(10, 99);
                j = rand(10, 99);
                if (i < j) {
                    k = i;
                    i = j;
                    j = k;
                }
                l = i - j;
                issue.opr[0] = i * 10
                issue.op[0] = '-'
                issue.opr[1] = j * 10
                issue.result = l * 10
                break;
            // 两位数➕两位数（估算）
            case "18":
                i = rand(10, 99);
                j = rand(10, 99);
                l = Math.round((i + j) / 10) * 10;
                issue.opr[0] = i
                issue.op[0] = '+'
                issue.opr[1] = j + '≈'
                issue.result = l
                break;
            // 三位数➕三位数
            case "19":
                do {
                    i = rand(100, 999);
                    j = rand(100, 999);
                    l = i + j;
                } while (l > 999)
                issue.opr[0] = i
                issue.op[0] = '+'
                issue.opr[1] = j
                issue.result = l
                break;
            // 三位数➖三位数
            case "20":
                do {
                    i = rand(100, 999);
                    j = rand(100, 999);
                    l = i - j;
                } while (l < 1)
                issue.opr[0] = i
                issue.op[0] = '-'
                issue.opr[1] = j
                issue.result = l
                break;
            // 三位数➕两位数
            case "21":
                do {
                    i = rand(100, 999);
                    j = rand(10, 99);
                    l = i + j;
                } while (l > 999)
                issue.opr[0] = i
                issue.op[0] = '+'
                issue.opr[1] = j
                issue.result = l
                break;
            // 三位数➖两位数
            case "22":
                i = rand(100, 999);
                j = rand(10, 99);
                l = i - j;
                issue.opr[0] = i
                issue.op[0] = '-'
                issue.opr[1] = j
                issue.result = l
                break;
            // 两位数✖️一位数
            case "23":
                i = rand(10, 99);
                j = rand(1, 9);
                l = i * j;
                issue.opr[0] = i
                issue.op[0] = '×'
                issue.opr[1] = j
                issue.result = l
                break;
            // 三位数✖️一位数
            case "24":
                i = rand(100, 999);
                j = rand(1, 9);
                l = i * j;
                issue.opr[0] = i
                issue.op[0] = '×'
                issue.opr[1] = j
                issue.result = l
                break;
            // 三➕三➕三
            case "25":
                issue.op_n = 2;
                issue.opr[0] = rand(100, 999);
                issue.op[0] = '+'
                issue.opr[1] = rand(100, 999);
                issue.op[1] = '+'
                issue.opr[2] = rand(100, 999);
                issue.result = issue.opr[0] + issue.opr[1] + issue.opr[2]
                break;
            // 三➖三➕三
            case "26":
                i = rand(100, 999);
                j = rand(100, 999);
                if (i < j) {
                    k = i;
                    i = j;
                    j = k;
                }
                issue.op_n = 2;
                issue.opr[0] = i
                issue.op[0] = '-'
                issue.opr[1] = j
                issue.op[1] = '+'
                issue.opr[2] = rand(100, 999);
                issue.result = issue.opr[0] - issue.opr[1] + issue.opr[2]
                break;
            // 三➕三➖三
            case "27":
                do {
                    issue.op_n = 2;
                    issue.opr[0] = rand(100, 999);
                    issue.op[0] = '+'
                    issue.opr[1] = rand(100, 999);
                    issue.op[1] = '-'
                    issue.opr[2] = rand(100, 999);
                    issue.result = issue.opr[0] + issue.opr[1] - issue.opr[2]
                } while (issue.result < 0)
                break;
            // 三➕三✖️一
            case "28":
                issue.op_n = 2;
                issue.opr[0] = rand(100, 999);
                issue.op[0] = '+'
                issue.opr[1] = rand(100, 999);
                issue.op[1] = '×'
                issue.opr[2] = rand(1, 9);
                issue.result = issue.opr[0] + issue.opr[1] * issue.opr[2]
                break;
            // (三➖三)✖️一
            case "29":
                i = rand(100, 999);
                j = rand(100, 999);
                if (i < j) {
                    k = i;
                    i = j;
                    j = k;
                }
                issue.op_n = 2;
                issue.opr[0] = '(' + i
                issue.op[0] = '-'
                issue.opr[1] = j + ')'
                issue.op[1] = '×'
                issue.opr[2] = rand(1, 9);
                issue.result = (i - j) * issue.opr[2]
                break;
            // (三➖三)➗️一[表内无余]
            case "30":
                issue.op_n = 2;
                i = rand(1, 9);
                j = rand(1, 9);
                k = i * j;
                l = rand(100, 918);
                m = l + k;
                issue.opr[0] = '(' + m
                issue.op[0] = '-'
                issue.opr[1] = l + ')'
                issue.op[1] = '÷'
                issue.opr[2] = j;
                issue.result = i;
                break;
            // 一✖️三
            case "31":
                i = rand(100, 999);
                j = rand(1, 9);
                l = i * j;
                issue.opr[0] = j
                issue.op[0] = '×'
                issue.opr[1] = i
                issue.result = l
                break;
            // 一✖️三➖三
            case "32":
                do {
                    i = rand(100, 999);
                    j = rand(1, 9);
                    l = i * j;
                    issue.op_n = 2;
                    issue.opr[0] = j
                    issue.op[0] = '×'
                    issue.opr[1] = i
                    issue.op[1] = '-'
                    issue.opr[2] = rand(100, 999);
                    issue.result = l - issue.opr[2]
                } while (issue.result < 0)
                break;
            // 三✖️一[中间为0]
            case "33":
                i = rand(1, 9) * 100 + rand(1, 9);
                j = rand(1, 9);
                l = i * j;
                issue.opr[0] = i
                issue.op[0] = '×'
                issue.opr[1] = j
                issue.result = l
                break;
            // 整十➗一
            case "34":
                do {
                    i = rand(1, 9) * 10;
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i % j != 0 || l < 10)
                break;
            // 整百➗一
            case "35":
                do {
                    i = rand(1, 9) * 100;
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i % j != 0)
                break;
            // 整千➗一
            case "36":
                do {
                    i = rand(1, 9) * 1000;
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i % j != 0)
                break;
            // 百十➗一
            case "37":
                do {
                    i = rand(11, 99) * 10;
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i % 100 == 0 || i % j != 0)
                break;
            // 两➗一 （各位可被整除）
            case "38":
                i = rand(1, 9);//除数
                j = getSingleNumProduct(i, true);//获取商个位
                j = getSingleNumProduct(i, false) * 10 + j;//获取商十位（同时生成商）
                l = j * i;
                issue.opr[0] = l
                issue.op[0] = '÷'
                issue.opr[1] = i
                issue.result = j
                break;
            // 两➗一（各位不可被整除）
            case "41":
                do {
                    i = rand(21, 99);
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (Math.floor(i / 10) % j == 0 || i % j != 0 || l < 10)
                break;

            // 两➗一 有余数
            case "39":
                var temp;
                do {
                    i = rand(11, 99);
                    j = rand(2, 9);
                    l = Math.floor(i / j);
                    temp = l;
                    k = i % j;
                    if (k != 0) {
                        l = l + '...' + k;
                    } else {
                        k = rand(1, j - 1);
                        if (i + k > 99) {
                            i = i - k;
                            l -= 1;
                            k = j - k;
                        } else {
                            i += k;
                        }
                        l = l + '...' + k;
                    }
                } while (temp < 10)
                issue.opr[0] = i
                issue.op[0] = '÷'
                issue.opr[1] = j
                issue.result = l

                break;
            // 三➗一 有余数
            case "40":

                do {
                    i = rand(100, 999);
                    j = rand(2, 9);
                    l = Math.floor(i / j);
                    k = i % j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l + '...' + k
                } while (k == 0)
                break;
            // 三➗一 无余数
            case "42":
                do {
                    i = rand(100, 999);
                    j = rand(2, 9);
                    l = i / j;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i % j != 0)
                break;
            //三➗一 商中间有0 无余数
            case "43":
                do {
                    a = rand(1, 9);
                    b = rand(1, 9);
                    l = a * 100 + b;
                    j = rand(2, 9);
                    i = j * l;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i > 999)
                break;
            //三➗一 商中间有0 有余数
            case "44":
                do {
                    a = rand(1, 9);
                    b = rand(1, 9);
                    l = a * 100 + b;
                    j = rand(2, 9);
                    i = j * l;
                    k = rand(1, j - 1);
                    i = i + k;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l + '...' + k
                } while (i > 999)
                break;
            //三➗一 商末尾有0 无余数
            case "45":
                do {
                    a = rand(1, 9);
                    b = rand(0, 9);
                    l = a * 100 + b * 10;
                    j = rand(2, 9);
                    i = j * l;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l
                } while (i > 999)
                break;
            //三➗一 商末尾有0 有余数
            case "46":
                do {
                    a = rand(1, 9);
                    b = rand(0, 9);
                    l = a * 100 + b * 10;
                    j = rand(2, 9);
                    i = j * l;
                    k = rand(1, j - 1);
                    i = i + k;
                    issue.opr[0] = i
                    issue.op[0] = '÷'
                    issue.opr[1] = j
                    issue.result = l + '...' + k
                } while (i > 999)
                break;

            default:
                alert("unknown type=" + type);
        }
    } while (issuesMap.get(type).has(JSON.stringify(issue)))
    issuesMap.get(type).add(JSON.stringify(issue));


    return issue;
}



