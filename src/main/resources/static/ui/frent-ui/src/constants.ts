import { Movie, Notification } from './utils/types';

export const movie1: Movie = {
    id: '1',
    title: 'The Godfather',
    price: 10,
    isAvailable: true,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    dueDate: '31/12/2023',
    isRented: true
}

export const movie2: Movie = {
    id: '2',
    title: 'The Shawshank Redemption',
    price: 10,
    isAvailable: true,
    description: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    dueDate: '31/12/2023',
    isRented: false
}

export const notification1: Notification = {
    message: 'Movie rented successfully!'
}

export const notification2: Notification = {
    message: 'Movie returned successfully!'
}

export const BASE_URL = 'http://localhost:8080/api'