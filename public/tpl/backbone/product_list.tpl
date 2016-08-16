<script type="text/template" id="tpl_product_list">
	<li>
	    <h4>
	        <a href='#products/<%= model._id %>'>
	            <%= model.name %>
	        </a>
	    </h4>
	    <p>
	    <%= model.description %>
	    </p>
	</li>
</script>
