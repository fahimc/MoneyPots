export default {
name: 'navbar',
mounted(){
  $( document ).ready(function(){
    $(".button-collapse").sideNav();
    window.scrollTo(0,1);
  })
  console.log($(".button-collapse"));
  //
}
};

