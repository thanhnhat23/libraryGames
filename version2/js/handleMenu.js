document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const search = document.querySelector('.search');
    const listMenu = document.querySelector('.list-menu');
    const listSearch = document.querySelector('.list-search');
  
    if (menu && search && listMenu && listSearch) {
      menu.addEventListener('click', function () {
        menu.classList.toggle('active');
        search.classList.remove('active');
        listMenu.classList.toggle('active');
        listSearch.classList.remove('active');
      });
  
      search.addEventListener('click', function () {
        search.classList.toggle('active');
        menu.classList.remove('active');
        listSearch.classList.toggle('active');
        listMenu.classList.remove('active');
      });
    }
});
  