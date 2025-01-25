import { waitFor, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Profile from "../../components/profile/profile";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { FavoriteItem } from "../../interfaces/Favorite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetail from "../../components/profile/recipes/recipe-detail";
import userEvent from "@testing-library/user-event";
import drinkdetails from "../mocks/drinkdetails";
import { favorites } from "../mocks/favorites";

jest.mock('../../services/apiService.ts', () => ({
  getDrink: () => ({drinks: [drinkdetails]}),
}));

describe("Profile Component", () => {
  const welcomeTexts = [
    "Welcome to barSync!",
    "To the right you will see your ingredient inventory where you can store ingredients you already own.",
    "If you wish to add a new ingredient select the button in the bar above.",
    "Want to make something? Select the button in the bar above."
  ];

  const mockFavorites = favorites.mockFavorites;
  const setMockFavorites = jest.fn();
  const mockFavorite1 = favorites.mockFavorite1;

  function renderComponent(favorites: FavoriteItem[]) {
    render(
      <FavoritesContext.Provider value={{favorites: favorites, setFavorites: setMockFavorites}}>
        <MemoryRouter initialEntries={['/profile' ]}>
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
          </Routes>
        </MemoryRouter>
      </FavoritesContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display heading and paragraphs", () => {
    renderComponent(mockFavorites);

    welcomeTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    })
  });

  it("should display a message when there are no favorites", () => {
    renderComponent([]);

    const msgElem = screen.getByTestId("no-favorites-msg");
    expect(msgElem).toBeInTheDocument();
    expect(msgElem.textContent?.toLowerCase()).toContain("no favorites");
  });

  it("should display the favorites", () => {
    renderComponent(mockFavorites);

    const favElem = screen.getByTestId(`${mockFavorites[0].idDrink}`);
    expect(favElem).toBeInTheDocument();
    expect(favElem.textContent).toEqual(mockFavorites[0].strDrink);
  });

  it("should forward to the details page", async () => {
    renderComponent([mockFavorite1]);

    const favElem = screen.getByTestId(`${mockFavorite1.idDrink}`);
    expect(favElem.children.length).toBeGreaterThan(0);
    await userEvent.click(favElem.children[0]);
    await waitFor(() => {
      const drinkNameElem = screen.getByTestId("detailspage-drink-name");
      expect(drinkNameElem).toBeInTheDocument();
      expect(drinkNameElem.textContent).toEqual(`${mockFavorite1.strDrink}`);
    })
  });
});