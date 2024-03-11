document.addEventListener('DOMContentLoaded', function () {   

    async function fetchData(searchItem = '') {
        try {

            const apiUrl = searchItem
                ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchItem)}`
                : "https://www.thecocktaildb.com/api/json/v1/1/search.php?s";
            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log(data);

            const cocktail_List = document.getElementById('cocktail_List');
            cocktail_List.innerHTML = '';

            const ul_element = document.createElement('ul');
            data.drinks.map((drink, i) => {
                const li_element = document.createElement('li');
                li_element.classList.add('li_class');

                const a_element = document.createElement('a');
                a_element.classList.add('a_class');

                const img_div_element = document.createElement('div');
                img_div_element.classList.add('img_div_class');

                const img_element = document.createElement('img');
                img_element.classList.add('img_class', 'block_' + (i + 1));
                img_element.setAttribute('id', 'para_' + (i + 1));
                img_element.src = drink.strDrinkThumb;
                img_element.alt = drink.strDrink;

                const h3_element = document.createElement('h3');
                h3_element.classList.add('h3_class');
                h3_element.innerText = drink.strAlcoholic;

                const h2_element = document.createElement('h2');
                h2_element.classList.add('h2_class');
                h2_element.innerText = drink.strDrink;

                ul_element.appendChild(li_element);
                li_element.appendChild(a_element);
                a_element.appendChild(img_div_element);
                img_div_element.appendChild(img_element);
                img_div_element.appendChild(h3_element);
                img_div_element.appendChild(h2_element);

                img_element.addEventListener('click', function () {
                    cocktail_List.style.display = 'none';

                    const clicked_Img_src = data.drinks[i].strDrinkThumb;
                    const clicked_h3_value = data.drinks[i].strAlcoholic;
                    const clicked_h2_value = data.drinks[i].strDrink;
                    const instrucion_text = data.drinks[i].strInstructions;

                    const display_img = document.getElementById('display_img');
                    display_img.src = clicked_Img_src;
                    const h1 = document.getElementById('h1');
                    h1.innerText = clicked_h3_value;
                    const h2 = document.getElementById('h2');
                    h2.innerText = clicked_h2_value;

                    const ul_li = document.getElementById('ul_li');
                    const ul = document.createElement('ul');
                    ul_li.appendChild(ul);
                    
                    
                    for (let j = 1; j <= 15; j++) { 
                        const ingredient = data.drinks[i]['strIngredient' + j];
                        
                        if (!ingredient) {
                            break;
                        } else {
                            const li = document.createElement('li');
                            li.classList.add('li_info');
                            li.innerText = '-  ' + ingredient;
                            ul.appendChild(li);
                        }
                    }


                    const instruction_text = document.getElementById('instrucion');
                    instruction_text.innerText = instrucion_text;

                    li_element.addEventListener('click', function () {
                        display_none.style.display = 'block';
                    });

                    const close = document.getElementById('close');
                    close.addEventListener('click', function () {
                        display_none.style.display = 'none';
                        cocktail_List.style.display = 'block';
                    })

                });
            });

            cocktail_List.appendChild(ul_element);
  


        }catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }
    fetchData();

    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault();
        performSearch();
    });

    function performSearch() {
        const searchQuery = document.getElementById("searchInput").value;
        fetchData(searchQuery);
    }

});







 