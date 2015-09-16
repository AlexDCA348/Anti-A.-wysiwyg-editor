/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'fr';
	config.extraPlugins = 'resize';
	config.resize_dir = 'both';
	config.toolbarLocation = 'bottom';
	config.resize_minWidth = 200;
	config.resize_minHeight = 400;
	config.resize_maxWidth = 400;
	config.resize_maxHeight = 800;

	// Custom Classes
	extraPlugins: 'stylesheetparser';
	config.contentsCss = 'css/text-customs.css';

	config.toolbarGroups = [
			{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
			{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
			{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
			{ name: 'forms', groups: [ 'forms' ] },
			'/',
			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
			{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
			{ name: 'links', groups: [ 'links' ] },
			{ name: 'insert', groups: [ 'insert' ] },
			'/',
			{ name: 'styles', groups: [ 'styles' ] },
			{ name: 'colors', groups: [ 'colors' ] },
			{ name: 'tools', groups: [ 'tools' ] },
			{ name: 'others', groups: [ 'others' ] },
			{ name: 'about', groups: [ 'about' ] }
		];

	config.removeButtons = 'Save,NewPage,Preview,Print,Templates,PasteText,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Table,HorizontalRule,Smiley,PageBreak,Iframe,Format,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About';

	config.stylesSet = 'custom';





};



CKEDITOR.stylesSet.add( 'custom', [
		// { name: 'Main Title',		element: 'h1', styles: { 'font-weight': 'bold', 'font-size':'45px' } },
		// { name: 'Italic Title',		element: 'h2', styles: { 'font-style': 'italic' } },

		{ name: 'titre article', element: 'h1', attributes: { 'class': 'mainTitle'} },
		{ name: 'nom de l\'auteur', element: 'h4', attributes: { 'class': 'auteurName'} },
		{ name: 'résumé', element: 'p', attributes: { 'class': 'summary'} },
		{ name: 'date', element: 'h4', attributes: { 'class': 'date'} },
		{ name: 'tag', element: 'span', attributes: { 'class': 'tags'} },
		{ name: 'titre2', element: 'h2', attributes: { 'class': 'titre2'} },
		{ name: 'titre3', element: 'h3', attributes: { 'class': 'titre3'} },
		{ name: 'texte courant', element: 'p', attributes: { 'class': 'mainText'} },
		{ name: 'note',	element: 'span', attributes: { 'class': 'note', 'data-note': ''} },
		{ name: 'légende média',	element: 'p', attributes: { 'class': 'mediaLegend'} }



		// { name: 'CSS Style', element: 'span', attributes: { 'class': 'customClass' } },
		
		// { name: 'Subtitle',			element: 'h3', styles: { 'color': '#aaa', 'font-style': 'italic' } }


] );


CKEDITOR.on('instanceReady', function(evt) {

	// EDIT NOTE.
    $(evt.editor.container.$).find('iframe').contents().click(function(e) {
    	if(e.target.className == "note"){

    		console.log(e.target.innerHTML);
    		console.log(e.target.getAttribute('data-note'));
    		setNoteContent(e.target)
    	}
    	
    });



    // SHOW NOTE.
    $(evt.editor.container.$).find('iframe').contents().mouseover(function(e) {
    	// if($(this).find('span.reference')){
    		// console.log(e.target.className);
    	if(e.target.className == "note"){
    		var data = e.target.getAttribute('data-note');
    		var mx = e.screenX;
    		var my = e.screenY;
    		showNote(data, mx, my);
    	}else{
			$('.note-viewer').css("display", "none");

    	}
   // else{
			// $('.note-viewer').css("display", "none");

   //  	}
    	
    });

});


function setNoteContent(element){
	console.log(element)
	var content = prompt("ecrire le contenu de la note ici : ", "");

	if(content != "" || content != null){
		element.setAttribute("data-note", content);
	}else{
		setNoteContent(element);
	}
	
}

function showNote(data, mx, my){
	$('.note-viewer').html(data);
	$('.note-viewer').css("display", "block");
	$('.note-viewer').css("z-index", 1000000);
	$('.note-viewer').css("left", mx+"px");
	$('.note-viewer').css("top", (my-150)+"px");

}


// var element = CKEDITOR.document.getClass( 'span' );
// element.on( 'click', function( ev ) {
//     // The DOM event object is passed by the 'data' property.
//     var domEvent = ev.data;
//     // Add a CSS class to the event target.
//     // domEvent.getTarget().addClass( 'clicked' );
//     console.log(domEvent.getTarget());
// } );