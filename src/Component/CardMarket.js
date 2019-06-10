import React from 'react'
import '../css/CardMarket.css'
import LevelTube from './LevelTube'
import Level from './Level'
import {getStr, getHP, getWeak, getLevel} from '../Function/CardFunction';

const CardMarket =(props)=>{
    const card = props.card;
    const hp = getHP(card);
    const weak = getWeak(card);
    const str = getStr(card);
    const level = getLevel(card);
    const {imageUrl,name} = card;
    return (
        <div className={'card-market'}>
            <div className={'card-market-image'}>
                <img src={imageUrl} alt={imageUrl}/>
            </div>
            <div className={'card-market-detail'}>
                <h1>{name}</h1>
                <div className={'stat'}>
                    <p className={'mg-0 wp-20'}>HP</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={hp} />
                    </div>

                    <p className={'mg-0 wp-20'}>STR</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={str} />
                    </div>

                    <p className={'mg-0 wp-20'}>WEAK</p>
                    <div className={'wp-70'}>
                        <LevelTube percent={weak} />
                    </div>
                </div>
                <Level level={level}/>
            </div>
            <p className={'mg-0 add'} onClick={()=>props.addCard(card)}>Add</p>
        </div>
    );
}

export default CardMarket;
