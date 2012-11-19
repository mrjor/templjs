/*! Templatejs - v1.0 - 19/11/2012
* https://github.com/mrjor/templatejs
* Copyright (c) 2012 Joran Veenstra; Licensed MIT test */
window.TEMPL  = window.TEMPL || {};
TEMPL = function(){
	
	var _history = [];
	var _currentpage = "";
	
	// =================================================
	// = main TEMPL tools =
	// =================================================	
	
	function go_back()
	{
		if(_history.length > 1)
		{
			_history.pop()
			var page = _history[_history.length-1].page;
			var data = _history[_history.length-1].data
			page.opt.data = data;
			page.show(false);
		}
		else
		{
			debug.log('laatste item');	
		}
	}
	
	function get_currentpage()
	{
		return _currentpage	
	}
	
	function get_history()
	{
		return _history	
	}
	
	// =================================================
	// = create constructor                     			=
	// =================================================	
	
	function create(params)
	{
		var temp = $('<div>');
		var put_in_history = true;
		var instance = this;
		
		
		instance.queue = [];
		instance.data = {};
		instance.cache = '';
	
		//default
		instance.opt = {
			url : false,
			data : {},
			target : 'body',
			type : 'page'
			
		}
	 
		init();
		
		function init()
		{
			instance.opt = $.extend(instance.opt, params);	
		}
		
		function load_templ()
		{
			if(instance.cache != '')
			{
				show_cb(instance.cache)
			}
			else
			{
				temp.load(instance.opt.url,show_cb)	
			}			
		}
			
		function show_cb(html)
		{	
			var target = $(instance.opt.target);
			
			if(target.length != 0)
			{
				
				save(html)	
				
				var images = $(instance.cache).imagesLoaded();
				images.always(function(){	
					var the_html = instance.cache;
					var the_content = '';
					
					for(tag in instance.data)
					{
						var reg = new RegExp('{'+tag+'}', "g");
						the_html = the_html.replace(reg, instance.data[tag]);
					}
				
					the_content = $(the_html);
					the_content.data(instance.data);
					
					if(instance.opt.type == 'page') _currentpage = the_content.attr('id');	
					if(put_in_history) _history.push({page:instance,data:instance.opt.data});
					
					$(instance.opt.target).trigger('update', {html : the_content});
					queue_next();
				});
			}
			else
			{
				debug.log(instance.opt.target+' bestaat niet');
				queue_clear();	
			}	
		}
		
		function queue_templ()
		{
			instance.queue.push(instance.opt.data);	
				
			if(instance.queue.length == 1)
			{
				queue_run();
			}
			
		}
		
		function queue_next()
		{
			instance.queue.shift();
			queue_run();	
		}
		
		function queue_run()
		{
			if(instance.queue.length != 0)
			{
				instance.data = instance.queue[0];
				load_templ()	
			}
		}
		
		function queue_clear()
		{
			instance.queue = [];	
		}

		function save(html)
		{
			if(instance.cache == '')
			{
				instance.cache = html;
			}
		}
		
		instance.show = function(bool)
		{	
			if(instance.opt.type != 'page' || bool == false)
			{
				put_in_history	= false;
			}
			
			queue_templ();
		}
		
		instance.get_cache = function()
		{
			return instance.cache;	
		}
				
	}
	

	// ================================================
	// = make private function global
	// ================================================
	
	return {
		create : create, //maak een nieuwe page template aan || new TEMPL.create({url:'content/page.html',target:'#app_wrapper',data:{title:'test',content:'thecontent'}}); || om pagina te tonen : variable.show()
		history : get_history, //geeft een array terug van eerder geladen page templates || TEMPL.history()
		back : go_back, //laat de vorige page template zien || TEMPL.terug()
		currentpage : get_currentpage //laat de huidige pagina naam zien || TEMPL.currentpage()
	};

		
}();