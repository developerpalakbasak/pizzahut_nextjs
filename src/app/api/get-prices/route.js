// pages/api/get-prices.js
import mongoose from 'mongoose';

import { ConnectDB } from '@/lib/config/db';
import PizzaModel from '@/lib/models/pizzaModel';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    await ConnectDB();

    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ message: 'Invalid items array' }, { status: 400 });
    }

    const objectIds = items.map(id => new mongoose.Types.ObjectId(id));

    const pizzas = await PizzaModel.find(
      { _id: { $in: objectIds } },
      { _id: 1, price: 1 }
    ).lean();

    const prices = {};
    pizzas.forEach(pizza => {
      prices[pizza._id.toString()] = pizza.price;
    });

    const missingItems = items.filter(id => !prices[id]);
    if (missingItems.length > 0) {
      console.warn('Missing prices for items:', missingItems);
    }

    return NextResponse.json(prices, { status: 200 });

  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      {
        message: 'Error fetching prices',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}



