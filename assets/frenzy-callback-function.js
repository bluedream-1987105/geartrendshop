window.frenzAfterApiCallBack =  function(){
  if(window.innerWidth > 767){
   if(document.querySelectorAll('.frenzy_flex_topbar_filter_col').length > 0){
        var itemHeight = document.querySelector('.frenzy_flex_topbar_filter_col').clientHeight;
      document.querySelector(".frenzy_filter_toggle").addEventListener('click', function(){
         
        var toggledItem = document.querySelector('.frenzy_flex_topbar_filter_col');
        toggledItem.heightValue = itemHeight;
        if ( parseInt( toggledItem.style.marginTop, 10) <= 0) {
          toggledItem.style.marginTop = "-" + toggledItem.heightValue + "px";
          setTimeout(function() {
            toggledItem.style.display = "none";
            toggledItem.style.marginTop = "1px";
          }, 500)
        } else {
          toggledItem.style.display = "block";
          setTimeout(function() {
            toggledItem.style.marginTop = "0";
          }, 10)
        }
      });
    } 
  }
}

window.FrenzyProductGridChangeCallBack = function(html,data){
  var product_handle = data?.org_prod_url;
  var product_id_variants = data.product_id_variant.split('_');
  var product_id = data.product_id;
  var product_id_variant = product_id_variants[1];
  var product_sku = data?.sku;
  var wishlist = '<span class="smartwishlist" data-product="'+product_id+'" data-variant="'+product_id_variant+'"></span>';
  var review = '';
  if(data?.smf_rating && data?.smf_rating_count){
    var ratting = JSON.parse(data?.smf_rating[0]);
    ratting = ratting.value;
    var smf_rating_count = data?.smf_rating_count[0];
    if(data?.smf_rating_count[0] > 0){
       review += '<div class="product-rating">';
        review += '<div class="product-rating__stars">';
          var max_star_rating = 5;
          var solid_star_rating = Math.floor(ratting);
          var remaining_stars = (max_star_rating - ratting);
          for(var i=1;i<=solid_star_rating;i++){
              review += '<span class="icon icon-new icon-star-filled">';
                review += '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
                  review += '<path d="m13 3.532 2.35 7.233h7.606l-6.153 4.47 2.35 7.233L13 17.998l-6.153 4.47 2.35-7.233-6.153-4.47h7.605L13 3.532z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="square"/>';
                review += '</svg>';  
            review += '</span>';
          }
          if(remaining_stars > 0){
              var remaining_stars_includes_half_star = (remaining_stars / 1);
              if(remaining_stars_includes_half_star != 0){
                  review += '<span class="icon icon-new icon-star-half">';
                    review += '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
                      review += '<path d="M13 3.532v14.466l-6.153 4.47 2.35-7.233-6.153-4.47h7.605L13 3.532z" fill="currentColor"/><path d="m13 3.532 2.35 7.233h7.606l-6.153 4.47 2.35 7.233L13 17.998l-6.153 4.47 2.35-7.233-6.153-4.47h7.605L13 3.532z" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="square"/>';
                    review += '</svg>';  
                review += '</span>';
              }
          }
        review += '</div>';
        review += '<div class="product-rating__count t-opacity-60 fs-body-50">';
          ratting = ratting * 1;
          review += '<span>'+ratting.toFixed(1)+'</span> <span>('+smf_rating_count+')</span>';
        review += '</div>';
       review += '</div>';
      setTimeout(function(){
        var product_grid =  document.querySelectorAll('.frenzy_product_item');
        product_grid.forEach(function(this_click){
          if(this_click.getAttribute('data-id') == data.sku){
            this_click.querySelector('.product_review').innerHTML = review;
          }
        });
      },800);
      
    }
  }
  html.querySelector('figure').insertAdjacentHTML('beforeend',wishlist);
  frenzy_swatch(product_handle,product_sku);
}
const frenzy_swatch = async (product_handle,product_sku) => {
  const pre_frenzyQuickViewHandle =  product_handle.split('?');
  let QucikviewString = '?view=frenzy_metafields';
  if(pre_frenzyQuickViewHandle[1] != undefined){
      QucikviewString = "&view=frenzy_metafields";
  }
  const frenzyQVHUrl = window.location.origin + "/products/" + pre_frenzyQuickViewHandle + QucikviewString;
  var response = await fetch(
    frenzyQVHUrl,
    {
        method: "GET"
    }
  );
    const data = await response.text();
  document.querySelectorAll('.frenzy_swatch[data-id="'+product_sku+'"').forEach(function(this_loop){
    if(this_loop.getAttribute('data-status') == 0){
      this_loop.innerHTML = data;
      this_loop.setAttribute('data-status',1);
    }
  })
}
window.frenzyCartCallBack = function(){
  // document.querySelector('a.header__icon-touch.cart').click();
  // emit("quick-cart:open");
}