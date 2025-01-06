document.addEventListener('DOMContentLoaded', function () {

    // Simple
    CoreUI.table.create({
        columns: [
            { field: 'fname', label: 'First Name', width: '15%' },
            { field: 'lname', label: 'Last Name',  width: '15%' },
            { field: 'email', label: 'Email' },
            { field: 'sdate', label: 'Start Date', width: 120, type: 'date' }
        ],
        records: [
            { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-simple');


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


    // Controls basic
    CoreUI.table.create({
        primaryKey: 'id',
        header: [
            {
                type: 'out',
                left: [
                    { type: "button", content: "Select row 2", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            table.selectRecord('2');
                        }
                    },
                    { type: "button", content: "Unselect row 2", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            table.unselectRecord('2');
                        }
                    }
                ]
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
    }).render('table-controls-basic');


    // Controls buttons
    CoreUI.table.create({
        primaryKey: 'id',
        header: [
            // Header row 1
            {
                type: 'out',
                left: [
                    { type: "button", content: "Select all",   attr: { class: 'btn btn-secondary' }, onClick: function (event, table) { table.selectAll(); } },
                    { type: "button", content: "Unselect all", attr: { class: 'btn btn-secondary' }, onClick: function (event, table) { table.unselectAll(); } },
                    { type: "link",   content: "Link",         attr: { class: 'btn btn-success' },   onClick: function () { return false }, url: "/link-url" }
                ],
                right: [
                    { type: "button", content: "Show id", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            let recordsId = table.getSelectedRecordsId();

                            if (recordsId.length > 0) {
                                alert('Selected records: ' + recordsId.join(', '))
                            } else {
                                alert('No selected records');
                            }
                        }
                    },
                    { type: "button", content: "Show records", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            let records = table.getSelectedRecords();

                            if (records.length > 0) {
                                alert('Selected records: ' + JSON.stringify(records))
                            } else {
                                alert('No selected records');
                            }
                        }
                    }
                ]
            },
            // Header row 2
            {
                type: 'in',
                left: [
                    { type: "button", content: "Add record", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            table.addRecordLast({
                                id:    Math.floor(Math.random() * (10 - 100) + 100),
                                name:  'New name',
                                email: 'example@gmail.com',
                                sdate: '2023-02-03'
                            });
                        }
                    },
                    { type: "button", content: "Remove record", attr: { class: 'btn btn-secondary' },
                        onClick: function (event, table) {
                            let records = table.getRecords();
                            if (records.length > 0) {
                                table.removeRecordByIndex(records[records.length - 1].index);
                            }
                        }
                    }
                ],
                right: [
                    { type: "dropdown", content: "Dropdown", attr: { class: 'btn btn-primary' }, position: 'end',
                        items: [
                            { type: 'link',   content: 'Link', url: "#" },
                            { type: 'button', content: 'Button 1', onClick: function (event, table) { console.log(1) } },
                            { type: 'divider' },
                            { type: 'button', content: 'Button 2', onClick: function (event, table) { console.log(2) } },
                        ]
                    },
                    { type: "buttonGroup", attr: { class: 'btn-group' },
                        buttons: [
                            { type: "link",     content: "Link",     attr: { class: 'btn btn-outline-secondary' }, url: "#" },
                            { type: "button",   content: "Button",   attr: { class: 'btn btn-outline-secondary' }, onClick: function (event, table) { console.log(1) } },
                            { type: "dropdown", content: "Dropdown", attr: { class: 'btn btn-outline-primary' }, position: 'end',
                                items: [
                                    { type: 'link',   content: 'Link', url: "#" },
                                    { type: 'button', content: 'Button 1', onClick: function (event, table) { console.log(2) } },
                                    { type: 'divider' },
                                    { type: 'button', content: 'Button 2', onClick: function (event, table) { console.log(3) } },
                                ]
                            },
                        ]
                    },
                ]
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
    }).render('table-controls-buttons');


    // Controls advanced
    CoreUI.table.create({
        header: [
            // Header row 1
            {
                type: 'out',
                left: [
                    { type: 'caption', title: 'Total orders',         value: '1237' },
                    { type: 'caption', title: 'Money received',       value: '92 324 $', description: 'Description text' },
                    { type: 'caption', title: 'Advertising expenses', value: '8.34 %' }
                ]
            },
            // Header row 2
            {
                type: 'in',
                left: [
                    { type: "custom", content: '<small class="text-body-secondary">My custom text</small>'},
                ],
                right: [
                    { type: "custom",
                        content:
                            '<div class="form-check pt-1">' +
                                '<input class="form-check-input" type="checkbox" id="gridCheck">' +
                                '<label class="form-check-label" for="gridCheck">Custom contol</label>' +
                            '</div>'
                    },
                    { type: "custom",
                        content: function () {
                            let btn = $('<button type="button" class="btn btn-sm btn-secondary">Custom button</button>');

                            btn.click(function () {
                                console.log('custom button');
                            });

                            return btn;
                        }
                    }
                ]
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
    }).render('table-controls-advanced');


    // Ajax records
    CoreUI.table.create({
        recordsRequest: {
            url: 'data/records.json?page=[page]&count=[count]',
            method: 'GET',
            params: {
                page: 'page',
                count: 'count',
                start: 'start',
                end: 'end',
                sort: 'sort',
                search: 'search',
                filter: 'filter',
            },
        },

        maxHeight: 500,
        header: [
            {
                type: 'out',
                left: [
                    {
                        type: "button", content: "Reload", attr: {class: 'btn btn-sm btn-secondary'},
                        onClick: function (event, table) {
                            table.reload();
                        }
                    },
                    {
                        type: "button", content: "Lock", attr: {class: 'btn btn-sm btn-secondary'},
                        onClick: function (event, table) {
                            table.lock();
                        }
                    },
                    {
                        type: "button", content: "Unlock", attr: {class: 'btn btn-sm btn-secondary'},
                        onClick: function (event, table) {
                            table.unlock();
                        }
                    }
                ],
            },
            {
                type: 'in',
                left: [
                    { type: 'total' }
                ]
            },
        ],
        columns: [
            { field: 'fname', label: 'First Name', },
            { field: 'lname', label: 'Last Name',  },
            { field: 'sdate', label: 'Start Date', width: 120 }
        ]
    }).render('table-ajax-records');


    // No wrap
    CoreUI.table.create({
        recordsRequest: {
            url: 'data/many-records.json'
        },

        noWrap: false,
        noWrapToggle: true,
        maxHeight: 500,
        columns: [
            { field: 'id',      label: 'ID',      width: 35 },
            { field: 'name',    label: 'Name',    minWidth: 140 },
            { field: 'about',   label: 'About',   minWidth: 400, noWrap: true  },
            { field: 'address', label: 'Address', minWidth: 250, noWrap: true, noWrapToggle: false },
        ]
    }).render('table-nowrap');


    // Pages
    CoreUI.table.create({
        recordsRequest: {
            url: 'data/pages/[page].json',
            method: 'GET',
        },

        page: 1,
        recordsPerPage: 15,
        maxHeight: 400,

        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'athlete',  label: 'Name', width: '25%' },
            { field: 'country',  label: 'Country', width: '25%' },
            { field: 'sport',  label: 'Sport', width: '25%' },
            { field: 'date',  label: 'Date' }
        ],
        header: [
            {
                type: 'in',
                left: [
                    { type: 'total' }
                ]
            },
        ],
        footer: [
            {
                type: 'in',
                left: [
                    { type: 'pages', count: 3, attr: { class: 'pagination-sm' } },
                ],
                right: [
                    { type: 'pageJump', attr: { class: 'input-group-sm' } },
                    { type: 'pageSize', list: [ 25, 50, 100, 1000, 0 ], attr: { class: 'form-select-sm' } } // 0 - all
                ]
            },
            {
                type: 'out',
                left: [
                    { type: 'pages', show: { prev: false, next: false }, count: 5, attr: { class: 'pagination-sm' } }
                ],
            },
            {
                type: 'out',
                left: [
                    { type: 'pages', count: 0, attr: { class: 'pagination-sm' } }
                ],
            }
        ],
    }).render('table-pages');


    // Expand rows
    CoreUI.table.create({
        id: 'expand',
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bbg-body-tertiary border-end text-end" } },
            { field: 'btn_static', label: 'static content', type: 'html', width: 110,
                render: function (record, table) {
                    let btn = $(`<button class="btn btn-sm btn-outline-secondary">
                                     <i class="bi bi-chevron-down"></i>
                                 </button>`);

                    btn.click(function () {
                        table.expandRecordContent(
                            record.index,
                            `Record custom content: <b>${record.data.fname} ${record.data.lname}</b>`,
                            true
                        );
                    });

                    return btn;
                }
            },
            { field: 'btn_ajax', label: 'ajax content', type: 'html', width: 110,
                render: function (record, table) {
                    let btn = $(`<button class="btn btn-sm btn-outline-secondary">
                                     <i class="bi bi-chevron-down"></i>
                                 </button>`);

                    btn.click(function () {
                        CoreUI.table.get('expand').expandRecordUrl(record.index, 'data/expand/row' + record.index + '.json');
                    });

                    return btn;
                }
            },
            { field: 'fname',  label: 'First Name'},
            { field: 'lname',  label: 'Last Name'},
            { field: 'sdate',  label: 'Start Date', type: 'date' }
        ],
        records: [
            { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-expand-rows');


    // Events
    let tableEvents = CoreUI.table.create({
        primaryKey: 'id',
        columns: [
            { type: 'numbers', width: 10, attr: { class: "border-end text-end" } },
            { type: 'select' },
            { field: 'name',   label: 'Name' },
            { field: 'email',  label: 'Email',     width: 150 },
            { type:  'date',   field: 'sdate',     label: 'Start Date', width: 100,  format: 'DD.MM.YYYY' },
            { type:  'switch', field: 'is_active', label: 'On', valueY: 1, valueN: 0, disabled: false,
                onChange: function (record, value) {
                    alert("Switch record to " + value + ": " + JSON.stringify(record));
                }
            }
        ],
        onClick: function (record, table, event) {
            alert('Click record: ' + JSON.stringify(record))
        },
        records: [
            { id: "1", name: 'Jane Doe',       email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", name: 'Stuart Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", name: 'Jin Franson',    email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    });

    tableEvents.on('record_select', function (record) {
        alert('Select record: ' + JSON.stringify(record));
    });
    tableEvents.on('record_unselect', function (record) {
        alert('Unselect record: ' + JSON.stringify(record));
    });
    tableEvents.on('record_select_all', function () {
        alert('Select all records');
    });
    tableEvents.on('record_unselect_all', function () {
        alert('Unselect all records');
    });
    tableEvents.on('container_show', function () {
        console.log('show_container')
    });
    tableEvents.on('records_show', function () {
        console.log('records_show')
    });

    tableEvents.render('table-events')


    // Column types basic
    CoreUI.table.create({
        columns: [
            { type: 'numbers',  width: 25, attr: { class: "border-end text-end" } },
            { type: 'text',     field: 'text',     label: 'Text',     description: "Description text" },
            { type: 'number',   field: 'number',   label: 'Number',   width: 100 },
            { type: 'money',    field: 'money',    label: 'Money',    width: 120, currency: 'USD'},
            { type: 'html',     field: 'html',     label: 'Html',     width: 100 },
            { type: 'date',     field: 'date',     label: 'Date',     format: 'DD.MM.YYYY',          width: 100  },
            { type: 'datetime', field: 'datetime', label: 'Datetime', format: 'DD.MM.YYYY hh:mm:ss', width: 140 }
        ],
        records: [
            { text: 'Jane Doe',       number: 32,      money: 0.15,     html: '<span style="color: #f00">Text</span> <b>bold</b>',                date: '2023-04-03', datetime: '2023-12-03 12:04:10'},
            { text: 'Stuart Motzart', number: 100,     money: 10,       html: '<button class="btn btn-xs btn-outline-secondary">button</button>', date: '2023-04-03', datetime: '2023-11-03 13:10:30'},
            { text: 'Jin Franson',    number: 1122335, money: 12500.00, html: '<a href="#">Link</a>',                                             date: '2023-04-03', datetime: '2023-04-03 23:57:00'},
            { text: 'Susan Ottie',    number: -2343,   money: -1234.40, html: '<i class="bi bi-star"></i> icon',                                  date: '2023-09-03', datetime: '2023-10-03 05:15:37'},
        ]
    }).render('table-column-types-basic');


    // Column types standard
    CoreUI.table.create({
        id: 'types_standard',
        columns: [
            { type: 'select' },
            { type: 'switch',    field: 'is_active', label: 'Switch', valueY: 1, valueN: 0, width: 80 },
            { type: 'image',     field: 'image',     label: 'Image',  width: 100, imgStyle: 'circle', imgWidth: 30, imgHeight: 30, imgBorder: true },
            { type: 'badge',     field: 'badge',     label: 'Badge'},
            { type: 'dateHuman', field: 'datetime',  label: 'Date Human'},
            { type: 'link',      field: 'link',      label: 'Link',   width: 200 },
            { type: 'button',    field: 'button',    label: 'Button', width: 100 },
        ],
        records: [
            {
                is_active: 0,
                image: 'data/img/thumb1.png',
                badge: { type: 'secondary', text: 'Secondary' },
                datetime: '2024-12-21 19:04:10',
                link: {
                    content: "Link content",
                    url: "#/link-url",
                    attr: {}
                },
                button: {
                    content: "Button",
                    attr: { class: 'btn btn-sm btn-outline-secondary' },
                    onClick: function (record, table) { console.log(record) }
                }
            },
            {
                is_active: 0,
                image: 'data/img/thumb2.png',
                badge: { type: 'primary',   text: 'Primary' },
                datetime: '2024-10-24 07:04:10',
                link: "#/link-url",
                button: {
                    content: "Button",
                    attr: { class: 'btn btn-sm btn-outline-secondary' },
                    onClick: function (record, table) { console.log(record) }
                }
            },
            {
                is_active: 1,
                image: 'data/img/thumb3.png',
                badge: { type: 'success',   text: 'Success' },
                datetime: '2023-12-03 12:04:10',
                link: {
                    content: "Link",
                    url: "#/link-url",
                    attr: { class: 'btn btn-sm btn-outline-secondary' }
                },
                button: {
                    content: "Button",
                    attr: { class: 'btn btn-sm btn-outline-secondary' },
                    onClick: "console.log(record)"
                }
            },
            {
                is_active: 1,
                image: 'data/img/thumb4.png',
                button: {
                    content: "Button",
                    attr: { class: 'btn btn-sm btn-outline-secondary' },
                    onClick: "console.log(record)"
                },
                datetime: '2025-04-06 17:04:10',
                badge: { type: 'warning',   text: 'Warning' },
                link: {
                    content: "<i class=\"bi bi-arrow-right\"></i>",
                    url: "#/link-url",
                    attr: { class: 'btn btn-sm btn-outline-secondary' }
                }
            },
        ]
    }).render('table-column-types-standard');

    // Column types advanced
    CoreUI.table.create({
        id: 'types_advanced',
        columns: [
            { type: 'component', field: 'component',    label: 'Components coreui' },
            { type: 'progress',  field: 'progress',     label: 'Progress',          width: 250, barWidth: 150, showPercent: true },
            { type: 'menu',      field: 'menu',         label: 'Menu',              width: 100 },
        ],
        records: [
            {
                component: {
                    component: 'coreui.chart',
                    datasets: [
                        { type: "bar", name: "dataset", style: { fill: 100 }, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }
                    ],
                    options: {
                        width: 100,
                        height: 30,
                        enabled: { legend: false, labels: false, minimize: true },
                        axis: { xaxis: { show: false }, yaxis: { show: false }, grid: { show: false } }
                    }
                },
                progress: 25,
                menu: {
                    content: '<i class="bi bi-three-dots-vertical"></i>',
                    attr: { class: 'btn btn-sm btn-outline-secondary rounded-1' },
                    position: 'end',
                    items: [
                        { type: 'header', content: 'Header text' },
                        { type: 'link',   content: 'Link', url: "#" },
                        {
                            type: 'button',
                            content: 'Button',
                            onClick: function (record, table, event) { console.log('button') }
                        },
                        { type: 'divider' },
                        {
                            type: 'button',
                            content: '<i class="bi bi-trash"></i> Delete',
                            attr: { class: 'text-danger' },
                            onClick: function (record, table, event) { console.log('delete record ' + record.index) }
                        },
                    ]
                }
            },
            {
                component: {
                    component: 'coreui.chart',
                    datasets: [
                        { type: "line", name: "dataset", style: { fill: 0 }, data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }
                    ],
                    options: {
                        width: 100,
                        height: 30,
                        enabled: { legend: false, labels: false, minimize: true },
                        axis: { xaxis: { show: false }, yaxis: { show: false }, grid: { show: false } }
                    }
                },
                progress: { percent: 50, color: 'info' },
                menu: {
                    attr: { class: 'btn btn-sm rounded-1' },
                    items: [
                        { type: 'link', content: 'Link 1', url: "#" },
                        { type: 'link', content: 'Link 2', url: "#" },
                        { type: 'link', content: 'Link 3', url: "#" },
                    ]
                }
            },
            {
                component: {
                    component: 'coreui.chart',
                    labels: ['d1', 'd2', 'd3', 'd4'],
                    datasets: [
                        { type: "pie", name: "Pie", data: [43, 32, 12, 9] }
                    ],
                    options: {
                        type: "pie",
                        width: 100,
                        height: 30,
                        enabled: { legend: false, labels: false, minimize: true },
                        axis: { xaxis: { show: false }, yaxis: { show: false }, grid: { show: false } }
                    }
                },
                progress: { percent: 75, color: 'warning', description: '750Mb of 1Gb' },
                menu: {
                    attr: { class: 'btn btn-sm rounded-1' },
                    position: 'start',
                    items: [
                        { type: 'link', content: 'Link 1', url: "#" },
                        { type: 'link', content: 'Link 2', url: "#" },
                        { type: 'link', content: 'Link 3', url: "#" },
                    ]
                }
            },
            {
                component: {
                    component: 'coreui.table',
                    columns: [
                        {field: 'fname', label: 'First Name', width: 100},
                        {field: 'lname', label: 'Last Name'},
                        {field: 'sdate', label: 'Start Date', width: 120, type: 'date'}
                    ],
                    records: [
                        {id: "1", fname: 'Jane',   lname: 'Doe',     sdate: '2023-09-03'},
                        {id: "2", fname: 'Stuart', lname: 'Motzart', sdate: '2023-04-03'},
                        {id: "3", fname: 'Jin',    lname: 'Franson', sdate: '2023-02-03'}
                    ]
                },
                progress: { percent: 100, color: 'success', description: 'Description text' },
                menu: {
                    content: 'Dropdown',
                    attr: { class: 'btn btn-sm btn-secondary dropdown-toggle' },
                    position: 'end',
                    items: [
                        { type: 'link', content: 'Link 1', url: "#" },
                        { type: 'link', content: 'Link 2', url: "#" },
                        { type: 'link', content: 'Link 3', url: "#" },
                    ]
                }
            },
        ]
    }).render('table-column-types-advanced');


    // Column manage
    CoreUI.table.create({
        header: [
            {
                type: 'in',
                left: [
                    {
                        type: 'columns',
                        btn: {
                            content: "<i class=\"bi bi-layout-three-columns\"></i> Columns",
                            attr: { class: 'btn btn-sm btn-secondary' }
                        },
                        btnComplete: {
                            content: "Complete",
                            attr: { class: 'btn btn-sm btn-primary' },
                        }
                    }
                ]
            },
        ],
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'fname',  label: 'First Name'},
            { field: 'lname',  label: 'Last Name', show: false},
            { field: 'sdate',  label: 'Start Date', type: 'date' }
        ],
        records: [
            { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-column-manage');


    // Fixed columns
    CoreUI.table.create({
        height: 550,
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
    }).render('table-columns-fixed');


    // Columns menu
    CoreUI.table.create({
        columns: [
            { field: 'fname', label: 'First Name', width: '15%',
                menu: {
                    items: [
                        { type: 'button', text: '<i class="bi bi-layout-text-sidebar-reverse"></i> Hide',
                            onClick: function (table) {
                                table.hideColumns([ 'fname' ]);
                            },
                        },
                    ]
                }
            },
            { field: 'lname', label: 'Last Name',  width: 150, sortable: true,
                menu: {
                    position: 'end',
                    items: [
                        { type: 'button', text: '<i class="bi bi-filter-left"></i> Sort asc',
                            onClick: function (table) {
                                table.sortFields([ { field: 'lname', order: 'asc' } ]);
                            },
                        },
                        { type: 'button', text: '<i class="bi bi-filter-right"></i> Sort desc',
                            onClick: function (table) {
                                table.sortFields([ { field: 'lname', order: 'desc' } ]);
                            },
                        },
                        { type: 'divider' },
                        { type: 'button', text: '<i class="bi bi-filter-right"></i> Sort default',
                            onClick: function (table) {
                                table.sortDefault()
                            },
                        }
                    ]
                }
            },
            { field: 'email', label: 'Email',
                menu: {
                    showAlways: true,
                    items: [
                        { type: 'header', text: 'Header text' },
                        { type: 'link', text: 'Link', url: '#link-url' },
                        { type: 'button', text: 'Button', onClick: "alert('button click')" },
                        { type: 'divider' },
                        { type: 'button', text: '<i class="bi bi-trash"></i> Delete', attr: { 'class': 'text-danger' },
                            onClick: function () {
                                alert('delete action')
                            },
                        }
                    ]
                }
            }
        ],
        records: [
            { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "3", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-columns-menu');


    // Headers
    CoreUI.table.create({
        class: 'table-bordered',
        maxHeight: 400,
        columnsHeader: [
            [
                { content: '', attr: { rowspan: 2, colspan: 2 }  },
                { content: 'General Information', attr: { colspan: 7 } },
            ],
            [
                { content: 'Full name', attr: { colspan: 3 } },
                { content: 'Important Dates', attr: { colspan: 3, class: "text-center" } }
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
            { type: 'switch', field: 'is_active', label: 'On', valueY: 1, valueN: 0,
                onChange: function (record, value) {
                    console.log(record);
                    console.log(value);
                }
            },
        ],
        records: [
            { id: 1,  fname: 'Jane',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-12-03', is_active: 0 },
            { id: 2,  fname: 'Stuart',  lname: 'Motzart',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-11-03', is_active: 0 },
            { id: 3,  fname: 'Jin',     lname: 'Franson',     email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-04-03', is_active: 1 },
            { id: 4,  fname: 'Susan',   lname: 'Ottie',       email: 'frank@gmail.com',    sdate: '2023-09-03', edate: '2023-10-03', is_active: 1 },
            { id: 5,  fname: 'Kelly',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-06-24', is_active: 1 },
            { id: 6,  fname: 'Francis', lname: 'Gatos',       email: 'jdoe@gmail.com',     sdate: '2023-02-03', edate: '2023-06-03', is_active: 0 },
            { id: 7,  fname: 'Mark',    lname: 'Welldo',      email: 'susan@gmail.com',    sdate: '2023-04-03', edate: '2023-06-23', is_active: 0 },
            { id: 8,  fname: 'Thomas',  lname: 'Bahh',        email: 'david@gmail.com',    sdate: '2023-04-03', edate: '2023-09-16', is_active: 0 },
            { id: 9,  fname: 'Sergei',  lname: 'Rachmaninov', email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 10, fname: 'Jill',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 11, fname: 'Frank',   lname: 'Motzart',     email: 'peterson@gmail.com', sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 12, fname: 'Peter',   lname: 'Franson',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-03', is_active: 0 },
            { id: 13, fname: 'Andrew',  lname: 'Ottie',       email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-06-19', is_active: 0 },
            { id: 14, fname: 'Manny',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-05', is_active: 0 },
            { id: 15, fname: 'Ben',     lname: 'Gatos',       email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-09-03', is_active: 0 },
            { id: 16, fname: 'Doer',    lname: 'Welldo',      email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-07', is_active: 0 },
            { id: 17, fname: 'Shashi',  lname: 'Bahh',        email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 18, fname: 'Av',      lname: 'Rachmaninov', email: 'joe@gmail.com',      sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 },
        ]
    }).render('table-headers');


    // Footers
    CoreUI.table.create({
        class: 'table-bordered',
        maxHeight: 400,
        columnsFooter: [
            [
                { content: '',     attr: { rowspan: 2, colspan: 2 } },
                { content: 'Name', attr: { colspan: 2 } },
                { content: '',     attr: { colspan: 4 } },
            ],
            [
                { content: 'Total', attr: { colspan: 4, class: 'text-end' } },
                { content: '123',   attr: { class: 'text-end', onclick: 'console.log(123)' } },
                { content: '' },
            ]
        ],
        columns: [
            { type: 'numbers'},
            { type: 'select'},
            { type: 'text',   field: 'fname', label: 'First Name', width: '15%'},
            { type: 'text',   field: 'lname', label: 'Last Name',  width: '15%'},
            { type: 'text',   field: 'email', label: 'Email' },
            { type: 'date',   field: 'sdate', label: 'Start Date', width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'date',   field: 'edate', label: 'End Date',   width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'switch', field: 'is_active', label: 'On', valueY: 1, valueN: 0,
                onChange: function (record, value) {
                    console.log(record);
                    console.log(value);
                }
            },
        ],
        records: [
            { id: 1,  fname: 'Jane',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-12-03', is_active: 0 },
            { id: 2,  fname: 'Stuart',  lname: 'Motzart',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-11-03', is_active: 0 },
            { id: 3,  fname: 'Jin',     lname: 'Franson',     email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-04-03', is_active: 1 },
            { id: 4,  fname: 'Susan',   lname: 'Ottie',       email: 'frank@gmail.com',    sdate: '2023-09-03', edate: '2023-10-03', is_active: 1 },
            { id: 5,  fname: 'Kelly',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-06-24', is_active: 1 },
            { id: 6,  fname: 'Francis', lname: 'Gatos',       email: 'jdoe@gmail.com',     sdate: '2023-02-03', edate: '2023-06-03', is_active: 0 },
            { id: 7,  fname: 'Mark',    lname: 'Welldo',      email: 'susan@gmail.com',    sdate: '2023-04-03', edate: '2023-06-23', is_active: 0 },
            { id: 8,  fname: 'Thomas',  lname: 'Bahh',        email: 'david@gmail.com',    sdate: '2023-04-03', edate: '2023-09-16', is_active: 0 },
            { id: 9,  fname: 'Sergei',  lname: 'Rachmaninov', email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 10, fname: 'Jill',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 11, fname: 'Frank',   lname: 'Motzart',     email: 'peterson@gmail.com', sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 12, fname: 'Peter',   lname: 'Franson',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-03', is_active: 0 },
            { id: 13, fname: 'Andrew',  lname: 'Ottie',       email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-06-19', is_active: 0 },
            { id: 14, fname: 'Manny',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-05', is_active: 0 },
            { id: 15, fname: 'Ben',     lname: 'Gatos',       email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-09-03', is_active: 0 },
            { id: 16, fname: 'Doer',    lname: 'Welldo',      email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-07', is_active: 0 },
            { id: 17, fname: 'Shashi',  lname: 'Bahh',        email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 18, fname: 'Av',      lname: 'Rachmaninov', email: 'joe@gmail.com',      sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 },
        ]
    }).render('table-footers');


    // Col-Row Span
    CoreUI.table.create({
        class: 'table-bordered',
        showHeaders: false,
        columns: [
            { type: 'text',   field: 'group',  label: 'Group', width: 300 },
            { type: 'text',   field: 'count',  label: 'Count' },
            { type: 'money',  field: 'money',  label: 'Money',  width: 200, currency: 'USD'},
            { type: 'date',   field: 'date',   label: 'Date',   width: 200, format: 'DD.MM.YYYY' },
        ],
        records: [
            {
                group: 'Group 1',
                count: 'Jane Doe',
                _meta: {
                    fields: {
                        group: { attr: { rowspan: 2 } },
                        count: { attr: { colspan: 3 } },
                        money: { show: false },
                        date:  { show: false },
                    },
                }
            },
            {
                count: 32,
                money: 0.15,
                date: '2023-04-03',
                _meta: {
                    fields: {
                        group: { show: false }
                    },
                }
            },
            {
                group: 'Group 2',
                count: 'Jin Franson',
                _meta: {
                    fields: {
                        group: { attr: { rowspan: 2 } },
                        count: { attr: { colspan: 3 } },
                        money: { show: false },
                        date:  { show: false },
                    },
                }
            },
            {
                count: 32,
                money: 0.15,
                date: '2023-04-03',
                _meta: {
                    fields: {
                        group: { show: false }
                    },
                }
            }
        ]
    }).render('table-columns-row-span');


    // Group
    CoreUI.table.create({
        id: 'group',
        saveState: true,
        header: [
            {
                type: 'in',
                left: [
                    {
                        type: 'columns',
                        btn: {
                            content: "<i class=\"bi bi-layout-three-columns\"></i> Columns",
                            attr: { class: 'btn btn-sm btn-secondary' }
                        },
                        btnComplete: {
                            content: "Complete",
                            attr: { class: 'btn btn-sm btn-primary' },
                        }
                    }
                ]
            },
        ],
        group: {
            field: 'fname',
            attr: { class: 'table-secondary' },
            isCollapsing: true,
            render: function (record) {
                return 'Group: ' + record.data.fname + ' ' + record.data.lname
            },
        },
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'fname',  label: 'First Name'},
            { field: 'lname',  label: 'Last Name'},
            { field: 'sdate',  label: 'Start Date', type: 'date' }
        ],
        records: [
            { id: "1", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "2", fname: 'Jane',   lname: 'Doe',     email: 'jdoe@gmail.com',  sdate: '2023-09-03' },
            { id: "3", fname: 'Stuart', lname: 'Motzart', email: 'frank@gmail.com', sdate: '2023-04-03' },
            { id: "4", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' },
            { id: "5", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' },
            { id: "6", fname: 'Jin',    lname: 'Franson', email: 'peter@gmail.com', sdate: '2023-02-03' }
        ]
    }).render('table-group');


    // Sizing and decoration
    CoreUI.table.create({
        class: 'table-bordered table-sm table-hover table-striped',
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: 540,
        minHeight: 540,
        maxHeight: 540,
        columns: [
            { type: 'numbers'},
            { type: 'select'},
            { type: 'text',    field: 'fname', label: 'First Name', width: '15%'},
            { type: 'text',    field: 'lname', label: 'Last Name',  width: '15%'},
            { type: 'text',    field: 'email', label: 'Email' },
            { type: 'date',    field: 'sdate', label: 'Start Date', width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'date',    field: 'edate', label: 'End Date',   width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'switch', field: 'is_active', label: 'On', valueY: 1, valueN: 0 },
        ],
        records: [
            { id: 1,  fname: 'Jane',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-12-03', is_active: 0 },
            { id: 2,  fname: 'Stuart',  lname: 'Motzart',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-11-03', is_active: 0 },
            { id: 3,  fname: 'Jin',     lname: 'Franson',     email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-04-03', is_active: 1 },
            { id: 4,  fname: 'Susan',   lname: 'Ottie',       email: 'frank@gmail.com',    sdate: '2023-09-03', edate: '2023-10-03', is_active: 1 },
            { id: 5,  fname: 'Kelly',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-06-24', is_active: 1 },
            { id: 6,  fname: 'Francis', lname: 'Gatos',       email: 'jdoe@gmail.com',     sdate: '2023-02-03', edate: '2023-06-03', is_active: 0 },
            { id: 7,  fname: 'Mark',    lname: 'Welldo',      email: 'susan@gmail.com',    sdate: '2023-04-03', edate: '2023-06-23', is_active: 0 },
            { id: 8,  fname: 'Thomas',  lname: 'Bahh',        email: 'david@gmail.com',    sdate: '2023-04-03', edate: '2023-09-16', is_active: 0 },
            { id: 9,  fname: 'Sergei',  lname: 'Rachmaninov', email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 10, fname: 'Jill',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 11, fname: 'Frank',   lname: 'Motzart',     email: 'peterson@gmail.com', sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 12, fname: 'Peter',   lname: 'Franson',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-03', is_active: 0 },
            { id: 13, fname: 'Andrew',  lname: 'Ottie',       email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-06-19', is_active: 0 },
            { id: 14, fname: 'Manny',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-05', is_active: 0 },
            { id: 15, fname: 'Ben',     lname: 'Gatos',       email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-09-03', is_active: 0 },
            { id: 16, fname: 'Doer',    lname: 'Welldo',      email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-07', is_active: 0 },
            { id: 17, fname: 'Shashi',  lname: 'Bahh',        email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 18, fname: 'Av',      lname: 'Rachmaninov', email: 'joe@gmail.com',      sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 },
            { id: 19, fname: 'John',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 }
        ]
    }).render('table-sizing-decoration');


    // Theme
    let optionsTheme = {
        class: 'table-sm table-hover',
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: 250,
        minHeight: 250,
        maxHeight: 250,
        columns: [
            { type: 'numbers'},
            { type: 'select'},
            { type: 'text',    field: 'fname', label: 'First Name', width: '15%'},
            { type: 'text',    field: 'lname', label: 'Last Name',  width: '15%'},
            { type: 'text',    field: 'email', label: 'Email' },
            { type: 'date',    field: 'sdate', label: 'Start Date', width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'date',    field: 'edate', label: 'End Date',   width: 120, format: 'DD/MM/YYYY', attr: { class: 'text-end' }, attrHeader: { class: 'text-end' }},
            { type: 'switch', field: 'is_active', label: 'On', valueY: 1, valueN: 0 },
        ],
        records: [
            { id: 1,  fname: 'Jane',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-12-03', is_active: 0 },
            { id: 2,  fname: 'Stuart',  lname: 'Motzart',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-11-03', is_active: 0 },
            { id: 3,  fname: 'Jin',     lname: 'Franson',     email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-04-03', is_active: 1 },
            { id: 4,  fname: 'Susan',   lname: 'Ottie',       email: 'frank@gmail.com',    sdate: '2023-09-03', edate: '2023-10-03', is_active: 1 },
            { id: 5,  fname: 'Kelly',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-06-24', is_active: 1 },
            { id: 6,  fname: 'Francis', lname: 'Gatos',       email: 'jdoe@gmail.com',     sdate: '2023-02-03', edate: '2023-06-03', is_active: 0 },
            { id: 7,  fname: 'Mark',    lname: 'Welldo',      email: 'susan@gmail.com',    sdate: '2023-04-03', edate: '2023-06-23', is_active: 0 },
            { id: 8,  fname: 'Thomas',  lname: 'Bahh',        email: 'david@gmail.com',    sdate: '2023-04-03', edate: '2023-09-16', is_active: 0 },
            { id: 9,  fname: 'Sergei',  lname: 'Rachmaninov', email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 10, fname: 'Jill',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 11, fname: 'Frank',   lname: 'Motzart',     email: 'peterson@gmail.com', sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 12, fname: 'Peter',   lname: 'Franson',     email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-03', is_active: 0 },
            { id: 13, fname: 'Andrew',  lname: 'Ottie',       email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-06-19', is_active: 0 },
            { id: 14, fname: 'Manny',   lname: 'Silver',      email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-08-05', is_active: 0 },
            { id: 15, fname: 'Ben',     lname: 'Gatos',       email: 'peter@gmail.com',    sdate: '2023-04-03', edate: '2023-09-03', is_active: 0 },
            { id: 16, fname: 'Doer',    lname: 'Welldo',      email: 'magi@gmail.com',     sdate: '2023-04-03', edate: '2023-04-07', is_active: 0 },
            { id: 17, fname: 'Shashi',  lname: 'Bahh',        email: 'jdoe@gmail.com',     sdate: '2023-04-03', edate: '2023-04-03', is_active: 0 },
            { id: 18, fname: 'Av',      lname: 'Rachmaninov', email: 'joe@gmail.com',      sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 },
            { id: 19, fname: 'John',    lname: 'Doe',         email: 'jdoe@gmail.com',     sdate: '2023-09-03', edate: '2023-12-06', is_active: 0 }
        ]
    };

    optionsTheme.theme = 'compact';
    CoreUI.table.create(optionsTheme).render('table-themes-compact');

    optionsTheme.theme = 'no-border';
    CoreUI.table.create(optionsTheme).render('table-themes-no-border');


    // Sorting
    CoreUI.table.create({
        id: 'sort',
        saveState: true,
        sort: [ { field: 'fname', order: 'asc' } ],
        maxHeight: 400,
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'fname',  label: 'First Name', sortable: true, width: '25%' },
            { field: 'lname',  label: 'Last Name', sortable: true, width: '25%' },
            { field: 'sdate',  label: 'Start Date', sortable: true }
        ],
        records: [
            { id: 1,  fname: "Joseph",            lname: "Haydn",     sdate: "1732-1809" },
            { id: 2,  fname: "Ludwig Van",        lname: "Beethoven", sdate: "1770-1827" },
            { id: 3,  fname: "Wolfgang1 Amadeus", lname: "Mozart",    sdate: "1756-1791" },
            { id: 4,  fname: "Johann Sebastian",  lname: "Bach",      sdate: "1685-1750" },
            { id: 5,  fname: "Richard",           lname: "Wagner",    sdate: "1685-1750" },
            { id: 6,  fname: "Joseph",            lname: "Haydn",     sdate: "1732-1809" },
            { id: 7,  fname: "Ludwig Van",        lname: "Beethoven", sdate: "1770-1827", _meta: { "attr": { "style": "background-color: #C2F5B4" }}},
            { id: 8,  fname: "Wolfgang2 Amadeus", lname: "Mozart",    sdate: "1756-1791" },
            { id: 9,  fname: "Johann Sebastian",  lname: "Bach",      sdate: "1685-1750" },
            { id: 10, fname: "Richard",           lname: "Wagner",    sdate: "1685-1750", _meta: { "attr": { "style": "color: red" }}},
            { id: 11, fname: "Joseph",            lname: "Haydn",     sdate: "1732-1809", _meta: { "attr": { "style": "background-color: #FBFEC0" }}},
            { id: 12, fname: "Ludwig Van",        lname: "Beethoven", sdate: "1770-1827" },
            { id: 13, fname: "Wolfgang3 Amadeus", lname: "Mozart",    sdate: "1756-1791" },
            { id: 14, fname: "Johann Sebastian",  lname: "Bach",      sdate: "1685-1750" },
            { id: 15, fname: "Richard",           lname: "Wagner",    sdate: "1685-1750", _meta: { "attr": { "style": "color: blue" }}}
        ]
    }).render('table-sorting')


    // Search
    CoreUI.table.create({
        id: 'search',
        header: [
            {
                type: 'in',
                left: [
                    {
                        type: "search",
                        btn: {
                            content: "<i class=\"bi bi-search\"></i> Search",
                            attr: { class: 'btn btn-sm btn-secondary' }
                        },
                        btnClear: {
                            content: "<i class=\"bi bi-x\"></i>",
                            attr: { class: 'btn btn-sm btn-outline-secondary' }
                        },
                        btnComplete: {
                            content: "Search",
                            attr: { class: 'btn btn-sm btn-primary' }
                        },
                    },
                ]
            }
        ],
        footer: [
            {
                type: 'out',
                left: [ { type: 'total' } ]
            }
        ],
        saveState: true,
        search: {
            labelWidth: 150,
            controls: [
                { type: 'text',           field: 'name',  label: 'text',           width: 200, attr: { placeholder: 'text' },
                    description: "Description text", suffix: "<small>Suffix content</small>"
                },
                { type: 'number',         field: 'number', label: 'number',         width: 200, attr: { placeholder: 'number' },
                    descriptionLabel: "Description label",
                },
                { type: 'date',          field: 'sdate',  label: 'date',           width: 200, attr: {} },
                { type: 'dateMonth',     field: 'sdate',  label: 'date month',     width: 200, attr: {} },
                { type: 'datetime',      field: 'sdate',  label: 'datetime',       width: 200, attr: {} },
                { type: 'dateRange',     field: 'sdate',  label: 'date range',     width: 200, attr: {} },
                { type: 'datetimeRange', field: 'sdate',  label: 'datetime range', width: 200, attr: {} },
                { type: 'radio',         field: 'active', label: 'radio',
                    options: [
                        { value: '1', text: 'Active' },
                        { value: '0', text: 'Inactive' },
                    ]
                },
                { type: 'checkbox', field: 'id', label: 'checkbox',
                    options: [
                        { value: '1', text: 'Dionne Mccray' },
                        { value: '2', text: 'Bridgett Melendez' },
                        { value: '3', text: 'Finley Meyer' },
                    ]
                },
                { type: 'radioBtn', field: 'active', label: 'radio btn',
                    options: [
                        { value: '1', text: 'Active' },
                        { value: '0', text: 'Inactive' },
                    ]
                },
                { type: 'checkboxBtn', field: 'id', label: 'checkbox btn',
                    options: [
                        { value: '1', text: 'Dionne Mccray' },
                        { value: '2', text: 'Bridgett Melendez' },
                        { value: '3', text: 'Finley Meyer' },
                    ]
                },
                { type: 'switch', field: 'active', label: 'switch', valueY: 1 },
                { type: 'select', field: 'id', label: 'select', width: 200,
                    options: {
                        '1': 'Dionne Mccray',
                        '2': 'Bridgett Melendez',
                        '3': 'Finley Meyer',
                        '4': 'Sheila Briggs',
                        '5': 'Vasquez Shepard',
                    }
                },
                { type: 'select', field: 'id', label: 'multiselect', width: 200, attr: {multiple: "multiple"},
                    options: [
                        { value: '0',  text: 'Armstrong Cole' },
                        { type: "group", label: 'Group 1',
                            options : [
                                { value: 1, text: 'Dionne Mccray' },
                                { value: 2, text: 'Bridgett Melendez' },
                            ]
                        },
                        { type: "group", label: 'Group 2', attr: { class: "group-class"  },
                            options : [
                                { value: 3, text: 'Finley Meyer' },
                                { value: 4, text: 'Sheila Briggs' },
                                { value: 5, text: 'Vasquez Shepard' }
                            ]
                        }
                    ]
                }
            ]
        },
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'name',   label: 'Name' },
            { field: 'number', label: 'Number',     type: 'number', width: 80 },
            { field: 'active', label: 'Active',     type: 'switch', width: 80 },
            { field: 'sdate',  label: 'Start Date', type: 'date', width: 140 }
        ],
        records: [
            { "id": "0",  "name": "Armstrong Cole",    "number": 28, "active": 0, "sdate": "2018-09-18" },
            { "id": "1",  "name": "Dionne Mccray",     "number": 38, "active": 0, "sdate": "2015-03-06" },
            { "id": "2",  "name": "Bridgett Melendez", "number": 33, "active": 0, "sdate": "2020-02-13" },
            { "id": "3",  "name": "Finley Meyer",      "number": 35, "active": 1, "sdate": "2014-11-17" },
            { "id": "4",  "name": "Sheila Briggs",     "number": 38, "active": 0, "sdate": "2023-07-04" },
            { "id": "5",  "name": "Vasquez Shepard",   "number": 23, "active": 1, "sdate": "2015-10-30" },
            { "id": "6",  "name": "Meredith Garrison", "number": 27, "active": 0, "sdate": "2021-04-07" },
            { "id": "7",  "name": "Isabella Poole",    "number": 39, "active": 1, "sdate": "2023-02-24" },
            { "id": "8",  "name": "Roach Fischer",     "number": 30, "active": 0, "sdate": "2021-03-12" },
            { "id": "9",  "name": "Melva Macdonald",   "number": 38, "active": 1, "sdate": "2015-05-18" },
            { "id": "10", "name": "Goodwin Foster",    "number": 21, "active": 0, "sdate": "2018-11-18" },
            { "id": "11", "name": "Jacqueline Gibson", "number": 30, "active": 0, "sdate": "2017-09-30" },
            { "id": "12", "name": "Amalia Shannon",    "number": 23, "active": 1, "sdate": "2023-05-24" },
            { "id": "13", "name": "Dena Floyd",        "number": 37, "active": 0, "sdate": "2024-01-15" },
            { "id": "14", "name": "Merrill Russo",     "number": 22, "active": 1, "sdate": "2023-04-09" }
        ]
    }).render('table-search');


    // Filters
    CoreUI.table.create({
        id: 'filters',
        saveState: true,
        header: [
            {
                type: 'out',
                left: [
                    { type: 'filter:text',           field: 'name',  label: 'text', width: 150,
                        attr: { class: "form-control" }, autoSearch: true,
                        btn: { attr: { class: "btn btn-sm btn-outline-secondary border-secondary-subtle" } }
                    },
                    { type: 'filter:number',         field: 'number', label: '', width: 90,
                        attr: { class: "form-control" },
                        btn: { attr: { class: "btn btn-sm btn-outline-secondary border-secondary-subtle" } }
                    },
                    { type: 'divider', width: 20, text: '|' },
                    { type: 'filter:date',          field: 'sdate',  label: '', width: 140, attr: {} },
                    { type: 'filter:datetime',      field: 'sdate',  label: '', width: 180, attr: {} },
                    { type: 'filter:dateMonth',     field: 'sdate',  label: '', width: 200, attr: {} },
                    { type: 'filter:dateRange',     field: 'sdate',  label: '', width: 140, attr: {} },
                    { type: 'filter:datetimeRange', field: 'sdate',  label: '', width: 180, attr: {} },
                ],
            },
            {
                type: 'in',
                left: [
                    { type: 'filter:radio', field: 'id', label: '',
                        options: [
                            { value: '1', text: 'Radio 1', class: 'btn btn-outline-secondary' },
                            { value: '2', text: 'Radio 2', class: 'btn btn-outline-secondary' },
                            { value: '3', text: 'Radio 3', class: 'btn btn-outline-warning' },
                        ] },
                    { type: 'filter:checkbox', field: 'id', label: '',
                        options: [
                            { value: '1', text: 'Check 1', class: 'btn btn-outline-secondary' },
                            { value: '2', text: 'Check 2', class: 'btn btn-outline-secondary' },
                            { value: '3', text: 'Check 3', class: 'btn btn-outline-primary' },
                        ] },
                    { type: 'filter:select', field: 'id', label: '', width: 200, attr: {},
                        options: {
                            '1': "Dionne Mccray",
                            '2': "Bridgett Melendez",
                            '3': "Finley Meyer",
                            '4': "Sheila Briggs",
                            '5': "Vasquez Shepard",
                        }
                    },
                    { type: 'filter:switch', field: 'active', label: 'Active', valueY: 1},
                    { type: 'filterClear',  content: '<i class="bi bi-backspace"></i> Clear', attr: { class: "btn btn-secondary" } },
                ]
            }
        ],
        footer: [
            {
                type: 'out',
                left: [ { type: 'total' } ]
            }
        ],
        columns: [
            { type: 'numbers', width: 10, attr: { class: "bg-body-tertiary border-end text-end" } },
            { field: 'name',   label: 'Name' },
            { field: 'number', label: 'Number',     type: 'number', width: 80 },
            { field: 'active', label: 'Active',     type: 'switch', width: 80 },
            { field: 'sdate',  label: 'Start Date', type: 'date', width: 140 }
        ],
        records: [
            { "id": '0',  "name": "Armstrong Cole",    "number": 28, "active": 0, "sdate": "2018-09-18" },
            { "id": '1',  "name": "Dionne Mccray",     "number": 38, "active": 0, "sdate": "2015-03-06" },
            { "id": '2',  "name": "Bridgett Melendez", "number": 33, "active": 0, "sdate": "2020-02-13" },
            { "id": '3',  "name": "Finley Meyer",      "number": 35, "active": 1, "sdate": "2014-11-17" },
            { "id": '4',  "name": "Sheila Briggs",     "number": 38, "active": 0, "sdate": "2023-07-04" },
            { "id": '5',  "name": "Vasquez Shepard",   "number": 23, "active": 1, "sdate": "2015-10-30" },
            { "id": '6',  "name": "Meredith Garrison", "number": 27, "active": 0, "sdate": "2021-04-07" },
            { "id": '7',  "name": "Isabella Poole",    "number": 39, "active": 1, "sdate": "2023-02-24" },
            { "id": '8',  "name": "Roach Fischer",     "number": 30, "active": 0, "sdate": "2021-03-12" },
            { "id": '9',  "name": "Melva Macdonald",   "number": 38, "active": 1, "sdate": "2015-05-18" },
            { "id": '10', "name": "Goodwin Foster",    "number": 21, "active": 0, "sdate": "2018-11-18" },
            { "id": '11', "name": "Jacqueline Gibson", "number": 30, "active": 0, "sdate": "2017-09-30" },
            { "id": '12', "name": "Amalia Shannon",    "number": 23, "active": 1, "sdate": "2023-05-24" },
            { "id": '13', "name": "Dena Floyd",        "number": 37, "active": 0, "sdate": "2024-01-15" },
            { "id": '14', "name": "Merrill Russo",     "number": 22, "active": 1, "sdate": "2023-04-09" }
        ]
    }).render('table-filters');
});