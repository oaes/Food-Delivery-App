import React, { useState } from 'react';
import { useEffect } from 'react';
import './Features.css';
import AllFeatures from '../../Resources/features.json'
import SingleFeature from '../SingleFeature/SingleFeature';

function Features(props) {
    const [features , setFeatures] = useState([]);
    useEffect(() => {
        setFeatures(AllFeatures);
    }, []);

    return (
        <section className="features my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                            <h2>Why you choose us</h2>
                            <p className="mt-3 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sapiente eaque repellendus asperiores nisi! Architecto, praesentium eligendi consequatur inventore fuga eius totam officia adipisci. Nostrum quia soluta vel distinctio delectus!</p>
                            </div>
                        </div>
                    </div>

                    {
                        features.map( feature => <SingleFeature key={feature.id} feature={feature}></SingleFeature>)
                    }
                    
                </div>
            </div>
        </section>
    );
}

export default Features;