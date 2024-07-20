declare namespace Express {
  export interface Request {
    principalUser: {
      id: string
      role: 'church' | 'seminary'
    }
    user: {
      id: string
      role: 'priest' | 'seminarist' | 'pilgrim'
    }
  }
}
