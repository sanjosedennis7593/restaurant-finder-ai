import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { RestaurantPayload, RequestQuery } from './interface';
import { convertMessageToFoursquarePayload } from './ai'
import { getRestaurants } from './services';

const app: Application = express();

const port = process.env.PORT || 8000;

app.get('/api/execute', async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {

  const { message = '', code } = req.query;

  if (code !== process.env.DEFAULT_CODE) {
    res.status(401).send('Unauthorized');
  }

  try {

    const response = await convertMessageToFoursquarePayload(message);

    const payload: RestaurantPayload = {
      query: response.query,
      near: response.near, 
      categories: response.categories,
      price: response.price,
      open_now: response.open_now,
      limit: 10,
      min_price: response.min_price,
      max_price: response.min_price,
      radius: response.radius,
      sort: response.sort
    };

    console.log('Query Params', payload)

    const searchResults = await getRestaurants(payload)

    console.log('Search Results', searchResults.data)

    res.json({
      status: 200,
      data: searchResults.data
    });
  } catch (err) {
    console.log('error', err)
    res.json({
      status: 400,
      error: 'Something went wrong!'
    });
  }

});

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});