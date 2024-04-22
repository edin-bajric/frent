export type Movie = {
  id: string;
  title: string;
  description: string;
  smallImage: string;
  bigImage: string;
  director: string;
  genre: string[];
  year: number;
  available: boolean;
  rentalPrice: number;
};

export const joinGenres = (genres: string[]): string => {
  return genres.map(genre => {
    const capitalizedParts = genre.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
    return capitalizedParts.join(' ');
  }).join(', ');
};

export type Rental = {
  id: string;
  username: string;
  movieId: string;
  rentalDate: Date;
  dueDate: Date;
  returnDate: Date;
  rentalPrice: number;
  returned: boolean;
};

export type RentalMovie = {
  id: string;
  username: string;
  movieId: string;
  rentalDate: Date;
  dueDate: Date;
  returnDate: Date;
  rentalPrice: number;
  returned: boolean;
  title: string;
  description: string;
  smallImage: string;
  bigImage: string;
  director: string;
  genre: string[];
  year: number;
  available: boolean;
};
