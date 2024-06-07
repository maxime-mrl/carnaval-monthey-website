import React from 'react';

import ShopItem from '@components/shopItem/ShopItem';
import { stripe } from '@utils/stripe';

const ShopPage = async () => {
    const { data:products } = await stripe.prices.list({
        expand: [ "data.product" ]
    });
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
        <section id="bars" className="container-size py-section flex flex-wrap gap-10">
            {products.map((product:any, key) => (
                <ShopItem 
                    item={product}
                    key={key}
                />
            ))}
            <div className={`w-[10rem] relative`}>
                <div className='w-full h-[12rem] bg-dark/30 flex-center text-[8rem] text-snow select-none'>
                    <p className='h-[0.2em] leading-[0]'>...</p>
                </div>
                <div className="w-full text-left">
                    <p>
                        Plus de produits arrivent bientôt!
                    </p>
                </div>
            </div>
        </section>
        </>
    );
};

export default ShopPage;