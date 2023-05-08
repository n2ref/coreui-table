# CoreUI table

**[DEMO](https://shabuninil.github.io/coreui-table)**


### Install with NPM

`npm install coreui-table`

### Example usage

![Preview](https://raw.githubusercontent.com/shabuninil/coreui-table/master/preview.png)

```html
<div id="table-all"></div>

<script>
    let tableAll = CoreUI.table.create({
        id: "table-id",
        class: 'table-bordered',
        lang: "ru",
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: 550,
        minHeight: 550,
        maxHeight: 550,
        show: {
            columnHeaders: true,
            total: true
        },
        controls: [
            { type: "link",   content: "Добавить", href: "#",                attr: { class: 'btn btn-sm btn-success' } },
            { type: "button", content: "Удалить", onClick: function (e) { }, attr: { class: 'btn btn-sm btn-warning' } },
            { type: "custom", content:
                        '<div class="form-check">' +
                        '<input class="form-check-input" type="checkbox" id="gridCheck2">' +
                        '<label class="form-check-label" for="gridCheck2">Check me</label>' +
                        '</div>'
            }
        ],
        columnGroups: [
            [
                { label: '', attr: { rowspan: 2, colspan: 2 }  },
                { label: 'General Information', attr: { colspan: 7 } },
            ],
            [
                { label: 'Full name', attr: { colspan: 3 } },
                { label: 'Important Dates', attr: { colspan: 4, class: "text-center" } }
            ]
        ],
        columns: [
            { type: 'numbers'},
            { type: 'select'},
            { type: 'text',    field: 'fname', label: 'First Name', width: '15%'},
            { type: 'text',    field: 'lname', label: 'Last Name',  width: '15%'},
            { type: 'text',    field: 'email', label: 'Email' },
            { type: 'date',    field: 'sdate', label: 'Start Date', width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'date',    field: 'edate', label: 'End Date',   width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'number',  field: 'diff',  label: 'Diff Date',  width: 90,  attr: { class: 'text-end' }, attrHeader: { class: 'text-end' },
                render: function (record) {
                    const date1 = new Date(record.sdate);
                    const date2 = new Date(record.edate);
                    const diffTime = Math.abs(date2 - date1);
                    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }
            },
            { type: 'switch', field: 'is_active_sw', label: 'On', valueY: 'Y', valueN: 'N',
                onChange: function (record, value) {
                    console.log(record);
                    console.log(value);
                }
            },
        ],
        footer: [
            [
                { label: 'Total', attr: { colspan: 7, class: 'text-end' } },
                { label: '123',   attr: { class: 'text-end' } },
                { label: '' },
            ]
        ],
        onClick: function (event, record) {
            console.log(record)
        },
        onClickUrl: "#/path/to/object/[id]",
        records: [
            { id: 1,  fname: 'Jane',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-12-03', is_active_sw: "N" },
            { id: 2,  fname: 'Stuart',  lname: 'Motzart',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-11-03', is_active_sw: "N" },
            { id: 3,  fname: 'Jin',     lname: 'Franson',     email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-04-03', is_active_sw: "Y" },
            { id: 4,  fname: 'Susan',   lname: 'Ottie',       email: 'frank@gmail.com',    sdate: '2023-09-03', edate: '2023-10-03', is_active_sw: "Y" },
            { id: 5,  fname: 'Kelly',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-06-24', is_active_sw: "Y" },
            { id: 6,  fname: 'Francis', lname: 'Gatos',       email: 'jdoe@gmail.com',     sdate: '2023-02-03', edate: '2023-06-03', is_active_sw: "N" },
            { id: 7,  fname: 'Mark',    lname: 'Welldo',      email: 'susan@gmail.com',    sdate: '2023-04-03', edate: '2023-06-23', is_active_sw: "N" },
            { id: 8,  fname: 'Thomas',  lname: 'Bahh',        email: 'david@gmail.com',    sdate: '2023-04-03', edate: '2023-09-16', is_active_sw: "N" },
            { id: 9,  fname: 'Sergei',  lname: 'Rachmaninov', email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active_sw: "N" },
            { id: 10, fname: 'Jill',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active_sw: "N" },
            { id: 11, fname: 'Frank',   lname: 'Motzart',     email: 'peterson@gmail.com', sdate: '2023-04-03', edate: '2023-04-03', is_active_sw: "N" },
            { id: 12, fname: 'Peter',   lname: 'Franson',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-03', is_active_sw: "N" },
            { id: 13, fname: 'Andrew',  lname: 'Ottie',       email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-06-19', is_active_sw: "N" },
            { id: 14, fname: 'Manny',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-05', is_active_sw: "N" },
            { id: 15, fname: 'Ben',     lname: 'Gatos',       email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-09-03', is_active_sw: "N" },
            { id: 16, fname: 'Doer',    lname: 'Welldo',      email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-07', is_active_sw: "N" },
            { id: 17, fname: 'Shashi',  lname: 'Bahh',        email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active_sw: "N" },
            { id: 18, fname: 'Av',      lname: 'Rachmaninov', email: 'joe@gmail.com',      sdate: '2023-09-03', edate: '2023-12-06', is_active_sw: "N" },
            { id: 19, fname: 'John',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-09-03', edate: '2023-12-06', is_active_sw: "N" ,
                coreui: {
                    attr: { class: 'table-row' },
                    fields: {
                        fname: {
                            attr: { style: 'font-weight: bold', class: 'cell' },
                        }
                    },
                }
            }
        ]
    });

    $('#table-all').html(tableAll.render());
    tableAll.initEvents();
</script>
```