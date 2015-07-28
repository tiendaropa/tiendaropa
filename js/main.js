
$( document ).ready(function() {
	var inicio = 0;
	var grupos = 12;
	var selector = Math.ceil((grupos/12));
	var productos = '';
	var productosSort = [];
	var productosSearch = [];
	var cart = [];

	$.ajax({
    type: "post", url: "ropa.json",
    success: function (data, text) {
        productos = data.clothing;
        productosSort = productos
        dibujaLista(productos);
    },
    error: function (request, status, error) {
        $("#primer-producto").html("There is an error loading data");
    }
});

	function dibujaLista(producto){
		//console.log(productos.length);
		$("#primer-producto").html('');
		$("#segundo-producto").html('');
		$("#tercer-producto").html('');
		$(".display-producto").hide();

		var primero="";
		var segundo="";
		var tercero="";
		var grupos1 = 12;
		//console.log(inicio);
		var paginas = Math.ceil(producto.length / grupos1);
		//console.log( (Math.ceil(grupos/9)) ,producto.length , paginas);
		var paginacion = '<a href="#" class="pagina" id="atras-producto">Anterior</a>';

		for (var i = inicio ; i < grupos; i++) {
			if(i >= producto.length){
				break;
			}			
			if(i <= (grupos - 9)){
				primero +='<a  class="prod" href="#" data-producto="' + i +'">'+ '<img  src ="'+ producto[i].imagen + '"/>' + '<h2 >' + producto[i].type +' ' + producto[i].brand  + '</h2> <h3> Precio: c' + producto[i].price + '</h3><i></i></a>' ;
				$("#primer-producto").html(primero);			
			}
			if(i <=  (grupos - 5) && i > (grupos - 9)){
				segundo +='<a  class="prod" href="#" data-producto="' + i +'">'+ '<img  src ="'+ producto[i].imagen + '"/>' + '<h2 >' + producto[i].type +' ' + producto[i].brand  + '</h2> <h3> Precio: c' + producto[i].price + '</h3><i></i></a>' ;
				$("#segundo-producto").html(segundo);		
			}

			if(i <=  (grupos-1) && i >  (grupos - 5)){
				tercero +='<a  class="prod" href="#" data-producto="' + i +'">'+ '<img  src ="'+ producto[i].imagen + '"/>' + '<h2 >' + producto[i].type +' ' + producto[i].brand  + '</h2> <h3> Precio: c' + producto[i].price + '</h3><i></i></a>' ;
				$("#tercer-producto").html(tercero);	
			}
		}	
		for (var i = 1 ; i <= paginas; i++) {
			paginacion+= '<a href="#" class="pagina">'+ i + '</a>'
		}
		paginacion+= '<a href="#" class="pagina" id="adelante-producto">Siguiente</a>';
		$("#paginacion-productos").html(paginacion);
		//console.log(selector);
		var pag = ".paginacion-productos :nth-child("+(selector + 1)+")";
		$(pag).addClass('seleccionado');

	}

	function drawCart () {
		var cartItem = '';
		for (var i = 0 ; i < cart.length; i++) {
			var numero = cart[i];
			cartItem += '<li class="secondary-menu cart-item"><img src ="'+ productos[cart[i]].imagen + '"/><div class="cart-producto-info"><h2>' + productos[cart[i]].type + " "+ productos[cart[i]].brand  + '</h2><h3 > Price: $' + productos[cart[i]].price + '</h2></div></li> ' ;
		}
		$("#cart-list").html(cartItem);

		
	}
	

	function dibujaProducto(numero){
		// console.log(productos);
		var compra = '<a href="#" class="comprar" data-compra="'+ numero +'">Add to cart<a/>';
		var sizes = productos[numero].sizes[0];
		for (var i = 1 ; i < productos[numero].sizes.length; i++) {
			sizes += ', ' + productos[numero].sizes[i];
		}
		if (productos[numero].cart) {
			var compra = '<a href="#" class="comprar green" data-compra="'+ numero +'">Added to cart<a/>';
		}
		var der = '<img src ="'+ productos[numero].imagen + '"/><div class="producto-info"><h2>' + productos[numero].type + " "+ productos[numero].brand  + '</h2><h3 > Price: $' + productos[numero].price + '</h2><h3 > Size: ' + sizes + '</h3><h3>Product description: </h3><p>' + productos[numero].description  +'</p>'+compra+'<div> ' ;
		return der;
	}

	function sort(argument) {
		if (argument == 'brand') {
			productosSort.sort(function(a, b) { 
			      return (a.brand - b.brand) || a.brand.localeCompare(b.brand); 
			});
		}
		if (argument == 'type') {
			productosSort.sort(function(a, b) { 
			      return (a.type - b.type) || a.type.localeCompare(b.type); 
			});
		}
		if (argument == 'price') {
			productosSort.sort(function(a, b) { 
			      return (a.price - b.price) || a.brand.localeCompare(b.brand); 
			});
		}
		if (argument == 'price2') {
			productosSort.sort(function(a, b) { 

			      return (b.price - a.price) || b.brand.localeCompare(a.brand); 
			});
		}
	
	dibujaLista(productosSort);
	}

	function searches(argument) {
		var attr = argument.toLowerCase();
		productosSearch = [];
		
		for(var i = 0; i < productos.length; i++){
			var match = 0;
			var r = i;
			console.log(productos[r].brand.toLowerCase());
			if (productos[r].brand.toLowerCase().match(attr)) {	
					match++;
				console.log(productosSearch);		
			}	
			if (productos[r].type.toLowerCase().match(attr)) {	
				match++;
				console.log(productosSearch);				
			}	
			if (productos[r].color.toLowerCase().match(attr)) {	
				match++;
				console.log(productosSearch);				
			}	
			console.log(productosSearch, attr , (productos[r].brand.toLowerCase()).match(attr));
			if (match > 0) {
				productosSearch.push(productos[r]);
			}		
		}	
		productosSort =productosSearch;
		dibujaLista(productosSearch);
		// setTimeout(function(){
		// 	if (productosSearch.length > 0) {
		// 		dibujaLista(productosSearch);
		// 	}else{
		// 		$("#primer-producto").html("no matches");
		// 	}
		// 	}, 500);
	}

	$("body").on("click",'#home', function(){
		event.preventDefault();
		productosSort = productos;
		dibujaLista(productos);
	});

	$("body").on("click",'.prod', function(){
		var numero = Number($(this).attr('data-producto'));
		event.preventDefault();
		$(".prod").removeClass('seleccionado');
		$(this).addClass('seleccionado');
		$(".prod i").hide();
		$(this).children('i').toggle();
		$(".display-producto").hide();
		$(this).parent().next(".display-producto").toggle().html(dibujaProducto(numero));
	});


	$("body").on("click",'#adelante-producto', function(){
		event.preventDefault();
		if(grupos < productos.length){
			inicio+=12;
			grupos+=12;
			selector = Math.ceil((grupos/12));
			//console.log("adelante");
			$(".display-producto").hide();
			dibujaLista(productos);
		}
		
	});

	$("body").on("click",'#atras-producto', function(){
		event.preventDefault();
			if(inicio > 0){
				inicio-=12;
				grupos-=12;
				selector = Math.ceil((grupos/12));
				//console.log("adelante");
				$(".display-producto").hide();
				dibujaLista(productos);
			}
		
	});

	$("body").on("click",'.comprar', function(){
		event.preventDefault();
		var that = $(this);
		var numero = Number($(this).attr('data-compra'));
		if (!productos[numero].cart) {
			cart.push(numero);
			productos[numero].cart = true;
			drawCart();
			that.addClass('green').html('Added to cart');
			$('#cart-count').html(cart.length);
		}	
	});

	$("body").on("click",'.sort', function(){
		var attr = $(this).attr('data-type');
		event.preventDefault();
		sort(attr);
		$('.sort').removeClass('selected')
		$(this).addClass('selected')
	});

	$("#search").keyup(function() {
		var search = $(this).val();
		searches(search);
	});



});

