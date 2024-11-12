import {
  useFetchBreakFastQuery,
  useFetchCocktailsQuery,
  useFetchDessertsQuery,
  useFetchDrinksQuery,
  useFetchPizzaQuery,
  useFetchSnacksQuery
} from "../store/api/api.pizza";

const useSectionsData = () => [
  { title: 'Пиццы', data: useFetchPizzaQuery(undefined), className: 'main__pizza' },
  { title: 'Завтраки', data: useFetchBreakFastQuery(undefined), className: 'main__breakfast' },
  { title: 'Закуски', data: useFetchSnacksQuery(undefined), className: 'main__snacks' },
  { title: 'Коктейли', data: useFetchCocktailsQuery(undefined), className: 'main__cocktails' },
  { title: 'Напитки', data: useFetchDrinksQuery(undefined), className: 'main__drinks' },
  { title: 'Десерты', data: useFetchDessertsQuery(undefined), className: 'main__desserts' },
];

export default useSectionsData;
