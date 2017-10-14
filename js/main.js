$(function() {  
    var outStanding = 0;
    var badGrade = 0;
    var goodGrade = 0;
   // $('#chartContainer').hide();
    $('#addButton').click(function(event) {
        event.preventDefault();
        const row = createRow({
        name: $('#name').val(),
        grade: $('#grade').val()
        });

        $('table tbody').append(row);
        $('#total').text(total()); 
        summary($('#grade').val());
        clean();     
        return false;
    });

    $('#endButton').click(function(event) {
        event.preventDefault();    
        goodGrade = (total()-outStanding-badGrade)/total()*100;
        outStanding = outStanding/total()*100;
        badGrade = badGrade/total()*100;
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Cantidad por valor de notas"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    {y: goodGrade, label: "Aprobados"},
                    {y: badGrade, label: "Reprobados"},
                    {y: outStanding, label: "Sobresalientes"}
                ]
            }]
        });
        chart.render();
    
        return false;
    });

    function createRow(data) {
           
            return ('<tr class="'+((data.grade<4)?'danger':'')+'"><td>'+data.name+'</td><td>'+data.grade+'</td></tr>');       
            
    };

    function clean() {
        $('#name').val('');
        $('#grade').val('');
        $('#name').focus();
    };
    
    function total(){ 
        return $("#studentList > tbody").children().length
    };

    function summary(value){
        if (value == 7){
            outStanding++;
        }
        else if (value < 4){
            badGrade++;
        };  
    };
   


});
