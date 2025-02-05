import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // Que renderizar
    res.json(movies)
  }

  static getById = async (req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })

    if (movie) {
      return res.json(movie)
    } else {
      res.status(404).json({ message: 'Movie not found' })
    }
  }

  static create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static partialUpdate = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await MovieModel.partialUpdate({
      id,
      input: result.data,
    })

    return res.json(updateMovie)
  }

  static deleteById = async (req, res) => {
    const { id } = req.params

    const result = await MovieModel.deleteById({ id })

    if (!result) {
      return res.status(404).json({ message: 'Movie not found' })
    } else {
      return res.json({ message: 'Movie deleted' })
    }
  }
}
