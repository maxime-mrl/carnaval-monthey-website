import React from 'react';

import { getTopUser } from '@utils/getData';
import ShopItem from '@components/shopItem/ShopItem';
import { stripe } from '@utils/stripe';
import Stripe from 'stripe';

const ShopPage = async () => {
    const { data:products } = await stripe.prices.list({
        expand: [ "data.product" ]
    });
    console.log(products[0])
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Shop</h1>
                <p className='h2 text-snow text-center max-w-4xl'>Soutiens nous en achetant nos goodies</p>
            </header>
        </div>
        {/* bars */}
        <section id="bars" className="container-size py-section flex flex-wrap gap-10 justify-around items-center">
            {products.map((product, key) => (
                <ShopItem 
                    item={product}
                    key={key}
                />
            ))}
        </section>
        </>
    );
};

export default ShopPage;