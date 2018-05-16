const fetch = require('node-fetch');
const data = require('./data/data.json');

it('serves all the users from /users', async () => {
  const res = await (await fetch('http://localhost:4848/api/users')).json();
  expect(res).toEqual(data);
});

it('serves all the data as Content-Type: application/json; charset=utf-8', async () => {
  const res = await fetch('http://localhost:4848/api/users');
  expect(res.headers.get('content-type')).toEqual(
    'application/json; charset=utf-8',
  );
});

it('serves single user with the correct id from /api/users/:id', async () => {
  const res = await (await fetch('http://localhost:4848/api/users/55')).json();
  expect(res.id).toEqual(55);
});

it('sends 404 when fetching for user that does not exists such as /api/users/xxx', async () => {
  const res = await fetch('http://localhost:4848/api/users/xxx');
  expect(res.status).toEqual(404);
});

it('sends 404 for non-existent paths', async () => {
  const res = await fetch('http://localhost:4848/kissakoira');
  expect(res.status).toEqual(404);
});

console.log('Unskip this test if you did the graphql implementation');
it.skip('can query via graphql', async () => {
  const res = await (await fetch('http://localhost:4848/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        user(id: 1) {
          id
          name
        }
      }`,
    }),
  })).json();

  const val = data.find(({ id }) => id === 1);

  const expected = {
    data: {
      user: {
        id: val.id,
        name: val.name,
      },
    },
  };

  expect(res).toEqual(expected);
});
