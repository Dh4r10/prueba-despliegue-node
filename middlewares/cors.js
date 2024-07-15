import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://movies.com',
  'http://jhosep.go',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
  })
