/*
	Objet : 
		box {
			id
			index
			type (txt, img, video, son)
			content (txt(xml), img(url), video(url), son(url))
			posX
			posY
			width
			height
		}

	methodes : 
		editer{
			content (txt)
			posX
			posY
			width
			height
		}

		supprimer{
			all
		}

		indexer{
			index
		}


		------

		new box();
		--> id
		--> name
		--> index
		--> posX/posY
		--> width/height

			if box = txt --> build txt --> ckeditor (clonetxtbox, pour cke)
			if box = img --> build img --> link / resize 
			if box = video --> build video --> link / resize 
			if box = son --> build son --> link / resize 
		
		/// drag&drop / delete / setIndex
		
	
	Pour les images on charge l'URL de qui correspond à la taille optimale.

	ex :
	(valeurs aproximatives)
	img --> 100x100 img-thumb.jpg
			350x350 img-small.jpg
			800x600 img-mediul.jpg
			1200x1200 img-large.jpg

	pour une boite de :
		240px de large --> 350x350 img-small.jpg
		80px de large  --> 350x350 img-thumb.jpg
		803px de large  --> 350x350 img-large.jpg
		617px de large  --> 350x350 img-medium.jpg


		WP : miniature, moyen, large (pixel custom)

	il faut que le format choisi soit égale ou plus grand que la dimension de la boite.


*/



var mouseX;
var mouseY;
var nbBox;
var lastBoxWidth;
var lastBoxHeight;
var TxtBoxBTN;
var baseMap;
var boxToolTogle;
var parentTarget;
var closeModal;
var saveBTN;

var screenWidth;
var screenHeight;
var printView;

var name;

var boxList = [];

var boxesIndex = 0;
var idList = 0;

function init(){
	TxtBoxBTN = document.getElementById('TxtBox');
	ImgBoxBTN = document.getElementById('ImgBox');
	editPrintBTN = document.getElementById('editPrint');
	printView = document.getElementById('printView');
	saveBTN = document.getElementById('saveBTN');

	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	editPrintBTN.addEventListener("click", editIndexPrint, false);
	saveBTN.addEventListener("click", saveAll, false);
}




function box(id, name, index, type, posX, posY, width, height, content){
	this.id = id; 
	this.name = name;
	this.index = index; 
	this.type = type;
	this.posX = posX; 
	this.posY = posY; 
	this.width = width;
	this.height = height;
	this.content = content;

	var box = document.createElement("div");
	document.body.appendChild(box);
}

function createTxtBox(){
	
	var name = prompt("please enter the box's name", "");
	
	if(name != "" || name == null){
		// var box = document.createElement("div");
		// box.style.left = (screenWidth-300)/2+"px";
		// box.style.top = (screenHeight)/2+"px";
		// //ID
		// boxesIndex ++;
		// idList ++;
		// box.id = "texteBox-"+idList;

		// boxList.push(box.id);

		// box.className = "texte box";

		// box.index = boxesIndex;
		// box.name = name;

		// box.innerHTML = "<div class=\"moveTool\">move</div> <div class=\"index\">"+boxesIndex+"</div> <div class=\"textTool\"> <textarea class=\"editor\" name=\"\" id=\"txt_"+box.name+"\"> ... </textarea></div> <button class=\"deleteBTN\">delete</button>"
		// box.style.position="absolute";
		// // document.body.appendChild(box);

		// console.log("txt created")
		// $(".texte .moveTool").bind("mousedown", StartDragBox);
		// $(".texte .deleteBTN").bind("click", deleteBox);
		
		// $(".texte .index").bind("click", editIndexPrint);

		// // $( 'textarea.editor' ).ckeditor();
		// CKEDITOR.replace('txt_'+box.name);


		

		


	}else{
		alert('Vous devez donner un nom à votre nouvelle élément');
		createTxtBox();
	}
	

}


function cloneTxtBox(ID, name, index, left, top, w, h, content){
	
	var box = document.createElement("div");
	box.id = ID;
	box.name = name;
	box.index = index;

	box.className = "texte box";

	box.style.position="absolute";
	box.style.left = left;
	box.style.top = top;
	// box.style.width = width+"px";
	// box.style.height = height+"px";
	
	//ID
	// boxesIndex ++;
	// idList ++;

	// boxList.push(box.id);


	box.innerHTML = "<div class=\"moveTool\">move</div> <div class=\"index\">"+boxesIndex+"</div> <div class=\"textTool\"> <textarea class=\"editor\" name=\"\" id=\"txt_"+box.name+"\"> "+content+" </textarea></div> <button class=\"deleteBTN\">delete</button>"
	
	document.body.appendChild(box);


	$(".texte .moveTool").bind("mousedown", StartDragBox);
	$(".texte .deleteBTN").bind("click", deleteBox);
	
	$(".texte .index").bind("click", editIndexPrint);

	// $( 'textarea.editor' ).ckeditor();
	CKEDITOR.replace('txt_'+box.name, {width:w, height:h});

	
	// RESET Width & Height Ckeditor
	console.log($("#"+box.id).find('.cke_editor_txt_'+box.name));
	console.log("txt "+name+" cloned");


}

function createImgBox(){
	var name = prompt("please enter the box's name", "");

	if(name != "" || name == null){
		var box = document.createElement("div");
		// box.src = "asets/windows95.jpg";
		box.style.left = (screenWidth-300)/2+"px";
		box.style.top = (screenHeight)/2+"px";
		// ID
		boxesIndex ++;
		idList ++;

		box.id = "ImgBox-"+idList;

		boxList.push(box.id);

		box.className = "image box";

		box.name = name;
		box.index = boxesIndex;


		box.innerHTML = "<div class=\"moveTool\">move</div> <div class=\"index\">"+boxesIndex+"</div> <img src=\"asets/windows95-small.jpg\" alt=\"\"> <div class=\"resizeTool\">◢</div> <button class=\"deleteBTN\">delete</button>"
		box.style.position="absolute";
		document.body.appendChild(box);

		$(".image .moveTool").bind("mousedown", StartDragBox);
		$(".image .resizeTool").bind("mousedown", StartResize);

		$(".image .deleteBTN").bind("click", deleteBox);

		$(".image .index").bind("click", editIndexPrint);
	}else{
		alert('Vous devez donner un nom à votre nouvelle élément');
		createImgBox();
	}



	console.log("img created")
	// $(".texte .moveTool").bind("mousedown", StartDragBox);
}


/////
// EDIT & DELETE BOX
/////

function deleteBox(e){
    parentTarget = $(e.target).parent("div")[0];
	var confirmation = confirm("Êstes-vous sûr de supprimer l'élément \" "+parentTarget.name+" \"");
	
	if( confirmation == true ){
		document.body.removeChild(document.getElementById(parentTarget.id));
		console.log(parentTarget.id +"is removed");

		var indexToRemove = boxList.indexOf(parentTarget.id);
		boxList.splice(indexToRemove, 1);

		console.log(boxList);
		updateAll();
		console.log("update");
   	}
	else{
		//nothing
	}

}

function editIndexPrint(){
	editPrintBTN.removeEventListener("click", editIndexPrint, false);
	console.log(boxList);

	var oldName = '';
	$('.editPrint-modal').html(oldName);
	editPrintBTN.innerHTML = "close print editor";

	$('.editPrint-modal').css("display", "block");

	for (var i = 0; i < boxList.length; i++) {
		console.log(String(boxList[i]));

		var cible = document.getElementById(boxList[i]);
		oldName = oldName + "Position ["+(i+1)+"] ― <a onclick=\"newPosition("+i+");\" onmouseenter=\"hoverElement(\'"+String(boxList[i])+"\');\" onmouseleave=\"outElement(\'"+String(boxList[i])+"\');\" >"+ cible.name + "</a><br>";
		
	};

	$('.editPrint-modal').html(oldName);
	editPrintBTN.addEventListener("click", closeEditPrintModal, false);


}

function hoverElement(el){
	console.log("hover");
	console.log(el);
	var cible = "#"+String(el);
	$(cible).addClass('hightlight');
}

function outElement(el){
	console.log("out");
	var cible = "#"+String(el);
	$(cible).removeClass('hightlight');
}

function newPosition(oldPos){
	var newPos = prompt("indiquer la nouvelle position entre 1 et "+boxList.length, "")

	// move(from, to)
	boxList.move(oldPos, newPos-1);
	console.log("index edited");

	editIndexPrint();
	updateAll();

}

function updateAll(){

	for (var i = 0; i < boxList.length; i++) {

		var cible = '#'+String(boxList[i]);
		var cibleAfter = '#'+String(boxList[i+1]);
		var cibleIndex =  cible +" .index";
		
		
		if(i<boxList.length-1){

			var cibleName = document.getElementById(boxList[i]).name;
			var cibleProperties = document.getElementById(boxList[i]);

			var cibleEditor = $(cible).find("#txt_"+cibleName);

			console.log(cibleEditor);
			var CKEinstance1 = CKEDITOR.instances["txt_"+cibleName];
	    	
	    	var data = CKEinstance1.getData();

			$(cibleIndex).html(i+1);
			$(cible).insertBefore(cibleAfter);

			var w = $(cible).find('iframe').width();
			var h = $(cible).find('iframe').height();

	    	$(cible).remove();
	    	CKEDITOR.remove(CKEinstance1);


	    	// cloneTxtBox(ID, name, index, left, top, width, height, content); 
	    	console.log(w)
	    	cloneTxtBox(
	    		boxList[i], 
	    		cibleName, 
	    		i, 
	    		cibleProperties.style.left, 
	    		cibleProperties.style.top, 
	    		w, 
	    		h,
	    		data
	    	);
		}



	}
	

	boxesIndex = boxList.length;


}


function saveAll(){
	console.log("save");


	var stringToSave="";

	for (var i = 0; i < boxList.length; i++) {

		var cible = document.getElementById(boxList[i]);
		

		console.log("ID: "+cible.id);
		console.log("{");
		console.log("name: "+cible.name+",");
		console.log("index: "+cible.index+",");
		console.log("left: "+cible.style.left+",");
		console.log("top: "+cible.style.top+",");
		console.log("width: "+$('#'+String(boxList[i])).find('iframe').width()+",");
		console.log("height: "+$('#'+String(boxList[i])).find('iframe').height()+",");
		console.log("content: "+$('#'+String(boxList[i])).find('textarea.editor').val());
		console.log("},");

		// console.log($(cible));

	}

	// AJAX POST stringToSave

}




function closeEditPrintModal(){
	editPrintBTN.removeEventListener("click", closeEditPrintModal, false);

	$('.editPrint-modal').css("display", "none");
	editPrintBTN.innerHTML = "print editor";

	editPrintBTN.addEventListener("click", editIndexPrint, false);


}



/////
// DRAG & DROP BOXS
/////

function StartDragBox(e){
	parentTarget = $(e.target).parent("div")[0];
	// GET THE CURRENT WIDTH OF TEXTAREA
	// console.log(parentTarget.getElementsByTagName('textarea')[0].offsetWidth);
	// GET THE CURRENT HEIGHT OF TEXTAREA
	// console.log(parentTarget.getElementsByTagName('textarea')[0].offsetHeight);
	mouseX = e.pageX;
	mouseY = e.pageY;
	parentTarget.style.left= mouseX+"px";
	parentTarget.style.top= mouseY+"px";
	parentTarget.style.opacity = 0.6;

	$("body").bind("mousemove", draggingBox);
	$("body").bind("mouseup", StopDragBox);

}

function draggingBox(e){
	console.log("move");

	mouseX = e.pageX;
	mouseY = e.pageY;
	parentTarget.style.left= mouseX+"px";
	parentTarget.style.top= mouseY+"px";
}

function StopDragBox(e){
	console.log("stop");

	parentTarget.style.opacity = 1;
	$("body").unbind("mousemove", draggingBox);
	$("body").unbind("mouseup", StopDragBox);
}



/////
// IMG RESIZE
/////


function StartResize(e){
	parentTarget = $(e.target).parent("div")[0];
	mouseX = e.pageX;
	mouseY = e.pageY;
	parentTarget.style.width=  (mouseX - parentTarget.offsetLeft)+"px";
	parentTarget.style.opacity = 0.6;

	$("body").bind("mousemove", ResizingBox);
	$("body").bind("mouseup", StopResize);
}

function ResizingBox(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
	parentTarget.style.width=  (mouseX - parentTarget.offsetLeft)+"px";
	var currentW = parseInt(parentTarget.style.width);
	console.log(currentW);

	//Loading appropriate source
	if(currentW>0 && currentW<=100){
		console.log("thumb");
		// changer la source.
		var str = parentTarget.getElementsByTagName('img')[0].src
		var res = str.replace("-small", "-thumb");
		parentTarget.getElementsByTagName('img')[0].src = res;
	}
	if(currentW>100 && currentW<=350){
		console.log("small");
		var str = parentTarget.getElementsByTagName('img')[0].src
		
		// changer la source.		
		if(str.search("thumb")>=0){
			var res = str.replace("-thumb", "-small");
		}
		else{
			var res = str.replace("-medium", "-small");
		}
		parentTarget.getElementsByTagName('img')[0].src = res;

	}
	if(currentW>350 && currentW<800){
		console.log("medium");
		// changer la source.
		var str = parentTarget.getElementsByTagName('img')[0].src
		
		// changer la source.		
		if(str.search("small")>=0){
			var res = str.replace("-small", "-medium");
		}
		else{
			var res = str.replace("-large", "-medium");
		}
		parentTarget.getElementsByTagName('img')[0].src = res;
	}
	if(currentW>=800 && currentW<=1200){
		console.log("large");
		// changer la source.
		var str = parentTarget.getElementsByTagName('img')[0].src
		var res = str.replace("-medium", "-large");
		parentTarget.getElementsByTagName('img')[0].src = res;
	}

}

function StopResize(e){
	console.log("stop");

	parentTarget.style.opacity = 1;
	$("body").unbind("mousemove", ResizingBox);
	$("body").unbind("mouseup", StopResize);
}




/////
// LOADING
/////



$( document ).ready(function() {
    console.log( "ready!" );
    init();
	TxtBoxBTN.addEventListener("click", createTxtBox, false);
	ImgBoxBTN.addEventListener("click", createImgBox, false);

});



/////
// Addons
////

Array.prototype.move = function(from,to){
  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};
