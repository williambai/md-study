 // _.templateSettings = {
 //        evaluate: /\{\{(.+?)\}\}/g,
 //        interpolate: /\{\{=(.+?)\}\}/g
 //    };

var Product = Backbone.Model.extend({
	idAttribute: '_id',
	urlRoot: '/api/products',
});

var page = 0;
var total = 0;
var Products = Backbone.Collection.extend({
	url: '/api/products',
	model: Product,
	parse: function(response){
		page = response.page;
		total = response.total;
		return response.collection;
	},
});

var ProductListView = Backbone.View.extend({
	 className: 'item',
	 template: _.template($('#tpl_product_list').html()),
	 
	 initialize: function(options){
	 },
	 render: function(){
		this.$el.html(this.template({model: this.model.toJSON()}));
		return this;
	},
});

var ProductsView = Backbone.View.extend({
	el: '#content',
	template: _.template($('#tpl_products').html()),

	initialize: function(options){
		this.collection = new Products;
		this.collection.on('reset', this.render, this);
		this.collection.fetch({reset: true});
	},
	render: function(){
		var that = this;
		this.$el.html(this.template({model: {page: page, total: total}}));
		this.collection.each(function(model){
			var itemView = new ProductListView({model: model});
			that.$('ul').append(itemView.render().el);
		});
		return this;
	},
});

var ProductView = Backbone.View.extend({
	el: '#content',
	template: _.template($('#tpl_product').html()),
	initialize: function(options){
		this.model = new Product({_id: options.id});
		this.model.on('change', this.render, this);
		this.model.fetch();
	},
	render: function(){
		this.$el.html(this.template({model: this.model.toJSON()}));
		return this;
	}
});

var Router = Backbone.Router.extend({

	routes: {
		'': 'products',
		'products': 'products',
		'products/:id': 'product',
	},

	products: function(){
		var productsView = new ProductsView();
	},

	product: function(id){
		var productView = new ProductView({id: id});
	},

});

new Router();
Backbone.history.start();
