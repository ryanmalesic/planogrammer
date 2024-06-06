import { describe } from 'vitest'

import { checkDigit } from './convert'

describe('convert', () => {
  describe('checkDigit', () => {
    it('should return 3', () => {
      expect(checkDigit('629104150021')).toBe(3)
    })
  })
})
