document.addEventListener('DOMContentLoaded', function () {

    // Simple
    let columns = [
        { field: 'fname', label: 'First Name', width: '15%' },
        { field: 'lname', label: 'Last Name',  width: '15%' },
        { field: 'email', label: 'Email' },
        { field: 'sdate', label: 'Start Date', width: 120, type: 'date' }
    ];
    let records = [
        { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
        { id: "2", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
        { id: "3", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
    ];

    CoreUI.table.create({
        columns: columns,
        records: records
    }).render('table-simple1');

    CoreUI.table.create({
        show: {
            columnHeaders: false
        },
        columns: columns,
        records: records
    }).render('table-simple2');


    // Empty
    CoreUI.table.create({
        columns: [
            { field: 'fname', label: 'First Name', width: '15%' },
            { field: 'lname', label: 'Last Name',  width: '15%' },
            { field: 'email', label: 'Email' },
            { field: 'sdate', label: 'Start Date', width: 120, type: 'date' }
        ],
        records: [ ]
    }).render('table-empty');


    // Ajax
    CoreUI.table.create({
        url: 'data/records.json',
        method: 'GET',
        maxHeight: 400,
        show: {
            columnHeaders: true,
            total: true
        },
        controls: [
            { type: "button", content: "Reload", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.reload();
                }
            },
            { type: "button", content: "Lock", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.lock();
                }
            },
            { type: "button", content: "Unlock", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.unlock();
                }
            }
        ],
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-light border-end text-end" } },
            { field: 'fname', label: 'First Name', width: '25%' },
            { field: 'lname', label: 'Last Name', width: '25%' },
            { field: 'sdate', label: 'Start Date' }
        ]
    }).render('table-ajax');


    // Many records
    CoreUI.table.create({
        url: 'data/many-records.json',
        method: 'GET',
        maxHeight: 500,
        show: {
            columnHeaders: true,
            total: true
        },
        columns: [
            { field: 'id',         label: 'ID',            width: 35 },
            { field: 'name',       label: 'Name',          attr: { class: 'text-nowrap' } },
            { field: 'age',        label: 'Age',           width: 40 },
            { field: 'gender',     label: 'Gender',        width: 50 },
            { field: 'color',      label: 'Color',         width: 60 },
            { field: 'email',      label: 'Email',         width: 180, attr: { class: 'text-nowrap' } },
            { field: 'phone',      label: 'Phone',         width: 200, attr: { class: 'text-nowrap' } },
            { field: 'address',    label: 'Address',       attrHeader: { style : 'min-width: 250px'} },
            { field: 'about',      label: 'About',         attrHeader: { style : 'min-width: 750px'} },
            { field: 'registered', label: 'Register Date', type: 'datetime', format: 'DD.MM.YYYY hh:mm:ss', attr: { class: 'text-nowrap' } }
        ]
    }).render('table-many-records');


    // Pages
    CoreUI.table.create({
        url: 'data/page[page].json',
        method: 'GET',
        page: 1,
        recordsPerPage: 15,
        recordsPerPageList: [ 25, 50, 100, 1000, 0 ], // 0 - all
        pageParam: 'page',
        recordsPerPageParam: 'count',
        maxHeight: 400,
        show: {
            total: true,
            columnHeaders: true,
            pages: true,
            pagesJump: true,
            prePageList: true
        },
        controls: [
            { type: "button", content: "Prev page", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.prevPage();
                }
            },
            { type: "button", content: "Next page", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.nextPage();
                }
            }
        ],
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-light border-end text-end" } },
            { field: 'fname',  label: 'First Name', width: '25%' },
            { field: 'lname',  label: 'Last Name', width: '25%' },
            { field: 'sdate',  label: 'Start Date' }
        ]
    }).render('table-pages');


    // Column types
    CoreUI.table.create({
        columns: [
            { type: 'numbers',  width: 25, attr: { class: "border-end text-end" } },
            { type: 'select' },
            { type: 'text',     field: 'text',         label: 'Text' },
            { type: 'number',   field: 'number',       label: 'Number',   width: 100 },
            { type: 'html',     field: 'html',         label: 'Html',     width: 100 },
            { type: 'date',     field: 'date',         label: 'Date',     format: 'DD.MM.YYYY',          width: 100  },
            { type: 'datetime', field: 'datetime',     label: 'Datetime', format: 'DD.MM.YYYY hh:mm:ss', width: 140 },
            { type: 'switch',   field: 'is_active_sw', label: 'Switch',   valueY: 'Y', valueN: 'N',      width: 50 },
        ],
        records: [
            { text: 'Jane Doe',       number: 1000,    html: '<span style="color: #f00">Text</span> <b>bold</b>',                date: '2023-04-03', datetime: '2023-12-03 12:04:10', is_active_sw: "N" },
            { text: 'Stuart Motzart', number: 32,      html: '<button class="btn btn-xs btn-outline-secondary">button</button>', date: '2023-04-03', datetime: '2023-11-03 13:10:30', is_active_sw: "N" },
            { text: 'Jin Franson',    number: 1122335, html: '<a href="#">Link</a>',                                             date: '2023-04-03', datetime: '2023-04-03 23:57:00', is_active_sw: "Y" },
            { text: 'Susan Ottie',    number: -2343,   html: '<i class="bi bi-star"></i> icon',                                  date: '2023-09-03', datetime: '2023-10-03 05:15:37', is_active_sw: "Y" },
        ]
    }).render('table-column-types');


    // Controls
    CoreUI.table.create({
        primaryKey: 'id',
        controls: [
            { type: "link",   content: "Link add", href: "#", attr: { class: 'btn btn-sm btn-success' } },
            { type: "button", content: "Button delete",       attr: { class: 'btn btn-sm btn-warning' },
                onClick: function (event, table) {
                    let recordsId = table.getSelected();

                    if (recordsId.length > 0) {
                        alert('Selected records: ' + recordsId.join(', '))
                    } else {
                        alert('No selected records');
                    }
                }
            },
            { type: "button", content: "Selected records", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    let records = table.getSelectedRecords();

                    if (records.length > 0) {
                        alert('Selected records: ' + JSON.stringify(records))
                    } else {
                        alert('No selected records');
                    }
                }
            },
            { type: "button", content: "Select row 2", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.selectRecord('2');
                }
            },
            { type: "button", content: "Unselect row 2", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.unselectRecord('2');
                }
            },
            { type: "button", content: "Select all", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.selectAll();
                }
            },
            { type: "button", content: "Unselect all", attr: { class: 'btn btn-sm btn-secondary' },
                onClick: function (event, table) {
                    table.unselectAll();
                }
            },
            { type: "custom", content:
                '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" id="gridCheck">' +
                    '<label class="form-check-label" for="gridCheck">Custom contol</label>' +
                '</div>'
            }
        ],
        columns: [
            { type: 'numbers', width: 10, attr: { class: "border-end text-end" } },
            { type: 'select' },
            { field: 'name',  label: 'Name' },
            { field: 'email', label: 'Email',      width: 150 },
            { field: 'sdate', label: 'Start Date', width: 150, type: 'date', format: 'DD.MM.YYYY' }
        ],
        records: [
            { id: "1", name: 'Jane Doe',       email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", name: 'Stuart Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", name: 'Jin Franson',    email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-controls');


    // Events
    let tableEvents = CoreUI.table.create({
        primaryKey: 'id',
        columns: [
            { type: 'numbers', width: 10, attr: { class: "border-end text-end" } },
            { type: 'select' },
            { field: 'name',   label: 'Name' },
            { field: 'email',  label: 'Email',        width: 150 },
            { type: 'date',    field: 'sdate',        label: 'Start Date', width: 100,  format: 'DD.MM.YYYY' },
            { type:  'switch', field: 'is_active_sw', label: 'On', valueY: 'Y', valueN: 'N',
                onChange: function (record, value) {
                    alert("Switch record to " + value + ": " + JSON.stringify(record));
                }
            }
        ],
        onClick: function (event, record) {
            alert('Click record: ' + JSON.stringify(record))
        },
        records: [
            { id: "1", name: 'Jane Doe',       email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", name: 'Stuart Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", name: 'Jin Franson',    email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    });

    tableEvents.render('table-events')

    tableEvents.on('select.coreui.table', function (record) {
        alert('Select record: ' + JSON.stringify(record));
    });
    tableEvents.on('unselect.coreui.table', function (record) {
        alert('Unselect record: ' + JSON.stringify(record));
    });
    tableEvents.on('select-all.coreui.table', function () {
        alert('Select all records');
    });
    tableEvents.on('unselect-all.coreui.table', function () {
        alert('Unselect all records');
    });
    tableEvents.on('shown.coreui.table', function () {
        console.log('shown')
    });
    tableEvents.on('show-records.coreui.table', function () {
        console.log('show-records')
    });



    // Fixed columns
    CoreUI.table.create({
        height: 550,
        columnGroups: [
            [
                { label: 'Header 1', attr: { colspan: 17 } },
            ],
            [
                { label: '', attr: { colspan: 2 } },
                { label: 'Header 2', attr: { colspan: 15 } }
            ]
        ],
        columns: [
            { type: 'numbers', attr: { class: 'text-end' }, fixed: 'left' },
            { type: 'select',  fixed: 'left' },
            { type: 'text',    field: 'cell1',  label: 'Column 1',  attr: { style: 'min-width: 150px' }, fixed: 'left' },
            { type: 'text',    field: 'cell2',  label: 'Column 2',  attr: { style: 'min-width: 150px' }, fixed: 'left' },
            { type: 'text',    field: 'cell3',  label: 'Column 3',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell4',  label: 'Column 4',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell5',  label: 'Column 5',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell6',  label: 'Column 6',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell7',  label: 'Column 7',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell8',  label: 'Column 8',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell9',  label: 'Column 9',  attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell10', label: 'Column 10', attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell11', label: 'Column 11', attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell12', label: 'Column 12', attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell13', label: 'Column 13', attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell14', label: 'Column 14', attr: { style: 'min-width: 150px' } },
            { type: 'text',    field: 'cell15', label: 'Column 15', attr: { style: 'min-width: 150px' }, fixed: 'right' },
        ],
        footer: [
            [
                { label: 'Footer', attr: { colspan: 17 } },
            ]
        ],
        records: [
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' },
            { cell1: 'column value', cell2: 'column value', cell3: 'column value', cell4: 'column value', cell5: 'column value', cell6: 'column value', cell7: 'column value', cell8: 'column value', cell9: 'column value', cell10: 'column value', cell11: 'column value', cell12: 'column value', cell13: 'column value', cell14: 'column value', cell15: 'column value' }
        ]
    }).render('table-fixed-columns');


    // All options
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



    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});