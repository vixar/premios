    /**
* Theme: Zircos Admin Template
* Author: Coderthemes
* Component: Full-Calendar
* 
*/


!function ($) {
    "use strict";

    var CalendarApp = function () {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
            this.$event = ('#external-events div.external-event'),
            this.$calendar = $('#calendar'),
            this.$saveCategoryBtn = $('.save-category'),
            this.$categoryForm = $('#add-category form'),
            this.$extEvents = $('#external-events'),
            this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) {

            console.log("evento: ", eventObj);
        var $this = this;
        // retrieve the dropped element's stored Event Object
        var originalEventObject = eventObj.data('eventObject');
        var $categoryClass = eventObj.attr('data-class');
        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);
        // assign it the date that was reported
        copiedEventObject.start = date;
        if ($categoryClass)
            copiedEventObject['className'] = [$categoryClass];

        

        $.ajax({
            url: '/sgp_admin/Agenda/SaveEventOnDrop/',
            type: 'POST',
            data: {
                'title': copiedEventObject.title,
                'className': $categoryClass,
                'dateUnix': date._i
            },
            success: function(data) {
                console.log('color:', $categoryClass);
                console.log('Data:', data);
            }
        });
        // render the event on the calendar
        //$this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            eventObj.remove();
        }
    },
        /* on click on event */
        CalendarApp.prototype.onEventClick = function (calEvent, jsEvent, view, res) {
            var $this = this;
            var form = $("<form></form>");
            form.append("<label>Cambiar el nombre al evento</label>");
            form.append("<div class='input-group'><input class='form-control' name='title' type=text value='" + calEvent.title + "' /></div>");
            form.append("<label>Cambiar la descripci&oacute;n del evento</label>");
            form.append("<div class='input-group'><input class='form-control' name='description' type=text value='" + calEvent.description + "' /><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Guardar</button></div>");
            $this.$modal.modal({
                backdrop: 'static'
            });
            //BORRAR EL EVENTO
            $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                console.log('evento: ', calEvent.AgendaId);

                Swal.fire({
                    title: 'Est&aacute; seguro?',
                    text: "Va a desactivar un evento!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desactivalo!'
                }).then((result) => {
                    if (result.value) {

                        $.ajax({
                            type: 'POST',
                            url: '/Agenda/DeleteEvent/?AgendaId=' + calEvent.AgendaId,
                            success: function () {
                                Swal.fire(
                                    'Actualizado!',
                                    'Agenda Actualiada!',
                                    'success'
                                );
                                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                                    return (ev._id == calEvent._id);
                                });
                                $this.$modal.modal('hide');
                            }
                        });


                    } else {
                        revertFunc();
                    }
                });




            });

            //actualizar el evento
            $this.$modal.find('form').on('submit', function () {

                console.log(calEvent);
                var title = form.find("input[name='title']").val();
                var description = form.find("input[name='description']").val();
                var id = calEvent.AgendaId;

                console.log(id);


                Swal.fire({
                    title: 'Est&aacute; seguro?',
                    text: "Va a desactivar un evento!",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desactivalo!'
                }).then((result) => {
                    if (result.value) {

                        $.ajax({
                            type: 'POST',
                            url: '/sgp_admin/Agenda/EditEvent/',
                            data: {
                                'AgendaId': id,
                                'title': title,
                                'description': description,
                                'PremioID': res
                            },
                            success: function () {
                                Swal.fire(
                                    'Actualizado!',
                                    'Evento Actualiado!',
                                    'success'
                                );
                                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                                    return (ev._id == calEvent._id);
                                });
                                calEvent.title = form.find("input[name='title']").val();
                                calEvent.description = form.find("input[name='description']").val();
                                $this.$calendar.fullCalendar('renderEvent', calEvent, true);
                                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                                $this.$modal.modal('hide');
                            }
                        });


                    } else {
                        revertFunc();
                    }
                });

                return false;
            });
        },
        /* on select */
        CalendarApp.prototype.onSelect = function (start, end, allDay, res) {
            var $this = this;
            $this.$modal.modal({
                backdrop: 'static'
            });
            /* CONSTRUCCION DEL FORMULARIO */
            var form = $("<form></form>");
            form.append("<div class='row'></div>");
            form.find(".row")
                .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Nombre del Evento</label><input class='form-control' type='text' name='title'/></div></div>")
                .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Descripci&oacuten</label><input class='form-control' type='text' name='description'/></div></div>")
                //fecha y hora de inicio del evento
                .append("<div class='col-md-6'><div class='form-group'><label>Hora</label><div class='input-group clockpicker m-b-20' data-placement='top' data-align='top' data-autoclose='true'><input type='text' class='form-control' value='02:00 PM' name='startTime'><span class='input-group-addon'> <span class='mdi mdi-clock'></span> </span></div></div></div>")
                //.append("<div class='form-group'><label>Specify a step for the minute field</label><div class='input-group'><input id='timepicker3' type='text' class='form-control'><span class='input-group-addon'><i class='mdi mdi-clock'></i></span></div></div>")
                //fecha y hora de fin del evento
                .append("<div class='col-md-6'><div class='form-group'><label>Hora</label><div class='input-group clockpicker m-b-20' data-placement='top' data-align='top' data-autoclose='true'><input type='text' class='form-control' value='10:00 AM' name='endTime'><span class='input-group-addon'> <span class='mdi mdi-clock'></span> </span></div></div></div>")

                .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Categor&iacutea</label><select class='form-control' name='category'></select></div></div>")
                .find("select[name='category']")
                .append("<option value='bg-danger'>Rojo</option>")
                .append("<option value='bg-success'>Verde</option>")
                .append("<option value='bg-purple'>Morado</option>")
                .append("<option value='bg-primary'>Azul</option>")
                .append("<option value='bg-orange'>Naranja</option>")
                .append("<option value='bg-brown'>Marr&oacuten</option>")
                .append("<option value='bg-warning'>Amarillo</option></div></div>");
            $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                form.submit();
            });
            $this.$modal.find('form').on('submit', function () {
                var title = form.find("input[name='title']").val();
                var description = form.find("input[name='description']").val();
                var beginning = form.find("input[name='beginning']").val();
                var ending = form.find("input[name='ending']").val();
                var startTime = form.find("input[name='startTime']").val();
                var endTime = form.find("input[name='endTime']").val();
                

                var startEvent = moment(start).format();//=> FECHA DE INICIO

                var endEvent = moment(end).format();
                


                var categoryClass = form.find("select[name='category'] option:checked").val();
                debugger;
                if (title !== null && title.length != 0) {
                    $.ajax({
                        url: '/sgp_admin/Agenda/SaveEvent/',
                        type: 'POST',
                        
                        data: {
                            'title': title,
                            'start': startEvent,
                            'end': endEvent,
                            'description': description,
                            'className': categoryClass,
                            'timeStart': startTime.toString("hh:mm tt"),
                            'timeEnd': endTime.toString("hh:mm tt"),
                            'PremioID': res
                        }
                         
                    });
                    $this.$calendarObj.fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: end,
                        allDay: false,
                        className: categoryClass
                    }, true);
                    $this.$modal.modal('hide');
                }
                else {
                    alert('You have to give a title to your event');
                }
                return false;

            });
            $this.$calendarObj.fullCalendar('unselect');
        },


        CalendarApp.prototype.enableDrag = function () {
            //init events
            $(this.$event).each(function () {
                $(this).data('event', {
                    title: $.trim($(this).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                $(this).draggable({

                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });
        }
    /* Initializing */
    CalendarApp.prototype.init = function () {

        var param = window.location.search;
        var res = parseInt(param.slice(10, 12)); //Obteniendo el id del premio
        
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());

        var defaultEvents = [
            {
                title: 'Hey!',
                start: new Date($.now() + 158000000),
                className: 'bg-purple'
            },
            {
                title: 'See John Deo',
                start: today,
                end: today,
                className: 'bg-success'
            },
            {
                title: 'Meet John Deo',
                start: new Date($.now() + 168000000),
                className: 'bg-info'
            },
            {
                title: 'Buy a Theme',
                start: new Date($.now() + 338000000),
                className: 'bg-primary'
            }
        ];

        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00',
            defaultView: 'month',
            locale: 'es-do',
            handleWindowResize: true,
            height: $(window).height() - 200,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            events: "/sgp_admin/Agenda/GetEvents?premioID=" + res,
            eventRender: function (event, element) {
                if (event.description != null) {
                    element.find('.fc-content').append("<br/><span class='fc-description'>" + event.description + "</span>");
                }

            },
            
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: false, // allow "more" link when too many events
            selectable: true,
            eventDrop: function (event, delta, revertFunc) {

                Swal.fire({
                    title: 'Est&aacute; seguro?',
                    text: "Est&aacute; cambiado la fecha de un evento!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Actualizalo!'
                }).then((result) => {
                    if (result.value) {

                        $.ajax({
                            url: '/sgp_admin/Agenda/SaveEventOnDrag/',
                            type: 'POST',
                            data: {
                                'AgendaId': event.AgendaId,
                                'title': event.title,
                                'start': event.start.format(),
                                'end': event.end.format(),
                                'description': event.description,
                                'PremioID': res
                                //'className': event.className
                            },
                            success: function () {
                                Swal.fire(
                                    'Actualizado!',
                                    'Evento actualizado correctamente!',
                                    'success'
                                );
                            }
                        });


                    } else {
                        revertFunc();
                    }
                });

            },

            drop: function (date) { $this.onDrop($(this), date); },

            select: function (start, end, allDay) { $this.onSelect(start, end, allDay, res); },

            eventClick: function (calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view, res); }

        });
        
        //on new event
        this.$saveCategoryBtn.on('click',
            function () {
                var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
                var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();

                var cat = { "Categoria": categoryName, "Color": categoryColor }

                console.log(cat);
                console.log('nombre:', categoryName);

                $.ajax({
                    url: '/sgp_admin/Agenda/CrearEventoCategoria/',
                    type: 'POST',
                    //data: { 'Color': 'Azul', 'Categoria': 'Algo' },
                    data: {
                        categoria: cat
                    },
                    success: function () {
                        if (categoryName !== null && categoryName.length != 0) {

                            $this.$extEvents.append('<div class="external-event bg-' +
                                categoryColor +
                                '" data-class="bg-' +
                                categoryColor +
                                '" style="position: relative;"><i class="mdi mdi-checkbox-blank-circle m-r-10 vertical-middle"></i>' +
                                categoryName +
                                '</div>');
                            $this.enableDrag();

                            Swal.fire(
                                'Listo!',
                                'Categoría Creada!',
                                'success'
                            );
                        }

                    }

                });



            });
    },

        //init CalendarApp
        $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp;

}(window.jQuery),

    //initializing CalendarApp
    function ($) {
        "use strict";
        $.CalendarApp.init();
    }(window.jQuery);
