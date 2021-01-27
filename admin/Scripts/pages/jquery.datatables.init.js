/**
 * Theme: Zircos Admin Template
 * Author: Coderthemes
 * Component: Datatable
 * 
 */
var handleDataTableButtons = function(size, vista) {
    if (vista === "usuarios") {
        var url = "/sgp_admin/Account/GetData";
        //console.log(url);
        "use strict";
        0 !== $("#datatable-buttons").length &&
            $("#datatable-buttons").DataTable({
                "proccessing": true,
                "serverSide": true,
                "ordering": false,
                "ajax": {
                    url: url,
                    type: 'POST',

                    data: function(data) {

                    }

                },
                "columns": [
                    {
                        "data": function(data) {
                            return moment(data.FechaSolicitud).format('L LT');
                        }
                    },
                    { "data": "Nombre" },
                    { "data": "Apellido" },
                    {
                        "data": function(data) {
                            //console.log(data.InstitucionPublica);
                            return data.InstitucionPublica;
                        }
                    },
                    { "data": "NumeroIdentidad" },
                    { "data": "Role" },
                    {
                        "data": function (data) {
                            if (data.Estado) {
                                return 'Activo';
                            } else {
                                return 'Desactivado';
                            }
                        }
                    },
                    { "data": "Email" },
                    {
                        "data": function(data) {
                            //console.log(data.UsuarioId.toString());
                            return '<div class="btn-group"> <button type="button" class="btn btn-custom dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones <span class="caret"></span></button>' +
                                '<ul class="dropdown-menu" role="menu">' +
                                '<li>' +
                                '<a href="/sgp_admin/Account/Edit?id=' +
                                data.UsuarioId.toString() +
                                '"><i class="mdi mdi-pencil"></i> Editar</a>' +
                                '</li>' +
                                '<li>' +
                                '<a href="/sgp_admin/Account/ResetPassword?id=' +
                                data.UsuarioId.toString() +
                                '"><i class="mdi mdi-lock-open"></i> Reiniciar Contraseña</a>' +
                                '</li>' +
                                '<li>' +
                                '<a onclick=ActivarUsuario("' +
                                data.UsuarioId +
                                '")><i class="mdi mdi-power"></i> Desactivar Usuario</a>' +
                                '</li>' +
                                '</ul> ' +
                                '</div>';


                        }
                    }
                ],
                "pageLength": size,
                order: [[3, "desc"]],
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    }, {
                        extend: "csv",
                        className: "btn-sm"
                    }, {
                        extend: "excel",
                        className: "btn-sm"
                    }, {
                        extend: "pdf",
                        className: "btn-sm"
                    }, {
                        extend: "print",
                        className: "btn-sm",
                        customize: function (win) {
                            $(win.document.body).find('table').addClass('display').css('font-size', '9px');
                            $(win.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                $(this).css('background-color', '#D0D0D0');
                            });
                            $(win.document.body).find('h1').css('text-align', 'center');
                        }
                        //customize: function (win) {
                        //    console.log("windows para imprimi: ", win);
                        //    $(win.document.body)
                        //        //.css('font-size', '10pt')
                        //        .prepend(
                        //            '<img src="/sgp_admin/Images/logosgppng.png" style="position:absolute; top:0; left:0;" />'
                        //        );

                        //    //$(win.document.body).find('table')
                        //    //    .addClass('compact')
                        //    //    .css('font-size', 'inherit');
                        //}
                    }
                ],
                responsive: !0,

            });

    } else {
        var url = "/sgp_admin/Account/GetData";
        //console.log(url);
        "use strict";
        0 !== $("#datatable-buttons").length &&
            $("#datatable-buttons").DataTable({
                "pageLength": size,
                ordering: false,
    
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    }, {
                        extend: "csv",
                        className: "btn-sm"
                    }, {
                        extend: "excel",
                        className: "btn-sm"
                    }, {
                        extend: "pdf",
                        className: "btn-sm"
                    }, {
                        extend: "print",
                        className: "btn-sm",
                        customize: function (win) {
                            $(win.document.body).find('table').addClass('display').css('font-size', '10px');
                            $(win.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                $(this).css('background-color', '#D0D0D0');
                            });
                            $(win.document.body).find('h1').html('<img src="/sgp_admin/Images/logosgppng.png"/>');
                            $(win.document.body).find('h1').css('text-align', 'center');
                            console.log("windows para imprimir: ", win.document.body);
                            //console.log("windows para imprimi: ", win);
                            //console.log("imagen: ")
                            //$(win.document.body)
                            //    .css('font-size', '10pt')
                            //    .prepend(
                            //        '<img src="/sgp_admin/Images/logosgppng.png" style="position:absolute; top:0; left:0;" />'
                            //    );

                            //$(win.document.body).find('table')
                            //    .addClass('compact')
                            //    .css('font-size', 'inherit');
                        }
                    }
                ],
                responsive: !0,

            });

    }


};

TableManageButtons = function () {
    "use strict";
    return {
        init: function (size, vista) {
            handleDataTableButtons(size, vista);
        }
    }
}();

