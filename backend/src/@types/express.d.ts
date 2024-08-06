declare namespace Express {
  export interface Request {
    user: {
      id: string
      role: 'church' | 'seminary' | 'priest' | 'seminarist' | 'pilgrim'
    }
  }
}
