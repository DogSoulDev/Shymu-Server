//!Just one test with JEST https://jestjs.io/docs/getting-started
const genderController = require('../genderController');

describe('genderController', () => {
  test('should return a list of genders', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await genderController.getAll(req, res);
    expect(res.status.mock.calls).toEqual([[200]]);
    expect(res.json.mock.calls).toEqual([
      [
        [
          {
            id: 1,
            name: 'Male',
          },
          {
            id: 2,
            name: 'Female',
          },
        ],
      ],
    ]);
  });
});
