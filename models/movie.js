import { readJSON } from '../utils/require.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('../movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }) => {
    // en base de datos
    const newMovie = {
      id: randomUUID(), // UUid v4
      ...input,
    }

    movies.push(newMovie)

    return newMovie
  }

  static deleteById = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    } else {
      movies.splice(movieIndex, 1)
      return true
    }
  }

  static partialUpdate = async ({ id, input }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    } else {
      const updateMovie = {
        ...movies[movieIndex],
        ...input,
      }

      return (movies[movieIndex] = updateMovie)
    }
  }
}
