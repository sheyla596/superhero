

// Captura de informacion
$(document).ready(() => {
    $('button').click(() => {   
        if (validarNumber()) {      
           consultarHeroe()      
        }
    })
})

// Validar numero de superhero ingresado
const validarNumber = () => {
    const id = $('input').val()
    const validador = /^\d+$/g  
    if (validador.test(id)) {
        return true
    } else {
        alert('El numero ingresado no es valido, por favor ingrese un número de SuperHero valido dentro del rango del 1 al 732')
    }
}


// Consulta el SuperHero en la superheroapi y muestra los resultados
const consultarHeroe = () => {
    const dominio = 'https://superheroapi.com/api.php'  
    const token = '10227562276425336'                   
    const recurso = $('input').val()                    

    $.ajax({
        type: 'GET',
        url: dominio + '/' + token + '/' + recurso,
        dataType: 'json',
        success: datos => {
            if (datos.response != 'error') {            
                
                $('#info').show();                      
                $('#lafotito').attr('src', datos.image.url)
                $('.card-title').text('Nombre: ' + datos.name)
                $('.card-text:eq(0)').text('Conexiones: ' + datos.connections['group-affiliation'] + ' ; ' + datos.connections.relatives)
                $('.card-text:eq(1)').text('Publicado por: ' + datos.biography.publisher)
                $('.card-text:eq(2)').text('Ocupación: ' + datos.work.occupation)
                $('.card-text:eq(3)').text('Primera aparición: ' + datos.biography['first-appearance'])
                $('.card-text:eq(4)').text('Altura: ' + datos.appearance.height[1]) 
                $('.card-text:eq(5)').text('Peso: ' + datos.appearance.weight[1])   
                $('.card-text:eq(6)').text('Alias: ' + datos.biography.aliases)    

               
                $('#stats').show()                      
                var chart = new CanvasJS.Chart('stats',
                    {
                        theme: 'light1',
                        title: {
                            text: 'Estadísticas de Poder para ' + datos.name
                        },
                        data: [
                            {
                                type: 'pie',
                                showInLegend: true,
                                toolTipContent: '{y}',
                                legendText: '{indexLabel}',
                                dataPoints:             
                                [
                                    { y: datos.powerstats.intelligence, indexLabel: 'Inteligencia' },
                                    { y: datos.powerstats.strength, indexLabel: 'Fuerza' },
                                    { y: datos.powerstats.speed, indexLabel: 'Velocidad' },
                                    { y: datos.powerstats.durability, indexLabel: 'Durabilidad' },
                                    { y: datos.powerstats.power, indexLabel: 'Poder' },
                                    { y: datos.powerstats.combat, indexLabel: 'Combate' }
                                ]
                            }
                        ]
                    });
                chart.render();
            } else {
                alert('No se pudo obtener la información de este SuperHero o no existe')    
            }
        },
        error: e => {
            alert('No se pudo obtener la información de este SuperHero o no existe')        
        }
    })
}